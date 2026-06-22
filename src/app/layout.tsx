import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const zephyr = localFont({
  src: "../fonts/zephyr-monolith-grotesk-regular.ttf",
  variable: "--font-zephyr",
  display: "swap",
});

const siteUrl = "https://www.homilearn.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HomiLearn – AI Tutor for CBSE, ICSE & NCERT Students | Personalized Learning",
    template: "%s | HomiLearn",
  },
  description:
    "HomiLearn is an AI-powered study companion that provides personalized learning, AI doubt solving, viva preparation, adaptive learning, exam support, and parent insights for students across CBSE, ICSE, and NCERT-aligned boards in Classes VI–XII.",
  keywords: [
    "AI tutor for students",
    "AI tutor for CBSE students",
    "AI tutor for ICSE students",
    "AI tutor for NCERT students",
    "AI tutor for Class 6",
    "AI tutor for Class 7",
    "AI tutor for Class 8",
    "AI tutor for Class 9",
    "AI tutor for Class 10",
    "AI tutor for Class 11",
    "AI tutor for Class 12",
    "AI doubt solver",
    "AI homework help",
    "personalized learning app",
    "adaptive learning engine",
    "AI exam preparation",
    "AI study companion",
    "smart study plan",
    "NCERT-aligned AI tutor",
    "AI lesson plan generator",
    "AI worksheet generator",
    "AI quiz generator",
    "AI rubric generator",
    "AI teaching assistant",
    "differentiated instruction AI",
    "standards-aligned lesson plans AI",
    "free AI tools for teachers",
    "learning gap detection",
    "AI viva preparation",
    "parent dashboard education",
  ],
  authors: [{ name: "HomiLearn", url: siteUrl }],
  creator: "HomiLearn",
  publisher: "HomiLearn",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "HomiLearn",
    title: "HomiLearn – AI Tutor for CBSE, ICSE & NCERT Students | Personalized Learning",
    description:
      "HomiLearn is an AI-powered study companion that provides personalized learning, AI doubt solving, viva preparation, adaptive learning, exam support, and parent insights for students across major Indian boards.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HomiLearn – AI-Powered Personalized Learning for Indian Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomiLearn – AI Tutor for CBSE, ICSE & NCERT Students",
    description:
      "Personalized AI learning companion for Classes VI–XII. Adaptive learning, doubt solving, viva prep, and parent insights.",
    images: ["/og-image.png"],
    creator: "@homilearn",
  },
  category: "Education",
};

import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${zephyr.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-background text-primary">
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
