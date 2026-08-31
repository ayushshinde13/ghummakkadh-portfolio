import React from "react";
import { cn } from "@/lib/cn";
import { spacing } from "@/design-system";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(spacing.container, className)} {...props}>
      {children}
    </div>
  );
};


