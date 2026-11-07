import { ImageResponse } from "next/og";

/** 180×180 apple-touch-icon matching icon.svg's "trend dot" mark. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff3357 0%, #d4002b 100%)",
          borderRadius: 40,
        }}
      >
        <svg width="136" height="136" viewBox="2 2 20 20">
          <rect x="5.1" y="13.4" width="3.3" height="5.7" rx="1.65" fill="#fff" />
          <rect x="10.35" y="9.9" width="3.3" height="9.2" rx="1.65" fill="#fff" />
          <rect x="15.6" y="11.1" width="3.3" height="8" rx="1.65" fill="#fff" opacity="0.5" />
          <circle cx="17.25" cy="6.8" r="2.45" fill="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
