import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 scroll-mt-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Architectural Typologies"
          title="What We Build"
          description="Specialized turnkey construction tailored to plot dimensions, lifestyle needs, and architectural preferences across Chennai."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.services.map((service) => (
            <Link
              key={service.id}
              href={`#packages`}
              className="group flex flex-col rounded-3xl overflow-hidden bg-[#FBF9F4] border border-[#D9D2C5]/80 shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9E4D9]">
                <Image
                  src={service.imageUrl}
                  alt={`${service.title} construction in Chennai by TBC`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                {service.sqftRange && (
                  <div className="absolute top-3 left-3 bg-[#0E2420]/75 backdrop-blur-sm text-[#F4F0E8] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#244E46]">
                    {service.sqftRange}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-medium text-[#183B35] group-hover:text-[#B86F50] transition-colors">
                      {service.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-[#D9D2C5] flex items-center justify-center text-[#183B35] group-hover:bg-[#B86F50] group-hover:text-white group-hover:border-[#B86F50] transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9D2C5]/60 flex items-center justify-between text-xs font-semibold text-[#183B35]">
                  <span>Turnkey Execution</span>
                  <span className="text-[#B86F50] group-hover:translate-x-0.5 transition-transform">
                    Explore Package →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
