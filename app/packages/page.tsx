import React from "react";
import type { Metadata } from "next";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrackPackageView } from "@/components/analytics/TrackPackageView";
import { Check, Sparkles, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Packages & Pricing",
  description:
    "Explore transparent sqft construction packages for Chennai landowners. Compare Basic (₹1,899/sqft), Standard (₹2,199/sqft), and Premium (₹2,599/sqft) specifications.",
};

export default function PackagesPage() {
  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      <TrackPackageView packageName="All Packages" pricePerSqft={1899} />
      {/* 1. Page Hero */}
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="terracotta" className="mb-4">
              Transparent Sqft Costing
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              Choose The Right Level of Finish
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              Every package is backed by our strict stage-wise milestone escrow, 150+ quality inspections, and locked-in pricing with zero mid-project rate escalations.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                href="#compare"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Compare Specifications
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={getWhatsAppUrl(siteConfig.whatsappMessages.default)}
                leftIcon={<MessageCircle className="w-4 h-4" />}
              >
                Ask an Engineer
              </Button>
            </div>
          </div>

          {/* 3 Package Cards */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {siteConfig.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all duration-300 relative ${
                  pkg.popular
                    ? "bg-[#FBF9F4] border-2 border-[#B86F50] shadow-luxury-md -translate-y-1 lg:-translate-y-2"
                    : "bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="terracotta" size="md" className="shadow-luxury-sm">
                      <Sparkles className="w-3 h-3" /> Most Popular Choice
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className="font-display text-3xl font-medium text-[#183B35]">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#52655E] min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  <div className="mt-6 pb-6 border-b border-[#D9D2C5]">
                    <span className="font-display text-4xl sm:text-5xl font-semibold text-[#183B35]">
                      {pkg.formattedPrice}
                    </span>
                    <span className="text-xs text-[#52655E] block mt-1">
                      Turnkey construction on your plot
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#183B35] block mb-2">
                      Core Highlights:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52655E]">
                        <Check className="w-4 h-4 text-[#B86F50] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#D9D2C5] flex flex-col gap-2.5">
                  <Button
                    variant={pkg.popular ? "primary" : "secondary"}
                    size="md"
                    fullWidth
                    href="#get-estimate"
                  >
                    Select {pkg.name} Plan
                  </Button>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    fullWidth
                    href={getWhatsAppUrl(siteConfig.whatsappMessages.packageInquiry(pkg.name, pkg.formattedPrice))}
                    leftIcon={<MessageCircle className="w-4 h-4" />}
                  >
                    WhatsApp BOQ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Detailed 12-Category Comparison Matrix */}
      <section id="compare" className="scroll-mt-24 bg-[#E9E4D9]/40 py-16 sm:py-24 border-y border-[#D9D2C5]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Side-By-Side Comparison"
            title="Complete Material & Specification Matrix"
            description="Examine exactly what is included in each construction tier before you break ground."
            align="center"
          />

          <div className="mt-12 overflow-x-auto rounded-3xl border border-[#D9D2C5] bg-[#FBF9F4] shadow-luxury-md">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#D9D2C5] bg-[#183B35] text-[#F4F0E8]">
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider w-1/4">
                    Category
                  </th>
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider w-1/4">
                    Basic (₹1,899/sqft)
                  </th>
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider w-1/4 bg-[#244E46]">
                    Standard (₹2,199/sqft) ★
                  </th>
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider w-1/4">
                    Premium (₹2,599/sqft)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D2C5]/70 text-xs sm:text-sm">
                {siteConfig.packageComparisonMatrix.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-[#FBF9F4]" : "bg-[#F4F0E8]/40"}
                  >
                    <td className="p-4 sm:p-6 font-semibold text-[#183B35] align-top">
                      {row.category}
                    </td>
                    <td className="p-4 sm:p-6 text-[#52655E] align-top leading-relaxed">
                      {row.basic}
                    </td>
                    <td className="p-4 sm:p-6 text-[#183B35] font-medium bg-[#E9E4D9]/30 align-top leading-relaxed">
                      {row.standard}
                    </td>
                    <td className="p-4 sm:p-6 text-[#52655E] align-top leading-relaxed">
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 3. Lead Form Conversion Section */}
      <section id="get-estimate" className="scroll-mt-24">
        <Container size="narrow">
          <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-12 shadow-luxury-md text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E4D9] text-xs font-semibold text-[#183B35] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B86F50]" />
              Locked Sqft Contract with 5-Year Warranty
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#183B35]">
              Get My Construction Estimate
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#52655E] max-w-md mx-auto mb-8">
              Share your plot size and preferred finish tier. We will prepare an itemized BOQ with architectural layouts for your plot.
            </p>

            <LeadForm
              source="packages_page_form"
              buttonLabel="Get My Construction Estimate"
              variant="default"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
