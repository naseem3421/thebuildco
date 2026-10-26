"use client";

import React from "react";
import { Container } from "../ui/Container";
import {
  Building2,
  Lock,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

export function TrustBarSection() {
  const trustMetrics = [
    {
      icon: Building2,
      metric: "110+ Projects",
      label: "Delivered in Chennai",
      subtext: "25+ Year family construction legacy",
      badge: "Since 1999",
    },
    {
      icon: Lock,
      metric: "Fixed BOQ",
      label: "Price Protection",
      subtext: "Up to 10% material spike absorption",
      badge: "Contract Locked",
    },
    {
      icon: ClipboardCheck,
      metric: "150+ Audits",
      label: "Civil QA Gateways",
      subtext: "Dedicated supervisor for each site",
      badge: "Stage Inspections",
    },
    {
      icon: ShieldCheck,
      metric: "Certified",
      label: "Pre-Handover Snag Audit",
      subtext: "72-hr ponding test & zero-snag sign-off",
      badge: "Rigorous QA/QC",
    },
  ];

  return (
    <div className="bg-[#183B35] text-[#F4F0E8] border-y border-[#264D45] py-5 sm:py-6 relative overflow-hidden shadow-luxury-md">
      {/* Subtle ambient gold glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-24 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center sm:divide-x sm:divide-white/10">
          {trustMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3.5 ${
                  idx > 0 ? "sm:pl-6 lg:pl-8" : ""
                } group`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-[#EA580C] group-hover:border-[#EA580C] transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#86EFAC] group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-sans text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                      {item.metric}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#86EFAC] border border-white/10">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white/95 leading-snug">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-[#8C9C96] leading-tight">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
