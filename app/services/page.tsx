import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, CheckCircle2, ShieldCheck, Ruler, Home, Building, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Residential Construction Services in Chennai | TBC",
  description:
    "Explore turnkey residential construction services in Chennai by TBC. Bespoke individual houses, luxury villas, duplex residences, and joint venture developments on client-owned land.",
  keywords: [
    "residential construction services chennai",
    "turnkey house construction chennai",
    "villa construction chennai",
    "duplex construction chennai",
    "individual house builder chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/services",
  },
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Individual House Construction",
      slug: "individual-house-construction",
      desc: "Custom single and multi-level residential homes engineered for your plot dimensions, Vastu requirements, and family lifestyle.",
      sqft: "1,800 – 4,500 sqft",
      budget: "₹40 Lakhs – ₹1.2 Cr",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      features: [
        "Tailored 2D architectural & 3D elevation design",
        "Seismic-resilient Fe 550D RCC frame structure",
        "Vastu-compliant spatial zoning",
        "Stage-wise milestone payments",
      ],
    },
    {
      title: "Villa Construction",
      slug: "villa-construction",
      desc: "Architecturally distinctive private villas with double-height living spaces, premium finishes, private courtyards, and terrace gardens.",
      sqft: "3,000 – 7,500 sqft",
      budget: "₹75 Lakhs – ₹2 Cr+",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      features: [
        "Expansive living rooms with acoustic thermal glazing",
        "Italian marble & large porcelain tile finishes",
        "Smart home automation conduit preparation",
        "Private landscaped decks & cantilevered porticos",
      ],
    },
    {
      title: "Duplex House Construction",
      slug: "duplex-house-construction",
      desc: "Contemporary G+1 duplex residences optimized for urban Chennai plots, maximizing natural daylight and cross-ventilation.",
      sqft: "2,200 – 4,500 sqft",
      budget: "₹48 Lakhs – ₹1.2 Cr",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      features: [
        "Internal floating staircase & mezzanine design",
        "Dedicated master suites & private family lounge",
        "UPVC acoustic sound-dampening windows",
        "Rainwater harvesting & solar ready conduit",
      ],
    },
    {
      title: "Luxury Home Construction",
      slug: "luxury-home-construction",
      desc: "High-specification custom residences executed with strict civil engineering rigor, imported sanitaryware, and bespoke craftsmanship.",
      sqft: "3,500 – 8,000 sqft",
      budget: "₹90 Lakhs – ₹2.2 Cr+",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      features: [
        "Architect-grade bespoke joinery & teak wood doors",
        "Concealed thermostatic diverters & vanity counters",
        "Precision waterproofing with 10-year integrity guarantee",
        "Full turnkey delivery with 150+ point quality audits",
      ],
    },
  ];

  return (
    <div className="flex flex-col bg-[#FBF9F4]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-3">
              END-TO-END RESIDENTIAL EXECUTION
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
              Residential Construction Services in Chennai
            </h1>
            <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
              TBC specializes in premium turnkey residential construction for Chennai landowners. From architectural design to final handover, one team is accountable for your entire build.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {serviceCategories.map((service) => (
              <div
                key={service.slug}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-luxury-md transition-shadow flex flex-col"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={service.image}
                    alt={`${service.title} in Chennai by TBC`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-neutral-900 shadow-xs">
                    {service.sqft}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-neutral-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 text-xs text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block">
                        Typical Investment
                      </span>
                      <span className="text-sm font-bold text-neutral-900">
                        {service.budget}
                      </span>
                    </div>

                    <Link
                      href={`/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Joint Venture Banner */}
          <div className="mt-16 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] block mb-2">
                ALTERNATIVE DEVELOPMENT OPTION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium mb-3">
                Have Land With Development Potential in Chennai?
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                TBC also evaluates Joint Venture partnerships with Chennai landowners. If you own property with high development potential, our team can assess project feasibility and commercial options.
              </p>
            </div>

            <Link
              href="/joint-venture-projects"
              className="px-6 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shrink-0"
            >
              Explore Joint Ventures →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
