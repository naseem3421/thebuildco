import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import {
  Compass,
  FileSpreadsheet,
  Truck,
  HardHat,
  ClipboardCheck,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export function OneAccountableTeamSection() {
  const stages = [
    {
      step: "01",
      icon: Compass,
      title: "Design",
      oneLiner: "Custom 2D floor plans, 3D elevations, and Vastu-compliant layouts.",
    },
    {
      step: "02",
      icon: FileSpreadsheet,
      title: "Engineering",
      oneLiner: "Soil analysis, structural calculations, and municipal approval liaison.",
    },
    {
      step: "03",
      icon: Truck,
      title: "Procurement",
      oneLiner: "Grade-53 cement, Fe 550D steel, and verified branded fittings.",
    },
    {
      step: "04",
      icon: HardHat,
      title: "Construction",
      oneLiner: "RCC framing, masonry, and concealed MEP with dedicated site engineers.",
    },
    {
      step: "05",
      icon: ClipboardCheck,
      title: "Quality Control",
      oneLiner: "Cube compressive tests, waterproofing ponding, and stage milestone sign-offs.",
    },
    {
      step: "06",
      icon: KeyRound,
      title: "Handover",
      oneLiner: "Deep cleaning, snag clearance, and 5-year structural warranty certificate.",
    },
  ];

  return (
    <section id="process" className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="TBC PROCESS SUMMARY"
          title="From First Drawing to Final Key."
          subtitle="Every critical phase of your residential build is coordinated and executed through one accountable team."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#EA580C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      STAGE {stg.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {stg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {stg.oneLiner}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-900 font-semibold text-xs sm:text-sm hover:border-[#EA580C] hover:text-[#EA580C] shadow-xs transition-all group"
          >
            <span>Explore Our Full Construction Methodology</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
