"use client";

import React, { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { useSiteConfig } from "./SiteConfigContext";
import { CustomizerModal } from "./CustomizerModal";

export function CustomizerTrigger() {
  const { isCustomizerOpen, setIsCustomizerOpen } = useSiteConfig();
  const [showTooltip, setShowTooltip] = useState(false);

  // Implement scroll-depth (15-20%) + dwell-time (3-4 seconds) auto-trigger
  useEffect(() => {
    // Check if user has already seen or interacted with prompt in this session
    const hasSeenPrompt = sessionStorage.getItem("hasSeenCustomizerPrompt");
    const hasExistingConfig = localStorage.getItem("siteConfig");

    // If already triggered or already customized, don't auto-open
    if (hasSeenPrompt || hasExistingConfig) {
      return;
    }

    let scrollSatisfied = false;
    let timeSatisfied = false;
    let timerId: NodeJS.Timeout | null = null;

    const checkBothSatisfied = () => {
      if (scrollSatisfied && timeSatisfied) {
        sessionStorage.setItem("hasSeenCustomizerPrompt", "true");
        setIsCustomizerOpen(true);
      }
    };

    // 1. Dwell timer: 3.5 seconds
    timerId = setTimeout(() => {
      timeSatisfied = true;
      checkBothSatisfied();
    }, 3500);

    // 2. Scroll depth: 15-20% of page
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;

      // Check if user has scrolled past 15% of viewport height or 10% of total page
      if (scrollPosition > windowHeight * 0.18 || (docHeight > 0 && scrollPosition / docHeight > 0.12)) {
        scrollSatisfied = true;
        checkBothSatisfied();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsCustomizerOpen]);

  return (
    <>
      {/* Floating Action Button (FAB) for Theme Customizer */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        {/* Tooltip on hover */}
        {showTooltip && (
          <div
            role="tooltip"
            className="hidden md:flex items-center absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900/90 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap shadow-xl border border-white/10 animate-fade-in"
          >
            <span>Personalize Agency & Theme</span>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-t border-r border-white/10" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label="Customize Agency Branding and Theme"
          aria-expanded={isCustomizerOpen}
          className="size-14 rounded-full bg-[#2D4A34] text-white shadow-xl shadow-[#2D4A34]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/20 group relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#7FA05C]/40"
          style={{
            backgroundColor: "var(--color-primary, #2D4A34)",
          }}
        >
          {/* Subtle light sweep animation */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <Palette className="size-6 transition-transform duration-300 group-hover:rotate-12" />

          {/* Micro-dot indicator */}
          <span
            className="absolute top-2.5 right-2.5 size-2.5 rounded-full bg-[#7FA05C] border-2 border-white ring-1 ring-black/10"
            style={{ backgroundColor: "var(--color-accent, #7FA05C)" }}
          />
        </button>
      </div>

      {/* Modal Dialog */}
      <CustomizerModal />
    </>
  );
}
