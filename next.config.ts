import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lovely-flamingo-139.convex.cloud" },
      { protocol: "https", hostname: "beaming-shark-99.convex.cloud" },
    ],
  },
};

export default nextConfig;
