import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://babartechsolutions.com";
  const now = new Date();

  return [
    { url: base,                    lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/team`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
