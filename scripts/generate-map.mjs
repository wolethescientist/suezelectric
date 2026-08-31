/**
 * Turns Nigerian state boundaries into the engraved coverage plate.
 *
 * This is a ONE-OFF dev script, not part of the build: state borders do not move,
 * so the output (lib/nigeria-map.ts) is generated once and committed. Keeping it out
 * of `prebuild` means the build never needs the network.
 *
 *   npm run map
 *
 * Source: geoBoundaries gbOpen NGA ADM1 (GRID3 Nigeria state boundaries), CC BY 4.0.
 * The attribution is rendered under the map in components/coverage-map.tsx.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "scripts", ".cache", "nga-adm1.geojson");
const SOURCE =
  "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/NGA/ADM1/geoBoundaries-NGA-ADM1_simplified.geojson";

/**
 * Each state is assigned to the distribution company that serves the bulk of it.
 * Real DISCO franchise areas follow load boundaries rather than state lines and a
 * few states are split, so this is the standard one-state-one-licensee reduction
 * used on coverage maps. Lagos is served by two licensees and is drawn as one region.
 */
const TERRITORIES = [
  { id: "aedc",   disco: "AEDC",   city: "Abuja",         states: ["Abuja Federal Capital Territory", "Niger", "Kogi", "Nasarawa"] },
  { id: "ikedc",  disco: "IKEDC · EKEDC", city: "Lagos",  states: ["Lagos"] },
  { id: "ibedc",  disco: "IBEDC",  city: "Ibadan",        states: ["Oyo", "Ogun", "Osun", "Kwara"] },
  { id: "bedc",   disco: "BEDC",   city: "Benin",         states: ["Edo", "Delta", "Ondo", "Ekiti"] },
  { id: "eedc",   disco: "EEDC",   city: "Enugu",         states: ["Enugu", "Anambra", "Imo", "Abia", "Ebonyi"] },
  { id: "phed",   disco: "PHED",   city: "Port Harcourt", states: ["Rivers", "Bayelsa", "Cross River", "Akwa Ibom"] },
  { id: "kaedco", disco: "KAEDCO", city: "Kaduna",        states: ["Kaduna", "Sokoto", "Kebbi", "Zamfara"] },
  { id: "kedco",  disco: "KEDCO",  city: "Kano",          states: ["Kano", "Jigawa", "Katsina"] },
  { id: "jedplc", disco: "JEDPLC", city: "Jos",           states: ["Plateau", "Bauchi", "Benue", "Gombe"] },
  { id: "yedc",   disco: "YEDC",   city: "Yola",          states: ["Adamawa", "Borno", "Taraba", "Yobe"] },
];

/* ------------------------------------------------------------------ geometry --- */

const W = 1000;
const PAD = 8;

/** Perpendicular distance from p to the segment ab, for Douglas–Peucker. */
function segDist(p, a, b) {
  let x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) { x = b[0]; y = b[1]; }
    else if (t > 0) { x += dx * t; y += dy * t; }
  }
  return (p[0] - x) ** 2 + (p[1] - y) ** 2;
}

function simplify(points, tolerance) {
  if (points.length <= 3) return points;
  const sq = tolerance * tolerance;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxDist = 0, index = -1;
    for (let i = first + 1; i < last; i++) {
      const d = segDist(points[i], points[first], points[last]);
      if (d > maxDist) { maxDist = d; index = i; }
    }
    if (maxDist > sq) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function ringArea(points) {
  let a = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    a += (points[j][0] + points[i][0]) * (points[j][1] - points[i][1]);
  }
  return Math.abs(a / 2);
}

/** Every outer ring of a Polygon / MultiPolygon, as raw lon-lat arrays. */
function outerRings(geometry) {
  const polys = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];
  return polys.map((poly) => poly[0]).filter(Boolean);
}

/* ---------------------------------------------------------------------- main --- */

