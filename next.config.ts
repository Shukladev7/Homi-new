import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "pub-49184aefe88141419f93bc73dbf68688.r2.dev",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  allowedDevOrigins: ["172.20.10.4"],

  compress: true,

  poweredByHeader: false,
};

export default nextConfig;