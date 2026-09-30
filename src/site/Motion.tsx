"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Animate the number inside `el` from 0 to its rendered value, keeping prefix/suffix/format. */
function countUp(el: HTMLElement) {
  const text = el.textContent ?? "";
  const m = text.match(/[\d,.]+/);
  if (!m) return;
  const raw = m[0];
  const target = parseFloat(raw.replace(/,/g, ""));
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const comma = raw.includes(",");
  const [pre, post] = [text.slice(0, m.index), text.slice((m.index ?? 0) + raw.length)];
  const fmt = (v: number) => {
    const s = v.toFixed(decimals);
    return comma ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s;
  };
  const dur = 1600;
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(2, -10 * p); // easeOutExpo
    el.textContent = pre + fmt(p >= 1 ? target : target * eased) + post;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * One observer for the whole page:
 *  - [data-reveal] and .words get `.is-in` the first time they enter the viewport
 *  - [data-anim] loops get `.is-on` only while on screen, so offscreen loops cost nothing
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-ready", "");
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            e.target.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const pause = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("is-on", e.isIntersecting);
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
