/**
 * Texture layer. Three ingredients, used sparingly:
 *   Contours  — engraved topographic linework, the load-bearing background
 *   Grain     — fixed film grain over everything
 *   Guilloche — banknote-style rosette, used once per page as a focal artefact
 *
 * All deterministic maths, all server-rendered. No images, no randomness, no hydration cost.
 */

/** One closed isobar ring, perturbed by two harmonics so rings never look concentric-perfect. */
function contourPath(
  radius: number,
  wobble: number,
  phase: number,
  squash: number,
  steps = 132,
) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r =
      radius +
      Math.sin(t * 3 + phase) * wobble +
      Math.sin(t * 5 - phase * 1.7) * wobble * 0.42 +
      Math.sin(t * 2 + phase * 0.6) * wobble * 0.7;
    const x = 600 + Math.cos(t) * r;
    const y = 500 + Math.sin(t) * r * squash;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
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
  const stroke = tone === "ink" ? "#4d5661" : "#bdb19a";
  const paths = Array.from({ length: rings }, (_, i) => {
    const k = i / rings;
    return {
      d: contourPath(70 + i * 34, 16 + i * 3.4, i * 0.42, 0.66 + k * 0.16),
      // Rings fade outward so the eye is drawn to the dense centre
      o: (0.95 - k * 0.7) * opacity,
      w: i % 6 === 0 ? 1.6 : 0.9, // every 6th ring is an "index contour", as on a real map
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Centring lives on this wrapper. The drift animation owns `transform` on the
          svg itself — putting both on one element makes the keyframe eat the centring. */}
      <div
        className="absolute h-[165%] w-[165%] max-w-none"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          className="contour-drift h-full w-full"
          viewBox="0 0 1200 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              stroke={stroke}
              strokeWidth={p.w}
              strokeOpacity={p.o}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Guilloche rosette — the interlaced curve engraving used on banknotes and share
 * certificates. Here it signals "this is a financial instrument, not an app screen".
 */
export function Guilloche({
  className = "",
  stroke = "#f18835",
  strokeOpacity = 0.4,
  lines = 64,
}: {
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
  lines?: number;
}) {
  const R = 190;
  const r = 118;
  const d = 62;
  const paths = Array.from({ length: lines }, (_, i) => {
    const offset = (i / lines) * Math.PI * 2;
    const pts: string[] = [];
    for (let s = 0; s <= 240; s++) {
      const t = (s / 240) * Math.PI * 2;
      // Hypotrochoid: the classic spirograph curve behind guilloche patterns
      const x = (R - r) * Math.cos(t + offset) + d * Math.cos(((R - r) / r) * t);
      const y = (R - r) * Math.sin(t + offset) - d * Math.sin(((R - r) / r) * t);
      pts.push(`${(220 + x).toFixed(1)} ${(220 + y).toFixed(1)}`);
    }
    return `M${pts.join("L")}`;
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 440 440"
      fill="none"
      className={className}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p}
          stroke={stroke}
          strokeOpacity={strokeOpacity * (1 - (i / lines) * 0.55)}
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
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
