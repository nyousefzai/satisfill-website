import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ["@prisma/client"],
  },
};

export default nextConfig;
