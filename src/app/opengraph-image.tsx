import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Default social share card (Next picks this up for og:image site-wide). */
export const alt = `${site.name}: free YouTube analytics and SEO tools`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1c1c1f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #ff3357 0%, #d4002b 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="-0.1 -0.1 24 24">
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
          <div style={{ fontSize: 60, fontWeight: 800, display: "flex" }}>{site.name}</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 40, lineHeight: 1.25, maxWidth: 950, display: "flex", color: "#e8e8ea" }}>
          Free, fast YouTube analytics and SEO tools with honest numbers.
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "#9b9ba1", display: "flex" }}>
          46 free tools · No signup · No extension · Official YouTube data
        </div>
      </div>
    ),
    size,
  );
}
