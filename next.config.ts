import type { NextConfig } from "next";

// Not a static export any more: /api routes run as Vercel Functions (AI coach, credits, reports, admin).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
