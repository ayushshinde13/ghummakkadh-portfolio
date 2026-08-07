import React from "react";
import { cn } from "@/lib/cn";
import { spacing } from "@/design-system";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn(spacing.section, className)} {...props}>
      {children}
    </section>
  );
};
