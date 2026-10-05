import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LeadForm } from "@/components/forms/LeadForm";
import { Quote, Star, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Testimonials & Experiences",
  description:
    "Read real experiences and reviews from landowners across Chennai who built their dream homes with TBC's transparent construction system.",
};

export default function TestimonialsPage() {
  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* 1. Page Header */}
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="terracotta" className="mb-4">
              Real Landowner Experiences
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              What Our Clients Say
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              Hear directly from families and NRI landowners across Chennai who built with our stage-wise milestone escrow and quality control system.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteConfig.testimonials.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#F7EDE8] flex items-center justify-center text-[#B86F50]">
                      <Quote className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-[#B86F50]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  {item.highlight && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183B35] bg-[#E9E4D9] px-3 py-1 rounded-full mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7E34]" />
                      <span>{item.highlight}</span>
                    </div>
                  )}

                  <p className="font-display text-xl sm:text-2xl text-[#183B35] leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#D9D2C5]/70 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-base text-[#183B35]">
                      {item.author}
                    </h4>
                    <span className="text-xs text-[#52655E] block">
                      {item.role} • {item.location}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#B86F50] bg-[#F7EDE8] px-3 py-1 rounded-full border border-[#E6B8A5]/50">
                    {item.projectType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Consultation Lead Gate */}
      <section className="bg-[#E9E4D9]/40 py-16 sm:py-24 border-y border-[#D9D2C5]">
        <Container size="narrow">
          <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-12 shadow-luxury-md text-center">
            <Badge variant="sand" className="mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B86F50]" />
              Start Your Own Project
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#183B35]">
              Ready to Build on Your Land?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#52655E] max-w-md mx-auto mb-8">
              Join 50+ satisfied Chennai landowners. Schedule a free site visit to receive customized blueprints and transparent sqft pricing.
            </p>

            <LeadForm
              source="testimonials_page_form"
              buttonLabel="Schedule Free Consultation"
              variant="default"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
