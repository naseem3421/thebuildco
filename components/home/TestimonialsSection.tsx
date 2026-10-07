import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Quote, CheckCircle2, MapPin, Building } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="GENUINE HOMEOWNER EXPERIENCES"
          title="What Chennai Landowners Say About Building With TBC"
          subtitle="Real experiences from families who trusted TBC to construct their homes on client-owned residential plots."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {siteConfig.testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-8 rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 hover:shadow-luxury-sm transition-all"
            >
              <div>
                {/* Top Quote Icon & Verified Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#EA580C]">
                    <Quote className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Project</span>
                  </span>
                </div>

                <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {item.highlight && (
                  <div className="mt-4 inline-block text-xs font-bold text-[#EA580C] bg-white border border-neutral-200 px-3 py-1 rounded-full">
                    {item.highlight}
                  </div>
                )}
              </div>

              {/* Author & Project Details */}
              <div className="mt-8 pt-5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">
                    {item.author}
                  </h4>
                  <span className="text-xs text-neutral-500 block">
                    {item.role}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
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
      </Container>
    </section>
  );
}
