import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://babartechsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/team`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date("2025-05-16"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
