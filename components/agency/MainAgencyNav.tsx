"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mountain,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Phone,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";
import { useSiteConfig } from "@/components/customizer/SiteConfigContext";
import { SAMPLE_LOGOS } from "@/components/customizer/SampleLogos";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";

export function MainAgencyNav() {
  const pathname = usePathname();
  const { config } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeDropdown) {
        setActiveDropdown(null);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));

      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setScrolled(rect.bottom <= 80);
      } else {
        setScrolled(window.scrollY > 80);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLogoIcon = () => {
    if (config.logoType === "custom" && config.customLogoDataUri) {
      return (
        <img
          src={config.customLogoDataUri}
          alt={config.agencyName}
          className="size-8 object-contain rounded-lg"
        />
      );
    }
    if (config.logoType === "sample" && config.sampleLogoId) {
      const sample = SAMPLE_LOGOS.find((l) => l.id === config.sampleLogoId);
      if (sample) {
        return sample.renderSvg("size-6 text-[#7FA05C]");
      }
    }
    return <Mountain className="size-6 text-[#7FA05C]" />;
  };

  const nepalPackages = DEMO_PACKAGES.filter((p) => p.destination === "Nepal");
  const headerBgClass = scrolled
    ? "bg-[#2D4A34]/95 backdrop-blur-md shadow-lg border-b border-[#7C8A96]/30 py-1 text-white"
    : "bg-gradient-to-b from-black/70 via-black/35 to-transparent border-b border-transparent py-1.5 text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      {/* Scroll Progress Indicator Line */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#3E7C94] via-[#7FA05C] to-[#D9A23B] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="size-10 rounded-xl bg-white/10 backdrop-blur-xs text-white border border-white/25 flex items-center justify-center font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform overflow-hidden p-1">
              {renderLogoIcon()}
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg text-white tracking-tight leading-none group-hover:text-[#D9A23B] transition-colors">
                {config.agencyName}
              </div>
              <div className="text-[10px] tracking-wider uppercase font-bold text-[#7FA05C] mt-1">
                Pioneering Expeditions · Est. 2008
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-white">
            {/* Nepal Mega Menu with Click/Tap Disclosure & Full ARIA Keyboard Support */}
            <div
              ref={dropdownRef}
              className="relative py-2"
            >
              <button
                ref={triggerRef}
                id="nepal-nav-trigger"
                type="button"
                onClick={() => setActiveDropdown((cur) => (cur === "nepal" ? null : "nepal"))}
                aria-expanded={activeDropdown === "nepal"}
                aria-haspopup="true"
                aria-controls="nepal-nav-menu"
                className={`flex items-center gap-1 hover:text-[#D9A23B] transition-colors cursor-pointer py-1 ${
                  activeDropdown === "nepal" ? "text-[#D9A23B]" : ""
                }`}
              >
                <span>NEPAL TREKS</span>
                <ChevronDown className={`size-3.5 opacity-70 transition-transform duration-200 ${
                  activeDropdown === "nepal" ? "rotate-180 text-[#D9A23B]" : ""
                }`} />
              </button>

              {activeDropdown === "nepal" && (
                <div
                  id="nepal-nav-menu"
                  role="menu"
                  aria-labelledby="nepal-nav-trigger"
                  className="absolute top-full left-0 w-[540px] bg-white text-[#33322E] rounded-xl shadow-2xl border border-[#7C8A96]/20 p-5 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7FA05C] mb-2.5">
                      Signature Routes
                    </div>
                    <ul className="space-y-2">
                      {nepalPackages.map((pkg) => (
                        <li key={pkg.id}>
                          <Link
                            href={`/tour/${pkg.slug}`}
                            role="menuitem"
                            className="block p-2 rounded-lg hover:bg-[#F5F3EF] focus:bg-[#F5F3EF] focus:outline-none focus:ring-1 focus:ring-[#7FA05C] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="font-bold text-xs text-[#2D4A34] hover:underline">
                              {pkg.title}
                            </div>
                            <div className="text-[11px] text-[#7C8A96] mt-0.5">
                              {pkg.duration} · {pkg.altitude}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-l border-[#7C8A96]/15 pl-4 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7FA05C] mb-2.5">
                        Trekking Regions
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <Link
                          href="/tour?region=Everest"
                          role="menuitem"
                          className="block py-1 hover:text-[#2D4A34] focus:text-[#2D4A34] focus:outline-none font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🏔️ Everest Base Camp & Kala Patthar
                        </Link>
                        <Link
                          href="/tour?region=Annapurna"
                          role="menuitem"
                          className="block py-1 hover:text-[#2D4A34] focus:text-[#2D4A34] focus:outline-none font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🌿 Annapurna Circuit & Sanctuary
                        </Link>
                        <Link
                          href="/tour?region=Manaslu"
                          role="menuitem"
                          className="block py-1 hover:text-[#2D4A34] focus:text-[#2D4A34] focus:outline-none font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🦅 Manaslu Circuit (Restricted Area)
                        </Link>
                        <Link
                          href="/tour?region=Langtang"
                          role="menuitem"
                          className="block py-1 hover:text-[#2D4A34] focus:text-[#2D4A34] focus:outline-none font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🌸 Langtang Valley Eco Traverses
                        </Link>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#7C8A96]/15 mt-3">
                      <Link
                        href="/tour"
                        role="menuitem"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#3E7C94] hover:underline focus:underline focus:outline-none"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Browse All Trips <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/bhutan" className="hover:text-[#D9A23B] transition-colors">
              BHUTAN
            </Link>

            <Link href="/tibet" className="hover:text-[#D9A23B] transition-colors">
              TIBET
            </Link>

            <Link href="/about" className="hover:text-[#D9A23B] transition-colors">
              ABOUT US
            </Link>

            <Link href="/blog" className="hover:text-[#D9A23B] transition-colors">
              GUIDES & BLOG
            </Link>

            <Link href="/contact" className="hover:text-[#D9A23B] transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Right Action & Controls */}
          <div className="flex items-center gap-2.5">
            {/* AI Trip Planner Nav Pill */}
            <Link
              href="/trip-planner"
              id="nav-ai-trip-planner"
              className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border ${
                pathname === "/trip-planner"
                  ? "bg-gradient-to-r from-[#DD6B2E] via-[#D9A23B] to-[#7FA05C] text-white border-white/40 shadow-lg scale-105"
                  : "bg-white/12 hover:bg-white/20 text-white border-white/20 hover:border-white/40 hover:scale-102"
              }`}
            >
              <span className="flex items-center justify-center size-4 rounded-full bg-amber-400/25 text-amber-300 animate-pulse">
                <Sparkles className="size-2.5" />
              </span>
              <span className="tracking-tight whitespace-nowrap">AI Trip Planner</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 uppercase tracking-wider shadow-xs">
                AI
              </span>
            </Link>

            {/* Book Trip Button */}
            <Link
              href="/booking"
              className="px-4 py-2 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="size-3.5" />
              <span>Book Trip</span>
            </Link>

            {/* Mobile Drawer Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2D4A34] text-white border-t border-white/15 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            href="/"
            className="block py-2 text-sm font-bold border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Featured Mobile AI Trip Planner Link */}
          <Link
            href="/trip-planner"
            className={`flex items-center justify-between p-3 rounded-xl border text-white font-bold text-xs transition-all shadow-md ${
              pathname === "/trip-planner"
                ? "bg-gradient-to-r from-[#DD6B2E] to-[#7FA05C] border-white/40"
                : "bg-white/15 hover:bg-white/25 border-white/20"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center size-7 rounded-full bg-amber-400/25 text-amber-300">
                <Sparkles className="size-4" />
              </span>
              <div className="text-left">
                <div className="text-xs font-extrabold text-white">AI Custom Trip Planner</div>
                <div className="text-[10px] text-white/75 font-normal">Interactive day-by-day itineraries</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 uppercase tracking-wider">
              NEW AI
            </span>
          </Link>

          <div className="text-xs font-extrabold uppercase tracking-wider text-[#7FA05C] pt-2">
            Top Treks
          </div>
          <div className="pl-2 space-y-2 text-xs text-white/90">
            {nepalPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/tour/${pkg.slug}`}
                className="block py-1 hover:text-[#D9A23B]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {pkg.title} ({pkg.duration})
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-bold">
            <Link
              href="/tour"
              className="block py-1 hover:text-[#D9A23B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏔️ All Treks & Expeditions
            </Link>
            <Link
              href="/bhutan"
              className="block py-1 hover:text-[#D9A23B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              🇧🇹 Bhutan Kingdom Tours
            </Link>
            <Link
              href="/tibet"
              className="block py-1 hover:text-[#D9A23B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏔️ Tibet Roof of the World
            </Link>
            <Link
              href="/blog"
              className="block py-1 hover:text-[#D9A23B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              📖 Himalayan Guides & Blog
            </Link>
            <Link
              href="/about"
              className="block py-1 hover:text-[#D9A23B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Company & Sherpas
            </Link>
            <Link
              href="/contact"
              className="block py-1 hover:text-[#D9A23B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/booking"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-bold text-xs shadow-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Trip Dates
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
