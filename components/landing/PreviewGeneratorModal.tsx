"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  X,
  ArrowRight,
  Building2,
} from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewGeneratorModal({ isOpen, onClose }: PreviewModalProps) {
  const router = useRouter();
  const [agencyName, setAgencyName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName.trim()) return;

    setLoading(true);
    const slug = agencyName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setTimeout(() => {
      setLoading(false);
      onClose();
      router.push(`/preview/${slug || "nepal-treks"}`);
    }, 600);
  };

  const sampleAgencies = [
    { name: "Seven Star International", slug: "seven-star-international" },
    { name: "Himalayan Glacier Treks", slug: "himalayan-glacier" },
    { name: "Ace Mountain Journeys", slug: "ace-the-himalaya" },
    { name: "Nepal Eco Adventure", slug: "nepal-eco-adventure" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#2D4A34]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-[#33322E] border border-[#7C8A96]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#33322E]/70 hover:text-[#2D4A34] hover:bg-[#F5F3EF] cursor-pointer"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 rounded-full bg-[#F5F3EF] text-[#7FA05C] flex items-center justify-center font-bold">
            <Sparkles className="size-4" />
          </div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#7FA05C]">
            Instant Agency Prototype Engine
          </span>
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
          Generate an Instant Live Preview
        </h3>

        <p className="text-xs text-[#33322E]/85 mt-1.5 leading-relaxed font-medium">
          Type any travel or trekking agency name to see how our platform, direct booking engine, and WhatsApp lead flow will look for that brand.
        </p>

        <form onSubmit={handleGenerate} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
              Agency Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                placeholder="e.g. Kathmandu Valley Treks & Expeditions"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-sm text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50 pl-10"
                autoFocus
              />
              <Building2 className="size-4 text-[#7C8A96] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading || !agencyName.trim()}
            className="w-full font-bold gap-2 text-sm shadow-md"
          >
            {loading ? (
              <span>Rendering Preview...</span>
            ) : (
              <>
                <span>Launch Instant Prototype</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        {/* Quick Click Samples */}
        <div className="mt-6 pt-4 border-t border-[#7C8A96]/20">
          <span className="text-[11px] text-[#33322E]/80 block mb-2 font-bold">
            Or test a pre-configured Nepal agency lead:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleAgencies.map((agency) => (
              <button
                key={agency.slug}
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/preview/${agency.slug}`);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F5F3EF] hover:bg-[#EBE8E1] text-[#2D4A34] text-xs font-bold border border-[#7C8A96]/30 transition-colors cursor-pointer"
              >
                {agency.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
