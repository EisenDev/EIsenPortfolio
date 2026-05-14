import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "outline" | "muted";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-surface-elevated border border-border text-foreground hover:bg-border/20",
    accent: "bg-accent/10 border border-accent/30 text-accent",
    outline: "border border-border text-muted",
    muted: "bg-background/50 border border-border/50 text-muted text-[11px]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-[13px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
