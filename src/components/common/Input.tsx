import React from "react";
import { cn } from "@/lib/cn";
import { radius, typography } from "@/design-system";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className={cn("font-medium", typography.small)}>
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 border border-[#E2E8F0] bg-white text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#F8D84E] transition-all",
          radius.md,
          typography.body,
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
