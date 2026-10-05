import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#183B35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thebuildcompany.in"),
  title: {
    default: "TBC | House Construction Company in Chennai | From ₹1,899/sqft",
    template: `%s | ${siteConfig.shortName} — The Build Company`,
  },
  description:
    "Premier house construction company in Chennai. We construct bespoke independent houses, luxury villas, and duplex homes on customer-owned plots from ₹1,899/sqft with stage-wise payments, 5-year warranty, and free site consultation.",
  keywords: [
    "house construction company Chennai",
    "home construction company Chennai",
    "construction company Chennai",
    "house builders Chennai",
    "villa construction Chennai",
    "individual house construction Chennai",
    "duplex construction Chennai",
    "construction cost per sqft Chennai",
    "house construction cost Chennai",
    "turnkey construction Chennai",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: "https://thebuildcompany.in",
  },
  openGraph: {
    title: "TBC | House Construction Company in Chennai | From ₹1,899/sqft",
    description:
      "Turnkey residential construction on your plot in Chennai. Transparent pricing from ₹1,899/sqft, stage-wise payments, and 5-year warranty.",
    url: "https://thebuildcompany.in",
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TBC | House Construction Company in Chennai",
    description:
      "Turnkey residential construction on your plot in Chennai starting from ₹1,899/sqft with milestone payments.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F0E8] text-[#183B35] font-sans pb-16 lg:pb-0">
        <AnalyticsProvider />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
