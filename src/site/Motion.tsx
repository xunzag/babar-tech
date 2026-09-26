"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole page:
 *  - [data-reveal] and .words get `.is-in` the first time they enter the viewport
 *  - [data-anim] loops get `.is-paused` while offscreen so they cost nothing
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const pause = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("is-paused", !e.isIntersecting);
      },
      { rootMargin: "80px" },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in), .words:not(.is-in)").forEach((el) => reveal.observe(el));
      document.querySelectorAll("[data-anim]").forEach((el) => pause.observe(el));
    };
    scan();
    // Catch content that mounts a moment later (client islands)
    const t = window.setTimeout(scan, 400);

    return () => {
      window.clearTimeout(t);
      reveal.disconnect();
      pause.disconnect();
    };
  }, [pathname]);

  return null;
}
