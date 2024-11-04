import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // This ensures Next.js builds to static files
  images: {
    unoptimized: true // Required for static export
  },
  // Add any other config options you need
};

export default nextConfig;
