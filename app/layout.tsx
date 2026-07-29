import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Grain } from "@/components/texture";

// Display (Zodiak) and body (Switzer) load from Fontshare in globals.css.
// Mono is self-hosted through next/font. It appears only on real data — token
// digits, meter serials, tabular figures — never on labels or buttons.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SuezElectric — Prepaid electricity, delivered in seconds",
    template: "%s — SuezElectric",
  },
  description:
    "Buy prepaid electricity tokens in under a minute. SuezElectric Limited is an Abuja-based utility company vending across Nigerian distribution companies, with a wallet, an agent network and 24-hour support.",
  metadataBase: new URL("https://suezelectric.com"),
  openGraph: {
    title: "SuezElectric — Prepaid electricity, delivered in seconds",
    description:
      "Prepaid electricity tokens in under a minute, across Nigerian DISCOs. Part of the Suez energy group.",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={mono.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-voltage focus:px-4 focus:py-2 focus:font-label focus:text-xs focus:uppercase focus:text-ink"
        >
          Skip to content
        </a>
        <Grain />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
