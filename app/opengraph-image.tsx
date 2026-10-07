import { ogContentType, ogSize, renderOg } from "./_lib/og";

export const alt =
  "KB Legal – Boutique corporate law firm in Sint Maarten, Dutch Caribbean";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "BOUTIQUE CORPORATE LAW FIRM · SINT MAARTEN",
    title: "We do one thing, and we do it well – corporate law.",
  });
}
