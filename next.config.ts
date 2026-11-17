import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/zh/founding", permanent: false },
      { source: "/founding", destination: "/zh/founding", permanent: false },
      { source: "/:locale(zh|en|ms)", destination: "/:locale/founding", permanent: false },
    ];
  },
};

export default nextConfig;
