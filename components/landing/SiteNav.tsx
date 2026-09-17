"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Compass, Sparkles } from "lucide-react";

export function SiteNav({
  onRequestPreview,
}: {
  onRequestPreview?: () => void;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        setScrolled(window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2D4A34]/95 backdrop-blur-md shadow-md border-b border-[#7C8A96]/30 py-3"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      {/* Scroll progress bar: Water blue #3E7C94 to Meadow #7FA05C to CTA Orange #DD6B2E */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#3E7C94] via-[#7FA05C] to-[#DD6B2E] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Wordmark Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DD6B2E] rounded-lg"
          aria-label="My Planet Services Home"
        >
          <div className="relative size-10 rounded-full bg-white/90 border border-[#7C8A96]/40 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-xs">
            <Image
              src="/assets/logo.svg"
              alt="My Planet Services Logo"
              width={26}
              height={26}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-heading font-extrabold text-base tracking-tight transition-colors ${
                scrolled
                  ? "text-[#F5F3EF] group-hover:text-[#D9A23B]"
                  : "text-[#2D4A34] group-hover:text-[#DD6B2E]"
              }`}
            >
              My Planet Services
            </span>
            <span
              className={`text-[10px] uppercase font-bold tracking-wider transition-colors ${
                scrolled ? "text-[#F5F3EF]/75" : "text-[#2D4A34]/75"
              }`}
            >
              Nepal Travel Tech Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-7 text-sm font-bold transition-colors ${
            scrolled ? "text-[#F5F3EF]" : "text-[#2D4A34]"
          }`}
          aria-label="Main Navigation"
        >
          <Link
            href="#before-after"
            className={`transition-colors relative py-1 ${
              scrolled ? "hover:text-[#D9A23B]" : "hover:text-[#DD6B2E]"
            }`}
          >
            The Shift
          </Link>
          <Link
            href="#features"
            className={`transition-colors relative py-1 ${
              scrolled ? "hover:text-[#D9A23B]" : "hover:text-[#DD6B2E]"
            }`}
          >
            Features
          </Link>
          <Link
            href="/demo/annapurna-treks"
            className={`inline-flex items-center gap-1.5 py-1 transition-colors ${
              scrolled ? "text-[#F5F3EF] hover:text-[#D9A23B]" : "text-[#2D4A34] hover:text-[#DD6B2E]"
            }`}
          >
            <Compass className="size-3.5 text-[#7FA05C]" />
            Live Demo Agency
          </Link>
          <Link
            href="#pricing"
            className={`transition-colors relative py-1 ${
              scrolled ? "hover:text-[#D9A23B]" : "hover:text-[#DD6B2E]"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className={`transition-colors relative py-1 ${
              scrolled ? "hover:text-[#D9A23B]" : "hover:text-[#DD6B2E]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Primary CTA: Exclusively CTA Orange #DD6B2E */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={
              onRequestPreview
                ? onRequestPreview
                : () => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
            }
            className="gap-2 font-bold shadow-md shadow-[#DD6B2E]/25"
          >
            <Sparkles className="size-3.5" />
            <span>See a Free Preview</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={
              onRequestPreview
                ? onRequestPreview
                : () => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
            }
            className="text-xs h-9 px-3"
          >
            Preview
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors focus:outline-none ${
              scrolled
                ? "text-[#F5F3EF] hover:bg-[#7C8A96]/20"
                : "text-[#2D4A34] hover:bg-[#7C8A96]/20"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu in Deep Pine #2D4A34 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2D4A34] border-b border-[#7C8A96]/40 px-6 py-5 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-4 text-base font-bold text-[#F5F3EF]">
            <Link
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D9A23B] transition-colors"
            >
              The Shift (Before vs After)
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D9A23B] transition-colors"
            >
              Booking & Tech Features
            </Link>
            <Link
              href="/demo/annapurna-treks"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F5F3EF] flex items-center gap-2"
            >
              <Compass className="size-4 text-[#7FA05C]" />
              Live Demo: Zenith Himalaya
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D9A23B] transition-colors"
            >
              Agency Pricing Tiers
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D9A23B] transition-colors"
            >
              Request Custom Preview
            </Link>

            <div className="pt-3 border-t border-[#7C8A96]/30">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onRequestPreview) {
                    onRequestPreview();
                  } else {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full justify-center text-sm"
              >
                Instant Agency Preview Generator
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
