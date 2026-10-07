import { ogContentType, ogSize, renderOg } from "../_lib/og";

export const alt = "Contact KB Legal in Philipsburg, Sint Maarten";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "04 · WHERE",
    title: "Tell us about your matter. 28a Front Street, Philipsburg.",
  });
}
