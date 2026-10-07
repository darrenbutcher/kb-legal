import { ogContentType, ogSize, renderOg } from "../_lib/og";

export const alt = "KB Legal privacy policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "LEGAL", title: "Privacy Policy" });
}
