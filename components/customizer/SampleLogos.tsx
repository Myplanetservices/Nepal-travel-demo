"use client";

import React from "react";

export interface SampleLogo {
  id: string;
  name: string;
  renderSvg: (className?: string) => React.ReactNode;
}

export const SAMPLE_LOGOS: SampleLogo[] = [
  {
    id: "compass-rose",
    name: "Compass Rose",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.25" />
      </svg>
    ),
  },
  {
    id: "airplane-trail",
    name: "Airplane Trail",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.7-.1-1.3.2-1.6.8l-.5 1 5.5 3.5-3.5 3.5-2.5-.5-.8.5 2 2 2 2 .5-.8-.5-2.5 3.5-3.5 3.5 5.5 1-.5c.6-.3.9-.9.8-1.6Z" fill="currentColor" fillOpacity="0.25" />
        <path d="M2 22a8 8 0 0 1 7-3" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: "mountain-peak",
    name: "Mountain Peak",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" fill="currentColor" fillOpacity="0.25" />
        <path d="m4.14 15 .86-1 3 3 5-5 4 4" />
      </svg>
    ),
  },
  {
    id: "globe-pin",
    name: "Globe & Pin",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "palm-tree",
    name: "Palm Tree",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h11z" fill="currentColor" fillOpacity="0.25" />
        <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-9" />
        <path d="M5.8 21a10 10 0 0 1 6.2-13.8" />
        <path d="M2 21h20" />
      </svg>
    ),
  },
  {
    id: "suitcase-monogram",
    name: "Suitcase Monogram",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="14" x="2" y="7" rx="2" fill="currentColor" fillOpacity="0.2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <circle cx="12" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "boarding-pass",
    name: "Boarding Ribbon",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="12" x="3" y="6" rx="2" fill="currentColor" fillOpacity="0.2" />
        <path d="M9 6v12" strokeDasharray="2 2" />
        <circle cx="3" cy="12" r="1" />
        <circle cx="21" cy="12" r="1" />
        <path d="m13 10 3 2-3 2" />
      </svg>
    ),
  },
  {
    id: "world-map-pin",
    name: "Map Pin Cluster",
    renderSvg: (className = "size-7") => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="10" r="3" fill="currentColor" />
      </svg>
    ),
  },
];
