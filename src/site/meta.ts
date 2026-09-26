import type { Metadata } from "next";
import { SITE } from "./content";

type Page = { title: string; description: string; path: string; image?: string; imageAlt?: string };

/**
 * Complete Open Graph + Twitter card set for a page. Next shallow-merges `openGraph`,
 * so every page must pass the full object or it would lose the image.
 * Images are 1200×630 JPEGs under 100 KB so WhatsApp, LinkedIn, Slack, Discord,
 * iMessage, X and Facebook all render the large card.
 */
export function pageMeta({ title, description, path, image = "/og/home.jpg", imageAlt }: Page): Metadata {
  const url = `${SITE.url}${path}`;
  const img = {
    url: `${SITE.url}${image}`,
    secureUrl: `${SITE.url}${image}`,
    type: "image/jpeg",
    width: 1200,
    height: 630,
    alt: imageAlt ?? title,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_US", siteName: SITE.name, url, title, description, images: [img] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: img.url, alt: img.alt }] },
  };
}
