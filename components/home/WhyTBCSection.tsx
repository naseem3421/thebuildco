import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import {
  Users2,
  Eye,
  HardHat,
  Milestone,
  MessageSquareCheck,
  ShieldCheck,
} from "lucide-react";

export function WhyTBCSection() {
  const differentiators = [
    {
      icon: Users2,
      title: "One Accountable Construction Partner",
      desc: "One team from planning to handover.",
    },
    {
      icon: Eye,
      title: "Cost Visibility",
      desc: "Clear specifications and commercial terms.",
    },
    {
      icon: HardHat,
      title: "Professional Supervision",
      desc: "Dedicated engineering/site supervision.",
    },
    {
      icon: Milestone,
      title: "Stage-Wise Payments",
      desc: "Payments linked to verified milestones.",
    },
    {
      icon: MessageSquareCheck,
      title: "Regular Communication",
      desc: "Structured progress updates and direct communication.",
    },
    {
      icon: ShieldCheck,
      title: "Snag-Free Handover",
      desc: "Rigorous civil QA inspection and certified pre-handover snag clearance.",
    },
  ];

  return (
    <section id="why-the-build-company" className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="CORE DIFFERENTIATORS"
          title="Why Homeowners Choose The Build Company"
          subtitle="Built around trust, single-source accountability, and rigorous execution standards for your residential investment."
          align="center"
        />

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
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
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
