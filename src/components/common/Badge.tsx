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
    primary: "bg-[#F8D84E]/30 text-[#1E293B] border border-[#F8D84E]",
    secondary: "bg-[#7DD3FC]/20 text-[#0284C7] border border-[#7DD3FC]/50",
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
