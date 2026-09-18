"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ThemePalette {
  id: string;
  name: string;
  description: string;
  isDark?: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    surface: string;
    textPrimary: string;
    textMuted: string;
    border: string;
    cta: string;
  };
  fonts: {
    heading: string;
    body: string;
    googleFontUrl?: string;
  };
  previewGradient: string[];
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: "alpine-frost",
    name: "Alpine Frost",
    description: "Original high-altitude Sherpa pine, snow white & meadow green.",
    isDark: false,
    colors: {
      primary: "#2D4A34",
      secondary: "#1B2F22",
      accent: "#7FA05C",
      bg: "#F5F3EF",
      surface: "#FFFFFF",
      textPrimary: "#33322E",
      textMuted: "#7C8A96",
      border: "#E2DFD8",
      cta: "#DD6B2E",
    },
    fonts: {
      heading: "var(--font-manrope), sans-serif",
      body: "var(--font-dm-sans), sans-serif",
    },
    previewGradient: ["#2D4A34", "#7FA05C", "#DD6B2E", "#F5F3EF"],
  },
  {
    id: "ocean-horizon",
    name: "Ocean Horizon",
    description: "Deep teal, coastal turquoise and sandy beige with a warm coral accent.",
    isDark: false,
    colors: {
      primary: "#0F766E",
      secondary: "#115E59",
      accent: "#14B8A6",
      bg: "#F7F5F0",
      surface: "#FFFFFF",
      textPrimary: "#1E293B",
      textMuted: "#64748B",
      border: "#E2E8F0",
      cta: "#F97316",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap",
    },
    previewGradient: ["#0F766E", "#14B8A6", "#F97316", "#F7F5F0"],
  },
  {
    id: "sunset-safari",
    name: "Sunset Safari",
    description: "Burnt orange, deep terracotta and highland golden hour warmth.",
    isDark: false,
    colors: {
      primary: "#9A3412",
      secondary: "#7C2D12",
      accent: "#EAB308",
      bg: "#FAF5EF",
      surface: "#FFFFFF",
      textPrimary: "#292524",
      textMuted: "#78716C",
      border: "#E7E5E4",
      cta: "#C2410C",
    },
    fonts: {
      heading: "'Outfit', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&display=swap",
    },
    previewGradient: ["#9A3412", "#C2410C", "#EAB308", "#FAF5EF"],
  },
  {
    id: "rainforest-canopy",
    name: "Rainforest Canopy",
    description: "Deep emerald foliage, moss green accents and golden amber glow.",
    isDark: false,
    colors: {
      primary: "#064E3B",
      secondary: "#022C22",
      accent: "#16A34A",
      bg: "#F3F6F3",
      surface: "#FFFFFF",
      textPrimary: "#1C1917",
      textMuted: "#57534E",
      border: "#D6D3D1",
      cta: "#D97706",
    },
    fonts: {
      heading: "'Fraunces', serif",
      body: "'Work Sans', sans-serif",
      googleFontUrl: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Work+Sans:wght@400;500;600&display=swap",
    },
    previewGradient: ["#064E3B", "#16A34A", "#D97706", "#F3F6F3"],
  },
  {
    id: "desert-mirage",
    name: "Desert Mirage",
    description: "Mustang sandstone canyons, dusty rosewood and rich copper highlights.",
    isDark: false,
    colors: {
      primary: "#881337",
      secondary: "#4C0519",
      accent: "#D97706",
      bg: "#FBF6F0",
      surface: "#FFFFFF",
      textPrimary: "#27272A",
      textMuted: "#71717A",
      border: "#E4E4E7",
      cta: "#EA580C",
    },
    fonts: {
      heading: "'Syne', sans-serif",
      body: "'Plus Jakarta Sans', sans-serif",
      googleFontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap",
    },
    previewGradient: ["#881337", "#EA580C", "#D97706", "#FBF6F0"],
  },
  {
    id: "midnight-voyage",
    name: "Midnight Voyage",
    description: "Full dark mode variant with deep space navy and luminous cyan accents.",
    isDark: true,
    colors: {
      primary: "#38BDF8",
      secondary: "#0284C7",
      accent: "#06B6D4",
      bg: "#0B1120",
      surface: "#1E293B",
      textPrimary: "#F8FAFC",
      textMuted: "#94A3B8",
      border: "#334155",
      cta: "#38BDF8",
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap",
    },
    previewGradient: ["#0B1120", "#1E293B", "#38BDF8", "#06B6D4"],
  },
];

