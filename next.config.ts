import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
