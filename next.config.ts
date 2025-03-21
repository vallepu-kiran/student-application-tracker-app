import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['apply-lit-school.vercel.app'],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
