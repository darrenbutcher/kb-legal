import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Production on Vercel served a stylesheet compiled from the original
    // starter globals.css while previews were correct. Building without the
    // restored Turbopack cache makes every build compile CSS from source.
    turbopackFileSystemCacheForBuild: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
