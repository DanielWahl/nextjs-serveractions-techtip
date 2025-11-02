import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'localhost',
            port: '1337',
        }
    ],
  }
};

export default nextConfig;
