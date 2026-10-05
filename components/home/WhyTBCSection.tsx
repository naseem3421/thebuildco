import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { CTAButton } from "../ui/CTAButton";
import {
  Receipt,
  Milestone,
  HardHat,
  ShieldCheck,
  MessageCircle,
  Award,
} from "lucide-react";

export function WhyTBCSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Receipt: <Receipt className="w-5 h-5 text-[#B86F50]" />,
    Milestone: <Milestone className="w-5 h-5 text-[#B86F50]" />,
    HardHat: <HardHat className="w-5 h-5 text-[#B86F50]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#B86F50]" />,
    MessageCircle: <MessageCircle className="w-5 h-5 text-[#B86F50]" />,
    Award: <Award className="w-5 h-5 text-[#B86F50]" />,
  };

  return (
    <section id="why-tbc" className="py-16 sm:py-24 scroll-mt-20">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Architectural Visual (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Badge variant="terracotta" className="mb-4">The TBC Advantage</Badge>

            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#183B35] leading-[1.15] tracking-tight">
              More Than Construction
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#52655E] leading-relaxed">
              We treat your land like our own. Our engineered workflows ensure transparent tracking, certified material supplies, and milestone escrow so you never worry about cost escalations or substandard workmanship.
            </p>

            <div className="mt-8 relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#D9D2C5] shadow-luxury-md hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                alt="Architects and civil engineers on site review in Chennai"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#F4F0E8] text-xs">
                <span className="font-semibold block text-[#FBF9F4]">Daily Site Logs & Lab Verification</span>
                <span className="text-[#D9D2C5]">Active on-ground oversight for every RCC pour</span>
              </div>
            </div>

            <div className="mt-8">
              <CTAButton type="primary" size="lg" label="Experience The Difference" />
            </div>
          </div>

          {/* Right Column: 6 Value Proposition Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {siteConfig.whyTBC.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5]/80 shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F7EDE8] border border-[#E6B8A5]/60 flex items-center justify-center mb-4">
                  {iconMap[item.iconName] || <ShieldCheck className="w-5 h-5 text-[#B86F50]" />}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#183B35]">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
