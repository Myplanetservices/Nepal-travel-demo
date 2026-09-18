"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Palette,
  Sparkles,
  Upload,
  Check,
  RotateCcw,
  Sliders,
  Type,
  Eye,
  Mountain,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useSiteConfig, THEME_PALETTES, ThemePalette } from "./SiteConfigContext";
import { SAMPLE_LOGOS } from "./SampleLogos";

export function CustomizerModal() {
  const {
    config,
    activePalette,
    isCustomizerOpen,
    setIsCustomizerOpen,
    setAgencyName,
    setCustomLogo,
    setSampleLogo,
    setThemeId,
    resetToDefault,
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<"branding" | "theme">("branding");
  const [nameInput, setNameInput] = useState(config.agencyName);
  const [nameError, setNameError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state when config changes or modal opens
  useEffect(() => {
    if (isCustomizerOpen) {
      setNameInput(config.agencyName);
      setNameError("");
      setUploadError("");
    }
  }, [isCustomizerOpen, config.agencyName]);

  // Handle Escape key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCustomizerOpen) {
        setIsCustomizerOpen(false);
      }
    };
    if (isCustomizerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCustomizerOpen, setIsCustomizerOpen]);

  if (!isCustomizerOpen) return null;

  // Handle name validation and update
  const handleNameChange = (val: string) => {
    setNameInput(val);
    if (val.trim().length < 2) {
      setNameError("Agency name must be at least 2 characters.");
    } else if (val.length > 40) {
      setNameError("Agency name cannot exceed 40 characters.");
    } else {
      setNameError("");
      setAgencyName(val.trim());
    }
  };

  /**
   * Client-side Image Resizer via HTML5 Canvas
   * Note: Browser localStorage typically has a 5MB - 10MB quota per origin.
   * Resizing to max 512x512px WebP/JPEG keeps the data URI safely under ~40-80KB.
   */
  const processImageFile = (file: File) => {
    setUploadError("");
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/)) {
      setUploadError("Please upload a PNG, JPG, WebP, or SVG image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File size exceeds 2MB limit. Please choose a smaller image.");
      return;
    }

    // If SVG, read as direct data URL
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCustomLogo(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // Raster image: resize using canvas to max 512x512
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 512;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedDataUri = canvas.toDataURL("image/webp", 0.9);
          setCustomLogo(resizedDataUri);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // Helper to render current active logo
  const renderCurrentLogo = (size = "size-7") => {
    if (config.logoType === "custom" && config.customLogoDataUri) {
      return (
        <div className={`relative ${size} rounded-lg overflow-hidden shrink-0`}>
          <Image src={config.customLogoDataUri} alt="Custom Logo" fill className="object-contain" />
        </div>
      );
    }
    if (config.logoType === "sample" && config.sampleLogoId) {
      const found = SAMPLE_LOGOS.find((l) => l.id === config.sampleLogoId);
      if (found) return found.renderSvg(size);
    }
    return <Mountain className={`${size} text-[#7FA05C]`} style={{ color: "var(--color-accent)" }} />;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      aria-label="Customize Your Site"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCustomizerOpen(false);
      }}
    >
      <div
        id="customizer-modal-panel"
        ref={modalRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-[#F5F3EF] rounded-3xl border border-[#7C8A96]/30 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 bg-[#2D4A34] text-white flex items-center justify-between shadow-md shrink-0"
          style={{ backgroundColor: "var(--color-primary, #2D4A34)" }}
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#7FA05C]">
              <Palette className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  White-Label Customizer
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#7FA05C] text-white font-extrabold text-[10px] tracking-wide uppercase">
                  Real-Time
                </span>
              </div>
              <p className="text-xs text-white/75">
                Personalize agency branding and color palette live across the site.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomizerOpen(false)}
            aria-label="Close Customizer"
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Live Mini-Preview Browser Chrome */}
        <div className="bg-white/70 border-b border-[#7C8A96]/20 px-5 py-3 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#7C8A96] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Eye className="size-3 text-[#7FA05C]" /> Live Preview Chrome
            </span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#2D4A34]">
              Theme: {activePalette.name}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#7C8A96]/20 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="size-9 rounded-xl flex items-center justify-center bg-[#2D4A34]/10 text-[#2D4A34]"
                style={{ color: "var(--color-primary)" }}
              >
                {renderCurrentLogo("size-5")}
              </div>
              <div>
                <div
                  className="font-heading font-extrabold text-sm text-[#2D4A34] leading-none"
                  style={{ color: "var(--color-primary)" }}
                >
                  {config.agencyName || "Your Travel Agency"}
                </div>
                <div className="text-[10px] text-[#7C8A96] mt-0.5 font-medium">
                  High Alpine Expeditions · Est. 2008
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="hidden sm:block px-3 py-1 rounded-lg text-white font-bold text-[11px] shadow-xs"
                style={{ backgroundColor: "var(--color-cta)" }}
              >
                Book Trip
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#7C8A96]/20 bg-white/40 px-5 pt-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("branding")}
            className={`pb-3 px-4 font-heading font-extrabold text-xs transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === "branding"
                ? "border-[#2D4A34] text-[#2D4A34]"
                : "border-transparent text-[#7C8A96] hover:text-[#2D4A34]"
            }`}
          >
            <Sliders className="size-3.5" />
            <span>1. Agency Branding (Name & Logo)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("theme")}
            className={`pb-3 px-4 font-heading font-extrabold text-xs transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === "theme"
                ? "border-[#2D4A34] text-[#2D4A34]"
                : "border-transparent text-[#7C8A96] hover:text-[#2D4A34]"
            }`}
          >
            <Palette className="size-3.5" />
            <span>2. Color Palette & Typography</span>
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6"
        >
          {activeTab === "branding" ? (
            <div className="space-y-6">
              {/* Agency Name Input */}
              <div className="bg-white p-5 rounded-2xl border border-[#7C8A96]/20 shadow-xs space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#2D4A34]">
                  Your Agency Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => handleNameChange(e.target.value)}
                    maxLength={40}
                    placeholder="e.g. Alpine Odyssey Expeditions"
                    className={`w-full h-11 px-3.5 bg-[#F5F3EF] border rounded-xl text-xs sm:text-sm font-bold focus:outline-none transition-colors ${
                      nameError ? "border-red-500 focus:border-red-500" : "border-[#7C8A96]/30 focus:border-[#2D4A34]"
                    }`}
                  />
                  <span className="absolute right-3 top-3.5 text-[10px] font-bold text-[#7C8A96]">
                    {nameInput.length}/40
                  </span>
                </div>
                {nameError ? (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="size-3 shrink-0" /> {nameError}
                  </p>
                ) : (
                  <p className="text-[11px] text-[#7C8A96]">
                    Live updates header title, page title tag, and footer copyright automatically.
                  </p>
                )}
              </div>

              {/* Logo Upload Section */}
              <div className="bg-white p-5 rounded-2xl border border-[#7C8A96]/20 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#2D4A34]">
                    Custom Logo Upload
                  </label>
                  <span className="text-[10px] text-[#7C8A96]">Max 2MB · Resized to 512x512</span>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                    dragActive
                      ? "border-[#7FA05C] bg-[#7FA05C]/10"
                      : "border-[#7C8A96]/30 hover:border-[#2D4A34] bg-[#F5F3EF]/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={(e) => {
                      if (e.target.files?.[0]) processImageFile(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                  <div className="size-10 rounded-full bg-[#2D4A34]/10 text-[#2D4A34] flex items-center justify-center mx-auto mb-2">
                    <Upload className="size-5" />
                  </div>
                  <p className="text-xs font-bold text-[#2D4A34]">
                    Click to browse or drag & drop logo
                  </p>
                  <p className="text-[11px] text-[#7C8A96] mt-0.5">
                    Supports transparent PNG, SVG, WebP, or JPG
                  </p>
                </div>

                {uploadError && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="size-3 shrink-0" /> {uploadError}
                  </p>
                )}

                {config.logoType === "custom" && config.customLogoDataUri && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#7FA05C]/15 border border-[#7FA05C]/30 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#2D4A34]">
                      <CheckCircle2 className="size-4 text-[#7FA05C]" />
                      <span>Custom uploaded logo is currently active</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSampleLogo("mountain-peak")}
                      className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Sample Travel Agency Logos Gallery */}
              <div className="bg-white p-5 rounded-2xl border border-[#7C8A96]/20 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2D4A34]">
                      Sample Travel Agency Logos (8 Inline Vector Marks)
                    </h3>
                    <p className="text-[11px] text-[#7C8A96] mt-0.5">
                      Recolors automatically to match whichever theme palette you select.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SAMPLE_LOGOS.map((logo) => {
                    const isSelected = config.logoType === "sample" && config.sampleLogoId === logo.id;
                    return (
                      <button
                        key={logo.id}
                        type="button"
                        onClick={() => setSampleLogo(logo.id)}
                        className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative group ${
                          isSelected
                            ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-sm ring-2 ring-[#7FA05C]"
                            : "border-[#7C8A96]/20 hover:border-[#2D4A34] bg-[#F5F3EF]/50 hover:scale-105"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-[#7FA05C] text-white flex items-center justify-center">
                            <Check className="size-2.5 stroke-[3]" />
                          </span>
                        )}
                        <div
                          className="size-10 rounded-xl bg-white shadow-2xs flex items-center justify-center transition-colors"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {logo.renderSvg("size-6")}
                        </div>
                        <span className="text-[11px] font-bold text-[#2D4A34] leading-tight">
                          {logo.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset to Default Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetToDefault();
                    setNameInput("Zenith Himalaya");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#7C8A96]/30 text-[#2D4A34] hover:bg-[#F5F3EF] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="size-3.5 text-[#7FA05C]" />
                  <span>Reset to Original Zenith Himalaya Branding</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#2D4A34]">
                    Select a Curated Travel Theme Palette
                  </h3>
                  <p className="text-xs text-[#7C8A96]">
                    Click any palette to update the whole website in real time without refreshing.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {THEME_PALETTES.map((palette) => {
                  const isSelected = activePalette.id === palette.id;
                  return (
                    <div
                      key={palette.id}
                      onClick={() => setThemeId(palette.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? "border-[#2D4A34] bg-white shadow-md ring-2 ring-[#7FA05C]"
                          : "border-[#7C8A96]/20 bg-white/70 hover:bg-white hover:border-[#2D4A34] hover:shadow-sm"
                      }`}
                    >
                      <div>
                        {/* 4-Color Swatch Chip */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex rounded-xl overflow-hidden border border-black/10 shadow-2xs h-7 w-28">
                            {palette.previewGradient.map((color, cIdx) => (
                              <div
                                key={cIdx}
                                className="flex-1 h-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          {palette.isDark && (
                            <span className="px-2 py-0.5 rounded-md bg-[#0F172A] text-[#38BDF8] text-[9px] font-extrabold uppercase tracking-wide">
                              Dark Mode
                            </span>
                          )}
                          {isSelected && (
                            <span className="ml-auto size-5 rounded-full bg-[#7FA05C] text-white flex items-center justify-center">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <h4 className="font-heading font-extrabold text-sm text-[#2D4A34]">
                          {palette.name}
                        </h4>
                        <p className="text-xs text-[#7C8A96] mt-1 leading-relaxed">
                          {palette.description}
                        </p>
                      </div>

                      {/* Font Pairing Chip */}
                      <div className="mt-3 pt-2.5 border-t border-[#7C8A96]/15 flex items-center gap-2 text-[10px] font-bold text-[#7C8A96]">
                        <Type className="size-3 text-[#7FA05C]" />
                        <span>{palette.fonts.heading.replace(/['"]+/g, "").split(",")[0]} + {palette.fonts.body.replace(/['"]+/g, "").split(",")[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Action Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#7C8A96]/20 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-[#7C8A96] font-medium hidden sm:block">
            All changes are saved to your browser session and persist on reload.
          </div>

          <button
            type="button"
            onClick={() => setIsCustomizerOpen(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer ml-auto flex items-center justify-center gap-2"
            style={{ backgroundColor: "var(--color-primary, #2D4A34)" }}
          >
            <Check className="size-4 text-[#7FA05C]" />
            <span>Apply & Close Customizer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
