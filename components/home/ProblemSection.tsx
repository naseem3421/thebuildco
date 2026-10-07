import React from "react";
import { Container } from "../ui/Container";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export function ProblemSection() {
  const painPoints = [
    "Chasing independent contractors, sub-contractors, and masons for daily updates",
    "Coordinating blame games between the freelance architect and local structural engineers",
    "Managing tedious material purchases, deliveries, cement storage, and theft risks",
    "Negotiating every slight drawing change with sudden contractor surprise bills",
    "Unclear bill of quantities (BOQ) with hidden charges that inflate the final budget",
    "Unexpected additional costs surfacing halfway through the roof slab casting",
    "Poor, sporadic communication and excuses over labour shortages or monsoons",
    "Extended construction delays stretching a 10-month plan into 24 exhausting months",
    "Quality uncertainty — wondering if steel rebar and cement grades meet specs",
    "Having to physically visit the dusty site constantly while juggling family and career",
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="wide">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 uppercase tracking-wider mb-4">
            THE UNSTRUCTURED CONTRACTOR REALITY
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-[1.15]">
            Building a Premium Home Shouldn't Feel Like Managing 20 Contractors.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
            When investing in your custom family home in Chennai, the construction journey should feel organized, professional, and transparent. Yet the conventional approach leaves landowners overwhelmed with friction:
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {painPoints.map((pain, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70"
              >
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-600 font-bold text-xs">✕</span>
                </div>
                <p className="text-sm text-neutral-700 leading-snug font-medium">
                  {pain}
                </p>
              </div>
            ))}
          </div>

          {/* Transition Box */}
          <div className="mt-10 p-7 sm:p-8 rounded-3xl bg-[#0B1E1A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] block mb-1">
                THE TBC RESOLUTION
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-white">
                With TBC, your project is managed through a structured turnkey construction process.
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                One point of contact, fixed specifications, milestone billing, and daily engineering oversight.
              </p>
            </div>
            <a
              href="#one-team"
              className="shrink-0 px-6 py-3 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <span>Explore The 6 Stages</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
