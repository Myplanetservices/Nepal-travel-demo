import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Planet Services | High-Converting 3D Websites for Nepal Travel Agencies",
  description:
    "Turn browsers into direct bookings. We build ultra-fast, 3D-enhanced websites for Nepal travel & trekking agencies with online booking, interactive itineraries, and WhatsApp automation.",
};

export default function DemoAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Banner: Quick return to the Live Agency site */}
      <div className="bg-[#2D4A34] text-[#F5F3EF] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-white/10 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-bold text-[#F5F3EF] hover:text-[#D9A23B] transition-colors underline underline-offset-4"
          >
            <ArrowLeft className="size-3.5" /> Back to Live Agency Website
          </Link>
          <span className="hidden sm:inline text-[#F5F3EF]/40">|</span>
          <span className="text-[#F5F3EF]/90 font-medium">
            Agency Tech Studio & Web Design Services
          </span>
        </div>

        <Link href="/demo/annapurna-treks#contact">
          <Button
            variant="primary"
            size="sm"
            className="h-6.5 text-[11px] px-3 bg-[#7FA05C] hover:bg-[#6E8C4E] text-white border-none shadow-xs font-bold"
          >
            Get A Free Prototype
          </Button>
        </Link>
      </div>

      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
