import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  // Remove optimizePackageImports for Prisma - it breaks binary copying
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Copy Prisma binaries for serverless deployment
      config.externals = [...(config.externals || []), "@prisma/client"];
    }
    return config;
  },
};

export default nextConfig;
