/**
 * Bakes the contour and guilloche linework into static SVG files under
 * public/textures/.
 *
 * Why not just render them in React: every <path d="..."> rendered from a server
 * component is paid for twice — once in the HTML, once again escaped inside the
 * RSC flight payload — on every page, with no cross-page caching. That was ~1.8MB
 * of the home page. As static files the browser fetches each one once and reuses
 * it for the whole session.
 *
 * Run via `npm run textures` (also wired into prebuild).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "textures");

/* Coordinates are rounded to whole units. The contour viewBox is 1200x1000 and the
   artwork is upscaled well past 1:1 in every placement, so a sub-unit decimal was
   never visible — it just cost a byte per point. */
const round = (n) => Math.round(n);

/* ---------------------------------------------------------------- contours --- */

const CONTOUR_STROKE = { ink: "#4d5661", bone: "#bdb19a" };
/* Ring counts are quantised to these buckets so a handful of files serve all 27
   placements. Outer rings fade to ~25% opacity, so a bucket two rings off the
   original is not distinguishable. */
const RING_BUCKETS = [16, 20, 24, 28, 32];

/** One closed isobar ring, perturbed by two harmonics so rings never look concentric-perfect. */
function contourPath(radius, wobble, phase, squash, steps) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r =
      radius +
      Math.sin(t * 3 + phase) * wobble +
      Math.sin(t * 5 - phase * 1.7) * wobble * 0.42 +
      Math.sin(t * 2 + phase * 0.6) * wobble * 0.7;
    pts.push(`${round(600 + Math.cos(t) * r)} ${round(500 + Math.sin(t) * r * squash)}`);
  }
  return `M${pts.join("L")}Z`;
}

function contoursSvg(tone, rings) {
  const stroke = CONTOUR_STROKE[tone];
  /* 132 steps drew a point every 2.7 degrees on a curve whose sharpest harmonic is
     the 5th — 48 is still four samples per lobe and reads identically. */
  const steps = 48;
  const paths = Array.from({ length: rings }, (_, i) => {
    const k = i / rings;
    const d = contourPath(70 + i * 34, 16 + i * 3.4, i * 0.42, 0.66 + k * 0.16, steps);
    // Rings fade outward so the eye is drawn to the dense centre. The per-instance
    // `opacity` prop multiplies this from CSS, so it is not baked in here.
    const o = (0.95 - k * 0.7).toFixed(2);
    const w = i % 6 === 0 ? 1.6 : 0.9; // every 6th ring is an "index contour", as on a real map
    return `<path d="${d}" stroke="${stroke}" stroke-width="${w}" stroke-opacity="${o}" vector-effect="non-scaling-stroke"/>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000" fill="none" preserveAspectRatio="xMidYMid slice">${paths.join("")}</svg>`;
}

/* --------------------------------------------------------------- guilloche --- */

/* Keyed by the colour the component asks for, so call sites keep passing a hex. */
const GUILLOCHE_STROKE = { voltage: "#f18835", "voltage-ink": "#8f4a12" };

function guillocheSvg(stroke, lines = 64) {
  const R = 190;
  const r = 118;
  const d = 62;
  /* The hypotrochoid's inner term completes 0.61 of a cycle over the curve, so 100
     samples is far past the point where more make a visible difference. */
  const steps = 100;
  const paths = Array.from({ length: lines }, (_, i) => {
    const offset = (i / lines) * Math.PI * 2;
    const pts = [];
    for (let s = 0; s <= steps; s++) {
      const t = (s / steps) * Math.PI * 2;
      // Hypotrochoid: the classic spirograph curve behind guilloche patterns
      const x = (R - r) * Math.cos(t + offset) + d * Math.cos(((R - r) / r) * t);
      const y = (R - r) * Math.sin(t + offset) - d * Math.sin(((R - r) / r) * t);
      pts.push(`${round(220 + x)} ${round(220 + y)}`);
    }
    // Base stroke-opacity of 1; the component scales the whole plate from CSS.
    const o = (1 - (i / lines) * 0.55).toFixed(2);
    return `<path d="M${pts.join("L")}" stroke="${stroke}" stroke-opacity="${o}" stroke-width="0.5" vector-effect="non-scaling-stroke"/>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440" fill="none">${paths.join("")}</svg>`;
}

/* -------------------------------------------------------------------- main --- */

await mkdir(OUT, { recursive: true });

const written = [];
for (const tone of Object.keys(CONTOUR_STROKE)) {
  for (const rings of RING_BUCKETS) {
    const name = `contours-${tone}-${rings}.svg`;
    const svg = contoursSvg(tone, rings);
    await writeFile(join(OUT, name), svg);
    written.push([name, svg.length]);
  }
}
for (const [key, stroke] of Object.entries(GUILLOCHE_STROKE)) {
  const name = `guilloche-${key}.svg`;
  const svg = guillocheSvg(stroke);
  await writeFile(join(OUT, name), svg);
  written.push([name, svg.length]);
}

const total = written.reduce((sum, [, size]) => sum + size, 0);
for (const [name, size] of written) {
  console.log(`  ${name.padEnd(28)} ${(size / 1024).toFixed(1)} KB`);
}
console.log(`textures: ${written.length} files, ${(total / 1024).toFixed(0)} KB on disk`);
