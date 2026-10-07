import { ogContentType, ogSize, renderOg } from "../_lib/og";

export const alt = "KB Legal corporate law practice";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "WHAT",
    title: "Corporate law, exclusively. Six disciplines, one focus.",
  });
}
