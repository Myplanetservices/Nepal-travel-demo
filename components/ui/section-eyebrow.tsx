import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SectionEyebrowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  cloudSrc?: string;
}

export function SectionEyebrow({
  children,
  align = "left",
  cloudSrc = "/images/assets/fluffy-cloud.png",
  className,
  ...props
}: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 mb-2",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        className
      )}
      {...props}
    >
      <div className="relative w-7 h-5 sm:w-8 sm:h-6 shrink-0">
        <Image
          src={cloudSrc}
          alt="Cloud Asset"
          fill
          className="object-contain drop-shadow-sm"
        />
      </div>
      <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-meadow select-none">
        {children}
      </span>
    </div>
  );
}
