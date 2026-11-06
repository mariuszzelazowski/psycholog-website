import { ImageResponse } from "next/og";

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
          background: "#2f3d4e",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 132,
            border: "5px solid #b8956a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f8f6f3",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          PM
        </div>
      </div>
    ),
    size,
  );
}
