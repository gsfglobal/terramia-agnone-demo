import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "1"
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true }, basePath: basePath || undefined }
    : {}),
};

export default nextConfig;
