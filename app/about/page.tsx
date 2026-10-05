import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  LandPlot,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About TBC — The Build Company Chennai",
  description:
    "Learn about TBC, Chennai's dedicated turnkey construction contractor specializing in building custom homes and villas on client-owned land.",
};

export default function AboutPage() {
  const story = siteConfig.aboutStory;

  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* 1. Page Hero & Brand Mission */}
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9E4D9] border border-[#D9D2C5] text-xs font-semibold text-[#183B35] mb-6 shadow-luxury-sm">
              <LandPlot className="w-4 h-4 text-[#B86F50]" />
              <span>We Construct Exclusively On Your Own Land in Chennai</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              Craftsmanship, Clarity & Confidence
            </h1>

            <p className="mt-5 text-base sm:text-xl text-[#52655E] leading-relaxed">
              {story.hero}
            </p>
          </div>

          {/* Hero Narrative 2-Column Split */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#52655E] leading-relaxed">
              <h2 className="font-display text-3xl font-medium text-[#183B35]">
                Who We Are
              </h2>
              {story.paragraphs.map((p, pidx) => (
                <p key={pidx}>{p}</p>
              ))}

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md" href="/contact">
                  Meet Our Architects
                </Button>
                <Button
                  variant="whatsapp"
                  size="md"
                  href={getWhatsAppUrl(siteConfig.whatsappMessages.default)}
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                >
                  Direct WhatsApp Chat
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#D9D2C5] shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Contemporary architecture built by TBC in Chennai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/75 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="font-display text-xl text-[#FBF9F4] block mb-1">
                  50+ Turnkey Residences Handed Over
                </span>
                <span className="text-[#D9D2C5]">
                  Across OMR, ECR, Anna Nagar, Medavakkam, and Tambaram
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Core Values & Construction Philosophy */}
      <section className="bg-[#E9E4D9]/40 py-16 sm:py-24 border-y border-[#D9D2C5]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Our Principles"
            title="The 4 Pillars of TBC Construction"
            description="How our civil engineering discipline translates into stress-free building for landowners."
            align="center"
          />

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {story.values.map((val, vidx) => (
              <div
                key={vidx}
                className="p-6 sm:p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#F7EDE8] border border-[#E6B8A5]/60 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-[#B86F50]" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-[#183B35]">
                    {val.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9D2C5]/60 text-[11px] font-semibold text-[#183B35]">
                  ✓ Standard On Every Project
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Leadership & Civil Engineering Team */}
      <section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Leadership & Oversight"
            title="Led By Experienced Civil Engineers"
            description="Our leadership team brings decades of technical rigor, architectural creativity, and on-site oversight."
            align="center"
          />

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {story.team.map((member, midx) => (
              <div
                key={midx}
                className="p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#183B35] text-[#F4F0E8] flex items-center justify-center mb-4 font-display text-xl font-bold">
                    {member.name.split(" ")[1]?.charAt(0) || "T"}
                  </div>
                  <h3 className="font-display text-2xl font-medium text-[#183B35]">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#B86F50] block mt-1">
                    {member.role}
                  </span>
                  <span className="text-[11px] text-[#52655E] block mt-0.5">
                    {member.experience}
                  </span>

                  <p className="mt-4 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
