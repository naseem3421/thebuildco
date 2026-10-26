import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface LogoProps {
  variant?: "light" | "dark" | "icon" | "icon-dark";
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "light",
  className = "",
  priority = false,
  size = "md",
}: LogoProps) {
  // Dimensions based on size and variant
  // Standard logo aspect ratio: 967 x 203 (~4.76:1)
  // Icon aspect ratio: 242 x 242 (1:1)
  const isIcon = variant === "icon" || variant === "icon-dark";

  let src = "/logo.png";
  if (variant === "dark") {
    src = "/logo-white.png";
  } else if (variant === "icon") {
    src = "/logo-icon.png";
  } else if (variant === "icon-dark") {
    src = "/logo-icon-white.png";
  }

  const dimensions = {
    sm: isIcon
      ? { width: 32, height: 32 }
      : { width: 152, height: 32 },
    md: isIcon
      ? { width: 44, height: 44 }
      : { width: 200, height: 42 },
    lg: isIcon
      ? { width: 56, height: 56 }
      : { width: 248, height: 52 },
  }[size];

  return (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <Image
        src={src}
        alt={siteConfig.name}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        className="h-auto max-h-full w-auto object-contain transition-opacity duration-200"
      />
    </div>
  );
}
