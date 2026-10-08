import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FileText, Scale, Milestone, ShieldCheck, ArrowRight } from "lucide-react";

export function MoneyControlSection() {
  const cards = [
    {
      icon: FileText,
      title: "Defined Specifications",
      desc: "Brands, grades, quantities and specifications agreed before execution.",
    },
    {
      icon: Scale,
      title: "Clear Commercial Terms",
      desc: "Scope and commercial terms clearly defined.",
    },
    {
      icon: Milestone,
      title: "Milestone-Linked Payments",
      desc: "Payments linked to verified construction progress.",
    },
    {
      icon: ShieldCheck,
      title: "Engineering Sign-Off",
      desc: "Critical construction stages checked before progression.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="INVESTMENT TRANSPARENCY"
          title="Know Where Your Construction Investment Is Going."
          subtitle="Clear specifications and agreed commercial terms before execution — with payments aligned to verified milestones."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mb-5 text-[#EA580C]">
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

        <div className="mt-8 text-center">
          <Link
            href="/process#stages"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#EA580C] hover:underline"
          >
            <span>See how stage-wise payments align with our 8 construction milestones →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
