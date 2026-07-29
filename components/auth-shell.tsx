import type { ReactNode } from "react";
import Link from "next/link";
import { Contours, Guilloche } from "./texture";
import { Reveal, WipeLines } from "./reveal";

/**
 * Split auth layout. The form sits on the ink measure; the right panel is an
 * engraved plate carrying one number that matters. Never a centred card on a
 * flat background — that's the pattern this redesign exists to replace.
 */
export function AuthShell({
  eyebrow,
  lines,
  lede,
  children,
  footer,
  plate,
}: {
  eyebrow: string;
  lines: string[];
  lede: string;
  children: ReactNode;
  footer: ReactNode;
  plate: { stat: string; label: string; body: string };
}) {
  return (
    <section className="relative grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      {/* Form side */}
      <div className="relative flex flex-col justify-center overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
        <Contours origin={{ x: -14, y: 82 }} rings={20} opacity={0.5} />
        <Reveal className="relative w-full max-w-md" immediate>
          <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
            {eyebrow}
          </div>
          <h1 className="mt-6 text-display-m">
            <WipeLines lines={lines} />
          </h1>
          <p
            className="mt-5 text-fg-ink-muted"
            style={{ "--i": lines.length + 1 } as React.CSSProperties}
          >
            {lede}
          </p>

          <div
            className="mt-10"
            style={{ "--i": lines.length + 2 } as React.CSSProperties}
          >
            {children}
          </div>

          <div
            className="mt-9 border-t border-ink-line pt-6 text-sm text-fg-ink-muted"
            style={{ "--i": lines.length + 3 } as React.CSSProperties}
          >
            {footer}
          </div>
        </Reveal>
      </div>

      {/* Engraved plate side */}
      <aside className="relative hidden overflow-hidden border-l border-ink-line bg-ink-2 lg:block">
        <Contours origin={{ x: 58, y: 44 }} rings={30} opacity={0.9} />
        <Guilloche className="pointer-events-none absolute -right-24 top-[8%] h-[30rem] w-[30rem] opacity-40" />

        <div className="relative flex h-full flex-col justify-between p-16">
          <Link
            href="/"
            className="link-slide self-start font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted transition-colors duration-200 hover:text-fg-ink"
          >
            ← Back to suezelectric.com
          </Link>

          <div>
            <div className="font-display text-[clamp(4rem,7vw,7rem)] leading-none text-voltage">
              {plate.stat}
            </div>
            <div className="mt-4 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
              {plate.label}
            </div>
            <p className="mt-6 max-w-sm text-body-l">{plate.body}</p>
          </div>

          <div className="rule-ticks" />
        </div>
      </aside>
    </section>
  );
}