export interface SiteConfig {
  agencyName: string;
  logoType: "default" | "custom" | "sample";
  customLogoDataUri: string | null;
  sampleLogoId: string | null;
  themeId: string;
  customOverrides?: Record<string, string>;
}

const DEFAULT_CONFIG: SiteConfig = {
  agencyName: "Zenith Himalaya",
  logoType: "default",
  customLogoDataUri: null,
  sampleLogoId: null,
  themeId: "alpine-frost",
};

interface SiteConfigContextType {
  config: SiteConfig;
  activePalette: ThemePalette;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  setAgencyName: (name: string) => void;
  setCustomLogo: (dataUri: string) => void;
  setSampleLogo: (logoId: string) => void;
  setThemeId: (themeId: string) => void;
  resetToDefault: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load configuration from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("siteConfig");
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn("Failed to read siteConfig from localStorage:", e);
    }
    setMounted(true);
  }, []);

  // Find active palette
  const activePalette =
    THEME_PALETTES.find((p) => p.id === config.themeId) || THEME_PALETTES[0];

  // Apply CSS variables to :root and document title
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const colors = activePalette.colors;

    // Apply color tokens
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-bg", colors.bg);
    root.style.setProperty("--color-surface", colors.surface);
    root.style.setProperty("--color-text-primary", colors.textPrimary);
    root.style.setProperty("--color-text-muted", colors.textMuted);
    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-cta", colors.cta);

    // Also update existing semantic aliases in globals.css
    root.style.setProperty("--pine", colors.primary);
    root.style.setProperty("--meadow", colors.accent);
    root.style.setProperty("--cta", colors.cta);
    root.style.setProperty("--background", colors.bg);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--text", colors.textPrimary);

    // Apply dark mode toggle
    if (activePalette.isDark) {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }

    // Apply typography font overrides
    if (activePalette.fonts.heading) {
      root.style.setProperty("--font-heading-override", activePalette.fonts.heading);
    }
    if (activePalette.fonts.body) {
      root.style.setProperty("--font-body-override", activePalette.fonts.body);
    }

    // Conditionally lazy-load Google Font link
    if (activePalette.fonts.googleFontUrl) {
      const linkId = `font-${activePalette.id}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = activePalette.fonts.googleFontUrl;
        document.head.appendChild(link);
      }
    }

    // Update document title dynamically
    if (config.agencyName) {
      document.title = `${config.agencyName} | High Alpine Expeditions & Treks`;
    }
  }, [activePalette, config.agencyName]);

  // Persist to localStorage whenever config updates (after mount)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("siteConfig", JSON.stringify(config));
    } catch (e) {
      console.warn("Failed to persist siteConfig to localStorage:", e);
    }
  }, [config, mounted]);

  const setAgencyName = useCallback((name: string) => {
    // Sanitize: strip HTML tags and clamp to 40 characters
    const sanitized = name.replace(/<[^>]*>?/gm, "").slice(0, 40);
    setConfig((prev) => ({ ...prev, agencyName: sanitized }));
  }, []);

  const setCustomLogo = useCallback((dataUri: string) => {
    setConfig((prev) => ({
      ...prev,
      logoType: "custom",
      customLogoDataUri: dataUri,
      sampleLogoId: null,
    }));
  }, []);

  const setSampleLogo = useCallback((logoId: string) => {
    setConfig((prev) => ({
      ...prev,
      logoType: "sample",
      sampleLogoId: logoId,
      customLogoDataUri: null,
    }));
  }, []);

  const setThemeId = useCallback((themeId: string) => {
    setConfig((prev) => ({ ...prev, themeId }));
  }, []);

  const resetToDefault = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem("siteConfig");
    } catch {}
  }, []);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        activePalette,
        isCustomizerOpen,
        setIsCustomizerOpen,
        setAgencyName,
        setCustomLogo,
        setSampleLogo,
        setThemeId,
        resetToDefault,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}
