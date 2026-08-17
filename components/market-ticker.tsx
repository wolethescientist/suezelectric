"use client";

import { useEffect, useState } from "react";
import {
  MARKET_INSTRUMENTS,
  type EnergyMarketQuote,
} from "@/lib/energy-market";

type MarketResponse = {
  quotes?: EnergyMarketQuote[];
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

export function MarketTicker() {
  const [quotes, setQuotes] = useState<EnergyMarketQuote[]>(EMPTY_QUOTES);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMarket() {
      try {
        const response = await fetch("/api/energy-market", { cache: "no-store" });
        if (!response.ok) throw new Error("Market feed unavailable");
        const payload = (await response.json()) as MarketResponse;
        if (!cancelled && payload.quotes?.length) {
          setQuotes(payload.quotes);
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

  const items = [...quotes, ...quotes];

  return (
    <aside
      aria-label="Live energy market prices"
      className="sticky top-[4.75rem] z-40 border-y border-ink-line bg-ink-2/95 backdrop-blur-xl sm:top-[5.5rem]"
    >
      <div className="flex min-h-10 w-full items-center overflow-hidden sm:min-h-11">
        <div className="measure flex min-w-0 max-w-none items-center px-3 sm:px-5 lg:px-7">
          <div className="flex shrink-0 items-center gap-2 border-r border-ink-line pr-4 font-label text-[0.625rem] font-semibold uppercase tracking-[0.13em] text-fg-ink-muted sm:pr-6 sm:text-[0.6875rem]">
            <span className={`h-1.5 w-1.5 rounded-full bg-voltage ${loading ? "animate-pulse" : ""}`} />
            <span className="hidden sm:inline">Live markets</span>
            <span className="sm:hidden">Markets</span>
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="market-ticker-track flex min-w-max items-center">
              {items.map((quote, index) => (
                <TickerItem
                  key={`${quote.symbol}-${index}`}
                  quote={quote}
                  feedError={feedError}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TickerItem({
  quote,
  feedError,
}: {
  quote: EnergyMarketQuote;
  feedError: boolean;
}) {
  const hasValue = quote.timestamp > 0;
  const price = hasValue ? quote.price.toFixed(2) : "—";
  const change = hasValue
    ? `${quote.changePercent >= 0 ? "▲" : "▼"} ${Math.abs(quote.changePercent).toFixed(2)}%`
    : feedError
      ? "offline"
      : "loading";

  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-ink-line px-4 font-label text-[0.625rem] uppercase tracking-[0.09em] text-fg-ink-muted sm:gap-4 sm:px-6 sm:text-[0.6875rem]">
      <span className="font-semibold tracking-[0.13em] text-fg-ink">{quote.symbol}</span>
      <span className="hidden text-fg-ink-muted md:inline">{quote.category}</span>
      <span className="font-mono text-[0.6875rem] tracking-normal text-fg-ink sm:text-xs">${price}</span>
      <span className={quote.change >= 0 ? "text-voltage" : "text-fg-ink-muted"}>{change}</span>
    </div>
  );
}
