import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
    ],
  },
  poweredByHeader: false,
  // One root layout per language (for a correct server-rendered <html lang>) means the 404 for
  // unmatched URLs can't come from a single layout; app/global-not-found.tsx renders it instead.
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Trust/hardening headers; none are ranking factors, HSTS avoids a redirect hop.
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
