import React from "react";
import { Heading, Badge } from "@/components/common";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-3 mb-12 ${
        centered ? "items-start lg:items-center text-left lg:text-center max-w-2xl mx-auto w-full" : "items-start"
      } ${className}`}
    >
      {badge && <Badge variant="primary">{badge}</Badge>}
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
        {title}
      </h2>
      {subtitle && <p className="text-slate-600 dark:text-gray-300 text-base transition-colors">{subtitle}</p>}
    </div>
  );
};

