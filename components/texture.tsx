/**
 * Texture layer. Three ingredients, used sparingly:
 *   Contours  — engraved topographic linework, the load-bearing background
 *   Grain     — fixed film grain over everything
 *   Guilloche — banknote-style rosette, used once per page as a focal artefact
 *
 * The contour and guilloche geometry is baked into static SVG files by
 * scripts/generate-textures.mjs and referenced here as images. Rendering the paths
 * from React cost the page twice over — once in the HTML, once again escaped into
 * the RSC flight payload — on every single page. As files they are fetched once and
 * cached for the whole session, and the markup below stays a few hundred bytes.
 *
 * Grain stays inline: it is a filter, not geometry, and it costs nothing.
 */

/** Ring counts baked by the generator. Any request snaps to the nearest. */
const RING_BUCKETS = [16, 20, 24, 28, 32] as const;

function nearestBucket(rings: number) {
  return RING_BUCKETS.reduce((best, n) =>
    Math.abs(n - rings) < Math.abs(best - rings) ? n : best,
  );
}

type ContoursProps = {
  /** Where the contour eye sits, as a % of the container */
  origin?: { x: number; y: number };
  rings?: number;
  className?: string;
  tone?: "ink" | "bone";
  opacity?: number;
};

export function Contours({
  origin = { x: 62, y: 38 },
  rings = 30,
  className = "",
  tone = "ink",
  opacity = 1,
}: ContoursProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Centring lives on this wrapper. The drift animation owns `transform` on the
          image itself — putting both on one element makes the keyframe eat the centring. */}
      <div
        className="absolute h-[165%] w-[165%] max-w-none"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation to do */}
        <img
          src={`/textures/contours-${tone}-${nearestBucket(rings)}.svg`}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="contour-drift h-full w-full"
          style={opacity === 1 ? undefined : { opacity }}
        />
      </div>
    </div>
  );
}

/**
 * Guilloche rosette — the interlaced curve engraving used on banknotes and share
 * certificates. Here it signals "this is a financial instrument, not an app screen".
 *
 * The file bakes the per-line fade at full strength; `strokeOpacity` scales the whole
 * plate from CSS. It rides on the inner image so a caller's `opacity-*` class on the
 * wrapper still multiplies with it rather than being overwritten.
 */
const GUILLOCHE_FILES: Record<string, string> = {
  "#f18835": "/textures/guilloche-voltage.svg",
  "#8f4a12": "/textures/guilloche-voltage-ink.svg",
};

export function Guilloche({
  className = "",
  stroke = "#f18835",
  strokeOpacity = 0.4,
}: {
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
}) {
  return (
    <span aria-hidden="true" className={`block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation to do */}
      <img
        src={GUILLOCHE_FILES[stroke] ?? GUILLOCHE_FILES["#f18835"]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="h-full w-full"
        style={{ opacity: strokeOpacity }}
      />
    </span>
  );
}

/** Fixed film grain. feTurbulence, so it costs one filter and zero bytes of image. */
export function Grain() {
  return (
    <svg aria-hidden="true" className="grain" width="100%" height="100%">
      <filter id="suez-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#suez-grain)" />
    </svg>
  );
}
