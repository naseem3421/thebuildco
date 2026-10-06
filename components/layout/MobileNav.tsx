"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, MessageCircle, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Cost Calculator": true,
  });

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Prevent scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Menu Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="flex items-center justify-center w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-2"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white border-l border-neutral-200 p-6 shadow-luxury-lg flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header in Drawer */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <Logo variant="light" size="sm" className="h-8" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full border border-[#D9D2C5] bg-[#FBF9F4] text-[#183B35] hover:bg-[#E9E4D9]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1.5">
                {siteConfig.headerNavigation.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedSections[item.label] ?? false;

                  if (hasChildren) {
                    return (
                      <div key={item.label} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => toggleSection(item.label)}
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#183B35] hover:bg-[#E9E4D9] transition-colors w-full text-left"
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                            {item.isBadge && (
                              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-[#EA580C] text-white">
                                {item.badgeText}
                              </span>
                            )}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#52655E] transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="ml-3 pl-3 border-l-2 border-[#D9D2C5] my-1 flex flex-col space-y-1">
                            {item.children?.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#52655E] hover:text-[#183B35] hover:bg-[#E9E4D9]/60 transition-colors"
                              >
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#EA580C] text-white">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#183B35] hover:bg-[#E9E4D9] hover:text-[#B86F50] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-[#D9D2C5] flex flex-col gap-3">
              <Button
                variant="whatsapp"
                size="md"
                href={siteConfig.contact.whatsappHref}
                fullWidth
                leftIcon={<MessageCircle className="w-4 h-4" />}
                onClick={() => setIsOpen(false)}
              >
                Chat on WhatsApp
              </Button>

              <Button
                variant="primary"
                size="md"
                href="/contact"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Get Free Quote
              </Button>

              <div className="mt-3 text-center">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52655E] hover:text-[#183B35]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B86F50]" />
                  <span>Call: {siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
