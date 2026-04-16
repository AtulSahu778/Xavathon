import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "Xavathon.png"));
  const logoUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 26%), radial-gradient(circle at top right, rgba(34,197,94,0.2), transparent 24%), radial-gradient(circle at bottom center, rgba(249,115,22,0.24), transparent 26%), #0B0B0B",
          color: "#F5F5F5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#9CA3AF",
          }}
        >
          Premium college hackathon
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="Xavathon"
            width={520}
            height={188}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.4,
              color: "#D4D4D8",
            }}
          >
            Build, compete, and showcase bold ideas with prizes, certificates, and collaboration
            from IQAC and XTS.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#9CA3AF",
          }}
        >
          <div>Registration • Shortlisting • Hackathon • Results</div>
          <div>xavathon.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
