import React from "react";
import { Mountain, MapPin, Compass, Sparkles } from "lucide-react";

export function HeroGlobeFallback() {
  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden bg-[#2D4A34] border border-[#7C8A96]/30 flex items-center justify-center p-6 shadow-xl">
      {/* Background Rings in Meadow & Water tones */}
      <div className="absolute size-96 rounded-full border border-[#7FA05C]/25 animate-pulse" />
      <div className="absolute size-64 rounded-full border border-[#3E7C94]/25" />

      {/* Centerpiece Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        <div className="size-20 rounded-full bg-[#243c2a] border border-[#7C8A96]/40 flex items-center justify-center mb-5 text-[#7FA05C] shadow-md">
          <Mountain className="size-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#243c2a] border border-[#7C8A96]/30 text-[#F5F3EF] text-xs font-bold mb-3">
          <Sparkles className="size-3.5 text-[#D9A23B]" />
          Interactive 3D Himalayan Hub
        </div>

        <h3 className="font-heading text-2xl font-extrabold text-[#F5F3EF] tracking-tight">
          Himalayan Route Visualization
        </h3>
        <p className="text-xs text-[#F5F3EF]/90 mt-2 leading-relaxed font-medium">
          Rendering real-time 3D nodes for Everest, Annapurna, Langtang, and Kathmandu Valley.
        </p>

        <div className="grid grid-cols-2 gap-2.5 mt-6 w-full text-left">
          <div className="bg-[#243c2a] border border-[#7C8A96]/40 rounded-xl p-2.5">
            <span className="text-[10px] uppercase font-bold text-[#D9A23B] flex items-center gap-1">
              <MapPin className="size-3 text-[#7FA05C]" /> Everest
            </span>
            <p className="text-xs font-semibold text-[#F5F3EF] mt-0.5">8,848m Khumbu</p>
          </div>
          <div className="bg-[#243c2a] border border-[#7C8A96]/40 rounded-xl p-2.5">
            <span className="text-[10px] uppercase font-bold text-[#D9A23B] flex items-center gap-1">
              <Compass className="size-3 text-[#7FA05C]" /> Annapurna
            </span>
            <p className="text-xs font-semibold text-[#F5F3EF] mt-0.5">8,091m Sanctuary</p>
          </div>
        </div>
      </div>
    </div>
  );
}
