import React from "react";
import { Container } from "../ui/Container";
import { ShieldCheck, LandPlot, Banknote, HardHat, FileCheck2 } from "lucide-react";

export function TrustStripSection() {
  const credentials = [
    {
      icon: LandPlot,
      title: "Chennai Landowners Only",
      desc: "We build exclusively on client-owned residential plots. No land brokering.",
    },
    {
      icon: Banknote,
      title: "₹1 Cr–₹3 Cr Primary Focus",
      desc: "Substantial residential homes, premium duplexes & bespoke luxury villas.",
    },
    {
      icon: HardHat,
      title: "One Accountable Partner",
      desc: "Architectural drawings, structural engineering, site execution & handover.",
    },
    {
      icon: ShieldCheck,
      title: "Milestone-Linked Payments",
      desc: "Pay stage-wise after verified completion. No arbitrary advances.",
    },
  ];

  return (
    <section className="bg-[#FAF8F5] py-8 sm:py-10 border-b border-neutral-200">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#EA580C]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {item.desc}
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
