"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { MAP_HQ, MAP_TERRITORIES, MAP_VIEWBOX } from "@/lib/nigeria-map";
import { Contours } from "./texture";
import { Reveal } from "./reveal";

/**
 * The coverage plate: every state SuezElectric vends into, drawn as engraved
 * linework in the same language as the contour and guilloche artwork.
 *
 * It replaces a wrapped list of eleven text labels — the site's most important
 * claim, previously set as its least memorable element. Hovering or focusing a
 * territory names its licensee; the whole thing is a list of links underneath, so
 * it works without a pointer and reads correctly to a screen reader.
 */
export function CoverageMap() {
  const [active, setActive] = useState<string | null>(null);
  const gid = useId().replace(/:/g, "");

  const current = MAP_TERRITORIES.find((t) => t.id === active) ?? null;

  return (
    <section
      id="coverage"
      className="relative overflow-hidden border-y border-ink-line section-y"
    >
      <Contours origin={{ x: 8, y: 20 }} rings={24} opacity={0.45} />

      <Reveal className="measure relative">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          {/* ---- The number, set large enough to be the point ---- */}
          <div className="reveal">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Coverage
            </div>

            <div style={{ "--i": 1 } as React.CSSProperties}>
              <div className="mt-8 font-display text-[clamp(7rem,17vw,15rem)] leading-[0.8] tracking-[-0.03em] text-voltage">
                11
              </div>
              <h2 className="mt-6 max-w-sm text-display-m">
                distribution companies, one account.
              </h2>
            </div>

            <p
              className="mt-8 max-w-sm text-fg-ink-muted"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              From Sokoto to Port Harcourt. If your meter sits inside one of these
              franchise areas, you can buy for it here tonight.
            </p>

            {/* The readout doubles as the map's accessible name-on-hover. Fixed
                height so naming a territory never nudges the layout. */}
            <div
              className="mt-10 min-h-[4.5rem] border-t border-ink-line pt-6"
              style={{ "--i": 3 } as React.CSSProperties}
              aria-live="polite"
            >
              {current ? (
                <>
                  <div className="font-display text-display-s text-voltage">
                    {current.city}
                  </div>
                  <div className="mt-1.5 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                    {current.disco} ·{" "}
                    {current.states.map((s) => s.name).join(", ")}
                  </div>
                </>
              ) : (
                <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                  Select a territory to see its licensee
                </div>
              )}
            </div>
          </div>

          {/* ---- The plate ---- */}
          <div className="reveal">
            <div style={{ "--i": 4 } as React.CSSProperties}>
              <svg
                viewBox={MAP_VIEWBOX}
                className="coverage-plate h-auto w-full"
                role="img"
                aria-label="Map of Nigeria showing the eleven electricity distribution company territories SuezElectric vends to"
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActive(null);
                }}
              >
                <defs>
                  {/* A hairline hatch, so a highlighted territory reads as engraved
                      fill rather than a flat block of colour. */}
                  <pattern
                    id={`hatch-${gid}`}
                    width="6"
                    height="6"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="6"
                      stroke="var(--color-voltage)"
                      strokeWidth="1.4"
                      strokeOpacity="0.55"
                    />
                  </pattern>
                </defs>

                {MAP_TERRITORIES.map((t) => {
                  const on = active === t.id;
                  return (
                    <g
                      key={t.id}
                      className="coverage-territory"
                      data-on={on || undefined}
                      onMouseEnter={() => setActive(t.id)}
                      // Touch has no hover: a tap selects, and tapping the same
                      // territory again clears it.
                      onClick={() => setActive((c) => (c === t.id ? null : t.id))}
                    >
                      {/* Fill first, outline over it, so borders stay crisp */}
                      <path
                        d={t.d}
                        fill={on ? `url(#hatch-${gid})` : "#101317"}
                        stroke="none"
                      />
                      {t.states.map((s) => (
                        <path
                          key={s.name}
                          d={s.d}
                          fill="none"
                          stroke={on ? "var(--color-voltage)" : "#5b6673"}
                          strokeWidth={on ? 1.6 : 1}
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      ))}
                    </g>
                  );
                })}

                {/* Abuja — the one fixed point on the plate */}
                <g className="coverage-hq" aria-hidden="true">
                  <circle cx={MAP_HQ.x} cy={MAP_HQ.y} r="16" className="coverage-hq-ring" />
                  <circle cx={MAP_HQ.x} cy={MAP_HQ.y} r="5" fill="var(--color-voltage)" />
                  <line
                    x1={MAP_HQ.x + 10}
                    y1={MAP_HQ.y - 10}
                    x2={MAP_HQ.x + 38}
                    y2={MAP_HQ.y - 38}
                    stroke="var(--color-voltage)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={MAP_HQ.x + 44}
                    y={MAP_HQ.y - 38}
                    className="coverage-hq-label"
                    fill="var(--color-voltage)"
                  >
                    Abuja
                  </text>
                  <text
                    x={MAP_HQ.x + 44}
                    y={MAP_HQ.y - 24}
                    className="coverage-hq-sub"
                    fill="var(--color-fg-ink-muted)"
                  >
                    Head office
                  </text>
                </g>
              </svg>

              {/* The same information as a list: keyboard reachable, and the only
                  version that exists if the SVG never paints. */}
              <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-line pt-4">
                {MAP_TERRITORIES.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(t.id)}
                      onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActive(null);
                }}
                      onFocus={() => setActive(t.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive((c) => (c === t.id ? null : t.id))}
                      aria-pressed={active === t.id}
                      className={`flex min-h-11 cursor-pointer items-center font-label text-[0.6875rem] uppercase tracking-[0.075em] transition-colors duration-200 ${
                        active === t.id
                          ? "text-voltage"
                          : "text-fg-ink-muted hover:text-fg-ink"
                      }`}
                    >
                      {t.city} — {t.disco}
                    </button>
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-label text-[0.625rem] uppercase tracking-[0.075em] text-fg-ink-muted/70">
                Franchise areas shown by dominant state. Boundaries:{" "}
                <a
                  href="https://www.geoboundaries.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide"
                >
                  geoBoundaries
                </a>{" "}
                / GRID3, CC BY 4.0
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/signup" className="btn btn-voltage">
            Buy for your meter
          </Link>
          <Link href="/faq" className="btn btn-ghost">
            Is my meter covered?
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
