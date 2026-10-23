"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "in" | "out";
type LenisLike = { stop: () => void; start: () => void };

const COVER_MS = 520; // doors close and the mark snaps together
const REVEAL_MS = 700; // the mark splits and the doors open

function lenis() {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/** Is this click a same-site page change we should animate? */
function target(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return null;
  const href = a.getAttribute("href") || "";
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return null;
  const norm = (p: string) => p.replace(/\/+$/, "") || "/";
  if (norm(url.pathname) === norm(location.pathname)) return null; // same page (incl. #anchors)
  return url.pathname + url.search + url.hash;
}

/**
 * Page curtain: charcoal doors close while the mark's three pieces snap together, then open onto the new page.
 * First visit: a CSS-only intro (html.intro, set by an inline script) so it plays before hydration.
 * Page changes: cover → navigate → lift.
 */
export default function Curtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const waiting = useRef(false);
  const fallback = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = target(e);
      if (!href) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // plain navigation
      e.preventDefault();
      document.documentElement.classList.remove("intro");
      lenis()?.stop();
      waiting.current = true;
      setPhase("in");
      window.setTimeout(() => router.push(href), COVER_MS);
      // never leave the curtain down if navigation stalls
      window.clearTimeout(fallback.current);
      fallback.current = window.setTimeout(() => {
        if (waiting.current) reveal();
      }, 5000);
    };
    // Capture phase: runs before Next's <Link>, which then sees defaultPrevented and stands down
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  function reveal() {
    waiting.current = false;
    window.clearTimeout(fallback.current);
    setPhase("out");
    lenis()?.start();
    window.setTimeout(() => setPhase("idle"), REVEAL_MS);
  }

  // The new route rendered behind the curtain: give it a frame to paint, then lift.
  useEffect(() => {
    if (!waiting.current) return;
    const t = window.setTimeout(reveal, 140);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div className="curtain" data-phase={phase} aria-hidden="true">
      <div className="curtain__half curtain__half--t" />
      <div className="curtain__half curtain__half--b" />
      <div className="curtain__brand">
        <div className="curtain__logo">
          {["top", "band", "bottom"].map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p} className={`curtain__piece curtain__piece--${p}`} src={`/img/mark/${p}.webp`} alt="" width={704} height={720} />
          ))}
        </div>
        <span className="curtain__word">Babar Tech <span>Solutions</span></span>
      </div>
    </div>
  );
}
