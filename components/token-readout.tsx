"use client";

import { useEffect, useRef, useState } from "react";

const TOKEN = "48210975336471028855";
const GROUPS = [0, 4, 8, 12, 16];

/**
 * The signature element: a real STS prepaid token materialising digit by digit.
 * This is what a customer actually receives, rendered as the hero's focal object —
 * the product, not a stock illustration of the product.
 */
export function TokenReadout() {
  const [settled, setSettled] = useState(0);
  const [scramble, setScramble] = useState("00000000000000000000");
  const [units, setUnits] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setSettled(TOKEN.length);
      setScramble(TOKEN);
      setUnits(147.3);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      // Digits lock left-to-right over 1.9s
      const locked = Math.min(TOKEN.length, Math.floor(elapsed / 95));
      setSettled(locked);
      setUnits(Math.min(147.3, (elapsed / 1900) * 147.3));

      // Only re-roll unlocked digits, every 3rd frame — fast enough to read as motion,
      // slow enough not to strobe
      if (frame.current++ % 3 === 0) {
        setScramble(
          TOKEN.split("")
            .map((d, i) => (i < locked ? d : String(Math.floor(Math.random() * 10))))
            .join(""),
        );
      }

      if (locked < TOKEN.length) {
        raf = requestAnimationFrame(tick);
      } else {
        // The every-3rd-frame throttle can leave the last digits mid-roll; land them.
        setScramble(TOKEN);
        setUnits(147.3);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const done = settled >= TOKEN.length;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-ink-line bg-ink-2/70 backdrop-blur-sm">
      {/* Instrument header strip */}
      <div className="flex items-center justify-between border-b border-ink-line px-5 py-3 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
        <span className="font-mono tracking-normal">Meter 4512 7789 013</span>
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              done ? "bg-voltage" : "bg-fg-ink-muted"
            }`}
          />
          {done ? "Delivered" : "Generating"}
        </span>
      </div>

      <div className="px-5 py-7 sm:px-7">
        <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          Token
        </div>

        {/* The token itself — tabular so digits never jitter the layout as they roll */}
        <div
          className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[clamp(1.125rem,2.6vw,1.75rem)] tabular-nums"
          aria-live="polite"
          aria-label={done ? `Token ${TOKEN}` : "Generating token"}
        >
          {GROUPS.map((g) => (
            <span key={g}>
              {scramble
                .slice(g, g + 4)
                .split("")
                .map((d, i) => (
                  <span
                    key={i}
                    className={
                      g + i < settled
                        ? "text-voltage transition-colors duration-300"
                        : "text-fg-ink-muted"
                    }
                  >
                    {d}
                  </span>
                ))}
            </span>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-3 gap-4 border-t border-ink-line pt-5 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          <Stat label="Paid" value="₦5,000" />
          <Stat label="Units" value={`${units.toFixed(1)} kWh`} />
          <Stat label="Elapsed" value={done ? "12s" : "—"} />
        </div>
      </div>
    </figure>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div>{label}</div>
      <div className="mt-1.5 font-sans text-base normal-case tracking-normal text-fg-ink">
        {value}
      </div>
    </div>
  );
}
