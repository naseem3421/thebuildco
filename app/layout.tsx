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
    default: "The Build Company | Turnkey House Construction Company in Chennai",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Turnkey residential construction company in Chennai for landowners planning bespoke homes, luxury villas, and duplex residences. Architectural design, structural engineering, quality control, and handover through one accountable team.",
  keywords: [
    "turnkey house construction company chennai",
    "house construction company chennai",
    "residential construction company chennai",
    "home construction company chennai",
    "luxury house construction chennai",
    "villa construction chennai",
    "duplex construction chennai",
    "house construction cost chennai",
    "joint venture construction chennai",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: "https://thebuildcompany.in",
  },
  openGraph: {
    title: "The Build Company | Turnkey House Construction Company in Chennai",
    description:
      "Build your Chennai home with one accountable team from design to handover. Turnkey residential construction exclusively on client-owned land in Chennai.",
    url: "https://thebuildcompany.in",
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Build Company | Turnkey House Construction Company in Chennai",
    description:
      "Build your Chennai home with one accountable team from design to handover. Turnkey residential construction exclusively on client-owned land in Chennai.",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
