import { ImageResponse } from "next/og";

/** 180×180 apple-touch-icon matching icon.svg's mark. */
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
          background: "#e8002d",
          borderRadius: 40,
        }}
      >
        <div style={{ width: 76, height: 76, borderRadius: 9999, border: "14px solid #ffffff", display: "flex" }} />
      </div>
    ),
    size,
  );
}
