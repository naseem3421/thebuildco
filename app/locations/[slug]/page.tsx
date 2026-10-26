import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { localitiesConfig } from "@/config/localities";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LeadForm } from "@/components/forms/LeadForm";
import { BreadcrumbJsonLd, FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import {
  MapPin,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";

export async function generateStaticParams() {
  return Object.keys(localitiesConfig).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locality = localitiesConfig[resolvedParams.slug];

  if (!locality) {
    return {
      title: "Location Not Found",
    };
  }

  const canonicalUrl = `https://thebuildcompany.in/locations/${locality.slug}`;

  return {
    title: locality.metaTitle,
    description: locality.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: locality.metaTitle,
      description: locality.metaDescription,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function LocalityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const locality = localitiesConfig[resolvedParams.slug];

  if (!locality) {
    notFound();
  }

  const whatsappMessage = `Hi The Build Company, I own a plot in ${locality.name}, Chennai and I would like to get a construction quote for my land.`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: locality.name, url: `/locations/${locality.slug}` },
  ];

  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* Schema.org Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={locality.localFaqs} />
      <ServiceJsonLd
        name={`House Construction in ${locality.name}, Chennai`}
        description={locality.metaDescription}
        serviceType="Turnkey Residential Construction"
      />

      {/* 1. Locality Hero Header */}
      <section>
        <Container size="wide">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#52655E]">
            <Link href="/" className="hover:text-[#183B35]">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-[#183B35]">Locations</Link>
            <span>/</span>
            <span className="font-semibold text-[#183B35]">{locality.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9E4D9] border border-[#D9D2C5] text-xs font-semibold text-[#183B35] mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#B86F50]" />
              <span>{locality.zone} • Verified Local Service</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-[1.12]">
              House Construction Company in {locality.name}, Chennai
            </h1>

            <p className="mt-5 text-base sm:text-xl text-[#52655E] font-normal leading-relaxed">
              {locality.heroTagline}. Turnkey residential civil engineering on your own plot starting at <span className="font-semibold text-[#183B35]">{siteConfig.pricing.formattedStartingPrice}</span> with strict stage-wise milestone escrow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#consultation"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book Free Site Visit in {locality.shortName}
              </Button>

              <WhatsAppButton
                size="lg"
                location="locality_page"
                customMessage={whatsappMessage}
                label="WhatsApp Inquiry"
                trackingLabel={`locality_${locality.slug}_whatsapp`}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Overview & Soil Geotechnical Engineering Context */}
      <section className="bg-[#E9E4D9]/40 py-16 sm:py-20 border-y border-[#D9D2C5]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Local Context & Overview (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="terracotta">Area Overview</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#183B35]">
                Building on Your Plot in {locality.name}
              </h2>
              <p className="text-sm sm:text-base text-[#52655E] leading-relaxed">
                {locality.overview}
              </p>

              {/* Geotechnical Engineering Notes */}
              <div className="p-6 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm">
                <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-[#B86F50] mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#1E7E34]" />
                  <span>Geotechnical & Foundation Considerations</span>
                </div>
                <p className="text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  {locality.geotechnicalNotes}
                </p>
              </div>

              {/* Key Neighborhoods / Micro-markets */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#183B35] block mb-2">
                  Key Micro-markets & Corridors Covered in {locality.name}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {locality.keyStreetsOrAreas.map((st, sidx) => (
                    <span
                      key={sidx}
                      className="text-xs px-3 py-1 rounded-full bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5]"
                    >
                      📍 {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Popular Typologies & Packages (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 shadow-luxury-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D2C5]">
                <h3 className="font-display text-2xl font-medium text-[#183B35]">
                  Construction Typologies
                </h3>
                <Layers className="w-5 h-5 text-[#B86F50]" />
              </div>

              <div className="space-y-3">
                {locality.popularTypologies.map((typ, tidx) => (
                  <div
                    key={tidx}
                    className="p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#D9D2C5]/70 flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#183B35]">{typ}</span>
                    <span className="text-[11px] font-semibold text-[#B86F50]">Turnkey</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#D9D2C5] text-xs text-[#52655E]">
                <span className="font-semibold text-[#183B35] block mb-1">
                  Pricing Plans Available in {locality.name}:
                </span>
                <p>Basic (₹2,399/sqft) • Standard (₹2,699/sqft) • Premium (₹3,099/sqft)</p>
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                href="/calculator"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Calculate Cost for {locality.shortName}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Localized FAQs */}
      {locality.localFaqs.length > 0 && (
        <section>
          <Container size="narrow">
            <SectionHeading
              eyebrow={`${locality.shortName} FAQ`}
              title={`Frequently Asked Questions in ${locality.name}`}
              description={`Answers to common construction and planning queries for landowners in ${locality.name}.`}
              align="center"
            />

            <div className="mt-10 space-y-4">
              {locality.localFaqs.map((faq, fidx) => (
                <div
                  key={fidx}
                  className="p-6 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm"
                >
                  <h4 className="font-display text-lg sm:text-xl font-medium text-[#183B35] mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#52655E] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Localized Consultation Lead Form */}
      <section id="consultation" className="scroll-mt-24">
        <Container size="narrow">
          <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-12 shadow-luxury-md text-center">
            <Badge variant="terracotta" className="mb-4">
              Free Site Survey in {locality.name}
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#183B35]">
              Request Free Site Inspection on Your Plot
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#52655E] max-w-md mx-auto mb-8">
              Our chief civil engineer will visit your plot in {locality.name} to evaluate ground levels, soil type, and road access.
            </p>

            <LeadForm
              source={`location_page_${locality.slug}`}
              formType="site_visit"
              buttonLabel={`Book Free Site Visit in ${locality.shortName}`}
              variant="default"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
