import { ogContentType, ogSize, renderOg } from "../_lib/og";

export const alt = "Kamla Besançon, founder of KB Legal";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "WHO",
    title:
      "Kamla Besançon – corporate lawyer, Dutch Caribbean · Amsterdam · New York.",
  });
}
