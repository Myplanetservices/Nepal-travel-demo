"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  FileText,
  HeartPulse,
  CreditCard,
  Plane,
  Eye,
  Mail,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import {
  PassportStamp,
  PaperAirplaneContrail,
  AnimatedTravelBadge,
} from "@/components/travel/TravelStickers";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Header */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop"
            alt="Himalayan Mountain Wilderness"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>

        {/* Animated 2D Stickers */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge
            icon="passport"
            label="DATA CONFIDENTIALITY"
            animation="animate-float-gentle"
            variant="dark"
          />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp
            text="LEGAL & PRIVACY"
            date="2026"
            className="w-16 h-16 opacity-90 text-white animate-tilt-float"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              Zenith Himalaya Legal Protocols
            </Badge>
            <AnimatedTravelBadge
              icon="compass"
              label="CLIENT TRUST & PRIVACY"
              animation="animate-gentle-pulse"
              variant="dark"
            />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl !text-white tracking-tight leading-tight drop-shadow-lg">
            Privacy & Data Protection Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
            How Zenith Himalaya handles your passport identity, high-altitude medical disclosures, emergency rescue coordination, and cross-border permit clearances.
          </p>
          <div className="mt-4 text-[11px] text-[#D9A23B] font-semibold">
            Last Updated: March 2026 · Compliant with Nepal Tourism Act & International Travel Privacy Standards
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 space-y-10 text-[#33322E]">
        {/* Quick Summary Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-heading font-extrabold text-base text-[#2D4A34]">
            <ShieldCheck className="size-5 text-[#7FA05C]" />
            <span>Our Privacy Commitment to Trekkers & Climbers</span>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            When planning an expedition into the Himalayas, sharing personal, medical, and passport data is essential for securing official government conservation permits, TIMS cards, and international rescue readiness. Zenith Himalaya pledges that your information is collected strictly for expedition logistics, permit issuance, and emergency safety—never sold or shared with commercial marketers.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Expedition Information We Collect
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            To coordinate your journey across Nepal, Bhutan, or Tibet, we require specific details during booking and trip preparation:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#33322E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Passport Identity Documents:</strong> Full legal name, date of birth, passport number, nationality, issue/expiry dates, and digital passport photos required by the Nepal Department of Tourism, ACAP, Sagarmatha National Park, Bhutan Department of Tourism (SDF clearance), and Tibet Tourism Bureau (TTP).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Travel & Rescue Insurance Details:</strong> Policy number, international 24/7 emergency claims assistance phone numbers, and policy certificate verifying emergency helicopter evacuation up to 6,000 meters.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Next of Kin & Emergency Contacts:</strong> Full names, direct contact numbers, and relationship of two designated emergency contacts back home.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span><strong>Dietary & Basic Physical Fitness Profile:</strong> Food allergies, dietary preferences (vegetarian, vegan, gluten-free), and prior high-altitude hiking history to help our Sherpa guides pace your ascent.</span>
            </li>
          </ul>
        </div>

        {/* Section 2: Health & High-Altitude Medical Data */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              High-Altitude Medical & Health Disclosures
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Trekking at altitudes between 3,000m and 5,500m places unique physiological demands on the human body. We ask clients to complete a confidential pre-departure health disclosure form:
          </p>
          <div className="bg-[#F5F3EF] p-4 rounded-xl border border-[#7C8A96]/15 text-xs text-[#33322E] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#2D4A34]">
              <HeartPulse className="size-4 text-[#7FA05C]" />
              <span>Strict Medical Confidentiality Guarantee</span>
            </div>
            <p className="text-[#7C8A96] leading-relaxed">
              Medical disclosures regarding pre-existing cardiovascular, respiratory, or asthmatic conditions are accessed exclusively by your assigned Senior Sherpa Expedition Director and our standby expedition medical consultant. In the event of Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), or traumatic injury, this information enables immediate, life-saving triage decisions.
            </p>
          </div>
        </div>

        {/* Section 3: Emergency Helicopter Rescue Data Sharing */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Emergency Rescue & Helicopter Dispatch Sharing
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            In severe alpine emergencies where your lead guide determines that immediate descent by foot is unsafe, Zenith Himalaya initiates an emergency helicopter evacuation. In this critical scenario:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#33322E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span>Your GPS trail coordinates, altitude, passport copy, and insurance emergency contact are transmitted directly to certified rescue helicopter operators (e.g., Simrik Air, Altitude Air, Dynasty Aviation).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
              <span>We immediately notify your international insurance claims desk with your policy number to secure hospital guarantee clearance at CIWEC Hospital or ERA Clinic in Kathmandu.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Payment Security */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Payment Security & Transaction Integrity
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            All online booking deposits (10%) and card payments are processed using 256-bit TLS/SSL encryption through authorized international gateway acquirers. Zenith Himalaya does not store, view, or retain your raw credit card CVV/CVC numbers or debit card PINs on any server. SWIFT wire payments are verified directly with our corporate account at Nepal Investment Mega Bank in Kathmandu.
          </p>
        </div>

        {/* Section 5: Data Retention & Inquiries */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#7C8A96]/15 pb-3">
            <div className="size-8 rounded-lg bg-[#2D4A34] text-white flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#2D4A34]">
              Data Retention & Contacting Our Privacy Officer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
            Permit documentation is retained for the mandatory statutory period required by the Government of Nepal Department of Tourism and Inland Revenue Department for audit compliance, after which temporary medical files and passport scans may be deleted upon client request.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/20">
            <div>
              <div className="font-bold text-xs text-[#2D4A34]">Zenith Himalaya Privacy Office</div>
              <div className="text-[11px] text-[#7C8A96]">Tridevi Marg, Thamel, Kathmandu 44600, Nepal</div>
              <div className="text-[11px] text-[#2D4A34] font-medium">Email: contact@zenithhimalaya.com</div>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-xl bg-[#2D4A34] text-white font-bold text-xs hover:bg-[#1F2E23] transition-colors"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#7C8A96]">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#2D4A34] transition-colors">
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
          <Link href="/terms-of-booking" className="hover:text-[#2D4A34] transition-colors">
            Read Terms of Booking &rarr;
          </Link>
        </div>
      </main>

      <AgencyFooter />
    </div>
  );
}
