"use client";
import React from "react";
import { cn } from "@/lib/cn";
import { typography, radius, shadows } from "@/design-system";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer",
    typography.button,
    radius.full,
    shadows.button
  );

  const variantStyles = {
    primary: "bg-[#77FF00] text-[#1E293B] hover:bg-[#66E000]",
    secondary: "bg-[#FF7700] text-[#1E293B] hover:bg-[#E66B00]",
    outline: "border-2 border-[#E2E8F0] text-[#1E293B] hover:bg-white",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
