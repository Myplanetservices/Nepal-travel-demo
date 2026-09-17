import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Tenzing N. Sherpa",
      role: "Managing Director",
      agency: "Annapurna Mountain Guides, Pokhara",
      quote: "Before My Planet Services built our site, we lost dozens of bookings when foreign travelers had to wait hours for WhatsApp replies. Now they book directly while we sleep.",
    },
    {
      name: "Bikash Adhikari",
      role: "Founder & Lead Outfitter",
      agency: "Himalayan Glacier Trails, Thamel",
      quote: "The 3D route map and instant deposit engine gave us international credibility. Our direct inquiries doubled in the first autumn trekking season.",
    },
    {
      name: "Sonam Lama",
      role: "Operations Head",
      agency: "Langtang Heritage Expeditions, Kathmandu",
      quote: "They understood Nepal trekking permits, teahouse routes, and currency issues without needing any hand-holding. Clean, fast, and delivered ahead of schedule.",
    },
  ];

  return (
    <section className="py-20 bg-[#F5F3EF] relative border-b border-[#7C8A96]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="meadow" className="mb-3">
            Agency Owner Feedback
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D4A34] tracking-tight">
            Trusted by Leaders in Nepal's Tourism Sector
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <Card key={rev.name} className="p-6 sm:p-7 bg-white border-[#7C8A96]/25 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#D9A23B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#33322E] leading-relaxed italic font-medium">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#7C8A96]/20">
                <div className="font-heading font-bold text-sm text-[#2D4A34]">
                  {rev.name}
                </div>
                <div className="text-xs text-[#7C8A96] mt-0.5 font-medium">
                  {rev.role} · {rev.agency}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
