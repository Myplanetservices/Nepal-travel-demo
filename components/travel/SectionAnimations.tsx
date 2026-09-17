"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Hook to detect whether the user has requested reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}

/**
 * Hook to trigger a one-time reveal when an element intersects the viewport.
 */
export function useIntersectionReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || inView) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}

/**
 * Hook to calculate subtle vertical parallax offset (moves at 70-80% of scroll speed, max ~40-60px offset).
 */
export function useParallaxOffset(prefersReducedMotion: boolean, maxOffset = 50) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate only when partially visible in viewport
          if (rect.bottom >= 0 && rect.top <= windowHeight) {
            const totalScrollRange = windowHeight + rect.height;
            const currentPosition = windowHeight - rect.top;
            const progress = Math.max(0, Math.min(1, currentPosition / totalScrollRange));
            // Offset range: -maxOffset/2 to +maxOffset/2 (e.g. -25px to +25px = 50px total travel)
            const offset = (progress - 0.5) * maxOffset;
            setOffsetY(Math.round(offset));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion, maxOffset]);

  return { containerRef, offsetY };
}

/**
 * Stat Counter component: counts up from 0 to target over ~1.8s (ease-out) once triggered.
 */
export function StatCounter({
  target,
  suffix = "",
  inView,
  prefersReducedMotion,
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
  prefersReducedMotion: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    // Instant fallback if reduced motion is preferred
    if (prefersReducedMotion) {
      setCount(target);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, target, duration, prefersReducedMotion]);

  return (
    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight">
      <span>{count}</span>
      <span>{suffix}</span>
    </div>
  );
}
