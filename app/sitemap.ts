import type { MetadataRoute } from "next";
import { site } from "./_lib/site";

const routes: {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/who", priority: 0.8, changeFrequency: "yearly" },
  { path: "/what", priority: 0.8, changeFrequency: "yearly" },
  { path: "/what/experience", priority: 0.7, changeFrequency: "monthly" },
  { path: "/why", priority: 0.7, changeFrequency: "yearly" },
  { path: "/where", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency,
    priority,
  }));
}
