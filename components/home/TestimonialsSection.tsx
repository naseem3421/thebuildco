import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Quote, CheckCircle2, MapPin, ArrowRight } from "lucide-react";

export function TestimonialsSection() {
  // Strongest 3: Chennai Homeowner, Premium/Luxury Homeowner, NRI Homeowner
  const strongestTestimonials = siteConfig.testimonials.slice(0, 3);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="GENUINE EXPERIENCES"
          title="What Chennai Landowners Say About Building With TBC"
          subtitle="Real experiences from families who trusted TBC to engineer and construct their homes on client-owned plots."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {strongestTestimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-7 rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-sm transition-all"
            >
              <div>
                {/* Top Quote Icon & Verified Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#EA580C]">
                    <Quote className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Project</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {item.highlight && (
                  <div className="mt-4 inline-block text-[11px] font-bold text-[#EA580C] bg-white border border-neutral-200 px-3 py-1 rounded-full">
                    {item.highlight}
                  </div>
                )}
              </div>

              {/* Author & Project Details */}
              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">
                    {item.author}
                  </h4>
                  <span className="text-xs text-neutral-500 block">
                    {item.role}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-[#EA580C]" />
                    <span>{item.location}</span>
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">
                    {item.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors"
          >
            <span>Read More Homeowner Stories & Verified Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
