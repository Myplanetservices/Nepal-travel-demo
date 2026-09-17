"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const previewFormSchema = z.object({
  agencyName: z.string().min(2, "Agency name must be at least 2 characters"),
  ownerName: z.string().min(2, "Your name is required"),
  whatsapp: z.string().min(8, "Valid WhatsApp number is required"),
  email: z.string().email("Please enter a valid email address"),
  currentStatus: z.enum([
    "facebook_only",
    "outdated_website",
    "new_agency",
    "other",
  ]),
  primaryRegion: z.enum([
    "annapurna",
    "everest",
    "langtang",
    "all_nepal",
  ]),
  notes: z.string().optional(),
});

type PreviewFormData = z.infer<typeof previewFormSchema>;

export function ContactSection({
  defaultPlan,
}: {
  defaultPlan?: string;
}) {
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PreviewFormData>({
    resolver: zodResolver(previewFormSchema),
    defaultValues: {
      currentStatus: "facebook_only",
      primaryRegion: "annapurna",
    },
  });

  const onSubmit = async (data: PreviewFormData) => {
    setIsGenerating(true);
    await new Promise((res) => setTimeout(res, 1200));

    const slug = data.agencyName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setIsGenerating(false);
    setSubmittedSlug(slug || "annapurna-treks");
    reset();
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5F3EF] border-b border-[#7C8A96]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Pitch & Agency Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="meadow" className="gap-1.5">
              <Sparkles className="size-3 text-[#D9A23B]" />
              Free Personalized Prototype
            </Badge>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#2D4A34] tracking-tight leading-[1.1]">
              See Your Agency Live Before Spending a Single Rupee.
            </h2>

            <p className="text-base text-[#33322E]/85 leading-relaxed font-medium">
              Fill out your agency details below. Our team in Kathmandu will construct a working prototype with your name, branding, and trek itineraries in under 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5">
                <div className="size-6 rounded-full bg-[#7FA05C] text-[#F5F3EF] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2D4A34]">100% Free & No Obligation</div>
                  <div className="text-xs text-[#33322E]/80 font-medium">You review the full working demo site first.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-6 rounded-full bg-[#7FA05C] text-[#F5F3EF] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2D4A34]">Delivered in 24 Hours</div>
                  <div className="text-xs text-[#33322E]/80 font-medium">We send you a private link you can open on your phone.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-6 rounded-full bg-[#7FA05C] text-[#F5F3EF] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2D4A34]">Direct Thamel & Pokhara Support</div>
                  <div className="text-xs text-[#33322E]/80 font-medium">In-person walk-throughs available across Kathmandu Valley & Lakeside.</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Block */}
            <div className="pt-6 border-t border-[#7C8A96]/25 flex flex-col gap-2 text-xs text-[#33322E] font-semibold">
              <span className="flex items-center gap-2 text-[#33322E]">
                <Phone className="size-3.5 text-[#7FA05C]" />
                WhatsApp Direct: +977 980-123-4567
              </span>
              <span className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#7FA05C]" />
                hello@myplanetservices.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#7FA05C]" />
                Lazimpat & Thamel, Kathmandu, Nepal
              </span>
            </div>
          </div>

          {/* Right Column: React Hook Form + Zod Form Card */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white border border-[#7C8A96]/30 shadow-xl rounded-3xl">
              {submittedSlug ? (
                <div className="text-center py-10 space-y-4">
                  <div className="size-16 rounded-full bg-[#7FA05C] text-[#F5F3EF] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                    Prototype Engine Initialized!
                  </h3>
                  <p className="text-sm text-[#33322E]/85 max-w-md mx-auto leading-relaxed font-medium">
                    We have generated your personalized agency preview route. You can explore your custom preview right now.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href={`/preview/${submittedSlug}`}>
                      <Button variant="primary" size="lg" className="gap-2 font-bold shadow-md">
                        <span>Open Your Live Preview</span>
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => setSubmittedSlug(null)}
                    >
                      Generate Another Preview
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                  <div className="border-b border-[#7C8A96]/25 pb-4 mb-4">
                    <h3 className="font-heading font-bold text-xl text-[#2D4A34]">
                      Request Your Free Custom Agency Preview
                    </h3>
                    <p className="text-xs text-[#7C8A96] mt-1 font-medium">
                      {defaultPlan
                        ? `Selected Package: ${defaultPlan}`
                        : "Tell us about your agency and we will assemble your live prototype."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                        Agency Legal Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Himalayan Glacier Treks"
                        {...register("agencyName")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-sm text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                      />
                      {errors.agencyName && (
                        <span className="text-[11px] text-[#DD6B2E] font-bold mt-1 block">
                          {errors.agencyName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                        Owner / Director Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pasang Sherpa"
                        {...register("ownerName")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-sm text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                      />
                      {errors.ownerName && (
                        <span className="text-[11px] text-[#DD6B2E] font-bold mt-1 block">
                          {errors.ownerName.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+977 98..."
                        {...register("whatsapp")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-sm text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                      />
                      {errors.whatsapp && (
                        <span className="text-[11px] text-[#DD6B2E] font-bold mt-1 block">
                          {errors.whatsapp.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        placeholder="info@youragency.com"
                        {...register("email")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-sm text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                      />
                      {errors.email && (
                        <span className="text-[11px] text-[#DD6B2E] font-bold mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                        Current Digital Presence
                      </label>
                      <select
                        {...register("currentStatus")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-xs text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                      >
                        <option value="facebook_only">Facebook Page Only (No Website)</option>
                        <option value="outdated_website">Old Website (Needs Total Redesign)</option>
                        <option value="new_agency">Brand New Agency Launch</option>
                        <option value="other">Word of Mouth Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                        Flagship Trek Region
                      </label>
                      <select
                        {...register("primaryRegion")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-xs text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                      >
                        <option value="annapurna">Annapurna (Circuit, ABC, Mardi)</option>
                        <option value="everest">Everest (EBC, Gokyo, Three Passes)</option>
                        <option value="langtang">Langtang & Gosainkunda</option>
                        <option value="all_nepal">All Nepal Trekking & Climbing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D4A34] block mb-1.5">
                      Specific Features You Need (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need card deposit checkout, WhatsApp chat button, and interactive route map for our Everest heli-trek."
                      {...register("notes")}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-xs text-[#33322E] focus:outline-none focus:ring-2 focus:ring-[#7FA05C]/50"
                    />
                  </div>

                  {/* Primary CTA: CTA Orange #DD6B2E */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting || isGenerating}
                    className="w-full font-bold gap-2 text-sm h-12 mt-2"
                  >
                    {isGenerating ? (
                      <span>Building Agency Preview...</span>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>Generate My Agency's Free Preview</span>
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-center text-[#7C8A96] mt-2 font-medium">
                    🔒 Zero spam. We only use this information to customize your demonstration prototype.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
