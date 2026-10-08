import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { HardHat, Layers, ClipboardList, ShieldCheck, ArrowRight } from "lucide-react";

export function QualityControlSection() {
  const qcCards = [
    {
      icon: HardHat,
      title: "Structural Engineering & Soil Analysis",
      desc: "Plot borehole testing and certified structural drawings designed for seismic and coastal load factors.",
    },
    {
      icon: Layers,
      title: "Material Verification",
      desc: "Certified Fe 550D TMT steel with test mill certs and fresh Grade-53 cement from primary manufacturers.",
    },
    {
      icon: ClipboardList,
      title: "Critical-Stage Inspections",
      desc: "Pre-pour shuttering checks, rebar cover block verification, and concrete slump cube strength tests.",
    },
    {
      icon: ShieldCheck,
      title: "Final Quality Audit",
      desc: "72-hour waterproofing ponding, MEP pressure tests, laser alignment, and 5-year structural warranty.",
    },
  ];

  return (
    <section id="quality" className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="ENGINEERING RIGOR"
          title="Engineering-Led Construction."
          subtitle="Measurable civil engineering checks executed on-site by dedicated engineers rather than vague promises."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {qcCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center mb-5 text-[#EA580C]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/quality-standards"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-900 font-semibold text-xs sm:text-sm hover:border-[#EA580C] hover:text-[#EA580C] shadow-xs transition-all group"
          >
            <span>Explore Our Full Construction Quality Standards</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
