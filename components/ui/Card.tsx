import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "sand" | "dark" | "outline";
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  as?: React.ElementType;
}

export function Card({
  children,
  variant = "default",
  hoverable = false,
  padding = "md",
  className = "",
  as: Component = "div",
  ...props
}: CardProps) {
  const variantClasses = {
    default:
      "bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5]/70 shadow-luxury-sm",
    sand:
      "bg-[#E9E4D9] text-[#183B35] border border-[#D9D2C5]",
    dark:
      "bg-[#0E2420] text-[#F4F0E8] border border-[#183B35]",
    outline:
      "bg-transparent text-[#183B35] border border-[#D9D2C5]",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
    xl: "p-10 sm:p-14",
  };

  const hoverClasses = hoverable
    ? "transition-all duration-300 hover:shadow-luxury-md hover:-translate-y-1 hover:border-[#B86F50]/40"
    : "";

  return (
    <Component
      className={`rounded-2xl sm:rounded-3xl overflow-hidden ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
