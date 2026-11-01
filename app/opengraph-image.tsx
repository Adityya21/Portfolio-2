import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aditya Yashovardhan - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#3b82f6",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: "-0.04em",
            marginBottom: "20px",
          }}
        >
          Aditya Yashovardhan
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          BTech Computer Science Engineering Student • AI, ML &amp; Data Analytics
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
