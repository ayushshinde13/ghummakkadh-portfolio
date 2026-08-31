import React from "react";
import { cn } from "@/lib/cn";
import { radius } from "@/design-system";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className,
}) => {
  const variantStyles = {
    primary: "bg-[#4eb902]/20 text-white border border-[#77FF00]",
    secondary: "bg-[#FF7700]/20 text-[#CC5F00] border border-[#FF7700]/50",
    success: "bg-green-100 text-green-800 border border-green-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold",
        radius.full,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};


