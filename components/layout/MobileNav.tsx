"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

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
        className="flex items-center justify-center w-11 h-11 rounded-full border border-[#D9D2C5] bg-[#FBF9F4] text-[#183B35] transition-colors hover:bg-[#E9E4D9] focus-visible:outline-2"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0E2420]/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#F4F0E8] border-l border-[#D9D2C5] p-6 shadow-luxury-lg flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header in Drawer */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D9D2C5]">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold tracking-wider text-[#183B35]">
                    {siteConfig.shortName}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#52655E]">
                    The Build Company
                  </span>
                </div>
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
              <nav className="mt-8 flex flex-col space-y-2">
                {siteConfig.navigation.map((item) => {
                  const isPro =
                    item.href === "/calculator-pro" ||
                    item.href === "/calculator-pro-2" ||
                    item.href === "/calculator-pro-3";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={
                        isPro
                          ? "flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold bg-[#FFF7F3] border border-[#FFD9C6] text-[#EA580C] hover:bg-[#FFEDE0] transition-colors"
                          : "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[#183B35] hover:bg-[#E9E4D9] hover:text-[#B86F50] transition-colors"
                      }
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {isPro && (
                          <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#EA580C] text-white">
                            NEW
                          </span>
                        )}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isPro ? "text-[#EA580C]" : "opacity-40"}`} />
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
