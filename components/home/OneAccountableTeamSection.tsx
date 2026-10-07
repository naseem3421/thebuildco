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
      desc: "Custom architectural planning, 2D floor plans, 3D photorealistic elevations, Vastu compliance, and detailed interior spatial zoning tailored to your lifestyle.",
    },
    {
      step: "02",
      icon: FileSpreadsheet,
      title: "Engineering",
      desc: "Chartered structural calculations, soil load-bearing capacity assessment, foundation engineering, and CMDA/GCC approval coordination.",
    },
    {
      step: "03",
      icon: Truck,
      title: "Procurement",
      desc: "Strictly branded materials directly sourced from manufacturers — UltraTech/Coromandel cement, Tata Tiscon/Kamachi Fe 550D rebar, and premium fittings.",
    },
    {
      step: "04",
      icon: HardHat,
      title: "Construction",
      desc: "Full-time dedicated site engineers, experienced masonry crews, structural framing, concealed MEP electrical and plumbing, and thermal insulation.",
    },
    {
      step: "05",
      icon: ClipboardCheck,
      title: "Quality Control",
      desc: "Multistage technical audit — pre-pour shuttering checks, concrete cube compressive tests, plumbing leak pressure tests, and finish alignment.",
    },
    {
      step: "06",
      icon: KeyRound,
      title: "Handover",
      desc: "Deep chemical cleaning, snag-list zeroing, digital as-built MEP drawings, test certificates, and formal 5-year structural warranty handover.",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <span id="one-team" className="sr-only" aria-hidden="true" />
      <Container size="wide">
        <SectionHeading
          eyebrow="END-TO-END ACCOUNTABILITY"
          title="One Team Responsible From First Drawing to Final Key."
          subtitle="Every critical phase of your home construction investment is owned, executed, and supervised by TBC without intermediary finger-pointing."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-neutral-200/90 shadow-xs hover:shadow-luxury-md hover:border-[#EA580C]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#EA580C]" />
                    </div>
                    <span className="text-sm font-extrabold font-mono text-neutral-400">
                      STAGE {stg.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {stg.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {stg.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  <span>Managed entirely by TBC in-house engineers</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-900 font-bold text-sm hover:border-[#EA580C] hover:text-[#EA580C] shadow-xs transition-all group"
          >
            <span>Explore Our Full 8-Stage Methodology & Milestones</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
