"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { MobileNav } from "./MobileNav";
import { trackPhoneClick, trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";
import { MessageCircle, Phone } from "lucide-react";

export function Header() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("header");
  };

  const handlePhoneClick = () => {
    trackPhoneClick("header");
  };

  const handleCTAClick = () => {
    trackCTAClick({
      cta_label: "Header Get Quote",
      location: "header",
      destination: "/contact",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4F0E8]/90 backdrop-blur-md border-b border-[#D9D2C5]/70 transition-all duration-200">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
          >
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#183B35] group-hover:text-[#B86F50] transition-colors leading-none">
                {siteConfig.shortName}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-[0.2em] text-[#52655E] mt-0.5">
                The Build Company
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navigation.map((item) => {
              const isPro =
                item.href === "/calculator-pro" ||
                item.href === "/calculator-pro-2" ||
                item.href === "/calculator-pro-3";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isPro
                      ? "px-3 py-1.5 text-xs font-extrabold text-[#EA580C] bg-[#FFF7F3] border border-[#FFD9C6] rounded-full shadow-sm hover:bg-[#FFEDE0] hover:border-[#EA580C] transition-all flex items-center gap-1"
                      : "px-3 py-2 text-sm font-medium text-[#183B35] rounded-full hover:text-[#B86F50] hover:bg-[#E9E4D9]/60 transition-all duration-150"
                  }
                >
                  {item.label}
                  {isPro && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#183B35] hover:text-[#1E7E34] hover:bg-[#E9E4D9]/60 transition-colors"
              title="Chat with our engineering team on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#1E7E34]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={siteConfig.contact.phoneHref}
              onClick={handlePhoneClick}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#183B35] hover:text-[#B86F50] hover:bg-[#E9E4D9]/60 transition-colors"
              title="Call our Chennai office"
            >
              <Phone className="w-4 h-4 text-[#B86F50]" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>

            <Button
              variant="primary"
              size="sm"
              href="/contact"
              onClick={handleCTAClick}
              className="shadow-luxury-sm"
            >
              {siteConfig.ctaDefaults.primary}
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
