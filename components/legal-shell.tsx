import type { ReactNode } from "react";
import { Contours } from "./texture";
import { Reveal, WipeLines } from "./reveal";

/**
 * Legal pages get the bone treatment and a hard measure — long-form reading is the
 * only job here, so the type column is capped at ~68 characters and the linework
 * stays out of the text's way.
 */
export function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-line pb-14 pt-36 sm:pt-44">
        <Contours origin={{ x: 94, y: 26 }} rings={22} opacity={0.55} />
        <Reveal className="measure relative" immediate>
          <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
            Last updated {updated}
          </div>
          <h1 className="mt-6 text-display-l">
            <WipeLines lines={[title]} />
          </h1>
          <p
            className="mt-7 max-w-2xl text-body-l text-fg-ink-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {intro}
          </p>
        </Reveal>
      </section>

      <section className="on-bone relative py-20 lg:py-24">
        <div className="measure relative">
          <div className="legal max-w-[42rem]">{children}</div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
