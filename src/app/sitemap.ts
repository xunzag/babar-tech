import type { MetadataRoute } from "next";
import { SITE } from "@/site/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-26");
  return [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/team/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact/", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/privacy/", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/cookies/", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((p) => ({ url: `${SITE.url}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
