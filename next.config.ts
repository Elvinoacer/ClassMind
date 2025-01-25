import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["classmind-images.s3.eu-north-1.amazonaws.com"],
    // remotePatterns: ["classmind-images.s3.eu-north-1.amazonaws.com"],
    remotePatterns: [
      {
        hostname: "classmind-images.s3.eu-north-1.amazonaws.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "classmind-images.s3.amazonaws.com",
      },
      { hostname: "static.turbosquid.com" },
      { hostname: "2.bp.blogspot.com" },
      { hostname: "gravatar.com" },
      { hostname: "i.pinimg.com" },
      { hostname: "media.istockphoto.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "avatars.hsoubcdn.com" },
    ],
  },
};

export default nextConfig;
