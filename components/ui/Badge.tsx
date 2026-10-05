import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "terracotta" | "forest" | "sand" | "outline" | "white";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "terracotta",
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  const variantClasses = {
    terracotta:
      "bg-[#F7EDE8] text-[#B86F50] border border-[#E6B8A5]/60",
    forest:
      "bg-[#183B35]/10 text-[#183B35] border border-[#183B35]/20",
    sand:
      "bg-[#E9E4D9] text-[#183B35] border border-[#D9D2C5]",
    outline:
      "bg-transparent text-[#183B35] border border-[#D9D2C5]",
    white:
      "bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5] shadow-luxury-sm",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5 tracking-wide",
    md: "text-xs font-semibold px-3.5 py-1 tracking-wider uppercase",
  };

  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
