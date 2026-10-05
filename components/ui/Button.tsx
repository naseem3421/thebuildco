import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "forest"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-[#B86F50] text-[#FBF9F4] hover:bg-[#9D5C42] shadow-luxury-sm hover:shadow-luxury-md border border-[#B86F50]/20",
    forest:
      "bg-[#183B35] text-[#F4F0E8] hover:bg-[#244E46] shadow-luxury-sm hover:shadow-luxury-md border border-[#183B35]",
    secondary:
      "bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5] hover:bg-[#E9E4D9] shadow-luxury-sm",
    outline:
      "bg-transparent text-[#183B35] border border-[#183B35] hover:bg-[#183B35]/5",
    ghost:
      "bg-transparent text-[#183B35] hover:bg-[#183B35]/8",
    whatsapp:
      "bg-[#1E7E34] text-white hover:bg-[#155D27] shadow-luxury-sm hover:shadow-luxury-md border border-[#1E7E34]",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "min-h-[44px] px-4 text-xs font-semibold tracking-wide gap-1.5",
    md: "min-h-[46px] px-6 text-sm font-semibold tracking-wide gap-2",
    lg: "min-h-[52px] px-8 text-base font-semibold tracking-wide gap-2.5",
    xl: "min-h-[58px] px-9 text-lg font-semibold tracking-wide gap-3",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
          rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
