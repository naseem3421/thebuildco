"use client";

import React from "react";
import { Button, ButtonSize } from "./Button";
import { getWhatsAppUrl } from "@/config/site";
import { trackWhatsAppClick, WhatsAppLocation } from "@/lib/analytics";
import { MessageCircle } from "lucide-react";

export interface WhatsAppButtonProps {
  label?: string;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  customMessage?: string;
  trackingLabel?: string;
  location?: WhatsAppLocation;
}

export function WhatsAppButton({
  label = "Chat on WhatsApp",
  size = "md",
  fullWidth = false,
  className = "",
  customMessage,
  trackingLabel,
  location = "general",
}: WhatsAppButtonProps) {
  const href = getWhatsAppUrl(customMessage);

  const handleClick = () => {
    trackWhatsAppClick(location, trackingLabel);
  };

  return (
    <Button
      variant="whatsapp"
      size={size}
      href={href}
      fullWidth={fullWidth}
      className={className}
      onClick={handleClick}
      leftIcon={<MessageCircle className="w-4 h-4" />}
    >
      {label}
    </Button>
  );
}
