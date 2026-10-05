import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#E9E4D9]/45 border-y border-[#D9D2C5]/80">
      <Container size="wide">
        <SectionHeading
          eyebrow="Landowner Experiences"
          title="What Our Clients Say"
          description="Hear from landowners across Chennai who entrusted their dream homes to TBC's transparent construction system."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300"
            >
              <div>
                {/* Top Quote Icon & 5 Star Rating */}
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

                <p className="font-display text-lg sm:text-xl text-[#183B35] leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Project Details */}
              <div className="mt-8 pt-6 border-t border-[#D9D2C5]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#183B35]">
                    {item.author}
                  </h4>
                  <span className="text-xs text-[#52655E] block">
                    {item.role} • {item.location}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-[#B86F50] bg-[#F7EDE8] px-2.5 py-1 rounded-full border border-[#E6B8A5]/50">
                  {item.projectType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Trust CTA */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-sm font-semibold text-[#183B35]">
            Join 50+ happy families who built on their plot with TBC.
          </span>
          <a
            href="#contact"
            className="text-xs font-bold uppercase tracking-wider text-[#B86F50] hover:text-[#9D5C42] underline"
          >
            Schedule Your Consultation →
          </a>
        </div>
      </Container>
    </section>
  );
}
