"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Adds `is-in` once the element enters the viewport, which is what all the CSS
 * entrance animations hang off. IntersectionObserver instead of a motion library:
 * the whole reveal system is ~30 lines and ships no runtime.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  /** Fires immediately — for above-the-fold content that shouldn't wait on scroll */
  immediate = false,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (immediate) {
      // Two frames, not a timer: start on the very next paint so the hero has no
      // dead time before it moves. A setTimeout here just added latency.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() =>
          delay ? setTimeout(() => setInView(true), delay) : setInView(true),
        );
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // reveal once, never re-animate on scroll back
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate, delay]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${className} ${inView ? "is-in" : ""}`}
    >
      {children}
    </Tag>
  );
}

/** Heading whose lines wipe up from a clipped baseline, staggered. */
export function WipeLines({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`wipe ${className}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </>
  );
}
