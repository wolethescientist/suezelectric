import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Grain } from "@/components/texture";
import { COMPANY, SITE_URL, SOCIAL_PROFILES, TOKEN_DELIVERY_LONG } from "@/lib/site";

// Display (Zodiak) and body (Switzer) load from Fontshare in globals.css.
// Mono is self-hosted through next/font. It appears only on real data — token
// digits, meter serials, tabular figures — never on labels or buttons.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const TITLE = "SuezElectric — Prepaid electricity, delivered in seconds";
const DESCRIPTION =
  "Buy prepaid electricity tokens in under a minute. SuezElectric Limited is an Abuja-based utility company vending across Nigerian distribution companies, with a wallet, an agent network and 24-hour support.";

export const metadata: Metadata = {
  title: { default: TITLE, template: "%s — SuezElectric" },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: "SuezElectric",
  alternates: { canonical: "/" },
  keywords: [
    "buy electricity Nigeria",
    "prepaid meter token",
    "electricity vending",
    "AEDC IKEDC EKEDC token",
    "recharge prepaid meter",
    "electricity agent Nigeria",
  ],
  authors: [{ name: COMPANY.legalName, url: SITE_URL }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  category: "utilities",
  // og:image / twitter:image come from app/opengraph-image.jpg and
  // app/twitter-image.jpg, which Next resolves and sizes automatically.
  openGraph: {
    title: TITLE,
    description:
      "Prepaid electricity tokens in under a minute, across Nigerian DISCOs. Part of the Suez energy group.",
    type: "website",
    locale: "en_NG",
    siteName: "SuezElectric",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Prepaid electricity tokens in under a minute, across Nigerian DISCOs.",
    site: "@suezelectric",
    creator: "@suezelectric",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090a",
};

/**
 * Organization + LocalBusiness so a search result carries the name, logo, Abuja
 * address and the support line rather than a bare blue link. Every value is pulled
 * from lib/site.ts, which is the same source the visible footer reads.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/wordmark-ink.svg`,
      image: `${SITE_URL}/opengraph-image.jpg`,
      description: DESCRIPTION,
      foundingDate: COMPANY.foundingYear,
      identifier: `RC ${COMPANY.rc}`,
      parentOrganization: { "@type": "Organization", name: COMPANY.parent },
      email: COMPANY.email,
      telephone: COMPANY.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.street,
        addressLocality: COMPANY.locality,
        addressRegion: COMPANY.region,
        postalCode: COMPANY.postalCode,
        addressCountry: COMPANY.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: COMPANY.latitude,
        longitude: COMPANY.longitude,
      },
      areaServed: { "@type": "Country", name: "Nigeria" },
      sameAs: SOCIAL_PROFILES,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: COMPANY.phone,
          email: COMPANY.email,
          availableLanguage: ["en"],
          areaServed: "NG",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SuezElectric",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
    },
    {
      "@type": "Service",
      name: "Prepaid electricity vending",
      serviceType: "Electricity token vending",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Nigeria" },
      description: `Prepaid electricity tokens across eleven Nigerian distribution companies, delivered in a median of ${TOKEN_DELIVERY_LONG} by app, SMS and email.`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={mono.variable}>
      <head>
        {/* The display and body faces come from Fontshare via an @import in the
            stylesheet, which cannot start until the CSS itself has landed. Warming
            the connections here removes a round trip from the headline's paint. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="preload" as="image" type="image/svg+xml" href="/wordmark-ink.svg" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- static, build-time object
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* The entrance system hides content until an observer fires. Without JS
            that never happens, so neutralise it rather than serve a blank page. */}
        <noscript>
          <style>{`.reveal-hidden > *, .reveal-hidden .reveal > * { opacity: 1 !important; transform: none !important; } .wipe > span { transform: none !important; }`}</style>
        </noscript>
      </head>
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
