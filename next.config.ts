import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
      },
    ],
  },
  allowedDevOrigins: [
    "localhost:3000",
    "172.20.96.1:3000",
    "192.168.137.1:3000",
  ],
};

export default nextConfig;
