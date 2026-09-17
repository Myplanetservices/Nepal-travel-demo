"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface PricingProps {
  onRequestQuote?: (plan: string) => void;
}

export function PricingSection({ onRequestQuote }: PricingProps) {
  const plans = [
    {
      name: "Starter Digital",
      badge: "For Local Outfitters",
      price: "$399",
      billing: "one-time setup",
      description: "A fast, modern web foundation to break free from relying solely on Facebook posts and word-of-mouth.",
      features: [
        "Modern high-speed responsive website",
        "Up to 8 curated tour & trek packages",
        "1-Click direct WhatsApp lead integration",
        "Interactive Google Maps & HQ location",
        "Basic Google SEO & local search indexing",
        "Free domain & hosting setup assistance",
      ],
      cta: "Choose Starter",
      variant: "secondary" as const,
      highlighted: false,
    },
    {
      name: "Agency Growth",
      badge: "Most Popular in Nepal",
      price: "$799",
      billing: "one-time setup",
      description: "Full automated booking system to capture foreign travelers and accept direct online reservation deposits.",
      features: [
        "Everything in Starter Digital",
        "Full Online Booking & Deposit Checkout",
        "Multi-Currency Display (USD, EUR, GBP, AUD)",
        "Interactive Day-by-Day Route Itinerary",
        "Digital PDF Invoicing & Client Vouchers",
        "Google Review & TripAdvisor Integration",
        "Personalized client preview in 48 hours",
      ],
      cta: "Claim Agency Growth",
      variant: "primary" as const, // Exclusively CTA Orange #DD6B2E
      highlighted: true,
    },
    {
      name: "3D Flagship",
      badge: "Elite Himalayan Experience",
      price: "$1,499",
      billing: "one-time setup",
      description: "Custom interactive 3D globe and Himalayan terrain visualizer to outshine international tour operators.",
      features: [
        "Everything in Agency Growth",
        "Custom 3D Interactive Globe & Trek Nodes",
        "Animated Altitude & Mountain Elevation Curves",
        "Multilingual Support (English, French, German)",
        "Automated WhatsApp CRM & Lead Pipeline",
        "Guaranteed 95+ Google Mobile Speed Score",
        "1 Full Year Priority Maintenance & Backups",
      ],
      cta: "Build 3D Flagship",
      variant: "secondary" as const,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#F5F3EF] border-b border-[#7C8A96]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="meadow" className="mb-3">
            Transparent Agency Investment
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#2D4A34] tracking-tight">
            One Single Booking Pays for Your Entire Website
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#33322E]/85 leading-relaxed font-medium">
            The average international trekker spends $1,200+. Stop letting OTAs take 20% commission on every traveler. Own your platform directly.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                plan.highlighted
                  ? "text-[#33322E] shadow-xl scale-100 lg:scale-105 border-2 border-[#2D4A34] z-10"
                  : "border border-[#7C8A96]/30 text-[#33322E] shadow-card hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="meadow" className="shadow-xs bg-[#7FA05C] text-white border-[#6E8C4E]">
                    <Sparkles className="size-3 text-white" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div>
                {!plan.highlighted && (
                  <span className="text-xs uppercase font-bold tracking-wider text-[#7FA05C] block mb-1">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-2xl font-extrabold font-heading tracking-tight text-[#2D4A34]">
                  {plan.name}
                </h3>

                <p className="text-xs mt-2 leading-relaxed min-h-[40px] font-medium text-[#33322E]/85">
                  {plan.description}
                </p>

                <div className="my-6 pb-6 border-b border-[#7C8A96]/25">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2D4A34]">
                      {plan.price}
                    </span>
                    <span className="text-xs font-bold text-[#7C8A96]">
                      {plan.billing}
                    </span>
                  </div>
                  <span className="text-[11px] block mt-1 font-bold text-[#7FA05C]">
                    No monthly hidden fees · You own all code
                  </span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 text-xs leading-normal font-medium">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="size-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#7FA05C]/20 text-[#7FA05C]">
                        <Check className="size-2.5 stroke-[3]" />
                      </div>
                      <span className="text-[#33322E]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  variant={plan.variant}
                  size="md"
                  onClick={() => {
                    if (onRequestQuote) {
                      onRequestQuote(plan.name);
                    } else {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full justify-center gap-2"
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Reassurance Guarantee */}
        <div className="mt-12 max-w-2xl mx-auto text-center flex items-center justify-center gap-2 text-xs text-[#33322E] font-bold">
          <ShieldCheck className="size-4 text-[#7FA05C]" />
          <span>7-Day Free Prototype Before You Pay A Single Rupee · No Risk Commitment</span>
        </div>
      </div>
    </section>
  );
}
