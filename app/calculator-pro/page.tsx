import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CostCalculatorPro } from "@/components/calculator-pro/CostCalculatorPro";

export const metadata: Metadata = {
  title: "Cost Calculator PRO Chennai (2026) | Free House Construction Cost Estimator",
  description:
    "Free interactive House Construction Cost Calculator for Chennai 2026. Calculate floor-wise construction cost in 30 seconds with 10-phase cost split, material quantities, and 4 package tiers.",
  keywords: [
    "house construction cost calculator chennai",
    "building cost estimator chennai 2026",
    "construction cost per sq ft chennai",
    "chennai house construction calculator pro",
    "floor wise construction cost chennai",
  ],
  openGraph: {
    title: "Cost Calculator PRO Chennai (2026) | The Build Company",
    description:
      "Instant floor-wise construction cost estimation with Chennai 2026 live material & labour benchmarks, 10-phase distribution, and side-by-side package matrix.",
    type: "website",
  },
};

export default function CalculatorProPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cost Calculator PRO Chennai (2026)",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free interactive Chennai residential house construction cost calculator with floor-wise estimation, material quantities, and 10 structural milestones.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-8 sm:py-16 bg-[#F4F0E8] min-h-screen">
        <Container size="wide">
          <CostCalculatorPro />
        </Container>
      </div>
    </>
  );
}
