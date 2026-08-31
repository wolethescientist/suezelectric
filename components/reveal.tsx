"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/** Default true so a WipeLines used outside a Reveal renders visible, not hidden. */
const RevealCtx = createContext(true);

const ENTRANCE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Fraction of the viewport height at which a block commits to revealing. At 0.88 a
 * section starts its entrance as it crosses into the bottom eighth of the screen,
 * so an unhurried reader still sees the animation and a fast one finds it settled.
 */
const TRIGGER = 0.88;

/* ---------------------------------------------------------------------------
 * One shared scroll pass, not an IntersectionObserver per block.
 *
 * The observer version left content permanently invisible: a large scroll jump
 * could move a section from below the root to inside it without any sampled frame
 * catching the crossing, and since the entrance state is "hidden until told
 * otherwise", a missed callback meant a blank screen that never healed. Polling the
 * pending blocks on a rAF-throttled scroll is a dozen getBoundingClientRect reads on
 * a page that has at most fifteen of them, and it cannot miss: any scroll, resize or
 * orientation change re-checks everything still waiting.
 * ------------------------------------------------------------------------- */

type Pending = { el: HTMLElement; fire: () => void };

const pending = new Set<Pending>();
let listening = false;
let queued = false;

function sweep() {
  queued = false;
  const limit = window.innerHeight * TRIGGER;
  for (const entry of pending) {
    const rect = entry.el.getBoundingClientRect();
    // `top < limit` also covers anything already scrolled past (negative top),
    // which is how a restored scroll position or an in-page anchor lands.
    if (rect.top < limit) {
      pending.delete(entry);
      entry.fire();
    }
  }
  if (pending.size === 0) stopListening();
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(sweep);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

function register(entry: Pending) {
  pending.add(entry);
  startListening();
  schedule();
  return () => {
    pending.delete(entry);
    if (pending.size === 0) stopListening();
  };
}

/**
 * Adds the entrance state for its subtree.
 *
 * Children stagger via CSS (`.reveal-hidden > *`), applied by a class that is
 * REMOVED to reveal, so nothing has to out-specify anything. Headlines go through
 * WipeLines, which reads this context and writes inline styles — that path is
 * immune to stylesheet ordering entirely.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  /** Fires on load — for above-the-fold content that shouldn't wait on scroll */
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
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setInView(true);
    };

    if (immediate) {
      // One paint with the hidden state, then reveal. rAF gets there on the next
      // frame when visible — but rAF is SUSPENDED in a hidden or background tab,
      // which would leave the hero invisible until focus. The timer backs it up;
      // whichever fires first wins.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(fire);
      });
      const timer = setTimeout(fire, 120 + delay);
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        clearTimeout(timer);
      };
    }

    const el = ref.current;
    if (!el) return;

    const unregister = register({
      el,
      fire: delay ? () => window.setTimeout(fire, delay) : fire,
    });
    return unregister;
  }, [immediate, delay]);

  return (
    <RevealCtx.Provider value={inView}>
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={`${className}${inView ? "" : " reveal-hidden"}`}
      >
        {children}
      </Tag>
    </RevealCtx.Provider>
  );
}

/**
 * Heading whose lines wipe up from a clipped baseline, staggered.
 * Transform is inline and driven by React state, so no stylesheet can override it.
 */
export function WipeLines({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  const inView = useContext(RevealCtx);

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`wipe ${className}`}>
          <span
            style={{
              display: "block",
              transform: inView ? "none" : "translate3d(0, 105%, 0)",
              transition: `transform 560ms ${ENTRANCE}`,
              transitionDelay: `${i * 55}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}
