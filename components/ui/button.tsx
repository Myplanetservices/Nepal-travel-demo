import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "meadow";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD6B2E]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer select-none";

    const variantStyles = {
      // Primary CTA: Exclusively CTA Orange #DD6B2E with crisp white text, darkening slightly on hover
      primary:
        "bg-[#DD6B2E] text-white hover:bg-[#C55920] active:bg-[#B54E18] shadow-md shadow-[#DD6B2E]/25 border border-[#C55920]",
      // Secondary: Water Blue #3E7C94 with white text, darkening slightly on hover
      secondary:
        "bg-[#3E7C94] text-white hover:bg-[#32657A] active:bg-[#2A5567] shadow-xs border border-[#32657A]",
      // Meadow: Accent green button for subtle confirmation or secondary action
      meadow:
        "bg-[#7FA05C] text-white hover:bg-[#6E8C4E] shadow-xs border border-[#6E8C4E]",
      // Outline: Mountain gray-blue #7C8A96 border with deep pine #2D4A34 text
      outline:
        "border-2 border-[#7C8A96] text-[#2D4A34] hover:bg-[#7C8A96]/15 hover:border-[#2D4A34]",
      // Ghost: Deep pine #2D4A34 text with gentle hover tint
      ghost:
        "text-[#2D4A34] hover:bg-[#7C8A96]/15",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs tracking-wide",
      md: "h-11 px-6 text-sm tracking-tight",
      lg: "h-13 px-8 text-base tracking-tight",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
