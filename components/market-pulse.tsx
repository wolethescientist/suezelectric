"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MARKET_INSTRUMENTS,
  type EnergyMarketQuote,
} from "@/lib/energy-market";
import { Contours } from "./texture";

type MarketResponse = {
  quotes?: EnergyMarketQuote[];
  updatedAt?: string;
};

const EMPTY_QUOTES: EnergyMarketQuote[] = MARKET_INSTRUMENTS.map((instrument) => ({
  ...instrument,
  price: 0,
  previousClose: 0,
  change: 0,
  changePercent: 0,
  currency: "USD",
  exchange: "Market",
  timestamp: 0,
}));

export function MarketPulse() {
  const [quotes, setQuotes] = useState<EnergyMarketQuote[]>(EMPTY_QUOTES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMarket() {
      try {
        const response = await fetch("/api/energy-market", { cache: "no-store" });
        if (!response.ok) throw new Error("Market feed unavailable");
        const payload = (await response.json()) as MarketResponse;
        if (!cancelled && payload.quotes?.length) {
          setQuotes(payload.quotes);
          setActiveIndex(0);
          setFeedError(false);
        }
      } catch {
        if (!cancelled) setFeedError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMarket();
    const refresh = window.setInterval(loadMarket, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(refresh);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || quotes.length < 2) return;
    const rotation = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % quotes.length);
    }, 5200);
    return () => window.clearInterval(rotation);
  }, [paused, reducedMotion, quotes.length]);

  const activeQuote = quotes[activeIndex] ?? EMPTY_QUOTES[0];
  const hasValue = activeQuote.timestamp > 0;
  const formattedPrice = useMemo(
    () =>
      hasValue
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: activeQuote.currency,
            maximumFractionDigits: 2,
          }).format(activeQuote.price)
        : "—",
    [activeQuote.currency, activeQuote.price, hasValue],
  );
  const formattedChange = hasValue
    ? `${activeQuote.change >= 0 ? "+" : ""}${activeQuote.change.toFixed(2)} (${activeQuote.changePercent >= 0 ? "+" : ""}${activeQuote.changePercent.toFixed(2)}%)`
    : "Waiting for feed";

  function move(direction: 1 | -1) {
    setActiveIndex((index) => (index + direction + quotes.length) % quotes.length);
  }

  return (
    <section
      aria-labelledby="market-pulse-title"
      className="relative overflow-hidden border-y border-ink-line py-20 lg:py-28"
    >
      <Contours origin={{ x: 94, y: 38 }} rings={24} opacity={0.56} />
      <div className="measure relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          <div>
            <div className="eyebrow">Market pulse</div>
            <h2 id="market-pulse-title" className="mt-6 max-w-xl text-display-m">
              The current running through the market.
            </h2>
            <p className="mt-7 max-w-md text-body-l text-fg-ink-muted">
              A rotating snapshot of listed utilities and energy technology companies.
              It is market context, not a tariff or investment recommendation.
            </p>
          </div>

          <div className="relative border-t border-ink-line pt-5" aria-live="polite">
            <div className="flex items-center justify-between gap-4 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
              <span className="flex items-center gap-2 text-voltage">
                <span className={`h-1.5 w-1.5 rounded-full bg-voltage ${loading ? "animate-pulse" : ""}`} />
                {feedError ? "Feed unavailable" : loading ? "Connecting" : "Latest available"}
              </span>
              <span>USD · {activeQuote.exchange}</span>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <div className="font-label text-[0.75rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                  {activeQuote.symbol} · {activeQuote.category}
                </div>
                <h3 className="mt-3 text-display-s">{activeQuote.name}</h3>
                <div className="mt-8 font-mono text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-[-0.06em] text-voltage">
                  {formattedPrice}
                </div>
              </div>
              <div className={`font-mono text-sm sm:pb-2 ${activeQuote.change >= 0 ? "text-voltage" : "text-fg-ink-muted"}`}>
                {formattedChange}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-ink-line pt-5">
              <div className="flex gap-2" role="tablist" aria-label="Energy market instruments">
                {quotes.map((quote, index) => (
                  <button
                    key={quote.symbol}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Show ${quote.name}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-voltage" : "w-2 bg-ink-line hover:bg-fg-ink-muted"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => move(-1)} className="grid h-9 w-9 place-items-center rounded-full border border-ink-line text-fg-ink-muted transition-colors hover:border-voltage hover:text-voltage" aria-label="Previous market instrument">
                  ←
                </button>
                <button type="button" onClick={() => move(1)} className="grid h-9 w-9 place-items-center rounded-full border border-ink-line text-fg-ink-muted transition-colors hover:border-voltage hover:text-voltage" aria-label="Next market instrument">
                  →
                </button>
                <button type="button" onClick={() => setPaused((value) => !value)} className="ml-2 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted transition-colors hover:text-voltage" aria-pressed={paused}>
                  {paused ? "Play" : "Pause"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-3 border-t border-ink-line pt-5 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted sm:grid-cols-5">
          {quotes.map((quote, index) => (
            <button
              type="button"
              key={quote.symbol}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center justify-between gap-3 border-b border-ink-line pb-3 text-left transition-colors hover:text-fg-ink ${index === activeIndex ? "text-fg-ink" : ""}`}
            >
              <span>{quote.symbol}</span>
              <span>{quote.timestamp > 0 ? quote.price.toFixed(2) : "—"}</span>
            </button>
          ))}
        </div>

        <p className="mt-5 font-label text-[0.625rem] uppercase tracking-[0.075em] text-fg-ink-muted">
          Data refreshes every five minutes · Quotes supplied by Yahoo Finance · Delayed market data
        </p>
      </div>
    </section>
  );
}
