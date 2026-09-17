import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CurrencyProvider } from "@/components/agency/CurrencyContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2D4A34",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://myplanetservices.com"),
  title: "Zenith Himalaya | High Alpine Expeditions in Nepal, Bhutan & Tibet",
  description:
    "Authentic, Sherpa-led Himalayan treks and alpine expeditions across Nepal, Bhutan, and Tibet since 2008 with verified permits, UIAGM guides, and guaranteed departure dates.",
  keywords: [
    "Nepal Travel Agency Website",
    "Trekking Agency Web Design",
    "Kathmandu Web Development",
    "Pokhara Travel Agency Marketing",
    "Trekking Booking Engine",
    "3D Travel Website",
    "My Planet Services",
  ],
  authors: [{ name: "My Planet Services", url: "https://myplanetservices.com" }],
  openGraph: {
    title: "My Planet Services — Turn Browsers Into Bookings",
    description:
      "Modern 3D websites designed specifically for Nepal travel agencies to capture international trekkers and eliminate OTA commissions.",
    url: "https://myplanetservices.com",
    siteName: "My Planet Services",
    images: [
      {
        url: "/assets/banner-1.png",
        width: 1200,
        height: 630,
        alt: "My Planet Services Nepal Travel Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Planet Services — 3D Travel Agency Websites",
    description: "Websites that turn browsers into direct bookings for Nepal travel & trekking agencies.",
    images: ["/assets/banner-1.png"],
  },
  icons: {
    icon: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-[#7FA05C]/30 selection:text-[#2D4A34]">
        <CurrencyProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
