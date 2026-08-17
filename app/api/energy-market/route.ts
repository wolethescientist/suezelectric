import { NextResponse } from "next/server";
import {
  MARKET_INSTRUMENTS,
  type EnergyMarketQuote,
} from "@/lib/energy-market";

export const revalidate = 300;

type YahooChartResult = {
  meta?: {
    currency?: string;
    exchangeName?: string;
    regularMarketPrice?: number;
    regularMarketPreviousClose?: number;
    previousClose?: number;
    chartPreviousClose?: number;
    regularMarketTime?: number;
  };
  timestamp?: number[];
  indicators?: {
    quote?: Array<{ close?: Array<number | null> }>;
  };
};

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

async function readQuote(
  instrument: (typeof MARKET_INSTRUMENTS)[number],
): Promise<EnergyMarketQuote> {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${instrument.symbol}?range=5d&interval=1d`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate },
    },
  );

  if (!response.ok) {
    throw new Error(`Market feed returned ${response.status}`);
  }

  const payload = (await response.json()) as {
    chart?: { result?: YahooChartResult[] };
  };
  const result = payload.chart?.result?.[0];
  const meta = result?.meta;
  const closes = result?.indicators?.quote?.[0]?.close ?? [];
  const latestClose = [...closes].reverse().find(isNumber);
  const price = isNumber(meta?.regularMarketPrice)
    ? meta.regularMarketPrice
    : latestClose;
  const previousClose =
    (isNumber(meta?.regularMarketPreviousClose)
      ? meta.regularMarketPreviousClose
      : isNumber(meta?.previousClose)
        ? meta.previousClose
        : isNumber(meta?.chartPreviousClose)
          ? meta.chartPreviousClose
          : undefined) ?? [...closes].reverse().find((value, index) => index > 0 && isNumber(value));

  if (!isNumber(price) || !isNumber(previousClose)) {
    throw new Error(`No usable quote returned for ${instrument.symbol}`);
  }

  const change = price - previousClose;

  return {
    ...instrument,
    price,
    previousClose,
    change,
    changePercent: (change / previousClose) * 100,
    currency: meta?.currency ?? "USD",
    exchange: meta?.exchangeName ?? "Market",
    timestamp: meta?.regularMarketTime ?? Math.floor(Date.now() / 1000),
  };
}

export async function GET() {
  const results = await Promise.allSettled(MARKET_INSTRUMENTS.map(readQuote));
  const quotes = results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

  return NextResponse.json(
    {
      quotes,
      updatedAt: new Date().toISOString(),
      source: "Yahoo Finance",
      delayed: true,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
