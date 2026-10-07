import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CalendarCheck, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Consultation",
      desc: "Initial discussion to understand your family requirements, plot location, architectural vision, and target budget range.",
    },
    {
      step: "02",
      title: "Site Visit",
      desc: "On-site assessment of plot dimensions, soil strata, approach road access, boundary demarcation, and drainage slopes.",
    },
    {
      step: "03",
      title: "Design & Planning",
      desc: "Bespoke 2D spatial layouts, Vastu compliance, 3D elevation renders, and structural engineering preparation.",
    },
    {
      step: "04",
      title: "Detailed Estimate",
      desc: "Itemized Bill of Quantities (BOQ) with explicit material specifications, brand models, and complete cost breakdown.",
    },
    {
      step: "05",
      title: "Agreement",
      desc: "Formal turnkey construction contract detailing milestone-linked payments, deliverables, timeline, and warranties.",
    },
    {
      step: "06",
      title: "Construction",
      desc: "Full-scale on-site civil execution supervised daily by dedicated site engineers and chartered project managers.",
    },
    {
      step: "07",
      title: "Quality Checks",
      desc: "Rigorous quality audits at every critical slab, masonry, plumbing pressure test, and finishing milestone.",
    },
    {
      step: "08",
      title: "Handover",
      desc: "Formal key handover, deep cleaning, as-built drawings, warranties, and post-possession maintenance orientation.",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="8-STAGE CONSTRUCTION ROADMAP"
          title="From First Drawing to Final Key Handover"
          subtitle="A predictable, structured civil execution process designed to keep your Chennai home on time and on budget."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((stg, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-extrabold text-[#EA580C]">
                    {stg.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 bg-white border border-neutral-200 px-2.5 py-1 rounded-full">
                    Stage {idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {stg.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {stg.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#EA580C]">
                <span>Milestone Verification</span>
              </div>
            </div>
          ))}
        </div>

        {/* Process CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-[#0B1E1A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-sm">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="font-display text-2xl font-medium text-white">
              Ready to begin Stage 01 Consultation?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300">
              Schedule an in-depth project discussion with our engineering team to review your plot and initial layout ideas.
            </p>
          </div>
          <a
            href="#consultation"
            className="shrink-0 px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-xs inline-flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-white" />
            <span>Start My Project Consultation</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
