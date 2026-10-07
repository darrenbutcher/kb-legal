import { ogContentType, ogSize, renderOg } from "../_lib/og";

export const alt = "Why KB Legal";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "03 · WHY",
    title: "The quality of a large firm. The attention of a boutique.",
  });
}
