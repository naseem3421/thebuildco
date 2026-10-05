import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactInfoClient } from "@/components/contact/ContactInfoClient";

export const metadata: Metadata = {
  title: "Contact TBC — Book a Free Site Consultation",
  description:
    "Contact TBC (The Build Company) in Chennai. Schedule a free site visit and architectural consultation for your plot across Chennai, OMR, ECR, and Tamil Nadu.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* 1. Header & Lead Form Section */}
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <Badge variant="terracotta" className="mb-4">
              Direct Engineering Consultation
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              Let&apos;s Discuss Your Plot
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              Book a free, no-obligation site visit. Our senior structural engineer will inspect your plot, evaluate soil conditions, and prepare initial 2D floor plans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
            {/* Left Contact Card (5 cols) */}
            <ContactInfoClient />

            {/* Right Form Card (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-10 shadow-luxury-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-2xl font-medium text-[#183B35]">
                    Book Free Site Consultation
                  </h3>
                  <Badge variant="terracotta" size="sm">
                    Free Survey
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#52655E] mb-6">
                  Fill in your plot location and built-up area. Our engineering team will contact you to schedule an on-site visit.
                </p>

                <LeadForm
                  source="contact_page"
                  formType="consultation"
                  buttonLabel="Book Free Consultation"
                  variant="default"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Service Areas Grid */}
      <section className="bg-[#E9E4D9]/40 py-16 sm:py-24 border-y border-[#D9D2C5]">
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="sand" className="mb-3">
              Locations Covered
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#183B35]">
              Active Construction Zones Across Chennai
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#52655E] leading-relaxed max-w-xl mx-auto">
              Our civil teams and logistics hubs operate across all major residential and growth corridors in Chennai and surrounding suburbs.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {siteConfig.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full bg-[#FBF9F4] border border-[#D9D2C5] text-xs font-semibold text-[#183B35] shadow-luxury-sm"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
