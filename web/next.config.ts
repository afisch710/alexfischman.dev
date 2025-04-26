import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    // Enable ESLint during development
    ignoreDuringBuilds: false,
    // This will make Next.js fail on ESLint errors
    dirs: ['src'],
  },
};

export default nextConfig;
