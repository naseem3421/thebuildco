import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import {
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Droplets,
  Layers,
  Sparkles,
  ClipboardList,
} from "lucide-react";

export function QualityControlSection() {
  const qcCategories = [
    {
      icon: HardHat,
      title: "Structural Engineering & Soil Analysis",
      desc: "Site-specific soil bearing capacity (SBC) testing dictates foundation depth and column sizing. Certified structural blueprints designed to resist seismic and Chennai coastal load conditions.",
    },
    {
      icon: Layers,
      title: "Material Verification & Batch Audits",
      desc: "Strict adherence to specified primary brands — UltraTech/Coromandel 53-grade cement, Fe 550D high-yield TMT steel with test mill certificates, and river/M-sand sieve analysis.",
    },
    {
      icon: ClipboardList,
      title: "Critical-Stage Inspections",
      desc: "Pre-concreting shuttering alignment, steel cover block verification, rebar spacing checks, and concrete slump cone testing before every roof slab pour.",
    },
    {
      icon: Droplets,
      title: "Pressure & Waterproofing Testing",
      desc: "Pneumatic pressure testing of concealed CPVC/UPVC water lines for 24 hours. Multi-coat elastomeric waterproofing with mandatory 72-hour ponding tests on roof terraces and sunken slabs.",
    },
    {
      icon: Sparkles,
      title: "Electrical, MEP & Finish Audits",
      desc: "Concealed conduit integrity tests, earth resistance checks, tile lippage verification under laser levels, door plumbness, and uniform coat thickness paint audits.",
    },
    {
      icon: ShieldCheck,
      title: "Final Handover & Snag Clearance",
      desc: "Comprehensive room-by-room technical inspection before final possession. All fittings, hardware, pressure pumps, and electrical breakers checked in the presence of the homeowner.",
    },
  ];

  return (
    <section id="quality" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="ENGINEERING RIGOR"
          title="Construction Quality You Can Actually Understand."
          subtitle="Real, verifiable civil engineering audits executed on your site rather than vague marketing promises."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qcCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#EA580C]" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                  <span>On-site civil engineer verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
