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
            <svg width="52" height="52" viewBox="2 2 20 20">
              <rect x="5.1" y="13.4" width="3.3" height="5.7" rx="1.65" fill="#fff" />
              <rect x="10.35" y="9.9" width="3.3" height="9.2" rx="1.65" fill="#fff" />
              <rect x="15.6" y="11.1" width="3.3" height="8" rx="1.65" fill="#fff" opacity="0.5" />
              <circle cx="17.25" cy="6.8" r="2.45" fill="#fff" />
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
