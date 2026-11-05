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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9999, background: "#ff0033", display: "flex" }} />
          <div style={{ fontSize: 56, fontWeight: 800, display: "flex" }}>{site.name}</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 40, lineHeight: 1.25, maxWidth: 950, display: "flex", color: "#e8e8ea" }}>
          Free, fast YouTube analytics and SEO tools with honest numbers.
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "#9b9ba1", display: "flex" }}>
          38 free tools · No signup · No extension · Official YouTube data
        </div>
      </div>
    ),
    size,
  );
}
