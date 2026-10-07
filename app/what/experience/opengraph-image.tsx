import { ogContentType, ogSize, renderOg } from "../../_lib/og";

export const alt = "KB Legal selected experience";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "WHAT / EXPERIENCE",
    title: "From Saba to Euronext Amsterdam: selected experience.",
  });
}
