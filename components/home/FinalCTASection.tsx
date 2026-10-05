import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { CTAButton } from "../ui/CTAButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { PhoneButton } from "../ui/PhoneButton";
import { LandPlot } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <div className="relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-center justify-center p-8 sm:p-16 border border-[#244E46] shadow-luxury-lg">
          {/* Background Architectural Image */}
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="Turnkey luxury residential home in Chennai constructed by TBC"
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* Luxury Deep Forest Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2420]/95 via-[#0E2420]/90 to-[#183B35]/85 backdrop-blur-[2px]" />

          {/* Foreground CTA Content */}
          <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
            <Badge variant="sand" className="mb-4">
              <LandPlot className="w-3.5 h-3.5 text-[#B86F50]" />
              Chennai Landowner Turnkey Partner
            </Badge>

            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-[#B86F50] mb-2 block">
              Already Own the Land?
            </span>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FBF9F4] leading-[1.08] tracking-tight">
              Let&apos;s Build Something Worth Coming Home To.
            </h2>

            <p className="mt-5 text-sm sm:text-lg text-[#D9D2C5] max-w-xl leading-relaxed">
              Book a no-obligation site survey with our structural team. Get complete architectural blueprints and itemized sqft pricing for your plot.
            </p>

            {/* 3 Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <CTAButton
                type="primary"
                size="lg"
                label="Get Free Quote"
                className="w-full sm:w-auto"
              />
              <WhatsAppButton size="lg" className="w-full sm:w-auto" />
              <PhoneButton
                size="lg"
                variant="secondary"
                label="Call TBC"
                showNumber
                className="w-full sm:w-auto bg-[#FBF9F4] text-[#183B35] hover:bg-[#E9E4D9]"
              />
            </div>

            <div className="mt-8 text-xs text-[#8C9C96]">
              <span>Office: {siteConfig.location.address} • Mon - Sat 9 AM - 7 PM</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
