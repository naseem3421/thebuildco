import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { CTAButton } from "../ui/CTAButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import {
  ShieldCheck,
  FileCheck,
  HardHat,
  Banknote,
  CheckCircle2,
} from "lucide-react";

export function EditorialTrustSection() {
  const trustPoints = [
    {
      icon: <Banknote className="w-5 h-5 text-[#B86F50]" />,
      title: "Fixed Cost Guarantee",
      description:
        "Every material grade, tile dimension, and fixture brand is specified in a binding contract. No price escalation during execution.",
    },
    {
      icon: <FileCheck className="w-5 h-5 text-[#B86F50]" />,
      title: "Stage-by-Stage Milestone Approvals",
      description:
        "You retain financial control. Payments are disbursed strictly against independently inspected and approved physical stages.",
    },
    {
      icon: <HardHat className="w-5 h-5 text-[#B86F50]" />,
      title: "Dedicated Site Supervisor for Each Site",
      description:
        "Dedicated site supervisors verify curing times, slump tests, and steel tie spacing on every single floor slab.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#B86F50]" />,
      title: "Pre-Handover Snag Audit & Certified Clearance",
      description:
        "Comprehensive 150-point civil inspection, 72-hour waterproofing ponding tests, and certified snag clearance before final possession.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#E9E4D9]/45 border-y border-[#D9D2C5]/80">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Storytelling (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-4">
              <Badge variant="terracotta">Our Construction Philosophy</Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#183B35] leading-[1.15] tracking-tight">
              Construction You Can Trust
            </h2>

            <p className="mt-3 font-display text-xl sm:text-2xl text-[#B86F50] italic">
              Clear pricing. Professional execution. No unnecessary surprises.
            </p>

            <p className="mt-6 text-sm sm:text-base text-[#52655E] leading-relaxed">
              Building on your plot should be an exciting life milestone, not a stressful battle with contractors. At The Build Company, we combine engineering rigor, clear stage-wise payments, and architectural craftsmanship to deliver homes that stand for generations.
            </p>

            {/* Structured Trust Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-center shrink-0">
                    {point.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-[#183B35]">
                    {point.title}
                  </h4>
                  <p className="text-xs text-[#52655E] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 pt-6 border-t border-[#D9D2C5] flex flex-wrap items-center gap-4">
              <CTAButton type="third" size="lg" label="Book Free Site Visit" />
              <WhatsAppButton size="lg" />
            </div>
          </div>

          {/* Right Column: Editorial Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-[#D9D2C5] shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural detailing and structural craftsmanship by The Build Company in Chennai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/75 via-transparent to-transparent" />

              {/* Floating Quality Callout Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#FBF9F4]/95 backdrop-blur-md border border-[#D9D2C5] shadow-luxury-md">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B86F50] mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7E34]" />
                  <span>Chennai Quality Standard</span>
                </div>
                <h4 className="font-display text-xl font-normal text-[#183B35]">
                  150+ Structural & Civil Quality Checkpoints
                </h4>
                <p className="text-xs text-[#52655E] mt-1">
                  From soil load bearing tests to final electrical insulation audits before handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
