"use client";

import React from "react";
import { Button, ButtonSize } from "./Button";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import {
  trackWhatsAppClick,
  trackPhoneClick,
  trackCTAClick,
  WhatsAppLocation,
  PhoneLocation,
} from "@/lib/analytics";
import { ArrowRight, MessageCircle, Phone, Calendar, Calculator } from "lucide-react";

export type CTAType = "primary" | "secondary" | "third" | "phone" | "calculator";

export interface CTAButtonProps {
  type?: CTAType;
  label?: string;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  customHref?: string;
  trackingLabel?: string;
  location?: string;
  onClick?: () => void;
}

export function CTAButton({
  type = "primary",
  label,
  size = "md",
  fullWidth = false,
  className = "",
  customHref,
  trackingLabel,
  location = "general",
  onClick,
}: CTAButtonProps) {
  const handleClick = () => {
    if (type === "secondary") {
      trackWhatsAppClick(location as WhatsAppLocation, trackingLabel);
    } else if (type === "phone") {
      trackPhoneClick(location as PhoneLocation, trackingLabel);
    } else {
      trackCTAClick({
        cta_label: label || trackingLabel || `cta_${type}`,
        location,
        destination: customHref || (type === "calculator" ? "#calculator" : "#contact"),
      });
    }
    if (onClick) onClick();
  };

  switch (type) {
    case "primary":
      return (
        <Button
          variant="primary"
          size={size}
          href={customHref || "#contact"}
          fullWidth={fullWidth}
          className={className}
          rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          onClick={handleClick}
        >
          {label || siteConfig.ctaDefaults.primary}
        </Button>
      );

    case "secondary":
      return (
        <Button
          variant="whatsapp"
          size={size}
          href={customHref || getWhatsAppUrl()}
          fullWidth={fullWidth}
          className={className}
          leftIcon={<MessageCircle className="w-4 h-4" />}
          onClick={handleClick}
        >
          {label || siteConfig.ctaDefaults.secondary}
        </Button>
      );

    case "third":
      return (
        <Button
          variant="forest"
          size={size}
          href={customHref || "#contact"}
          fullWidth={fullWidth}
          className={className}
          leftIcon={<Calendar className="w-4 h-4" />}
          onClick={handleClick}
        >
          {label || siteConfig.ctaDefaults.third}
        </Button>
      );

    case "phone":
      return (
        <Button
          variant="secondary"
          size={size}
          href={customHref || siteConfig.contact.phoneHref}
          fullWidth={fullWidth}
          className={className}
          leftIcon={<Phone className="w-4 h-4 text-[#183B35]" />}
          onClick={handleClick}
        >
          {label || siteConfig.ctaDefaults.phone}
        </Button>
      );

    case "calculator":
      return (
        <Button
          variant="primary"
          size={size}
          href={customHref || "#calculator"}
          fullWidth={fullWidth}
          className={className}
          leftIcon={<Calculator className="w-4 h-4" />}
          onClick={handleClick}
        >
          {label || siteConfig.ctaDefaults.calculator}
        </Button>
      );

    default:
      return null;
  }
}
