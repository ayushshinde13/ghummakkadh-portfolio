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
        centered ? "items-center text-center max-w-2xl mx-auto" : "items-start"
      } ${className}`}
    >
      {badge && <Badge variant="primary">{badge}</Badge>}
      <Heading level={2} className="text-[#111827]">
        {title}
      </Heading>
      {subtitle && <p className="text-gray-600 text-base">{subtitle}</p>}
    </div>
  );
};
