import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { LandPlot, Banknote, Users2, Eye, ArrowRight } from "lucide-react";

export function QualificationSection() {
  const cards = [
    {
      icon: LandPlot,
      title: "You Already Own the Land",
      desc: "TBC builds on client-owned land and does not operate as a land-selling or property-brokerage business.",
      tag: "Plot Owners Only",
    },
    {
      icon: Banknote,
      title: "Substantial Project Scope",
      desc: "Our primary residential focus is complete home construction projects rather than minor repair or renovation work.",
      tag: "Full Home Scale",
    },
    {
      icon: Users2,
      title: "You Want One Accountable Team",
      desc: "Design, structural engineering, construction, site supervision, and handover are coordinated through one construction partner.",
      tag: "Single Accountability",
    },
    {
      icon: Eye,
      title: "You Want Visibility Over Your Investment",
      desc: "Costs, material specifications, milestones, and execution stages should be clearly understood before construction progresses.",
      tag: "Full Transparency",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="PROJECT QUALIFICATION"
          title="Is TBC the Right Construction Partner for Your Project?"
          subtitle="We specialize in custom residential homes for landowners who value accountability, professional execution, and cost discipline."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 leading-snug mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#EA580C]">
                  <span>Criterion 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#process"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-luxury-sm"
          >
            <span>See How Our Process Works</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C]" />
          </a>
        </div>
      </Container>
    </section>
  );
}
