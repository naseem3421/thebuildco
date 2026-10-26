import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ProblemSection() {
  const problems = [
    "Multiple contractors and conflicting responsibilities",
    "Unclear costs and unexpected variations",
    "Material and quality uncertainty",
    "Delays and constant site follow-ups",
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-neutral-200">
      <Container size="wide">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
            THE UNSTRUCTURED CONTRACTOR REALITY
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-[1.15]">
            Building a Premium Home Shouldn't Feel Like Managing 20 Contractors.
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {problems.map((problem, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-red-600 font-bold text-xs">✕</span>
                </div>
                <p className="text-sm text-neutral-800 font-medium">
                  {problem}
                </p>
              </div>
            ))}
          </div>

          {/* The Build Company Solution Box */}
          <div className="mt-6 p-6 sm:p-7 rounded-3xl bg-[#0B1E1A] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-luxury-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] block mb-1.5">
                THE BUILD COMPANY RESOLUTION
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-white">
                One Team. One Point of Accountability.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
                The Build Company manages the construction lifecycle through a structured turnkey process — coordinating design, engineering, procurement, site execution, and quality sign-off under a single accountable contract.
              </p>
            </div>

            <Link
              href="/process"
              className="shrink-0 px-6 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-xs sm:text-sm hover:bg-[#C2410C] transition-colors shadow-xs inline-flex items-center gap-2 group"
            >
              <span>See How The Build Company Works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
