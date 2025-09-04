import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // for planet images
      },
      {
        protocol: "https",
        hostname: "www.solarsystemscope.com", // example if you use other sources
      },
      {
        protocol: "https",
        hostname: "spaceplace.nasa.gov", // NASA sources
      },
    ],
  },
};

export default nextConfig;
