import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Babar Tech Solutions",
    short_name: "Babar Tech",
    description: "Vetted remote teams for support, sales, admin and development.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f0eb",
    theme_color: "#f2f0eb",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
