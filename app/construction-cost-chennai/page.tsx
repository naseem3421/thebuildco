import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import {
  Calculator,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  Scale,
  DollarSign,
  AlertCircle,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "House Construction Cost in Chennai (2026 Guide) | Per Sqft Rates & Cost Breakdown",
  description:
    "Comprehensive guide to residential house construction costs in Chennai. Starting from ₹2,199/sqft to ₹2,599/sqft. Detailed cost breakdowns for 2,000, 2,500, 3,000 & 3,500 sqft homes on client-owned land.",
  keywords: [
    "house construction cost in chennai",
    "construction cost per sqft chennai",
    "turnkey construction cost chennai",
    "cost to build 2000 sqft house in chennai",
    "cost to build 3000 sqft house in chennai",
    "chennai home building cost",
    "construction rates chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/construction-cost-chennai",
  },
  openGraph: {
    title: "House Construction Cost in Chennai | TBC Guide & Calculator",
    description:
      "Transparent sqft pricing for residential construction in Chennai. Discover exact cost drivers, package comparisons, and floor-wise investment breakdowns.",
    url: "https://thebuildcompany.in/construction-cost-chennai",
    type: "article",
  },
};

export default function ConstructionCostChennaiPage() {
  const costExamples = [
    {
      size: "2,000 sqft",
      type: "Compact 3BHK G+1 House",
      standardCost: "₹43.9 Lakhs",
      premiumCost: "₹51.9 Lakhs",
      popular: false,
      summary: "Ideal for 30x40 ft or 30x50 ft plots in residential suburbs like Medavakkam or Tambaram.",
    },
    {
      size: "2,500 sqft",
      type: "Spacious 4BHK G+1 Residence",
      standardCost: "₹54.9 Lakhs",
      premiumCost: "₹64.9 Lakhs",
      popular: true,
      summary: "Most requested format in Chennai offering family living, private balconies, and dedicated car parking.",
    },
    {
      size: "3,000 sqft",
      type: "Executive 4BHK Duplex / Villa",
      standardCost: "₹65.9 Lakhs",
      premiumCost: "₹77.9 Lakhs",
      popular: false,
      summary: "Accommodates double-height living areas, home office suite, and expansive terrace gardens.",
    },
    {
      size: "3,500 sqft",
      type: "Luxury 5BHK Contemporary Villa",
      standardCost: "₹76.9 Lakhs",
      premiumCost: "₹90.9 Lakhs",
      popular: false,
      summary: "Designed for premium corridors like OMR, ECR, or Anna Nagar with bespoke joinery and acoustic glazing.",
    },
  ];

  const costDrivers = [
    {
      title: "Built-up Area & Floor Height",
      desc: "Larger built-up areas benefit from economies of scale on fixed mobilization, while higher floor-to-ceiling heights (11–12 ft) require additional shuttering, brickwork, and plastering.",
    },
    {
      title: "Foundation & Soil Strata",
      desc: "Chennai soils vary drastically: clay soils in Medavakkam/Velachery require under-reamed pile or deep raft foundations, while sandy coastal plots along ECR demand saline-resistant concrete covers.",
    },
    {
      title: "Number of Floors & Structural Loading",
      desc: "Constructing multi-story residences (G+2 or Stilt+3) requires heavier RCC column cross-sections, higher steel reinforcement densities (Fe 550D), and pumped ready-mix concrete.",
    },
    {
      title: "Material & Finish Specifications",
      desc: "Flooring options (standard vitrified tiles vs imported Italian marble), sanitaryware (Kohler vs Grohe), and joinery (first-quality teak vs engineered flush doors) represent a 30–45% swing in final costs.",
    },
    {
      title: "Architectural Complexity & Cantilevers",
      desc: "Double-height living rooms, floating cantilevered porticos, large floor-to-ceiling glass fenestrations, and curved facade elements demand customized formwork and engineering.",
    },
    {
      title: "Plot Accessibility & Logistical Constraints",
      desc: "Plots along narrow lanes (under 20 feet) require smaller transit trucks and manual material staging, modestly influencing transit handling logistics.",
    },
  ];

  const costFaqs = [
    {
      q: "What is the average cost per sqft for residential construction in Chennai?",
      a: "In Chennai, turnkey residential construction starts from ₹2,199/sqft for standard architectural finishes and ₹2,599/sqft for luxury specifications. These rates include civil construction, electrical, plumbing, painting, premium flooring, and turnkey handover on client-owned land.",
    },
    {
      q: "Does TBC's price per square foot include government approvals?",
      a: "TBC's in-house architectural team prepares the architectural floor plans, structural stability certificates, and liaison documentation required for CMDA or Greater Chennai Corporation (GCC) building permit approvals. Statutory municipal fees are paid directly based on government receipts.",
    },
    {
      q: "Are there unexpected cost overruns or price escalations?",
      a: "No. TBC provides a comprehensive Bill of Quantities (BOQ) with locked-in sqft rates. Once the contract is signed, raw material fluctuations in steel or cement are absorbed by TBC unless you request an architectural scope change.",
    },
    {
      q: "How does the payment schedule work across construction milestones?",
      a: "Payments are linked to 8 verified physical milestones (Foundation, Plinth Beam, Ground Slab, First Floor Slab, Brickwork, Plastering, Finishing, Handover). Homeowners release payments only after stage completion and civil engineering sign-off.",
    },
  ];

  return (
    <div className="flex flex-col bg-[#FAF8F5]">
      {/* Structured Schema */}
      <FAQJsonLd faqs={costFaqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <ServiceJsonLd
        name="House Construction Cost in Chennai"
        serviceType="Turnkey Residential Construction Cost Estimator"
        description="Comprehensive analysis of house construction cost per square foot in Chennai with transparent package pricing and milestone schedules."
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-5">
              COMPREHENSIVE 2026 PRICING GUIDE
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.12]">
              House Construction Cost in Chennai
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Planning to construct an individual home, duplex, or luxury villa on your land in Chennai? Understand realistic per-square-foot benchmarks, package comparisons, soil impact, and milestone-linked budgets.
            </p>

            {/* Quick Metrics Strip */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Starting Rate (Standard)
                </span>
                <span className="font-display text-2xl font-bold text-[#EA580C] mt-1 block">
                  ₹2,199 / sqft
                </span>
                <span className="text-[11px] text-neutral-500">Turnkey Standard Package</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Luxury Specification (Premium)
                </span>
                <span className="font-display text-2xl font-bold text-neutral-900 mt-1 block">
                  ₹2,599 / sqft
                </span>
                <span className="text-[11px] text-neutral-500">Turnkey Premium Package</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/calculator-pro-3"
                className="px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Open Interactive Calculator PRO</span>
              </Link>
              <a
                href="#cost-examples"
                className="px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-50 transition-colors"
              >
                View Square Footage Examples
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 02: Square Footage Examples (2000, 2500, 3000, 3500) */}
      <section id="cost-examples" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="BENCHMARK EXAMPLES"
            title="Typical House Construction Cost by Built-Up Area in Chennai"
            subtitle="Indicative budgets calculated for standard residential plots across Chennai's premier residential corridors."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {costExamples.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all bg-white border ${
                  item.popular
                    ? "border-[#EA580C] shadow-luxury-md ring-2 ring-[#EA580C]/20"
                    : "border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40"
                }`}
              >
                <div>
                  {item.popular && (
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] mb-3">
                      Most Popular in Chennai
                    </span>
                  )}

                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-display text-3xl font-bold text-neutral-900">
                      {item.size}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-700 mb-4">
                    {item.type}
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Standard (₹2,199):</span>
                      <span className="font-bold text-[#EA580C]">{item.standardCost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Premium (₹2,599):</span>
                      <span className="font-bold text-neutral-800">{item.premiumCost}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <Link
                    href={`/calculator-pro-3?area=${item.size.replace(/[^0-9]/g, "")}`}
                    className="w-full py-2.5 rounded-xl bg-neutral-50 hover:bg-[#FFF7ED] border border-neutral-200 hover:border-[#FFEDD5] text-[#EA580C] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Customize This Size</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 03: Factors Affecting Cost & Foundation Impact */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="COST DRIVERS & SOIL ENGINEERING"
            title="Key Factors That Determine Your Exact House Construction Cost"
            subtitle="Understanding why flat-rate contractor ballparks fail to protect homeowners from surprise escalations."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costDrivers.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mb-4 text-[#EA580C] font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chennai Specific Ground Conditions Box */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#0B1E1A] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] block mb-2">
                  CHENNAI LOCALITY CONSIDERATIONS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-white">
                  How Soil & Location Strata Influence Foundation Investment
                </h3>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                  In coastal Chennai corridors (ECR, Thiruvanmiyur, Kottivakkam), sandy soils and saline moisture require corrosion-resistant TMT bars and deeper concrete cover. In low-lying or clay zones (Velachery, Pallikaranai, Medavakkam), pile foundations or elevated plinth beams are essential to safeguard structural integrity against seasonal monsoons.
                </p>
              </div>
              <div className="lg:col-span-4 text-center lg:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm"
                >
                  <span>Request Free Plot Soil Survey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 04: Package Comparison Matrix */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="SPECIFICATION TRANSPARENCY"
            title="Compare TBC Construction Packages"
            subtitle="Transparent specifications, verified primary brands, and zero hidden brand ambiguity."
            align="center"
          />

          <div className="mt-12 overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-neutral-200 text-neutral-900">
                  <th className="p-4 sm:p-5 font-bold">Category</th>
                  <th className="p-4 sm:p-5 font-bold text-[#EA580C] bg-[#FFF7ED]/50">
                    Standard (₹2,199/sqft) ★
                  </th>
                  <th className="p-4 sm:p-5 font-bold">Premium (₹2,599/sqft)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-600">
                {siteConfig.packageComparisonMatrix.slice(0, 8).map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/60">
                    <td className="p-4 sm:p-5 font-semibold text-neutral-900 whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-800 bg-[#FFF7ED]/20 font-medium">
                      {row.standard}
                    </td>
                    <td className="p-4 sm:p-5">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C] hover:underline"
            >
              <span>View Full 12-Category Technical Specification Matrix →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Section 05: Cost FAQs */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Chennai Construction Cost FAQs"
            subtitle="Straightforward answers to the most common pricing questions landowners have."
            align="center"
          />

          <div className="mt-12 max-w-4xl mx-auto space-y-4">
            {costFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0 mt-0.5 text-[#EA580C]">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#EA580C] transition-colors"
            >
              <span>Explore All 18+ Construction FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Section 06: Lead Capture Consultation */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5]">
        <Container size="narrow">
          <div className="rounded-3xl bg-white border border-neutral-200 p-8 sm:p-12 shadow-luxury-md text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C] block mb-2">
              ZERO-OBLIGATION ESTIMATE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-neutral-900">
              Get an Itemized BOQ For Your Chennai Plot
            </h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-md mx-auto mb-8">
              Share your plot dimensions and location. Our civil engineers will prepare a transparent, locked-in estimate tailored to your exact floor plan.
            </p>

            <LeadForm
              source="construction_cost_chennai_page"
              buttonLabel="Request Itemized Construction Estimate"
              variant="default"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
