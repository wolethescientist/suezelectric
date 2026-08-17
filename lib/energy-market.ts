export const MARKET_INSTRUMENTS = [
  { symbol: "NEE", name: "NextEra Energy", category: "Utility" },
  { symbol: "DUK", name: "Duke Energy", category: "Utility" },
  { symbol: "SO", name: "Southern Company", category: "Utility" },
  { symbol: "XEL", name: "Xcel Energy", category: "Utility" },
  { symbol: "ENPH", name: "Enphase Energy", category: "Energy tech" },
] as const;

export type EnergyMarketInstrument = (typeof MARKET_INSTRUMENTS)[number];

export type EnergyMarketQuote = EnergyMarketInstrument & {
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  currency: string;
  exchange: string;
  timestamp: number;
};
