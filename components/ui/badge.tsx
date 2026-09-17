import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "meadow"
    | "gold"
    | "water"
    | "earth"
    | "outline"
    | "tan"
    | "sage"
    | "blush";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#7C8A96]/15 text-[#2D4A34] border border-[#7C8A96]/35",
    meadow: "bg-[#7FA05C]/15 text-[#2D4A34] border border-[#7FA05C]/35 font-bold",
    gold: "bg-[#D9A23B]/15 text-[#8B5A2B] border border-[#D9A23B]/40 font-bold",
    water: "bg-[#3E7C94]/15 text-[#3E7C94] border border-[#3E7C94]/30 font-bold",
    earth: "bg-[#8B5A2B]/15 text-[#8B5A2B] border border-[#8B5A2B]/30 font-bold",
    outline: "border border-[#A8A8A4] text-[#33322E] bg-transparent",
    // Compatibility aliases mapped directly to new palette:
    tan: "bg-[#D9A23B]/15 text-[#8B5A2B] border border-[#D9A23B]/40 font-bold",
    sage: "bg-[#7FA05C]/15 text-[#2D4A34] border border-[#7FA05C]/35 font-bold",
    blush: "bg-[#7C8A96]/15 text-[#2D4A34] border border-[#7C8A96]/35",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
