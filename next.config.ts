import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/report_fassmid";
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: "export" as const }),
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isDev
    ? {
        async redirects() {
          return [
            {
              source: "/",
              destination: basePath,
              permanent: false,
              basePath: false,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
