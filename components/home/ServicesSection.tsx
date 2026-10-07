import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Individual House Construction",
      tagline: "Custom Family Homes on Client-Owned Plots",
      desc: "Custom architectural planning, Vastu compliance, and durable RCC framing engineered specifically for your plot dimensions and family lifestyle.",
      href: "/individual-house-construction",
      cta: "Explore Individual House Construction in Chennai",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      specs: ["G+1 & G+2 layouts", "Custom Vastu orientation", "Stage-wise milestone payments"],
    },
    {
      title: "Villa Construction",
      tagline: "Turnkey Bespoke Luxury Residences",
      desc: "High-spec turnkey villas with double-height atriums, private terraces, landscape courtyards, and superior structural durability.",
      href: "/villa-construction",
      cta: "Explore Villa Construction in Chennai",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      specs: ["Double-height foyers", "Curated Italian marble", "Private terrace decks"],
    },
    {
      title: "Duplex House Construction",
      tagline: "Vertical Elegance & Multi-Gen Living",
      desc: "Thoughtfully zoned G+1 and G+2 duplex residences separating formal entertaining areas on the ground floor from private family suites above.",
      href: "/duplex-house-construction",
      cta: "Explore Duplex House Construction in Chennai",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      specs: ["Private vs entertainment zones", "Internal light cutouts", "Generational privacy"],
    },
    {
      title: "Luxury Home Construction",
      tagline: "Signature High-Spec Residences",
      desc: "For clients building ₹2 Cr–₹5 Cr+ residences demanding world-class fenestrations, home automation, VRV climate control, and artisanal finishes.",
      href: "/luxury-home-construction",
      cta: "Explore Luxury Home Construction in Chennai",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      specs: ["Slimline acoustic windows", "VRV HVAC air conditioning", "Automated smart home"],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="TOPICAL AUTHORITY & SPECIALIZATION"
          title="Residential Construction Services in Chennai"
          subtitle="Engineered exclusively for client-owned land with dedicated in-house architectural and civil engineering teams."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-luxury-md hover:border-[#EA580C]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} by TBC in Chennai`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">
                    {item.tagline}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#EA580C] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={item.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-50 hover:bg-[#FFF7ED] border border-neutral-200 hover:border-[#FFEDD5] text-[#EA580C] font-semibold text-xs transition-colors flex items-center justify-between group/link"
                >
                  <span className="truncate">{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-800 hover:text-[#EA580C] transition-colors"
          >
            <span>View All Residential Construction Services & Comparison</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
