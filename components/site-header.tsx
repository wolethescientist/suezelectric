"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./logo";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/agents", label: "Agents" },
  { href: "/partners", label: "Partners" },
  { href: "/investors", label: "Investors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, and lock the page behind it while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5">
      <div
        className={`mx-auto flex w-full max-w-[88rem] items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,padding] duration-500 sm:pl-7 sm:pr-2.5 ${
          scrolled
            ? "border-ink-line bg-ink/85 py-2 backdrop-blur-xl"
            : "border-transparent bg-transparent py-3.5"
        }`}
      >
        <Wordmark priority />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-slide font-label text-[0.6875rem] uppercase tracking-[0.09em] transition-colors duration-200 ${
                  active ? "text-voltage" : "text-fg-ink-muted hover:text-fg-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted transition-colors duration-200 hover:text-fg-ink sm:block"
          >
            Log in
          </Link>
          <Link href="/signup" className="btn btn-voltage hidden sm:inline-flex">
            Buy units
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink-line transition-colors duration-200 hover:bg-ink-2 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-fg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-fg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer — a separate floating panel, so the bar stays a clean pill */}
      <div
        className={`overflow-hidden rounded-3xl border-ink-line bg-ink/95 backdrop-blur-xl transition-[max-height,opacity,margin] duration-500 lg:hidden ${
          open ? "mt-2 max-h-[42rem] border opacity-100" : "mt-0 max-h-0 border-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex w-full max-w-[88rem] flex-col px-4 py-4 sm:px-6"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-ink-line py-4 font-display text-2xl transition-colors duration-200 last:border-0 hover:text-voltage"
            >
              {item.label}
              <span className="font-label text-[0.6875rem] text-fg-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/signup" className="btn btn-voltage w-full">
              Buy units
            </Link>
            {/* The calculator has no desktop nav entry — it lives on the home page.
                On a phone the drawer is the only place to reach for it by name. */}
            <Link href="/#energy-calculator" className="btn btn-ghost w-full">
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 fill-none stroke-current"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2.5" y="1.5" width="11" height="13" rx="2" />
                <path d="M5.25 4.75h5.5" />
                <path d="M5.5 8h.01M8 8h.01M10.5 8h.01M5.5 11h.01M8 11h.01M10.5 11h.01" />
              </svg>
              Calculate your energy
            </Link>
            <Link href="/login" className="btn btn-ghost w-full">
              Log in
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

