import React from "react";
import type { Metadata } from "next";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Construction Process & Stage Payments",
  description:
    "Learn about The Build Company's structured 8-stage turnkey construction workflow and milestone payment escrow designed to protect Chennai landowners.",
};

export default function ProcessPage() {
  const paymentStages = [
    { stage: "Booking & Soil Check", pct: "5%", desc: "Architectural consultation, plot survey, and initial 2D floor plans." },
    { stage: "Architectural & 3D Approval", pct: "10%", desc: "Finalization of 3D elevations, structural engineering drawings, and locked BOQ." },
    { stage: "Foundation & Plinth Beam", pct: "15%", desc: "Excavation, anti-termite treatment, PCC, column footings, and plinth beam casting." },
    { stage: "Ground Floor Roof Slab", pct: "20%", desc: "Ground floor RCC columns, shuttering, steel reinforcement binding, and slab casting." },
    { stage: "First Floor Roof Slab", pct: "15%", desc: "First floor structural columns and slab pour with certified concrete cube tests." },
    { stage: "Brickwork & Concealed Piping", pct: "15%", desc: "Red brick / solid block masonry, electrical conduit chasing, and plumbing lines." },
    { stage: "Plastering & Flooring", pct: "10%", desc: "Internal/external cement plastering, waterproofing, and vitrified/marble tile laying." },
    { stage: "Finishing & Handover", pct: "10%", desc: "Painting, door/window joinery, sanitary fittings, deep cleaning, and certified snag-free key handover." },
  ];

  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* 1. Page Hero */}
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="terracotta" className="mb-4">
              Engineered Certainty
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              From Your First Conversation to Handover
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              We eliminate traditional contractor friction through clear milestone checkpoints, stage-wise payments, and daily supervision on your plot in Chennai.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" href="#stages" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore The 8 Stages
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={getWhatsAppUrl(siteConfig.whatsappMessages.siteVisit)}
                leftIcon={<MessageCircle className="w-4 h-4" />}
              >
                Schedule Stage 01
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Traditional Contractor Problems vs The Build Company Turnkey Method */}
      <section className="bg-white py-16 sm:py-20 border-y border-neutral-200">
        <Container size="wide">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 uppercase tracking-wider mb-4">
              THE UNSTRUCTURED CONTRACTOR REALITY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-neutral-900 leading-tight">
              Why Traditional Home Construction in Chennai Often Breaks Down
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              When landowners hire independent masons, labor contractors, and freelance designers separately, projects routinely suffer from fragmented coordination, cost overruns, and material ambiguity:
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                "Chasing independent contractors, sub-contractors, and masons for daily updates",
                "Coordinating blame games between freelance architects and local structural engineers",
                "Managing tedious material purchases, deliveries, cement storage, and theft risks",
                "Negotiating every slight drawing change with sudden contractor surprise bills",
                "Unclear bill of quantities (BOQ) with hidden charges that inflate the final budget",
                "Unexpected additional costs surfacing halfway through the roof slab casting",
                "Poor, sporadic communication and excuses over labour shortages or monsoons",
                "Extended construction delays stretching a 10-month plan into 24 exhausting months",
                "Quality uncertainty — wondering if steel rebar and cement grades meet specs",
                "Having to physically visit the dusty site constantly while juggling family and career",
              ].map((pain, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80"
                >
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-xs">✕</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-snug font-medium">
                    {pain}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[#0B1E1A] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
                  THE BUILD COMPANY TURNKEY DIFFERENCE
                </span>
                <p className="text-sm text-neutral-200 font-medium">
                  One accountable team, fixed specifications, stage-wise payments, and daily civil engineer supervision.
                </p>
              </div>
              <a
                href="#stages"
                className="shrink-0 px-6 py-2.5 rounded-full bg-[#EA580C] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#C2410C] transition-colors"
              >
                See 8-Stage Roadmap ↓
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Detailed 8 Steps Timeline */}
      <section id="stages" className="scroll-mt-24">
        <Container size="wide">
          <SectionHeading
            eyebrow="The 8-Stage Roadmap"
            title="How We Execute Your Project"
            description="Every phase is structured to ensure precision civil engineering, transparent progress verification, and on-time completion."
            align="center"
          />

          <div className="mt-14 space-y-6">
            {siteConfig.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Step Num & Title (4 cols) */}
                <div className="lg:col-span-4 flex items-start gap-4">
                  <span className="font-display text-4xl sm:text-5xl font-semibold text-[#B86F50] shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#52655E] bg-[#E9E4D9] px-2 py-0.5 rounded-full">
                      Stage {idx + 1}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#183B35] mt-1">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description (5 cols) */}
                <div className="lg:col-span-5 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  <p>{step.description}</p>
                </div>

                {/* Deliverables / Checklist (3 cols) */}
                <div className="lg:col-span-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#D9D2C5] lg:pl-6 space-y-2 text-xs text-[#183B35]">
                  <span className="font-semibold text-[11px] uppercase tracking-wider text-[#52655E] block mb-1">
                    Key Deliverables:
                  </span>
                  {step.details?.map((detail, didx) => (
                    <div key={didx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7E34] shrink-0 mt-0.5" />
                      <span className="text-[#52655E]">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Stage-Wise Payments Deep Dive */}
      <section className="bg-[#E9E4D9]/45 py-16 sm:py-24 border-y border-[#D9D2C5]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Financial Transparency"
            title="How Stage-Wise Payments Protect You"
            description="You never pay large lump sums upfront. Every invoice corresponds directly to verified work on your plot."
            align="center"
          />

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {paymentStages.map((stg, sidx) => (
              <div
                key={sidx}
                className="p-6 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-semibold text-[#52655E]">
                      Milestone {sidx + 1}
                    </span>
                    <Badge variant="terracotta" size="sm">
                      {stg.pct}
                    </Badge>
                  </div>
                  <h4 className="font-display text-xl font-medium text-[#183B35]">
                    {stg.stage}
                  </h4>
                  <p className="mt-2 text-xs text-[#52655E] leading-relaxed">
                    {stg.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D9D2C5]/60 text-[11px] font-semibold text-[#1E7E34]">
                  ✓ Verified before invoice release
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Start Stage 01 Lead Capture Form */}
      <section>
        <Container size="narrow">
          <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-12 shadow-luxury-md text-center">
            <Badge variant="sand" className="mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B86F50]" />
              No Obligation Consultation
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#183B35]">
              Ready To Start Stage 01?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#52655E] max-w-md mx-auto mb-8">
              Book a site consultation with our civil engineering team. We will survey your plot, review road accessibility, and prepare initial 2D drawings.
            </p>

            <LeadForm
              source="process_page_form"
              buttonLabel="Schedule Free Stage 01 Consultation"
              variant="default"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
