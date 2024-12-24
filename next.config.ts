import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["classmind-images.s3.eu-north-1.amazonaws.com"],
    // remotePatterns: ["classmind-images.s3.eu-north-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "classmind-images.s3.eu-north-1.amazonaws.com",

        port: "",
        // pathname: '/account123/**',
        search: "",
      },
      {
        protocol: "https",
        hostname: "classmind-images.s3.amazonaws.com",

        port: "",
        // pathname: '/account123/**',
        search: "",
      },
    ],
  },
};

export default nextConfig;
