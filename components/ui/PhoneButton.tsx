"use client";

import React from "react";
import { Button, ButtonSize, ButtonVariant } from "./Button";
import { siteConfig } from "@/config/site";
import { trackPhoneClick, PhoneLocation } from "@/lib/analytics";
import { Phone } from "lucide-react";

export interface PhoneButtonProps {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  showNumber?: boolean;
  trackingLabel?: string;
  location?: PhoneLocation;
}

export function PhoneButton({
  label,
  size = "md",
  variant = "secondary",
  fullWidth = false,
  className = "",
  showNumber = false,
  trackingLabel,
  location = "general",
}: PhoneButtonProps) {
  const displayText =
    label || (showNumber ? siteConfig.contact.phoneDisplay : siteConfig.ctaDefaults.phone);

  const handleClick = () => {
    trackPhoneClick(location, trackingLabel);
  };

  return (
    <Button
      variant={variant}
      size={size}
      href={siteConfig.contact.phoneHref}
      fullWidth={fullWidth}
      className={className}
      onClick={handleClick}
      leftIcon={<Phone className="w-4 h-4" />}
    >
      {displayText}
    </Button>
  );
}
