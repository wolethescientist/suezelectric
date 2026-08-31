import Link from "next/link";

/**
 * The SuezElectric lockup, as vector.
 *
 * It was two transparent PNGs — one per background — at 1248px wide, which the
 * footer drew at up to 896 CSS px on a 2x display. That is the most brand-critical
 * mark on the site rendered past its native resolution, and it showed.
 *
 * These are traced from that original artwork and kept as static files rather than
 * inlined: an inline <svg> would put ~8KB of path data into the HTML *and* again
 * into the RSC flight payload of every page, whereas a file is fetched once and
 * cached for the whole session. Two variants for two surfaces — the same reason the
 * PNGs came in pairs — because the "Electric" half and the orange both have to
 * change to stay legible on bone.
 *
 * The bolt inside the bulb is a genuine knockout in the original and stays one here,
 * so it takes on whatever sits behind it.
 */
export function Logo({
  tone = "ink",
  className = "h-7 w-auto",
  priority = false,
}: {
  tone?: "ink" | "bone";
  className?: string;
  /** Set on the header lockup so it is not deprioritised behind body content. */
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation to do
    <img
      src={tone === "bone" ? "/wordmark-bone.svg" : "/wordmark-ink.svg"}
      alt="SuezElectric"
      width={1248}
      height={286}
      className={className}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fetchPriority lands in React 19 typings
      {...({ fetchPriority: priority ? "high" : undefined } as any)}
    />
  );
}

/** Header lockup: the logo plus the registration number as a quiet tick. */
export function Wordmark({
  tone = "ink",
  priority = false,
}: {
  tone?: "ink" | "bone";
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="SuezElectric — home"
      className="group flex items-center gap-3"
    >
      <Logo tone={tone} className="h-6 w-auto sm:h-8" priority={priority} />
      <span
        className={`hidden font-label text-[0.5625rem] uppercase tracking-[0.09em] opacity-55 transition-opacity duration-300 group-hover:opacity-100 lg:block ${
          tone === "ink" ? "text-fg-ink-muted" : "text-fg-bone-muted"
        }`}
      >
        RC 1638998
      </span>
    </Link>
  );
}
