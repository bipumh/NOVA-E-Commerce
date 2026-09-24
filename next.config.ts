import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root so the parent repo's lockfile (this
  // project lives inside a monorepo-style folder) isn't misdetected.
  turbopack: {
    root: process.cwd(),
  },
  // Keep the dev overlay clear of the header's action buttons.
  devIndicators: {
    position: "bottom-right",
  },
  images: {
    // Product photography is served by Unsplash's CDN with sizing params,
    // so we skip Next's image optimizer and render the source directly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
