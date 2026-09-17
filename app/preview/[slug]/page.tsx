import React from "react";
import Link from "next/link";
import { getAgencyBySlug, PRESET_AGENCIES } from "@/lib/agencies";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Mountain,
  MapPin,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PRESET_AGENCIES).map((slug) => ({ slug }));
}

export default async function AgencyPreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#33322E] flex flex-col font-sans">
      {/* Personalized Outreach Floating Bar: Deep Pine #2D4A34 */}
      <div className="bg-[#2D4A34] text-[#F5F3EF] px-4 py-3 sticky top-0 z-50 border-b border-[#7C8A96]/30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7FA05C]/25 text-[#F5F3EF] font-extrabold uppercase text-[10px] border border-[#7FA05C]/40">
              <Sparkles className="size-3 text-[#D9A23B]" /> Exclusive Prototype
            </span>
            <span className="font-semibold text-[#F5F3EF]">
              Prepared for:{" "}
              <span className="text-[#F5F3EF] font-bold underline underline-offset-2">
                {agency.name}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[#F5F3EF]/85 hover:text-[#D9A23B] transition-colors font-medium"
            >
              ← My Planet Services
            </Link>
            <Link href="/#contact">
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-xs px-3"
              >
                Claim & Launch This Site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Personalized Agency Header */}
      <header className="bg-white border-b border-[#7C8A96]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between text-xs text-[#33322E] font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-[#2D4A34]">
              <ShieldCheck className="size-4 text-[#7FA05C]" />
              {agency.regNumber}
            </span>
            <span className="hidden md:flex items-center gap-1 text-[#7C8A96]">
              <MapPin className="size-3.5 text-[#7FA05C]" />
              {agency.city}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#7C8A96] font-mono text-[11px] font-bold">{agency.phone}</span>
            <a
              href={`https://wa.me/${agency.phone.replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(agency.name)}!`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-bold text-[#2D4A34] hover:text-[#3E7C94]"
            >
              <MessageCircle className="size-3.5 text-[#7FA05C]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Agency Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-[#2D4A34] text-[#F5F3EF] flex items-center justify-center font-extrabold text-xl shadow-md border border-[#2D4A34]">
              <Mountain className="size-6 text-[#F5F3EF]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl text-[#2D4A34] tracking-tight leading-none">
                {agency.name}
              </div>
              <div className="text-[10px] tracking-wider uppercase font-bold text-[#7FA05C] mt-1">
                {agency.tagline}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/#contact">
              <Button
                variant="primary"
                size="md"
                className="text-xs font-bold"
              >
                Schedule 15-Min Walkthrough
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Personalized Hero Section: Deep Pine Surface */}
      <section className="relative py-16 sm:py-24 bg-[#2D4A34] text-[#F5F3EF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="meadow" className="mb-4 font-bold bg-[#7FA05C] text-white border-[#6E8C4E]">
              ★ Tailored Demonstration for {agency.clientOwnerName}
            </Badge>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF] tracking-tight leading-[1.1]">
              Welcome to the Future of{" "}
              <span className="text-[#D9A23B]">{agency.name}</span>.
            </h1>

            <p className="mt-4 text-base text-[#F5F3EF]/90 leading-relaxed max-w-2xl font-medium">
              {agency.customOutreachPitch}
            </p>

            {/* Simulated Flagship Trek Box */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#243c2a] border border-[#7C8A96]/40 max-w-xl shadow-lg">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9A23B] block mb-1">
                Featured Online Booking Module
              </span>
              <h3 className="font-heading font-extrabold text-xl text-[#F5F3EF]">
                {agency.flagshipTrek.title}
              </h3>
              <p className="text-xs text-[#F5F3EF]/85 mt-1.5 leading-relaxed font-medium">
                {agency.flagshipTrek.description}
              </p>

              <div className="mt-4 pt-4 border-t border-[#F5F3EF]/20 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[#7FA05C] block text-[10px] uppercase font-bold">Trek Price</span>
                  <span className="text-xl font-extrabold font-heading text-[#F5F3EF]">
                    ${agency.flagshipTrek.priceUSD} USD
                  </span>
                </div>
                <div className="space-y-0.5 text-right">
                  <span className="text-[#7FA05C] block text-[10px] uppercase font-bold">Max Altitude</span>
                  <span className="text-xs font-mono font-bold text-[#F5F3EF]">
                    {agency.flagshipTrek.altitude}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Before / After Section */}
      <BeforeAfterSection
        agencyName={agency.name}
        customTrek={agency.flagshipTrek.title}
        isPersonalized={true}
      />

      {/* Pitch to Agency Director */}
      <section className="py-16 bg-[#F5F3EF] border-t border-[#7C8A96]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="meadow">
            Direct Agency Partnership
          </Badge>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#2D4A34] tracking-tight">
            Ready to deploy this exact site for {agency.name}?
          </h2>

          <p className="text-sm sm:text-base text-[#33322E]/85 leading-relaxed font-medium">
            We can transfer this entire codebase, connect your official domain name, integrate your bank or card checkout, and have you accepting direct international bookings in 7 days.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact">
              <Button variant="primary" size="lg" className="gap-2">
                <span>Schedule a 15-Minute Coffee or Zoom Chat</span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>

            <a
              href="https://wa.me/9779801234567?text=Hi%20My%20Planet%20Services,%20I%20reviewed%20our%20agency%20preview%20and%20want%20to%20discuss%20pricing."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 h-13 rounded-full bg-white hover:bg-[#F5F3EF] text-[#33322E] font-bold text-sm transition-colors border border-[#7C8A96]/30"
            >
              <MessageCircle className="size-4 text-[#7FA05C]" />
              <span>Message Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Personalized Preview Footer: Deep Pine #2D4A34 */}
      <footer className="bg-[#2D4A34] text-[#F5F3EF] py-8 border-t border-[#7C8A96]/30 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#F5F3EF]/85 font-medium">
            Private Demonstration Page prepared by{" "}
            <Link href="/" className="text-[#F5F3EF] font-bold underline hover:text-[#D9A23B]">
              My Planet Services
            </Link>{" "}
            exclusively for {agency.name}. All trademarks and company names remain property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
