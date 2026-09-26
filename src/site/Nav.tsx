"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "./content";
import { Arrow } from "./Icons";
import { fmtTime, useNow } from "./useClock";

function TeamClock() {
  const now = useNow(1000 * 15);
  return (
    <span className="hidden xl:inline-flex items-center gap-2 mono text-[12px]" style={{ color: "var(--mute)" }} title="Current time for the team in Pakistan">
      <span className="dot-live" />
      Team time <span className="tnum" style={{ color: "var(--ink)" }}>{now ? fmtTime(now, SITE.teamTz) : "--:--"}</span> PKT
    </span>
  );
}

export function Mark({ size = 30 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/img/mark.webp" alt="" width={size} height={Math.round(size * 0.86)} style={{ width: size, height: "auto" }} />
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Close the menu on navigation (adjusting state during render, per React docs)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 240 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => href !== "/" && !href.includes("#") && pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--paper)]">
        Skip to content
      </a>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500"
        style={{
          transform: hidden && !open ? "translateY(-100%)" : "none",
          transitionTimingFunction: "var(--ease-out)",
          background: open ? "transparent" : scrolled ? "rgb(242 240 235 / .82)" : "transparent",
          color: open ? "var(--cream)" : undefined,
          backdropFilter: scrolled && !open ? "saturate(1.4) blur(14px)" : undefined,
          WebkitBackdropFilter: scrolled && !open ? "saturate(1.4) blur(14px)" : undefined,
          boxShadow: scrolled && !open ? "0 1px 0 var(--line)" : "none",
        }}
      >
        <nav className="wrap flex h-[var(--nav-h)] items-center gap-6" aria-label="Primary">
          <Link href="/" className="flex items-center gap-2.5 font-medium tracking-tight" aria-label="Babar Tech Solutions, home">
            <Mark />
            <span className="whitespace-nowrap text-[17px] leading-none">
              Babar Tech<span className="hidden sm:inline" style={{ color: "var(--faint)" }}> Solutions</span>
            </span>
          </Link>

          <ul className="ml-auto hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="relative rounded-full px-3.5 py-2 text-[15px] transition-colors hover:bg-black/[.05]"
                  style={{ color: isActive(n.href) ? "var(--ink)" : "var(--mute)" }}
                  aria-current={isActive(n.href) ? "page" : undefined}
                >
                  {n.label}
                  {isActive(n.href) && <span className="absolute left-1/2 bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full" style={{ background: "var(--orange)" }} />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto md:ml-2 flex items-center gap-4">
            <TeamClock />
            <Link href="/contact/" className="btn hidden md:inline-flex !min-h-10 !px-4 text-[14px]">
              Hire a specialist <Arrow size={16} className="arr" />
            </Link>
            <button
              className="md:hidden grid h-11 w-11 place-items-center rounded-full"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              style={{ boxShadow: "inset 0 0 0 1px color-mix(in srgb, currentColor 25%, transparent)" }}
            >
              <span className="relative block h-3 w-5">
                <span className="absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-500" style={{ top: open ? 5 : 0, transform: open ? "rotate(45deg)" : "none", transitionTimingFunction: "var(--ease-out)" }} />
                <span className="absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-500" style={{ top: open ? 5 : 10, transform: open ? "rotate(-45deg)" : "none", transitionTimingFunction: "var(--ease-out)" }} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 md:hidden flex flex-col ink"
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path .7s var(--ease-out)",
          visibility: open ? "visible" : "hidden",
          transitionProperty: "clip-path, visibility",
          transitionDelay: open ? "0s, 0s" : "0s, .7s",
        }}
        aria-hidden={!open}
      >
        <div className="wrap flex flex-1 flex-col pt-[calc(var(--nav-h)+24px)] pb-8">
          <ul className="flex flex-col">
            {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact/", label: "Contact" }].map((n, i) => (
              <li key={n.href} style={{ borderTop: "1px solid var(--line)" }}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline justify-between py-4 h3"
                  style={{
                    transform: open ? "none" : "translateY(24px)",
                    opacity: open ? 1 : 0,
                    transition: `transform .8s var(--ease-out) ${0.08 + i * 0.05}s, opacity .6s ease ${0.08 + i * 0.05}s`,
                  }}
                >
                  {n.label}
                  <span className="mono text-[12px]" style={{ color: "var(--faint)" }}>0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-orange w-full">
              Book a 30-min call <Arrow size={16} className="arr" />
            </a>
            <a href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1} className="text-center text-[15px]" style={{ color: "var(--mute)" }}>{SITE.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}
