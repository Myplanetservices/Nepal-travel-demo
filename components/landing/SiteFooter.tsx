import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUp,
  Globe,
  Sparkles,
  Search,
} from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#2D4A34] text-[#F5F3EF] border-t border-[#7C8A96]/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#F5F3EF] border border-[#7C8A96]/40 flex items-center justify-center">
                <Image
                  src="/assets/logo.svg"
                  alt="My Planet Services"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-base text-[#F5F3EF] tracking-tight">
                My Planet Services
              </span>
            </div>

            <p className="text-xs text-[#F5F3EF]/90 leading-relaxed font-medium">
              The premier digital agency helping Nepal travel and trekking agencies outshine OTA middlemen with modern booking platforms, instant WhatsApp lead capture, and international SEO.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="size-2 rounded-full bg-[#7FA05C] animate-pulse" />
              <span className="text-[11px] text-[#F5F3EF] font-bold">
                Available for New Nepal Agency Builds
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-sm text-[#F5F3EF] uppercase tracking-wider">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#F5F3EF]/90">
              <li>
                <Link href="#before-after" className="hover:text-[#D9A23B] transition-colors">
                  The Digital Gap (Before vs After)
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#D9A23B] transition-colors">
                  Booking Engine & Tech Features
                </Link>
              </li>
              <li>
                <Link href="/demo/annapurna-treks" className="hover:text-[#D9A23B] text-[#F5F3EF] font-bold flex items-center gap-1">
                  <Sparkles className="size-3 text-[#D9A23B]" /> Live Demo Agency Template
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#D9A23B] transition-colors">
                  Agency Pricing Tiers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#D9A23B] transition-colors">
                  Request a Free Custom Prototype
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kathmandu / Pokhara Contact Info */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-sm text-[#F5F3EF] uppercase tracking-wider">
              Nepal Contact Hub
            </div>
            <ul className="space-y-2.5 text-xs text-[#F5F3EF]/90 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
                <span>Thamel & Lazimpat, Kathmandu / Lakeside, Pokhara, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[#7FA05C] shrink-0" />
                <span>WhatsApp / Mobile: +977 980-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-[#7FA05C] shrink-0" />
                <span>hello@myplanetservices.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="size-4 text-[#7FA05C] shrink-0" />
                <span>www.myplanetservices.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: SEO & AEO Pitch */}
          <div className="space-y-3 bg-[#243c2a] p-4 rounded-2xl border border-[#7C8A96]/35">
            <div className="font-heading font-bold text-sm text-[#F5F3EF] flex items-center gap-1.5">
              <Search className="size-4 text-[#D9A23B]" />
              SEO & AEO Ready
            </div>
            <p className="text-[11px] text-[#F5F3EF]/90 leading-relaxed font-medium">
              Every website we build is architected with modern JSON-LD schema, Next.js static rendering, and AI Answer Engine Optimization (AEO) so AI travel planners recommend your agency first.
            </p>
            <div className="pt-1">
              <span className="text-[10px] text-[#D9A23B] font-mono font-bold">
                Schema.org TravelAgency & TourOperator Validated
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#7C8A96]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F3EF]/80 font-medium">
          <div>
            © {new Date().getFullYear()} My Planet Services. All rights reserved. Crafted for Nepal's Tourism Ecosystem.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#F5F3EF] hover:text-[#D9A23B] transition-colors cursor-pointer font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
