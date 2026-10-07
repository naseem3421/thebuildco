import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import {
  Users2,
  Eye,
  HardHat,
  Milestone,
  MessageSquareCheck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function WhyTBCSection() {
  const differentiators = [
    {
      icon: Users2,
      title: "One Accountable Construction Partner",
      desc: "From initial soil testing and planning approvals to structural framing, MEP, and final handover — you interact with a single accountable engineering team.",
    },
    {
      icon: Eye,
      title: "Cost Visibility",
      desc: "Understand every material brand, thickness specification, and commercial term in writing before site mobilization. No hidden ambiguities.",
    },
    {
      icon: HardHat,
      title: "Professional Supervision",
      desc: "Dedicated full-time on-site civil engineers managing daily trades, shuttering alignment, rebar cover, and pour schedules.",
    },
    {
      icon: Milestone,
      title: "Stage-Wise Payments",
      desc: "Payments are directly linked to verified on-site milestone completion rather than arbitrary calendar dates or upfront contractor demands.",
    },
    {
      icon: MessageSquareCheck,
      title: "Regular Communication",
      desc: "Structured weekly photo and video progress reports, direct WhatsApp communication with project leads, and transparent milestone briefings.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty Support",
      desc: "Written post-handover structural warranty support with dedicated maintenance guidance to ensure lasting peace of mind.",
    },
  ];

  return (
    <section id="why-tbc" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="CORE DIFFERENTIATORS"
          title="Why Homeowners Choose TBC"
          subtitle="Built around trust, accountability, quality, and rigorous financial discipline for your ₹1–3 Crore investment."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
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
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#EA580C]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Substantiated TBC Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
