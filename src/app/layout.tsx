import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const zephyr = localFont({
  src: "../fonts/zephyr-monolith-grotesk-regular.ttf",
  variable: "--font-zephyr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homi",
  description:
    "",
  keywords: [
    "AI browser",
    "productivity",
    "Chrome alternative",
    "chat with tabs",
    "web browser",
    "contextual AI",
    "AI assistant",
    "secure browsing",
    "privacy",
    "security",
    "laptop browser",
    "professional browser",
  ],
  openGraph: {
    title: "Dia | The browser for your best work",
    description:
      "Dia is the browser for your best work. Get answers without having to ask, produce beautiful ready-to-share outputs, and stay focused in the best browser for your work day.",
    type: "website",
    url: "https://www.diabrowser.com/index",
    siteName: "Dia Browser",
  },
};

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
      <body className="min-h-full flex flex-col antialiased bg-background text-primary">
        {children}
      </body>
    </html>
  );
}

