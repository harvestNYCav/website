import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  async rewrites() {
    return [
      {
        source: '/vine-app',
        destination: 'https://vine-learning-app.vercel.app/vine-app',
      },
      {
        source: '/vine-app/:path*',
        destination: 'https://vine-learning-app.vercel.app/vine-app/:path*',
      },
    ]
  },
});

export default nextConfig;
