import React from "react";
import { cn } from "@/lib/cn";
import { radius, shadows, spacing } from "@/design-system";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E7EB] transition-shadow duration-300",
        radius.lg,
        shadows.card,
        spacing.card,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};


