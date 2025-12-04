import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Ensure root is not redirected
  async redirects() {
    return [
      // Do NOT redirect root to anything
      // All other redirects can be added here if needed
    ];
  },
  // Add headers for proper caching
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=120",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
