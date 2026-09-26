"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The page's single animation loop.
 *  - Lenis smooth scrolling (desktop pointer only, never with reduced motion)
 *  - [data-parallax="0.2"]   translateY relative to the element's distance from viewport centre
 *  - [data-drift="-0.3"]     translateX by scroll position while in view
 *  - [data-expand]           sets --e 0→1 as a section rises into view (CSS turns it into clip-path)
 *  - .marquee__track         playback speeds up and reverses with scroll velocity
 *  - .btn / [data-magnetic]  drift toward the pointer
 *  - [data-tilt]             3D tilt + spotlight (--sx/--sy) following the pointer
 */
export default function ScrollFx() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll + scroll-linked effects
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce) return;

    const lenis = finePointer ? new Lenis({ lerp: 0.1, anchors: { offset: -80 }, stopInertiaOnNavigate: true }) : null;
    lenisRef.current = lenis;

    type Item = { el: HTMLElement; kind: "p" | "d" | "e"; f: number };
    let items: Item[] = [];
    let tracks: Animation[] = [];
    const collect = () => {
      items = [
        ...[...document.querySelectorAll<HTMLElement>("[data-parallax]")].map((el) => ({ el, kind: "p" as const, f: parseFloat(el.dataset.parallax || "0.15") })),
        ...[...document.querySelectorAll<HTMLElement>("[data-drift]")].map((el) => ({ el, kind: "d" as const, f: parseFloat(el.dataset.drift || "-0.2") })),
        ...[...document.querySelectorAll<HTMLElement>("[data-expand]")].map((el) => ({ el, kind: "e" as const, f: 0 })),
      ];
      tracks = [...document.querySelectorAll<HTMLElement>(".marquee__track")].flatMap((el) => el.getAnimations());
    };
    collect();
    const recollect = window.setTimeout(collect, 500);

    let raf = 0;
    let lastY = -1;
    let lastT = performance.now();
    let vel = 0;
    let rate = 1;

    const frame = (t: number) => {
      lenis?.raf(t);
      const y = window.scrollY;
      const dt = Math.max(1, t - lastT);
      const instant = lastY < 0 ? 0 : (y - lastY) / dt; // px per ms
      vel += (instant - vel) * 0.15;
      lastT = t;

      if (y !== lastY) {
        const vh = window.innerHeight;
        for (const it of items) {
          const r = it.el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          if (it.kind === "p") {
            const off = (r.top + r.height / 2 - vh / 2) * -it.f;
            it.el.style.setProperty("--py", `${off.toFixed(1)}px`);
          } else if (it.kind === "d") {
            const prog = (vh - r.top) / (vh + r.height); // 0 entering → 1 leaving
            it.el.style.setProperty("--dx", `${((prog - 0.5) * it.f * 100).toFixed(2)}%`);
          } else {
            const e = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
            it.el.style.setProperty("--e", e.toFixed(3));
          }
        }
        lastY = y;
      }

      // Marquees: base speed, sped up by scroll and flipped when scrolling up
      const target = Math.max(-5, Math.min(5, 1 + vel * 2.2 * (vel < 0 ? 1.4 : 1)));
      const next = rate + ((Math.abs(target) < 1 && target >= 0 ? 1 : target) - rate) * 0.08;
      if (Math.abs(next - rate) > 0.001) {
        rate = next;
        for (const a of tracks) a.playbackRate = rate;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(recollect);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  // New route: start at the top instantly
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  // Pointer effects: magnetic buttons, tilt + spotlight cards
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let mag: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const m = target?.closest<HTMLElement>(".btn, [data-magnetic]") ?? null;
      if (mag && mag !== m) {
        mag.style.setProperty("--mx", "0px");
        mag.style.setProperty("--my", "0px");
      }
      mag = m;
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty("--mx", `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
        m.style.setProperty("--my", `${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px`);
      }

      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilt && tilt !== t) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
        tilt.style.setProperty("--so", "0");
      }
      tilt = t;
      if (t) {
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const k = parseFloat(t.dataset.tilt || "4");
        t.style.setProperty("--rx", `${((0.5 - py) * k).toFixed(2)}deg`);
        t.style.setProperty("--ry", `${((px - 0.5) * k).toFixed(2)}deg`);
        t.style.setProperty("--sx", `${(px * 100).toFixed(1)}%`);
        t.style.setProperty("--sy", `${(py * 100).toFixed(1)}%`);
        t.style.setProperty("--so", "1");
      }
    };
    const onLeave = () => {
      mag?.style.setProperty("--mx", "0px");
      mag?.style.setProperty("--my", "0px");
      tilt?.style.setProperty("--rx", "0deg");
      tilt?.style.setProperty("--ry", "0deg");
      tilt?.style.setProperty("--so", "0");
      mag = tilt = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
