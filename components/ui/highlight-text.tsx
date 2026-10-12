import * as React from "react";
import { cn } from "@/lib/utils";

export interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "lime" | "yellow" | "pink" | "cyan" | "orange";
}

const highlightVariants: Record<NonNullable<HighlightTextProps["variant"]>, string> = {
  lime: "bg-accent-green",
  yellow: "bg-yellow-300",
  pink: "bg-pink-300",
  cyan: "bg-cyan-300",
  orange: "bg-orange-300",
};

export function HighlightText({
  children,
  className,
  variant = "lime",
}: HighlightTextProps) {
  return (
    <span className="relative inline-block mx-0.5 px-1 align-baseline text-neutral-950 dark:text-neutral-950 font-medium">
      <span
        className={cn(
          "absolute inset-0 scale-x-105 scale-y-90 -skew-y-1 rounded-[2px]",
          highlightVariants[variant],
          className
        )}
        aria-hidden="true"
      />
      <span className="relative z-10 text-neutral-950 dark:text-neutral-950 font-medium">{children}</span>
    </span>
  );
}

export default HighlightText;
