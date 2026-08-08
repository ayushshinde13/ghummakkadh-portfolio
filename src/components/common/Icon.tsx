import React from "react";
import { cn } from "@/lib/cn";
import { icons } from "@/design-system";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-mono font-bold bg-[#FF7700]/30 text-[#CC5F00] rounded-full",
        icons.sizes[size],
        className
      )}
      {...props}
    >
      {name.charAt(0)}
    </span>
  );
};
