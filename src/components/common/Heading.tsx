import React from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/design-system";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className,
  ...props
}) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const levelStyles = {
    1: typography.display,
    2: typography.heading,
    3: typography.subHeading,
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: typography.small,
  };

  return (
    <Tag className={cn(levelStyles[level], className)} {...props}>
      {children}
    </Tag>
  );
};
