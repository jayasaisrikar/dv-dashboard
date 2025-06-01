import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  reactStrictMode: true,
  images: {
    domains: ['localhost']
  },
  eslint: {
    // Warning: This will disable ESLint during production builds.
    // It is recommended to fix the ESLint errors instead of disabling it.
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
