"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { OPEN_SETTINGS_EVENT, readConsent, writeConsent } from "./consent";

type View = "hidden" | "banner" | "settings";

function Toggle({ checked, onChange, disabled, label }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className="relative h-6 w-11 flex-none rounded-full transition-colors duration-300 disabled:opacity-50"
      style={{ background: checked ? "var(--ink)" : "var(--paper-2)", boxShadow: "inset 0 0 0 1px var(--line)" }}
    >
      <span
        className="absolute top-1 left-1 h-4 w-4 rounded-full transition-transform duration-300"
        style={{ background: checked ? "var(--paper)" : "var(--faint)", transform: checked ? "translateX(20px)" : "none", transitionTimingFunction: "var(--ease-out)" }}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const existing = readConsent();
    let t: number | undefined;
    if (!existing) t = window.setTimeout(() => setView("banner"), 700);
    const open = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setView("settings");
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(OPEN_SETTINGS_EVENT, open);
    };
  }, []);

  useEffect(() => {
    if (view !== "settings") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setView(readConsent() ? "hidden" : "banner");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  const decide = (a: boolean, m: boolean) => {
    writeConsent(a, m);
    setView("hidden");
  };

  if (view === "hidden") return null;

  if (view === "banner") {
    return (
      <div
        role="region"
        aria-label="Cookie consent"
        className="sheet-in fixed z-[70] bottom-3 left-3 right-3 sm:right-auto sm:bottom-5 sm:left-5 sm:max-w-[400px] rounded-[20px] p-5 text-[14px]"
        style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 30px 60px -20px rgb(0 0 0 / .45)" }}
      >
        <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "#8f8f88" }}>Cookies</p>
        <p className="mt-2 leading-relaxed" style={{ color: "#d6d3cb" }}>
          We&apos;d like to use analytics cookies to learn which pages are useful. Nothing is tracked unless you say yes.{" "}
          <Link href="/cookies/" className="underline underline-offset-2 hover:text-white">Cookie policy</Link>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => decide(false, false)} className="h-10 rounded-full text-[14px] font-medium transition-colors hover:bg-white/10" style={{ boxShadow: "inset 0 0 0 1px rgb(255 255 255 / .22)" }}>
            Reject all
          </button>
          <button onClick={() => decide(true, true)} className="h-10 rounded-full text-[14px] font-medium transition-opacity hover:opacity-90" style={{ background: "var(--cream)", color: "var(--ink)" }}>
            Accept all
          </button>
        </div>
        <button onClick={() => setView("settings")} className="mt-3 w-full text-center text-[13px] underline underline-offset-2" style={{ color: "#a9a79f" }}>
          Choose what to allow
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in fixed inset-0 z-[80] grid place-items-end sm:place-items-center p-3 sm:p-6" style={{ background: "rgb(15 17 20 / .45)", backdropFilter: "blur(2px)" }}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="sheet-in w-full max-w-[520px] rounded-[24px] p-6 sm:p-8" style={{ background: "var(--card)" }}>
        <h2 id={titleId} className="h3">Cookie settings</h2>
        <p className="mt-2 text-[15px]" style={{ color: "var(--mute)" }}>
          Pick what you&apos;re comfortable with. You can change this any time from the footer.
        </p>
        <ul className="mt-6 divide-y" style={{ borderColor: "var(--line)" }}>
          {[
            { k: "n", title: "Strictly necessary", desc: "Remembers your cookie choice and whether you've seen our welcome note. Always on.", checked: true, disabled: true },
            { k: "a", title: "Analytics", desc: "Anonymous, aggregated stats on which pages are visited, so we can improve the site.", checked: analytics, on: setAnalytics },
            { k: "m", title: "Marketing", desc: "Lets ad platforms measure whether our campaigns bring people here. Off unless you turn it on.", checked: marketing, on: setMarketing },
          ].map((r) => (
            <li key={r.k} className="flex items-start gap-4 py-4" style={{ borderColor: "var(--line)" }}>
              <div className="flex-1">
                <p className="font-medium">{r.title}</p>
                <p className="mt-1 text-[14px]" style={{ color: "var(--mute)" }}>{r.desc}</p>
              </div>
              <Toggle checked={r.checked} disabled={r.disabled} onChange={r.on} label={r.title} />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
          <button onClick={() => decide(false, false)} className="btn btn-line">Reject all</button>
          <button onClick={() => decide(analytics, marketing)} className="btn">Save choices</button>
        </div>
      </div>
    </div>
  );
}
