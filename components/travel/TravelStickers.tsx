"use client";

import React from "react";
import { Icon } from "@iconify/react";

/**
 * Exact 2D Retro Green Camera Sticker matching Image 3
 */
export function RetroCameraSticker({
  className = "w-16 h-14",
  tilt = "-rotate-12",
}: {
  className?: string;
  tilt?: string;
}) {
  return (
    <div
      className={`inline-block select-none pointer-events-none drop-shadow-md transition-transform duration-300 hover:scale-110 ${tilt} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 80 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Shutter button top-left */}
        <rect
          x="16"
          y="6"
          width="12"
          height="6"
          rx="2"
          fill="#3B82F6"
          stroke="#1E293B"
          strokeWidth="2.5"
        />
        {/* Flash bulb / viewfinder top-right */}
        <rect
          x="50"
          y="4"
          width="16"
          height="8"
          rx="3"
          fill="#38BDF8"
          stroke="#1E293B"
          strokeWidth="2.5"
        />
        <circle cx="58" cy="8" r="2" fill="#E0F2FE" />

        {/* Main Camera Body (Green - matching Image 3) */}
        <rect
          x="6"
          y="12"
          width="68"
          height="48"
          rx="10"
          fill="#22C55E"
          stroke="#1E293B"
          strokeWidth="3"
        />

        {/* Upper band dark accent */}
        <path
          d="M7 22H73"
          stroke="#1E293B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Lens Outer Ring (Silver/Off-white) */}
        <circle
          cx="40"
          cy="36"
          r="16"
          fill="#E2E8F0"
          stroke="#1E293B"
          strokeWidth="3"
        />

        {/* Lens Middle Ring (Dark teal/navy) */}
        <circle
          cx="40"
          cy="36"
          r="11"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth="2"
        />

        {/* Lens Inner Glass & Reflection (Cyan/Blue glass) */}
        <circle cx="40" cy="36" r="7" fill="#0284C7" />
        <circle cx="38" cy="34" r="2.5" fill="#BAE6FD" />

        {/* Small Front Flash / Sensor */}
        <circle
          cx="20"
          cy="28"
          r="3"
          fill="#FACC15"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/**
 * Exact 2D Boarding Tickets Pair matching Image 3
 */
export function BoardingTicketsSticker({
  className = "w-16 h-14",
  tilt = "rotate-12",
}: {
  className?: string;
  tilt?: string;
}) {
  return (
    <div
      className={`inline-block select-none pointer-events-none drop-shadow-md transition-transform duration-300 hover:scale-110 ${tilt} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 80 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Back Ticket (Orange-gold) */}
        <g transform="rotate(-15 40 32)">
          <rect
            x="14"
            y="14"
            width="52"
            height="26"
            rx="4"
            fill="#F59E0B"
            stroke="#1E293B"
            strokeWidth="2.5"
          />
          {/* Perforation notches */}
          <circle cx="50" cy="14" r="3" fill="#F5F3EF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="50" cy="40" r="3" fill="#F5F3EF" stroke="#1E293B" strokeWidth="2" />
          <line
            x1="50"
            y1="18"
            x2="50"
            y2="36"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </g>

        {/* Front Ticket (Yellow-gold with barcode & star) */}
        <g transform="rotate(10 40 32)">
          <rect
            x="16"
            y="18"
            width="52"
            height="28"
            rx="4"
            fill="#FBBF24"
            stroke="#1E293B"
            strokeWidth="2.5"
          />
          {/* Notches */}
          <circle cx="52" cy="18" r="3" fill="#F5F3EF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="52" cy="46" r="3" fill="#F5F3EF" stroke="#1E293B" strokeWidth="2" />
          <line
            x1="52"
            y1="22"
            x2="52"
            y2="42"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Barcode bars */}
          <rect x="22" y="24" width="2" height="16" fill="#1E293B" />
          <rect x="26" y="24" width="1.5" height="16" fill="#1E293B" />
          <rect x="29" y="24" width="3" height="16" fill="#1E293B" />
          <rect x="34" y="24" width="1" height="16" fill="#1E293B" />
          <rect x="37" y="24" width="2.5" height="16" fill="#1E293B" />

          {/* Tiny flight glyph */}
          <path
            d="M44 32L47 29M47 29L45 27M47 29L42 34"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Faint Luggage Watermark line-drawing matching Image 3 bottom-right
 */
export function LuggageWatermark({
  className = "w-28 h-36 opacity-25",
}: {
  className?: string;
}) {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Retractable Handle */}
        <path
          d="M40 30V10C40 7 43 5 46 5H54C57 5 60 7 60 10V30"
          stroke="#7C8A96"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Handle grip */}
        <rect
          x="42"
          y="5"
          width="16"
          height="4"
          rx="2"
          stroke="#7C8A96"
          strokeWidth="2"
          fill="none"
        />

        {/* Main Suitcase Body */}
        <rect
          x="20"
          y="30"
          width="60"
          height="85"
          rx="12"
          stroke="#7C8A96"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Front Pocket lines */}
        <rect
          x="28"
          y="42"
          width="44"
          height="28"
          rx="6"
          stroke="#7C8A96"
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
        />
        <rect
          x="28"
          y="78"
          width="44"
          height="28"
          rx="6"
          stroke="#7C8A96"
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Wheels */}
        <circle cx="32" cy="118" r="4" stroke="#7C8A96" strokeWidth="2.5" fill="none" />
        <circle cx="68" cy="118" r="4" stroke="#7C8A96" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}