if (!existsSync(CACHE)) {
  console.log("fetching boundaries…");
  await mkdir(dirname(CACHE), { recursive: true });
  const res = await fetch(SOURCE);
  if (!res.ok) throw new Error(`source returned ${res.status}`);
  await writeFile(CACHE, Buffer.from(await res.arrayBuffer()));
}

const geo = JSON.parse(await readFile(CACHE, "utf8"));
const byName = new Map(geo.features.map((f) => [f.properties.shapeName, f]));

for (const t of TERRITORIES) {
  for (const s of t.states) {
    if (!byName.has(s)) throw new Error(`no boundary for "${s}"`);
  }
}
const assigned = new Set(TERRITORIES.flatMap((t) => t.states));
const missing = [...byName.keys()].filter((n) => !assigned.has(n));
if (missing.length) throw new Error(`states not assigned to a DISCO: ${missing.join(", ")}`);

// Equirectangular, with longitude compressed by cos(mean latitude). Over Nigeria's
// ten degrees of latitude this is visually indistinguishable from a proper conic and
// keeps the projection to two multiplications.
let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
for (const f of geo.features) {
  for (const ring of outerRings(f.geometry)) {
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }
}
const kx = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
const spanX = (maxLon - minLon) * kx;
const spanY = maxLat - minLat;
const scale = (W - PAD * 2) / spanX;
const H = Math.round(spanY * scale + PAD * 2);

const project = ([lon, lat]) => [
  (lon - minLon) * kx * scale + PAD,
  (maxLat - lat) * scale + PAD, // SVG y grows downward
];

/** lon-lat ring -> rounded SVG path, or null if it is a speck not worth drawing. */
function ringToPath(ring, tolerance) {
  const pts = simplify(ring.map(project), tolerance);
  if (pts.length < 4 || ringArea(pts) < 12) return null; // drops offshore slivers
  const d = pts.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`);
  // Douglas–Peucker keeps endpoints, and rounding can collapse the closing pair.
  if (d[0] === d[d.length - 1]) d.pop();
  return `M${d.join("L")}Z`;
}

const TOLERANCE = 2.2; // viewBox units. Coarse enough to read as engraved linework rather than a GIS export, fine enough that every state is recognisable.

const territories = TERRITORIES.map((t) => {
  const states = t.states.map((name) => {
    const paths = outerRings(byName.get(name).geometry)
      .map((r) => ringToPath(r, TOLERANCE))
      .filter(Boolean);
    return { name: name.replace("Abuja Federal Capital Territory", "FCT"), d: paths.join("") };
  });
  return { ...t, states, d: states.map((s) => s.d).join("") };
});

const out = `/* GENERATED by scripts/generate-map.mjs — do not edit by hand. Run \`npm run map\`. */
/* Boundaries: geoBoundaries gbOpen NGA ADM1 (GRID3), CC BY 4.0. */

export type MapTerritory = {
  id: string;
  disco: string;
  city: string;
  /** Every state outline in the territory, concatenated into one path. */
  d: string;
  states: { name: string; d: string }[];
};

export const MAP_VIEWBOX = "0 0 ${W} ${H}";

/** Abuja, in viewBox units — where the company actually sits. */
export const MAP_HQ = { x: ${Math.round(project([7.3986, 9.0765])[0])}, y: ${Math.round(project([7.3986, 9.0765])[1])} };

export const MAP_TERRITORIES: MapTerritory[] = ${JSON.stringify(territories, null, 2)};
`;

await writeFile(join(ROOT, "lib", "nigeria-map.ts"), out);

const bytes = territories.reduce((n, t) => n + t.d.length, 0);
const points = territories.reduce(
  (n, t) => n + t.states.reduce((m, s) => m + (s.d.match(/L/g)?.length ?? 0), 0), 0);
console.log(`  viewBox 0 0 ${W} ${H}`);
console.log(`  ${territories.length} territories, ${territories.reduce((n, t) => n + t.states.length, 0)} states`);
console.log(`  ${points} points, ${(bytes / 1024).toFixed(1)} KB of path data`);
