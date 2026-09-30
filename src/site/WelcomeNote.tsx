"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE } from "./content";
import { CONSENT_EVENT, readConsent } from "./consent";
import { Arrow, Close } from "./Icons";

const KEY = "bts-welcome-seen";
const SKIP = ["/contact", "/privacy", "/cookies"];

function seen() {
  try { return window.localStorage.getItem(KEY) === "1"; } catch { return true; }
}
function markSeen() {
  try { window.localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
}

/**
 * A one-time, non-blocking note from the founder for first-time visitors.
 * Appears after the cookie choice is made, then on the first of:
 * 20s on site, reading past ~45% of a page, or (desktop) moving to leave.
 */
export default function WelcomeNote() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    if (seen() || SKIP.some((p) => pathname?.startsWith(p))) return;

    let timer: number | undefined;
    const show = () => {
      if (armed.current || seen()) return;
      armed.current = true;
      markSeen();
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      if (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) > 0.45) show();
    };
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0) show(); };

    const arm = () => {
      timer = window.setTimeout(show, 20000);
      window.addEventListener("scroll", onScroll, { passive: true });
      if (window.matchMedia("(hover: hover)").matches) document.addEventListener("mouseout", onLeave);
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener(CONSENT_EVENT, arm);
    };

    // Never stack on top of the cookie banner
    if (readConsent()) arm();
    else window.addEventListener(CONSENT_EVENT, arm, { once: true });

    return cleanup;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setClosing(true);
    window.setTimeout(() => setOpen(false), 280);
  }

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="welcome-title"
      className="fixed z-[60] bottom-3 left-3 right-3 sm:left-auto sm:bottom-5 sm:right-5 sm:w-[380px] overflow-hidden rounded-[22px] sheet-in"
      style={{
        background: "var(--card)",
        boxShadow: "0 1px 0 var(--line), 0 40px 80px -30px rgb(15 17 20 / .45)",
        border: "1px solid var(--line)",
        transition: "opacity .28s ease, transform .28s var(--ease-out)",
        opacity: closing ? 0 : 1,
        transform: closing ? "translateY(16px)" : undefined,
      }}
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="eyebrow">A note from the founder</span>
        <button onClick={dismiss} aria-label="Close" className="-mr-2 grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-black/5">
          <Close size={18} />
        </button>
      </div>
      <div className="flex gap-4 px-5 pt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/team/fahad-96.webp" alt="" width={56} height={70} className="h-[70px] w-14 flex-none rounded-xl object-cover" />
        <div>
          <p id="welcome-title" className="font-medium leading-snug">Hi, I&apos;m Fahad. I run Babar Tech.</p>
          <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--mute)" }}>
            Tell me which role you&apos;re trying to fill. I&apos;ll reply personally, usually within two hours, with who on the team fits and what it would cost.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 p-5 pt-0">
        <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-orange !min-h-11 text-[14px]" onClick={dismiss}>
          Book a free 30-min call <Arrow size={16} className="arr" />
        </a>
        <a href="/contact/" className="btn btn-line !min-h-11 !px-4 text-[14px]" onClick={dismiss}>Write</a>
      </div>
    </aside>
  );
}
