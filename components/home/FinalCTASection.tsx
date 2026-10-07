import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { CalendarCheck, Calculator, Handshake, ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container size="wide">
        <div className="relative rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[520px] flex items-center justify-center p-8 sm:p-16 border border-neutral-800 shadow-luxury-lg bg-[#0B1E1A]">
          {/* Background Architectural Image */}
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="Turnkey luxury residential home in Chennai constructed by TBC"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />

          {/* Foreground CTA Content */}
          <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] mb-3 block">
              TURNKEY CIVIL EXCELLENCE • CHENNAI
            </span>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.12] tracking-tight">
              Planning a ₹1–3 Crore Home in Chennai?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Tell us about your plot, expected built-up area and project requirements. We'll help you understand the right construction approach, approximate investment and next steps.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#consultation"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm inline-flex items-center justify-center gap-2 group"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>Book My Project Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                href="/calculator-pro-3"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <Calculator className="w-4 h-4 text-[#EA580C]" />
                <span>Calculate My Construction Budget</span>
              </Link>
            </div>

            {/* Smaller Secondary CTA for Property Owners */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-neutral-400">
              <Handshake className="w-4 h-4 text-[#EA580C]" />
              <span>Have Development Land?</span>
              <Link
                href="/joint-venture-projects"
                className="font-bold text-white hover:text-[#EA580C] underline decoration-[#EA580C] underline-offset-4 transition-colors ml-1"
              >
                Discuss a Joint Venture Project →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
