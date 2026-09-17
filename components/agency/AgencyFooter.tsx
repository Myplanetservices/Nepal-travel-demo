"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mountain,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  CreditCard,
  HeartHandshake,
  ArrowUp,
  Send,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

export function AgencyFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0E1B13] text-[#F5F3EF] border-t border-[#1F3A27] pt-10 pb-8 overflow-hidden z-10 font-sans selection:bg-[#7FA05C]/30 selection:text-white">
      {/* Top Ambient Glow & Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7FA05C]/40 to-transparent" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7FA05C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-72 h-72 bg-[#3E7C94]/4 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#7FA05C_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            SLEEK INLINE EXPEDITION DISPATCH STRIP (Compact & Professional)
            ========================================================================= */}
        <div className="mb-9 pb-7 border-b border-[#1F3A27]/80 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center lg:text-left">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div>
              <div className="font-heading font-bold text-sm text-white tracking-tight">
                Himalayan Dispatch &amp; Live Trail Advisories
              </div>
              <p className="text-xs text-[#F5F3EF]/65">
                Monthly snowline reports, permit windows &amp; packing intel from Namche &amp; Pokhara guides.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md mx-auto lg:mx-0">
              <div className="relative flex-1 sm:w-64">
                <Mail className="size-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for advisories"
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/15 focus:border-[#7FA05C] focus:outline-hidden text-xs text-white placeholder-white/40 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#7FA05C] hover:bg-[#6E8F4D] active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Join</span>
                <Send className="size-3" />
              </button>
            </form>
            {isSubscribed && (
              <div className="mt-1 text-[11px] font-semibold text-[#7FA05C] flex items-center justify-center lg:justify-start gap-1">
                <CheckCircle2 className="size-3" />
                <span>Subscribed to Zenith Himalaya dispatch!</span>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            BALANCED 4-COLUMN FOOTER GRID (Compact & Perfectly Arranged)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* -----------------------------------------------------------------------
              COLUMN 1: BRAND IDENTITY & CONTACT (lg:col-span-4)
              ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-3.5">
            {/* Logo + Tagline */}
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-[#1E3725] text-[#7FA05C] flex items-center justify-center font-bold text-base shadow-sm border border-[#7FA05C]/40 shrink-0">
                <Mountain className="size-4.5" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg text-white tracking-tight leading-none">
                  Zenith Himalaya
                </div>
                <div className="text-[10px] tracking-widest uppercase font-bold text-[#7FA05C] mt-0.5">
                  Sherpa Expeditions · Est. 2008
                </div>
              </div>
            </div>

            {/* Registration Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-[10px] font-bold text-white shadow-2xs">
                <span>🏔️</span>
                <span className="text-[#7FA05C]">Govt. Reg. #NP-78492</span>
                <span className="text-white/30">·</span>
                <span>Sherpa Led</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-semibold text-[#F5F3EF]/75">
                <ShieldCheck className="size-3 text-[#7FA05C]" />
                100% Native Owned
              </span>
            </div>

            {/* Concise Mission */}
            <p className="text-xs text-[#F5F3EF]/75 leading-relaxed pr-2">
              Govt. Registered alpine agency (#NP-78492) operating certified expeditions across Nepal, Bhutan, and Tibet with an unblemished safety record since 2008.
            </p>

            {/* Compact Contact Rows */}
            <div className="space-y-1.5 text-xs text-[#F5F3EF]/80 pt-1 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#7FA05C] shrink-0" />
                <span className="text-[11px] text-[#F5F3EF]/75 truncate">
                  <strong className="text-white font-medium">Head Office:</strong> Tridevi Marg, Thamel, Kathmandu
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#7FA05C] shrink-0" />
                <span className="text-[11px] text-[#F5F3EF]/75 truncate">
                  <strong className="text-white font-medium">Branch:</strong> Lakeside-6, Pokhara 33700
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#7FA05C] shrink-0" />
                <span className="font-mono text-[11px] text-white">
                  <a href="tel:+97714700000" className="hover:text-[#7FA05C] transition-colors">
                    +977-1-4700000
                  </a>
                  {" · "}
                  <a href="tel:+9779801234567" className="hover:text-[#7FA05C] transition-colors">
                    +977-980-1234567
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#7FA05C] shrink-0" />
                <a
                  href="mailto:contact@zenithhimalaya.com"
                  className="text-[11px] text-[#F5F3EF]/85 hover:text-white hover:underline transition-colors"
                >
                  contact@zenithhimalaya.com
                </a>
              </div>
            </div>

            {/* Social & TripAdvisor Badges */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-7 rounded-lg bg-white/5 hover:bg-[#7FA05C] hover:text-white text-white/80 border border-white/10 flex items-center justify-center transition-all"
              >
                <svg className="size-3 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="size-7 rounded-lg bg-white/5 hover:bg-[#CD201F] hover:text-white text-white/80 border border-white/10 flex items-center justify-center transition-all"
              >
                <svg className="size-3 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-7 rounded-lg bg-white/5 hover:bg-[#1877F2] hover:text-white text-white/80 border border-white/10 flex items-center justify-center transition-all"
              >
                <svg className="size-3 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <Link
                href="/#reviews"
                className="px-2 py-1 rounded-lg bg-[#00AA6C]/20 hover:bg-[#00AA6C]/30 text-[#00AA6C] border border-[#00AA6C]/40 text-[10px] font-bold flex items-center gap-1 transition-all"
              >
                <span>TripAdvisor 4.9★</span>
              </Link>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              COLUMN 2: SIGNATURE TREKS & TOURS (lg:col-span-3)
              ----------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7FA05C] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#7FA05C]" />
              <span>Signature Treks &amp; Tours</span>
            </h4>

            <ul className="space-y-2 text-xs text-[#F5F3EF]/85">
              <li>
                <Link
                  href="/tour/everest-base-camp-trek"
                  className="flex items-center justify-between group hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate pr-2">
                    Everest Base Camp &amp; Kala Patthar
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#7FA05C] bg-[#7FA05C]/10 px-1.5 py-0.5 rounded border border-[#7FA05C]/25 shrink-0">
                    14 Days
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tour/annapurna-circuit-trek"
                  className="flex items-center justify-between group hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate pr-2">
                    Annapurna Circuit via Thorong La
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#7FA05C] bg-[#7FA05C]/10 px-1.5 py-0.5 rounded border border-[#7FA05C]/25 shrink-0">
                    14 Days
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tour/annapurna-base-camp-trek"
                  className="flex items-center justify-between group hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate pr-2">
                    Annapurna Base Camp Sanctuary
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#7FA05C] bg-[#7FA05C]/10 px-1.5 py-0.5 rounded border border-[#7FA05C]/25 shrink-0">
                    10 Days
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tour/manaslu-circuit-trek"
                  className="flex items-center justify-between group hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate pr-2">
                    Manaslu Circuit &amp; Larkya La
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#7FA05C] bg-[#7FA05C]/10 px-1.5 py-0.5 rounded border border-[#7FA05C]/25 shrink-0">
                    14 Days
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tour/langtang-valley-trek"
                  className="flex items-center justify-between group hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate pr-2">
                    Langtang Valley &amp; Kyanjin Gompa
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#7FA05C] bg-[#7FA05C]/10 px-1.5 py-0.5 rounded border border-[#7FA05C]/25 shrink-0">
                    8 Days
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bhutan"
                  className="flex items-center justify-between group hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate pr-2">
                    Bhutan Kingdom of Thunder Dragon
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#7FA05C] bg-[#7FA05C]/10 px-1.5 py-0.5 rounded border border-[#7FA05C]/25 shrink-0">
                    7 Days
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* -----------------------------------------------------------------------
              COLUMN 3: HELPFUL TRAVEL RESOURCES (lg:col-span-2)
              ----------------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7FA05C] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#7FA05C]" />
              <span>Helpful Resources</span>
            </h4>

            <ul className="space-y-2 text-xs text-[#F5F3EF]/80 font-medium">
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Why Choose Us &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Altitude Safety &amp; Oxygen
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Packing List for High Altitude
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  TripAdvisor Reviews (4.9★)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Tailor-Made Custom Trips
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Porter Welfare &amp; IPPG Ethics
                </Link>
              </li>
              <li>
                <Link href="/terms-of-booking" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Permit Windows &amp; Visas
                </Link>
              </li>
              <li>
                <Link href="/day-tours" className="hover:text-white hover:translate-x-0.5 transition-all block truncate">
                  Scenic Day Tours &amp; Ballooning
                </Link>
              </li>
            </ul>
          </div>

          {/* -----------------------------------------------------------------------
              COLUMN 4: ACCREDITATIONS & TRUST (lg:col-span-3)
              ----------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7FA05C] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#7FA05C]" />
              <span>Accreditations &amp; Trust</span>
            </h4>

            {/* Compact 2x2 Bento Trust Cards */}
            <div className="grid grid-cols-2 gap-2">
              {/* Card 1: Govt Registered */}
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#7FA05C]/40 transition-all group">
                <div className="size-6 rounded-md bg-[#7FA05C]/15 text-[#7FA05C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[10px] sm:text-[11px] text-white leading-tight">Govt Registered</div>
                  <div className="text-[9px] text-[#F5F3EF]/60 truncate">#NP-78492</div>
                </div>
              </div>

              {/* Card 2: TAAN Member */}
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#D9A23B]/40 transition-all group">
                <div className="size-6 rounded-md bg-[#D9A23B]/15 text-[#D9A23B] flex items-center justify-center shrink-0">
                  <Award className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[10px] sm:text-[11px] text-white leading-tight">TAAN Member</div>
                  <div className="text-[9px] text-[#F5F3EF]/60 truncate">Verified Active</div>
                </div>
              </div>

              {/* Card 3: NMA Certified */}
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#3E7C94]/40 transition-all group">
                <div className="size-6 rounded-md bg-[#3E7C94]/15 text-[#3E7C94] flex items-center justify-center shrink-0">
                  <HeartHandshake className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[10px] sm:text-[11px] text-white leading-tight">NMA Certified</div>
                  <div className="text-[9px] text-[#F5F3EF]/60 truncate">Mountaineering</div>
                </div>
              </div>

              {/* Card 4: Secure Payments */}
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 transition-all group">
                <div className="size-6 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <CreditCard className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[10px] sm:text-[11px] text-white leading-tight">Secure Payments</div>
                  <div className="text-[9px] text-[#F5F3EF]/60 truncate">10% Deposit Lock</div>
                </div>
              </div>
            </div>

            {/* Accepted Payment Methods & SSL Security Note */}
            <div className="pt-1.5 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[#F5F3EF]/70">
                <span className="font-medium">Accepted Payments:</span>
                <span className="flex items-center gap-1 text-[#7FA05C] font-semibold text-[10px]">
                  <Lock className="size-2.5" />
                  <span>256-Bit Bank Encrypted</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-black/40 border border-white/15 font-mono text-[9px] font-bold tracking-wider text-white shadow-2xs">
                  VISA
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/40 border border-white/15 font-mono text-[9px] font-bold tracking-wider text-white shadow-2xs">
                  MasterCard
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/40 border border-white/15 font-mono text-[9px] font-bold tracking-wider text-white shadow-2xs">
                  AMEX
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/40 border border-white/15 font-mono text-[9px] font-bold tracking-wider text-white shadow-2xs">
                  SWIFT Wire
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM SUB-FOOTER BAR (Compact & Professional)
            ========================================================================= */}
        <div className="mt-8 pt-5 border-t border-[#1F3A27] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#F5F3EF]/65">
          {/* Left: Copyright */}
          <div className="text-center md:text-left text-[11px]">
            © {new Date().getFullYear()} Zenith Himalaya Expeditions. All rights reserved.
          </div>

          {/* Center: Agency Tech Services Pill */}
          <div className="flex items-center justify-center">
            <a
              href="https://myplanetservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#7FA05C]/40 text-[11px] text-[#F5F3EF]/80 hover:text-white transition-all group"
            >
              <Sparkles className="size-3 text-[#D9A23B] group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Agency Tech Services</span>
              <span className="text-white/30">·</span>
              <span className="text-[#F5F3EF]/60">3D Portfolios &amp; Digital Systems</span>
            </a>
          </div>

          {/* Right: Legal Links + Smooth Back to Top */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms-of-booking" className="hover:text-white transition-colors">
              Terms of Booking
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <span className="text-white/20">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#7FA05C] hover:text-white font-bold transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
