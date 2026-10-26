import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { localitiesConfig } from "@/config/localities";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Chennai House Construction Locations & Service Areas | The Build Company",
  description:
    "Explore The Build Company turnkey construction service areas across Chennai: Medavakkam, OMR, ECR, Sholinganallur, Velachery, Tambaram, Porur, and more.",
  alternates: {
    canonical: "https://thebuildcompany.in/locations",
  },
};

export default function LocationsDirectoryPage() {
  const localitiesList = Object.values(localitiesConfig);

  return (
    <div className="py-12 sm:py-20 flex flex-col gap-12 sm:gap-16">
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <Badge variant="terracotta" className="mb-4">
              Local Construction Expertise
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              House Construction Locations in Chennai
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              We construct custom independent residences, luxury villas, and multi-story duplexes on customer-owned land across Chennai&apos;s primary residential corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {localitiesList.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group p-6 sm:p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#F7EDE8] border border-[#E6B8A5]/60 flex items-center justify-center text-[#B86F50]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#52655E] bg-[#E9E4D9] px-2.5 py-1 rounded-full">
                      {loc.zone}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-medium text-[#183B35] group-hover:text-[#B86F50] transition-colors">
                    {loc.name}
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-[#52655E] line-clamp-3 leading-relaxed">
                    {loc.overview}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {loc.popularTypologies.slice(0, 2).map((type, tidx) => (
                      <span
                        key={tidx}
                        className="text-[10px] font-medium text-[#183B35] bg-[#F4F0E8] px-2 py-0.5 rounded-md border border-[#D9D2C5]/70"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9D2C5]/70 flex items-center justify-between text-xs font-semibold text-[#183B35]">
                  <span>From ₹2,399/sqft (excl. GST)</span>
                  <span className="text-[#B86F50] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Area Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
