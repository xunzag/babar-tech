import type { CSSProperties } from "react";

/** Art-directed photos in /public/img/photos, each exported at a few widths. */
const PHOTOS = {
  "hero-desk": { widths: [900, 1536], w: 1536, h: 1024 },
  "hours-split": { widths: [900, 1536], w: 1536, h: 658 },
  "services-ribbon": { widths: [640, 1024], w: 1024, h: 1280 },
  "contact-note": { widths: [640, 1024], w: 1024, h: 768 },
  "footer-night": { widths: [900, 1536], w: 1536, h: 512 },
} as const;

export type PhotoName = keyof typeof PHOTOS;

export default function Photo({
  name,
  alt,
  sizes = "100vw",
  eager = false,
  className = "",
  style,
}: {
  name: PhotoName;
  alt: string;
  sizes?: string;
  /** Load immediately (above the fold) but at low priority, so text and fonts win. */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const p = PHOTOS[name];
  const src = (w: number) => `/img/photos/${name}-${w}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src(p.widths[p.widths.length - 1])}
      srcSet={p.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "low" : "auto"}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
