import * as React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = {
  variants: {
    primary: "bg-foreground text-background hover:opacity-90 active:scale-[0.98] shadow-sm",
    secondary: "bg-surface-elevated text-foreground hover:bg-border/40 active:scale-[0.98]",
    outline: "border border-border text-foreground hover:bg-surface active:scale-[0.98]",
    ghost: "text-foreground hover:bg-surface-elevated active:scale-[0.98]",
    accent: "bg-accent text-white hover:opacity-90 active:scale-[0.98]",
  },
  sizes: {
    sm: "h-9 px-4 text-xs tracking-wide font-semibold",
    md: "h-11 px-6 text-sm font-medium",
    lg: "h-14 px-8 text-base font-medium",
    icon: "h-11 w-11",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants;
  size?: keyof typeof buttonVariants.sizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variants[variant],
          buttonVariants.sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
