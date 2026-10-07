import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Shared 1200×630 share card: white logo, sage-ruled eyebrow, page headline.
export async function renderOg({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const logo = await readFile(
    join(process.cwd(), "public/kb-legal-logo-white.svg"),
    "base64",
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#172250",
        color: "#ffffff",
      }}
    >
      {/* ImageResponse renders plain <img>; next/image does not apply here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;base64,${logo}`}
        width={150}
        height={150}
        alt=""
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 4,
            color: "#c3c7d8",
          }}
        >
          <div style={{ width: 40, height: 3, background: "#a9bd7e" }} />
          {eyebrow}
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
