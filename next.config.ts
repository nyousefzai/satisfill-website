import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
