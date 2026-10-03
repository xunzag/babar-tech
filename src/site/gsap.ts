"use client";

import { useEffect, useState, type RefObject } from "react";

type G = typeof import("gsap").gsap;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type GsapKit = { gsap: G; ScrollTrigger: ST; reduced: boolean; mobile: boolean };

let loading: Promise<{ gsap: G; ScrollTrigger: ST }> | null = null;

/** GSAP + ScrollTrigger, fetched once after first paint so they never block the page. */
export function loadGsap() {
  if (!loading) {
    loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      s.ScrollTrigger.config({ ignoreMobileResize: true });
      return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    });
  }
  return loading;
}

/**
 * Run a GSAP setup scoped to `scope`, reverted automatically on unmount.
 * `setup` receives the kit plus reduced-motion and mobile flags.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (kit: GsapKit) => void, deps: unknown[] = []) {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !scope.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 860px)").matches;
      const ctx = gsap.context(() => setup({ gsap, ScrollTrigger, reduced, mobile }), scope.current);
      revert = () => ctx.revert();
      // layout may have shifted (fonts, images) since first paint
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelled = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * 0→1 progress of `ref` scrolling through the viewport (top hits top → bottom hits bottom),
 * quantised to 1% so React re-renders at most ~100 times per pass. Reduced motion: always 1.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setP(1), 0);
      return () => window.clearTimeout(t);
    }
    let kill: (() => void) | undefined;
    let cancelled = false;
    loadGsap().then(({ ScrollTrigger }) => {
      if (cancelled || !ref.current) return;
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (s) => setP(Math.round(s.progress * 100) / 100),
      });
      kill = () => st.kill();
    });
    return () => {
      cancelled = true;
      kill?.();
    };
  }, [ref]);
  return p;
}
