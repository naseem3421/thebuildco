import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";

export function ConstructionCostSection() {
  const costDrivers = [
    "Total built-up area (sqft) & floor height",
    "Number of floors (G+1, G+2, Stilt+3)",
    "Soil condition & foundation depth (isolated vs pile foundation)",
    "Architectural complexity, double heights & cantilevers",
    "Flooring choice (Vitrified tiles vs Imported Italian Marble)",
    "Doors & window fenestrations (Teakwood vs Slimline UPVC/Aluminium)",
    "Sanitaryware & brassware (Grohe, Kohler, Jaquar)",
    "Electrical infrastructure, home automation & HVAC",
    "Waterproofing systems (terrace, basements, sunken slabs)",
    "Compound wall, gates, landscaping & rainwater harvesting sump",
  ];

  return (
    <section id="cost-guide" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="wide">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="COST TRANSPARENCY & BENCHMARKS"
            title="How Much Does It Cost to Build a House in Chennai?"
            subtitle="Understanding the realistic investment parameters for residential construction on your plot."
          />

          <div className="mt-8 text-base sm:text-lg text-neutral-700 leading-relaxed space-y-4">
            <p>
              In Chennai, residential house construction typically ranges between <strong>₹2,199/sqft for standard architectural packages</strong> to <strong>₹2,599/sqft for premium luxury finishes</strong>. For a standard 2,500 sqft to 3,500 sqft family home, the overall construction budget typically falls into the <strong>₹55 Lakhs to ₹90+ Lakhs range</strong> depending on specifications (excluding land cost).
            </p>
            <p>
              Unlike generic contractor ballparks, the exact construction investment is dictated by specific structural engineering requirements, soil strata, and interior finishes rather than an arbitrary flat rate.
            </p>
          </div>

          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-neutral-200">
            <h3 className="text-base font-bold text-neutral-900 mb-4">
              Key Factors That Determine Your Exact Project Cost:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {costDrivers.map((driver, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>{driver}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#0B1E1A] text-white">
            <div>
              <h4 className="text-lg font-bold text-white">
                Want a realistic estimate based on your exact square footage?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-neutral-300">
                Use our interactive Chennai construction budget estimator below.
              </p>
            </div>
            <a
              href="#calculator"
              className="shrink-0 px-6 py-3 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Calculate My Construction Budget</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
