"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  const handlePhoneClick = () => {
    trackPhoneClick("footer");
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("footer");
  };

  return (
    <footer className="bg-white text-neutral-800 border-t border-neutral-200/90 relative overflow-hidden">
      {/* Decorative subtle ambient warm glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-neutral-200/80">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand & Ethos (4 cols) */}
            <div className="lg:col-span-4 flex flex-col">
              <Link href="/" className="inline-block focus-visible:outline-none" aria-label={`${siteConfig.name} - Home`}>
                <Logo variant="light" size="lg" className="h-10 sm:h-12 hover:opacity-95 transition-opacity" />
              </Link>

              <p className="mt-4 font-display text-lg text-neutral-900 italic leading-relaxed">
                &ldquo;Building homes with clarity, craftsmanship and confidence.&rdquo;
              </p>

              <p className="mt-3 text-sm text-neutral-600 leading-relaxed max-w-sm">
                {siteConfig.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs text-neutral-700 bg-neutral-50 border border-neutral-200 px-3.5 py-2 rounded-xl w-fit">
                <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span>{siteConfig.warranty} • {siteConfig.paymentStructure}</span>
              </div>
            </div>

            {/* Column 2: Quick Navigation (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 hover:text-[#EA580C] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Construction Services & Packages (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-4">
                Services & Packages
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/services/individual-house-construction"
                    className="text-sm text-neutral-600 hover:text-[#EA580C] transition-colors"
                  >
                    Individual House Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/villa-construction"
                    className="text-sm text-neutral-600 hover:text-[#EA580C] transition-colors"
                  >
                    Villa Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/duplex-house-construction"
                    className="text-sm text-neutral-600 hover:text-[#EA580C] transition-colors"
                  >
                    Duplex House Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/luxury-home-construction"
                    className="text-sm text-neutral-600 hover:text-[#EA580C] transition-colors"
                  >
                    Luxury Home Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/joint-venture"
                    className="text-sm text-neutral-600 hover:text-[#EA580C] transition-colors"
                  >
                    Joint Venture Development
                  </Link>
                </li>
              </ul>

              <div className="mt-5 pt-4 border-t border-neutral-200/80">
                <span className="text-xs font-semibold text-neutral-500 block mb-2">
                  Pricing Plans (From {siteConfig.pricing.formattedStartingPrice}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.packages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      href="/packages"
                      className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/80 hover:border-[#EA580C] hover:text-[#EA580C] transition-colors font-medium"
                    >
                      {pkg.name}: {pkg.formattedPrice}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4: Contact & Direct Inquiries (3 cols) */}
            <div className="lg:col-span-3 flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-4">
                Chennai Headquarters
              </h3>

              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-1" />
                  <span>{siteConfig.location.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <a
                    href={siteConfig.contact.phoneHref}
                    onClick={handlePhoneClick}
                    className="hover:text-[#EA580C] transition-colors font-medium text-neutral-800"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <a
                    href={siteConfig.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="hover:text-[#16A34A] transition-colors font-medium text-neutral-800"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-[#EA580C] transition-colors font-medium text-neutral-800"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Service Areas Pill tags with internal links */}
              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-500">
                    Key Service Areas:
                  </span>
                  <Link
                    href="/locations"
                    className="text-[11px] font-semibold text-[#EA580C] hover:underline"
                  >
                    All Areas →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs text-neutral-600">
                  {["OMR", "ECR", "Medavakkam", "Sholinganallur", "Velachery", "Tambaram", "Porur"].map((area) => (
                    <Link
                      key={area}
                      href={`/locations/${area.toLowerCase()}`}
                      className="hover:text-[#EA580C] transition-colors hover:underline"
                    >
                      {area} •
                    </Link>
                  ))}
                  <Link href="/locations" className="text-neutral-800 font-medium hover:underline">
                    More...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Legal, Model Notice & Copyright */}
      <div className="py-8 bg-[#0B1E1A] text-xs text-[#8C9C96] border-t border-[#183B35]">
        <Container size="wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left leading-relaxed max-w-2xl">
              <span className="font-semibold text-[#D9D2C5]">Business Notice: </span>
              {siteConfig.legal.disclaimer}
            </p>

            <div className="flex items-center gap-6 shrink-0">
              <Link href="#privacy" className="hover:text-[#FBF9F4] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-[#FBF9F4] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#183B35]/60 text-center md:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8C9C96]">
            <span>{siteConfig.legal.copyright}</span>
            <span>Handcrafted for excellence in Chennai, Tamil Nadu</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
