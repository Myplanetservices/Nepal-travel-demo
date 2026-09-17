"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileCheck2,
  AlertTriangle,
  HeartHandshake,
  ShieldCheck,
  Calendar,
  CreditCard,
  Mountain,
  Plane,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import {
  PassportStamp,
  PaperAirplaneContrail,
  AnimatedTravelBadge,
} from "@/components/travel/TravelStickers";

export default function TermsOfBookingPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Header */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1920&auto=format&fit=crop"
            alt="Alpine Trail Expeditions"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>

        {/* Animated 2D Stickers */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge
            icon="tickets"
            label="EXPEDITION CONTRACT"
            animation="animate-float-gentle"
            variant="dark"
          />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp
            text="TERMS & CONDITIONS"
            date="2026"
            className="w-16 h-16 opacity-90 text-white animate-tilt-float"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              Zenith Himalaya Expedition Agreement
            </Badge>
            <AnimatedTravelBadge
              icon="compass"
              label="TRANSPARENT ETHICS"
              animation="animate-gentle-pulse"
              variant="dark"
            />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl !text-white tracking-tight leading-tight drop-shadow-lg">
            Terms of Booking & Expedition Conditions
          </h1>
          <p className="mt-3 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
            Clear, transparent contractual policies regarding deposit guarantees, high-altitude mountain safety protocols, porter welfare standards, and flight contingencies.
          </p>
          <div className="mt-4 text-[11px] text-[#D9A23B] font-semibold">
            Effective for all departures from 2026 onwards · Governed under Nepal Tourism Regulations
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 space-y-10 text-[#33322E]">
        {/* Important Alert Callout */}
        <div className="bg-[#2D4A34] text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#D9A23B]">
            <ShieldCheck className="size-5" />
            <span>High-Altitude Safety Is Our Highest Contractual Priority</span>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F3EF]/85 leading-relaxed">
            Himalayan trekking and climbing take place in unpredictable, remote alpine environments. By booking with Zenith Himalaya, you are partnering with certified UIAGM/NATHM Sherpa leaders whose foremost obligation is to ensure you complete your journey safely and return home in good health.
          </p>
        </div>

        {/* Section 1: Reservation & 10% Deposit */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Reservation, 10% Deposit Lock & Balance Payment
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            <p>
              To confirm your expedition dates and lock in your guide roster, a <strong>10% deposit per person</strong> is required at the time of booking.
            </p>
            <p>
              The remaining balance (90%) is payable in Kathmandu prior to trail departure during your pre-trek briefing, either via cash (USD, EUR, GBP, NPR) or credit card (VISA/MasterCard/AMEX with bank transaction surcharge) or advance SWIFT bank transfer.
            </p>
          </div>
        </div>

        {/* Section 2: Compulsory Travel & Helicopter Evacuation Insurance */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Compulsory High-Altitude Insurance Requirement
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Travel insurance is strictly mandatory for all participants on treks rising above 3,000 meters. Your policy must explicitly include:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#33322E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Emergency Helicopter Evacuation:</strong> Coverage minimum of $100,000 USD for emergency mountain search, rescue, and charter evacuation up to 6,000 meters (20,000 ft).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Medical Treatment & Repatriation:</strong> Hospitalization, hyperbaric treatment, and clinical repatriation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span>You must provide your insurer name, policy certificate, and 24/7 international emergency claims phone number prior to leaving Kathmandu.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Guide Authority & Mountain Safety */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Lead Sherpa Guide Authority & Safety Protocols
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Our Senior Sherpa Expedition Leaders possess decades of high-altitude experience and hold international Wilderness First Aid credentials. During the trek:
          </p>
          <div className="p-4 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/15 text-xs text-[#33322E] space-y-2">
            <p>
              The Lead Guide holds <strong>sole and absolute authority</strong> to halt an ascent, order immediate descent, or initiate helicopter evacuation if a participant exhibits worsening symptoms of Acute Mountain Sickness (AMS), High Altitude Cerebral Edema (HACE), or High Altitude Pulmonary Edema (HAPE), or if trail/weather conditions (e.g., blizzards on Thorong La or Larkya La pass) create imminent hazard.
            </p>
            <p className="font-bold text-[#2D4A34]">
              Clients agree to comply with all safety instructions issued by the Lead Guide without dispute.
            </p>
          </div>
        </div>

        {/* Section 4: Weather & Mountain Flight Delays */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Weather Delays, Lukla Flights & Buffer Days
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Flights into remote high-mountain airstrips (such as Tenzing-Hillary Airport in Lukla or Paro Airport in Bhutan) operate under Visual Flight Rules (VFR) and are vulnerable to sudden cloud cover or crosswinds.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#33322E]">
            <li className="flex items-start gap-2">
              <Clock className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span>We strongly advise booking international departure flights with at least <strong>1 to 2 contingency buffer days</strong> after scheduled trek completion.</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span>In the event of fixed-wing flight cancellations, Zenith Himalaya can assist in chartering emergency shared helicopter shuttles (passengers pay the fare difference directly or claim via travel insurance).</span>
            </li>
          </ul>
        </div>

        {/* Section 5: Cancellation & Date Flexibility */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Cancellation, Rescheduling & Refund Schedules
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/15">
                <div className="text-[10px] uppercase font-bold text-[#7FA05C]">30+ Days Prior</div>
                <div className="font-bold text-xs text-[#2D4A34] mt-1">100% Date Transfer</div>
                <p className="text-[11px] text-[#7C8A96] mt-1">
                  Transfer your full deposit to any departure date within 24 months with zero fee, or refund minus permit fees already issued.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/15">
                <div className="text-[10px] uppercase font-bold text-[#D9A23B]">15 - 29 Days Prior</div>
                <div className="font-bold text-xs text-[#2D4A34] mt-1">50% Credit</div>
                <p className="text-[11px] text-[#7C8A96] mt-1">
                  50% of deposit credited to future departures; remaining 50% covers advance teahouse and domestic flight holds.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/15">
                <div className="text-[10px] uppercase font-bold text-red-600">&lt; 14 Days Prior</div>
                <div className="font-bold text-xs text-[#2D4A34] mt-1">Deposit Retained</div>
                <p className="text-[11px] text-[#7C8A96] mt-1">
                  Deposit covers committed guide contracts, porter retainer, and non-refundable national park entry stamps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Porter Welfare Guarantee */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              6
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Ethical Porter Welfare & Fair Labor Guarantee
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Zenith Himalaya operates strictly under the guidelines of the International Porter Protection Group (IPPG) and the Himalayan Trust:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#33322E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Load Limits:</strong> Maximum porter baggage weight is strictly capped at 20 kg per porter (shared between two clients at 10kg duffel allocation each).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Gear & Medical Protection:</strong> All porters are equipped with insulated mountain boots, down jackets, sunglasses, and the same emergency rescue medical insurance as guides.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span>Fair industry-leading wages paid on schedule with guaranteed food and warm lodging across all teahouse sectors.</span>
            </li>
          </ul>
        </div>

        {/* Section 7: Cross-Border Bhutan & Tibet Terms */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              7
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Cross-Border Expeditions (Bhutan & Tibet)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Travel into Bhutan requires prepayment of the Government Sustainable Development Fee (SDF, $100/night) and Drukair tickets. Travel into Tibet requires group Chinese visa processing in Kathmandu and the Tibet Travel Permit (TTP). If border entry regulations are altered by sovereign authorities, Zenith Himalaya facilitates full credit or itinerary rerouting without penalty fees.
          </p>
        </div>

        {/* Back Link */}
        <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#7C8A96]">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#2D4A34] transition-colors">
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#2D4A34] transition-colors">
            Read Privacy Policy &rarr;
          </Link>
        </div>
      </main>

      <AgencyFooter />
    </div>
  );
}
