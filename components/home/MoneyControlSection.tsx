import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FileText, CheckCircle2, ShieldCheck, Scale, Milestone, Banknote } from "lucide-react";

export function MoneyControlSection() {
  const pillars = [
    {
      icon: FileText,
      title: "Defined Specifications Before Start",
      desc: "Every brand, grade, thickness, and fitting is itemized in your agreement before site mobilization. No ambiguous grey areas.",
    },
    {
      icon: Scale,
      title: "Clear Commercial Terms",
      desc: "Transparent scope boundaries and agreed commercial terms ensure you know exactly how each rupee is allocated throughout construction.",
    },
    {
      icon: Milestone,
      title: "Milestone-Linked Tranches",
      desc: "You never fund the entire construction upfront. Payments are disbursed stage-wise only upon verified completion of defined structural milestones.",
    },
    {
      icon: ShieldCheck,
      title: "Engineering Quality Sign-Off",
      desc: "Each stage undergoes shuttering, reinforcement, or MEP inspection before the subsequent stage payment is invoiced.",
    },
  ];

  const milestones = [
    { num: "01", name: "Booking & Soil Test", pct: "Initial Mobilization" },
    { num: "02", name: "Architectural & 3D Approval", pct: "Design Completion" },
    { num: "03", name: "Foundation & Plinth Beam", pct: "Sub-structure Signoff" },
    { num: "04", name: "Ground Floor Roof Slab", pct: "Framing Milestone" },
    { num: "05", name: "First Floor Roof Slab", pct: "Super-structure Signoff" },
    { num: "06", name: "Brickwork & Plastering", pct: "Masonry Clearance" },
    { num: "07", name: "Flooring, MEP & Paint", pct: "Finishing Phase" },
    { num: "08", name: "Final QC & Key Handover", pct: "Final Completion" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="INVESTMENT TRANSPARENCY"
          title="Know Where Your Construction Investment Is Going."
          subtitle="Clear specifications and agreed commercial terms before execution — with payments aligned to verified milestones."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#EA580C]" />
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

        {/* Milestone-linked Payment Visual Strip */}
        <div className="mt-14 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C] block mb-2">
              STAGE-WISE PAYMENT DISCIPLINE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-neutral-900">
              You Don't Have to Fund the Entire Construction Upfront.
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Payments are linked to agreed construction milestones rather than arbitrary calendar dates or upfront contractor demands.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 text-center flex flex-col justify-between"
              >
                <span className="text-[11px] font-mono font-bold text-[#EA580C]">
                  STAGE {m.num}
                </span>
                <div className="my-2 font-bold text-xs text-neutral-900 leading-tight">
                  {m.name}
                </div>
                <span className="text-[10px] text-neutral-500 font-medium">
                  {m.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
