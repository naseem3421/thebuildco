import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CostCalculatorPro3 } from "@/components/calculator-pro/CostCalculatorPro3";

export const metadata: Metadata = {
  title: "Calculator Pro 3 Chennai (2026) | AI House Construction Cost Estimator",
  description:
    "AI-Powered House Construction Cost Calculator Pro 3 for Chennai 2026. Live geotechnical soil analysis, 3D architectural elevation styles, 100% Vastu floor plan schematics, and itemized BOQ estimation.",
  keywords: [
    "calculator pro 3 chennai",
    "ai house construction cost calculator chennai",
    "vastu floor plan generator chennai",
    "chennai soil geotechnical foundation calculator",
    "3d elevation cost estimator chennai 2026",
  ],
  openGraph: {
    title: "Calculator Pro 3 Chennai (2026) | The Build Company",
    description:
      "AI-driven floor-wise house construction cost studio with geotechnical soil insights, 3D elevation styles, and 100% Vastu layout schematics.",
    type: "website",
  },
};

export default function CalculatorPro3Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculator Pro 3 Chennai (2026)",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "AI-powered Chennai residential house construction cost calculator with geotechnical soil strata analysis, 3D elevation styles, Vastu floor plans, and 10-phase BOQ breakdowns.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-8 sm:py-16 bg-[#F4F0E8] min-h-screen">
        <Container size="wide">
          <CostCalculatorPro3 />
        </Container>
      </div>
    </>
  );
}
