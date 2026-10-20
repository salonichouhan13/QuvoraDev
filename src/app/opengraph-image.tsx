import { ImageResponse } from "next/og";

export const alt = "Quvora: websites, apps & software that help businesses grow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time, so no static og-image.png is needed.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #130e0b 0%, #3a2416 100%)",
          color: "#ece4d3",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>Quvora.</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 40, color: "#c9a57c", maxWidth: 900 }}>
          We build websites, apps &amp; software that help businesses grow.
        </div>
      </div>
    ),
    size
  );
}
