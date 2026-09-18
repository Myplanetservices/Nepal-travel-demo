"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Zap,
  ShieldCheck,
  Compass,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Pixels of scroll travel per second of video.
// Tuned so that a 10s video takes 1,600px of scroll (~4-5 natural wheel scrolls)
const PIXELS_PER_SECOND = 160;

export function HeroSection({
  onRequestPreview,
  showProofBar = false,
}: {
  onRequestPreview?: () => void;
  showProofBar?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const [videoFailed, setVideoFailed] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);

  // iOS Safari touch-unlock helper: enables frame-by-frame video seeking on first interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unlocked = false;
    const unlockVideo = () => {
      if (unlocked || !video) return;
      unlocked = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {
            // Safe fallback if browser security policy holds
          });
      }
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("pointerdown", unlockVideo);
    };

    window.addEventListener("touchstart", unlockVideo, { passive: true, once: true });
    window.addEventListener("pointerdown", unlockVideo, { passive: true, once: true });

    return () => {
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("pointerdown", unlockVideo);
    };
  }, []);

  // Set up GSAP ScrollTrigger proxy scrub
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!section || !container || !video) return;

    // Check prefers-reduced-motion: if enabled, avoid scroll scrubbing
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    const initScrubTrigger = () => {
      const duration = !isNaN(video.duration) && video.duration > 0 ? video.duration : 10;
      setVideoDuration(duration);
      setIsVideoReady(true);

      const totalScrollDistance = duration * PIXELS_PER_SECOND;

      const ctx = gsap.context(() => {
        const proxy = { t: 0 };

        // Main Scroll-Driven Video Playback Proxy
        gsap.to(proxy, {
          t: duration,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScrollDistance}`,
            pin: container,
            pinSpacing: true,
            scrub: 1, // numeric scrub (1s smoothing) prevents frame-snapping
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Update video currentTime safely
              if (video && video.readyState >= 2 && !isNaN(proxy.t)) {
                video.currentTime = Math.min(duration - 0.04, Math.max(0, proxy.t));
              }
              // Progress ratio (0 to 100%)
              setScrubProgress(Math.round(self.progress * 100));
            },
          },
        });

        // Cinematic overlay opacity fade as the user scrubs through the trail
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0.15,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalScrollDistance * 0.45}`,
              scrub: 0.8,
            },
          });
        }

        // Hero content text smooth fade-out as user begins scrolling down
        if (heroContentRef.current) {
          gsap.to(heroContentRef.current, {
            opacity: 0,
            y: -25,
            ease: "power1.out",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalScrollDistance * 0.25}`,
              scrub: 0.6,
            },
          });
        }

        // Scrub prompt indicator fade
        if (indicatorRef.current) {
          gsap.to(indicatorRef.current, {
            opacity: 0,
            y: 20,
            ease: "power1.out",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalScrollDistance * 0.2}`,
              scrub: 0.5,
            },
          });
        }

        ScrollTrigger.refresh();
      }, section);

      return () => ctx.revert();
    };

    if (video.readyState >= 1 && !isNaN(video.duration) && video.duration > 0) {
      return initScrubTrigger();
    } else {
      const handleLoadedMetadata = () => {
        initScrubTrigger();
      };
      video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative w-full bg-[#F5F3EF] overflow-visible"
    >
      {/* Pinned 100vh Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden flex flex-col justify-between transform-gpu will-change-transform bg-[#F5F3EF]"
      >
        {/* Frame-by-Frame Scroll-Scrubbed Video Element */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        >
          <source src="/videos/hero-hq.webm" type="video/webm" />
          <source src="/videos/hero-hq.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Fallback image if video fails to load */}
        {videoFailed && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/videos/hero-poster.jpg')" }}
          />
        )}

        {/* Subtle Cinematic Vignette for crystal-clear readability */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-1"
        />

        {/* Hero Expedition Narrative Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 text-center pointer-events-auto flex flex-col items-center justify-start select-none"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-md text-xs font-bold text-white mb-3 animate-in fade-in duration-300">
            <span className="flex size-2 rounded-full bg-[#7FA05C] animate-pulse" />
            <span className="tracking-wide">Certified Sherpa Expeditions · Nepal · Bhutan · Tibet</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] mb-3">
            Pioneering Journeys Across the High Himalayas
          </h1>

          {/* Authentic Description */}
          <p className="max-w-xl text-xs sm:text-sm lg:text-base text-white/95 font-medium leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] mb-5">
            Authentic, Sherpa-led traverses from Everest Base Camp to sacred valleys. Guaranteed 2026 departures, verified permits, and uncompromised alpine safety since 2008.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#packages"
              className="px-5 py-2.5 rounded-xl bg-[#2D4A34] hover:bg-[#1E3725] text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <span>Explore Expeditions</span>
              <Compass className="size-4 text-[#7FA05C]" />
            </a>

            <Link
              href="/trip-planner"
              className="px-5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-[#2D4A34] hover:text-[#DD6B2E] border border-white/40 backdrop-blur-md font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="size-4 text-[#DD6B2E]" />
              <span>AI Trip Planner</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] font-bold text-white bg-black/35 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-md">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-[#7FA05C]" />
              Govt. Reg. #NP-78492
            </span>
            <span className="text-white/40">·</span>
            <span>⭐ 4.9/5 Rating (420+ Climbers)</span>
            <span className="text-white/40">·</span>
            <span>📅 10% Flexible Deposit</span>
          </div>
        </div>

        {/* Bottom Scroll Prompt Indicator */}
        <div
          ref={indicatorRef}
          className="relative z-10 pb-6 text-center text-xs font-extrabold text-[#2D4A34] flex items-center justify-center pointer-events-none"
        >
          <span className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-black/5 shadow-xs animate-bounce font-bold text-xs text-[#2D4A34]">
            Scroll to hike the trail ↓
          </span>
        </div>
      </div>

      {/* Agency Impact Proof Bar (optional): Surfaces in Sky White #F5F3EF, Borders in Mountain #7C8A96 */}
      {showProofBar && (
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 mb-14">
          <div className="rounded-2xl bg-white border border-[#7C8A96]/30 p-5 sm:p-6 shadow-card grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#7C8A96]/25">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 flex items-center justify-center text-[#2D4A34] shrink-0 shadow-xs">
                <TrendingUp className="size-6 text-[#7FA05C]" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-heading text-[#2D4A34] tracking-tight">
                  +310%
                </div>
                <div className="text-xs text-[#33322E] font-bold">
                  Direct Booking Inquiries vs. Facebook DM
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
              <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 flex items-center justify-center text-[#2D4A34] shrink-0 shadow-xs">
                <Zap className="size-6 text-[#D9A23B]" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-heading text-[#2D4A34] tracking-tight">
                  &lt; 1.2s
                </div>
                <div className="text-xs text-[#33322E] font-bold">
                  Ultra-Fast Mobile Speed on 3G/4G Networks
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
              <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 flex items-center justify-center text-[#2D4A34] shrink-0 shadow-xs">
                <ShieldCheck className="size-6 text-[#3E7C94]" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-heading text-[#2D4A34] tracking-tight">
                  0%
                </div>
                <div className="text-xs text-[#33322E] font-bold">
                  Commission Kept by Foreign Middleman OTAs
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
