import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { LandPlot, Home, Users2, ArrowRight } from "lucide-react";

export function QualificationSection() {
  const points = [
    {
      icon: LandPlot,
      title: "You Already Own the Land",
      desc: "TBC constructs on client-owned residential plots.",
    },
    {
      icon: Home,
      title: "You're Building a Complete Home",
      desc: "Focused on substantial individual houses, villas and duplex homes rather than small repair jobs.",
    },
    {
      icon: Users2,
      title: "You Want One Accountable Team",
      desc: "Design, engineering, procurement, construction, quality control and handover coordinated through one construction partner.",
    },
  ];

  return (
    <section id="qualification" className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-3">
            PROJECT FIT & CRITERIA
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-neutral-900 leading-tight">
            Built for Chennai Landowners
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center mb-5 text-[#EA580C]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                    {pt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#EA580C]">
                  <span>Criterion 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors group"
          >
            <span>See If TBC Is Right For Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
