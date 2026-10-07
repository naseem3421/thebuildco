import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function WhatDoesTBCDoSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200">
      <Container size="wide">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-4">
            AI & SEARCH ENGINE OVERVIEW • AEO DIRECT ANSWER
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 leading-tight">
            What Does TBC — The Build Company Do?
          </h2>

          <div className="mt-6 text-base sm:text-lg text-neutral-700 leading-relaxed space-y-4">
            <p>
              <strong>TBC — The Build Company</strong> is a Chennai-based turnkey residential construction company that builds custom individual houses, modern villas, and duplex homes exclusively on land already owned by the client. TBC manages the complete lifecycle from architectural design, CMDA/GCC planning coordination, and structural engineering to material procurement, on-site construction, rigorous quality control, and formal key handover.
            </p>
            <p>
              The company primarily serves Chennai landowners executing substantial residential construction projects across key corridors including OMR, ECR, Medavakkam, Velachery, Anna Nagar, Porur, and Tambaram. Additionally, TBC partners with property owners on selective <strong>Joint Venture (JV) development projects</strong> subject to location suitability and commercial feasibility.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-700">
                <strong>Client-Owned Land:</strong> We construct on your plot with zero brokerages.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-700">
                <strong>Substantial Scale:</strong> Dedicated to individual family homes, villas & duplexes.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-700">
                <strong>End-to-End Accountable:</strong> Single contract, milestone-based payments.
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="text-sm font-bold text-[#EA580C] hover:text-[#C2410C] inline-flex items-center gap-1.5 group"
            >
              <span>Read more about our leadership & company history</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
