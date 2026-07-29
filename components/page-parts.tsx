import type { ReactNode } from "react";
import { Contours } from "./texture";
import { Reveal, WipeLines } from "./reveal";

/**
 * Inner-page hero. Deliberately asymmetric: the type hangs off the left measure and
 * the contour eye sits off-canvas right, so no page reads as a centred hero box.
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  aside,
}: {
  eyebrow: string;
  lines: string[];
  lede?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-line pb-16 pt-36 sm:pb-20 sm:pt-44">
      <Contours origin={{ x: 92, y: 22 }} rings={24} opacity={0.6} />
      <Reveal className="measure relative" immediate>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:items-end lg:gap-20">
          <div className="reveal">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              {eyebrow}
            </div>
            <h1
              className="mt-7 text-display-l"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <WipeLines lines={lines} />
            </h1>
            {lede && (
              <p
                className="mt-8 max-w-xl text-body-l text-fg-ink-muted"
                style={{ "--i": lines.length + 1 } as React.CSSProperties}
              >
                {lede}
              </p>
            )}
          </div>
          {aside && (
            <div className="reveal lg:pb-2">
              <div style={{ "--i": lines.length + 2 } as React.CSSProperties}>
                {aside}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/** Section heading: mono eyebrow, display title, optional right-aligned note. */
export function SectionHead({
  eyebrow,
  title,
  note,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 ${className}`}
    >
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-6 max-w-2xl text-display-m">{title}</h2>
      </div>
      {note && (
        <p className="max-w-xs font-label text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] opacity-70">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * Numbered editorial row. Replaces the card grid — dividers on one axis only,
 * so nothing reads as a box.
 */
export function NumberedRow({
  index,
  title,
  children,
  meta,
}: {
  index: number;
  title: string;
  children: ReactNode;
  meta?: string;
}) {
  return (
    <div
      className="group grid gap-4 border-t py-9 transition-colors duration-300 sm:grid-cols-[5rem_1fr] sm:gap-10 lg:grid-cols-[5rem_1.1fr_1.4fr]"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] opacity-60">
        {String(index).padStart(2, "0")}
      </div>
      <h3 className="text-display-s">{title}</h3>
      <div className="max-w-xl space-y-3 opacity-80">
        {children}
        {meta && (
          <p className="pt-1 font-label text-[0.6875rem] uppercase tracking-[0.075em] opacity-70">
            {meta}
          </p>
        )}
      </div>
    </div>
  );
}

/** Two-line stat, hairline-separated in a row. Never a bordered tile. */
export function StatRow({
  items,
}: {
  items: { label: string; value: string; note?: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-y-8 border-t pt-9 lg:grid-cols-4">
      {items.map((s, i) => (
        <div
          key={s.label}
          className={`px-0 lg:px-8 ${i > 0 ? "lg:border-l" : "lg:pl-0"}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          <dd className="font-display text-display-s">{s.value}</dd>
          <dt className="mt-2 font-label text-[0.6875rem] uppercase tracking-[0.09em] opacity-65">
            {s.label}
          </dt>
          {s.note && <p className="mt-2 text-sm opacity-70">{s.note}</p>}
        </div>
      ))}
    </dl>
  );
}

/** Full-bleed pull quote set in the display serif. Editorial punctuation of long pages. */
export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <blockquote className="max-w-4xl">
      <p className="text-display-m">{children}</p>
      {attribution && (
        <footer className="mt-7 font-label text-[0.6875rem] uppercase tracking-[0.09em] opacity-65">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}
