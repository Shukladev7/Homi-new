import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HomiLearn – AI Tutor for Indian Students",
    short_name: "HomiLearn",
    description:
      "AI-powered personalized learning companion for CBSE, ICSE, and NCERT students in Classes VI–XII.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F8F8",
    theme_color: "#0A0A0A",
    orientation: "portrait-primary",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