/**
 * Faint Palm Frond Watermark line-drawing matching Image 3 bottom-left
 */
export function PalmWatermark({
  className = "w-32 h-36 opacity-25",
}: {
  className?: string;
}) {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Palm stem */}
        <path
          d="M10 110C35 85 65 50 110 20"
          stroke="#7C8A96"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Palm frond leaves */}
        <path
          d="M110 20C90 15 70 20 60 30M110 20C95 30 85 45 80 60M90 35C75 40 60 55 55 70M75 50C60 58 50 72 45 85M55 70C42 78 35 90 30 100"
          stroke="#7C8A96"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M110 20C100 35 105 55 108 70M90 35C85 50 88 65 90 80M75 50C70 65 72 78 74 90"
          stroke="#7C8A96"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * 2D Paper Airplane with dotted flight contrail
 */
export function PaperAirplaneContrail({
  className = "w-24 h-16",
}: {
  className?: string;
}) {
  return (
    <div
      className={`inline-block select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Curved dotted contrail loop */}
        <path
          d="M10 65C30 75 50 70 45 50C40 30 20 40 30 25C40 10 70 20 95 28"
          stroke="#3E7C94"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="opacity-60"
        />

        {/* Paper Plane */}
        <g transform="translate(90, 22) rotate(-10)">
          <polygon
            points="0,6 24,0 6,18 10,10"
            fill="#F5F3EF"
            stroke="#2D4A34"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <polygon
            points="24,0 6,18 8,10"
            fill="#7FA05C"
            stroke="#2D4A34"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <line
            x1="24"
            y1="0"
            x2="10"
            y2="10"
            stroke="#2D4A34"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Vintage Himalayan Permit & Passport Stamp
 */
export function PassportStamp({
  text = "NEPAL · KHUMBU PERMIT",
  date,
  subtext,
  year,
  className = "w-24 h-24 opacity-40 hover:opacity-75 transition-opacity",
  animation = "",
}: {
  text?: string;
  date?: string;
  subtext?: string;
  year?: string;
  className?: string;
  animation?: string;
}) {
  const displayDate = date || year || "OCT 2026";
  const displaySubtext = subtext || "VERIFIED EXPEDITION";

  return (
    <div
      className={`inline-block select-none pointer-events-none -rotate-12 ${animation} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#2D4A34"
          strokeWidth="2"
          strokeDasharray="5 3"
        />
        <circle cx="50" cy="50" r="38" stroke="#2D4A34" strokeWidth="1.5" />

        {/* Inner Stars */}
        <path
          d="M50 20L52 24L56 25L53 28L54 32L50 30L46 32L47 28L44 25L48 24Z"
          fill="#D9A23B"
        />

        {/* Stamp text */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          fontSize="7"
          fontWeight="bold"
          fill="#2D4A34"
          letterSpacing="1"
        >
          {text}
        </text>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#2D4A34"
          letterSpacing="1.2"
        >
          {displayDate}
        </text>
        <text
          x="50"
          y="74"
          textAnchor="middle"
          fontSize="6"
          fontWeight="semibold"
          fill="#7FA05C"
          letterSpacing="0.8"
        >
          {displaySubtext}
        </text>
      </svg>
    </div>
  );
}

/**
 * 2D Colorful Adventure Travel Stickers powered by @iconify/react & SVGs
 */
export function FancyTravelIcon({
  name,
  className = "size-8",
  hoverEffect = true,
}: {
  name:
    | "compass"
    | "camera"
    | "tickets"
    | "mountain"
    | "boot"
    | "backpack"
    | "passport"
    | "binoculars"
    | "plane"
    | "hot-air-balloon"
    | "camping"
    | "map"
    | "globe";
  className?: string;
  hoverEffect?: boolean;
}) {
  const iconMap: Record<string, string> = {
    compass: "fluent-emoji-flat:compass",
    camera: "fluent-emoji-flat:camera",
    tickets: "fluent-emoji-flat:admission-tickets",
    mountain: "fluent-emoji-flat:snow-capped-mountain",
    boot: "fluent-emoji-flat:hiking-boot",
    backpack: "fluent-emoji-flat:backpack",
    passport: "fluent-emoji-flat:passport-control",
    binoculars: "fluent-emoji-flat:goggles",
    plane: "fluent-emoji-flat:small-airplane",
    "hot-air-balloon": "fluent-emoji-flat:hot-air-balloon",
    camping: "fluent-emoji-flat:camping",
    map: "fluent-emoji-flat:world-map",
    globe: "fluent-emoji-flat:globe-showing-asia-australia",
  };

  const iconKey = iconMap[name] || "fluent-emoji-flat:compass";

  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none drop-shadow-sm ${
        hoverEffect
          ? "transition-transform duration-300 hover:scale-125 hover:rotate-6 cursor-default"
          : ""
      }`}
      aria-hidden="true"
    >
      <Icon icon={iconKey} className={className} />
    </div>
  );
}

/**
 * Subtle Floating Travel Asset Badge Wrapper with tasteful micro-animations
 */
export function FloatingCornerAsset({
  children,
  position = "top-4 right-4",
  animation = "animate-float-slow",
  opacity = "opacity-85 hover:opacity-100",
}: {
  children: React.ReactNode;
  position?: string;
  animation?: string;
  opacity?: string;
}) {
  return (
    <div
      className={`absolute ${position} ${animation} ${opacity} z-20 transition-opacity pointer-events-none select-none`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/**
 * Small, clean, visible animated 2D travel sticker badge
 */
export function AnimatedTravelBadge({
  icon,
  label,
  animation = "animate-float-gentle",
  variant = "light",
  className = "",
  size = "size-5",
}: {
  icon:
    | "compass"
    | "camera"
    | "tickets"
    | "mountain"
    | "boot"
    | "backpack"
    | "passport"
    | "binoculars"
    | "plane"
    | "hot-air-balloon"
    | "camping"
    | "map"
    | "globe";
  label?: string;
  animation?: string;
  variant?: "light" | "dark";
  className?: string;
  size?: string;
}) {
  const baseClasses =
    variant === "dark"
      ? "bg-black/25 backdrop-blur-xs border border-white/20 text-white shadow-sm"
      : "bg-white/95 border border-[#7FA05C]/35 text-[#2D4A34] shadow-sm";

  const labelColor = variant === "dark" ? "text-white/95" : "text-[#2D4A34]";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full select-none pointer-events-none drop-shadow-xs ${baseClasses} ${animation} ${className}`}
      aria-hidden="true"
    >
      <FancyTravelIcon name={icon} className={size} hoverEffect={false} />
      {label && (
        <span className={`text-[10px] font-extrabold uppercase tracking-wider ${labelColor}`}>
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Small, clean standalone animated 2D travel icon
 */
export function AnimatedTravelIcon({
  name,
  animation = "animate-float-gentle",
  className = "size-6",
  wrapperClassName = "",
}: {
  name:
    | "compass"
    | "camera"
    | "tickets"
    | "mountain"
    | "boot"
    | "backpack"
    | "passport"
    | "binoculars"
    | "plane"
    | "hot-air-balloon"
    | "camping"
    | "map"
    | "globe";
  animation?: string;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none drop-shadow-sm ${animation} ${wrapperClassName}`}
      aria-hidden="true"
    >
      <FancyTravelIcon name={name} className={className} hoverEffect={false} />
    </div>
  );
}


