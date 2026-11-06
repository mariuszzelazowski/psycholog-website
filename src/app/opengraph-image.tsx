import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, seo } from "@/config/content";

export const alt = `${brand.fullName} — psycholog i hipnoterapeutka, Warszawa i online`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Wbudowany font generatora ma tylko podstawową łacinę — teksty bez polskich znaków. */
export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public", seo.portrait));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #f8f6f3 0%, #ece6de 100%)",
        }}
      >
        <img
          src={portraitSrc}
          alt=""
          width={460}
          height={630}
          style={{ width: 460, height: 630, objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            color: "#2f3d4e",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#b8956a",
              fontWeight: 700,
            }}
          >
            Warszawa · Online
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
            {brand.fullName}
          </div>
          <div
            style={{
              width: 96,
              height: 4,
              borderRadius: 4,
              background: "#b8956a",
              marginTop: 30,
              marginBottom: 30,
            }}
          />
          <div style={{ fontSize: 36, lineHeight: 1.3, color: "#44596f" }}>
            Konsultacje psychologiczne
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.3, color: "#44596f" }}>
            Sesje hipnoterapii
          </div>
        </div>
      </div>
    ),
    size,
  );
}
