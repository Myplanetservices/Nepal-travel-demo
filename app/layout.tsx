import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CurrencyProvider } from "@/components/agency/CurrencyContext";
import { SiteConfigProvider } from "@/components/customizer/SiteConfigContext";
import { CustomizerTrigger } from "@/components/customizer/CustomizerTrigger";
import { ChatWidget } from "@/components/chat/ChatWidget";

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
  metadataBase: new URL("https://zenithhimalaya.com"),
  title: "Zenith Himalaya | High Alpine Expeditions in Nepal, Bhutan & Tibet",
  description:
    "Authentic, Sherpa-led Himalayan treks and alpine expeditions across Nepal, Bhutan, and Tibet since 2008 with verified permits, UIAGM guides, and guaranteed departure dates.",
  keywords: [
    "Nepal Trekking Expeditions",
    "Everest Base Camp Trek",
    "Annapurna Circuit",
    "Manaslu Circuit Trek",
    "Upper Mustang Trek",
    "Langtang Valley Trek",
    "Bhutan Cultural Tours",
    "Tibet Overland Expeditions",
    "Certified Sherpa Guides",
    "Zenith Himalaya",
  ],
  authors: [{ name: "Zenith Himalaya Expeditions", url: "https://zenithhimalaya.com" }],
  openGraph: {
    title: "Zenith Himalaya | High Alpine Expeditions in Nepal, Bhutan & Tibet",
    description:
      "Authentic, Sherpa-led Himalayan treks and alpine expeditions across Nepal, Bhutan, and Tibet since 2008 with verified permits, UIAGM guides, and guaranteed departure dates.",
    url: "https://zenithhimalaya.com",
    siteName: "Zenith Himalaya",
    images: [
      {
        url: "/assets/banner-1.png",
        width: 1200,
        height: 630,
        alt: "Zenith Himalaya Alpine Expeditions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenith Himalaya | High Alpine Expeditions",
    description: "Sherpa-led Himalayan treks and alpine expeditions across Nepal, Bhutan, and Tibet with guaranteed departures.",
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
        <SiteConfigProvider>
          <CurrencyProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
            <CustomizerTrigger />
            <ChatWidget />
          </CurrencyProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
