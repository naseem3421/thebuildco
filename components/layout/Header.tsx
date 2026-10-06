"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { MobileNav } from "./MobileNav";
import { Logo } from "../ui/Logo";
import { trackCTAClick } from "@/lib/analytics";
import { ChevronDown } from "lucide-react";

export function Header() {
  const handleCTAClick = () => {
    trackCTAClick({
      cta_label: "Header Get Quote",
      location: "header",
      destination: "/contact",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs transition-all duration-200">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center group focus-visible:outline-none py-1"
            aria-label={`${siteConfig.name} - Home`}
          >
            <Logo variant="light" size="md" priority className="h-9 sm:h-11 hover:opacity-95 transition-opacity" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.headerNavigation.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      className="px-3.5 py-2 text-sm font-semibold text-neutral-800 rounded-full hover:text-[#EA580C] hover:bg-neutral-100 transition-all duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                    >
                      <span>{item.label}</span>
                      {item.isBadge && (
                        <span className="px-1.5 py-0.2 text-[10px] font-extrabold tracking-wide text-[#EA580C] bg-[#FFF7F3] border border-[#FFD9C6] rounded-full shadow-xs">
                          {item.badgeText}
                        </span>
                      )}
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#EA580C] group-hover:rotate-180 transition-transform duration-200" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full pt-2 w-72 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
                      <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-luxury-md p-2 space-y-1 backdrop-blur-md">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex flex-col p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group/sub"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-neutral-900 group-hover/sub:text-[#EA580C] transition-colors">
                                {sub.label}
                              </span>
                              {sub.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#EA580C] text-white">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            {sub.description && (
                              <span className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-semibold text-neutral-800 rounded-full hover:text-[#EA580C] hover:bg-neutral-100 transition-all duration-150"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
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
