import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Handshake, ArrowRight } from "lucide-react";

export function JointVentureHomeSection() {
  return (
    <section id="joint-venture" className="py-10 sm:py-12 bg-white border-b border-neutral-200">
      <Container size="wide">
        <div className="rounded-3xl p-6 sm:p-8 bg-[#FAF8F5] border border-neutral-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shrink-0 text-[#EA580C]">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] mb-1">
                SECONDARY OFFERING • SELECTIVE PARTNERSHIPS
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                Have Development Land?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600 max-w-xl">
                TBC also evaluates selected Joint Venture development opportunities with Chennai landowners.
              </p>
            </div>
          </div>

          <Link
            href="/joint-venture"
            className="shrink-0 px-6 py-3 rounded-full bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-xs inline-flex items-center gap-2 group"
          >
            <span>Explore Joint Venture Opportunities</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
