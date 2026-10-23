import { ImageResponse } from "next/og"

export const alt =
  "Richie Christian De Guzman — Full-Stack, Data & Blockchain Developer · PH100 2026"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f7f5f0",
          color: "#141414",
          fontFamily: "sans-serif",
          border: "12px solid #141414",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              border: "4px solid #141414",
              boxShadow: "8px 8px 0 #141414",
              background: "#ffffff",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", width: 28 }}>
              <div style={{ flex: 1, background: "#1f3fbf" }} />
              <div style={{ flex: 1, background: "#eb4b27" }} />
            </div>
            <div style={{ padding: "10px 22px", fontSize: 36, fontWeight: 800 }}>
              PH100 · 2026
            </div>
          </div>
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#5c584f" }}>
            ANTIPOLO, PH
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>
            Richie Christian
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              color: "#eb4b27",
            }}
          >
            De Guzman
          </div>
        </div>

        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase" }}>
          Full-Stack Dev · Data Analyst · Blockchain Dev
        </div>
      </div>
    ),
    size,
  )
}
