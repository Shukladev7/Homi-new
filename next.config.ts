import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["172.20.10.4"],
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
