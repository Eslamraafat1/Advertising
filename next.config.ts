import type { NextConfig } from "next";

const EXTERNAL_API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "https://globaluntoldstory.com/api/public/api/v1";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${EXTERNAL_API}/:path*`,
      },
    ];
  },
};

export default nextConfig;
