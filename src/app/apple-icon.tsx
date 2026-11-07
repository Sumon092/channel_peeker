import { ImageResponse } from "next/og";

/** 180×180 apple-touch-icon matching icon.svg's mark (gradient tile + peek lens). */
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
        <svg width="124" height="124" viewBox="-0.1 -0.1 24 24">
          <circle cx="10.7" cy="10.7" r="5" fill="none" stroke="#fff" strokeWidth="2.2" />
          <path d="M14.4 14.4 17.9 17.9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <path
            d="M8.3 12.7 9.9 10.5 11.2 11.6 13 9.3"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="13" cy="9.3" r="0.95" fill="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
