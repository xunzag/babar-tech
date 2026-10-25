"use client";

import { SITE } from "../content";
import { fmtTime, hourIn, useNow, useTimeZone } from "../useClock";

// Fahad's working window in Pakistan time (overnight, so it lines up with US and UK business hours)
const ON = 22;
const OFF = 11;

/** Fahad's cutout with a live status: online now, or when he's back in the visitor's own time. */
export default function FahadStatus() {
  const now = useNow(30_000);
  const tz = useTimeZone();
  const h = now ? hourIn(now, SITE.teamTz) : null;
  const online = h === null ? null : h >= ON || h < OFF;
  const back = now && h !== null && tz ? now + (((ON - h + 24) % 24) * 36e5) : null;

  return (
    <aside className="relative min-h-[400px] overflow-hidden lg:min-h-[480px] rounded-[28px] p-6 sm:p-8" style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div aria-hidden className="absolute -right-10 -bottom-28 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #f68a44, var(--orange) 62%)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/cutout/fahad.webp" alt="" width={393} height={389} className="absolute right-0 bottom-0 h-[52%] w-auto max-w-none" />
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mono text-[11px] uppercase tracking-[0.08em]" style={{ background: "rgb(255 255 255 / .08)" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: online === false ? "#8f8f88" : "#3ad08a", boxShadow: online ? "0 0 0 4px rgb(58 208 138 / .2)" : undefined }} />
          {online === null ? "Fahad Ali" : online ? "Online now" : "Offline"}
        </p>
        <p className="mt-6 text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.02em]">
          {online === false ? "Fahad’s offline right now." : "Fahad reads every brief himself."}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "#a3a39d" }}>
          {online === null && "Founder of Babar Tech. Expect a reply within two hours on working days."}
          {online === true && <>It&apos;s {fmtTime(now!, SITE.teamTz)} in Pakistan and he&apos;s at his desk. Expect a reply within two hours.</>}
          {online === false && back && tz && <>He&apos;s back at 22:00 Pakistan time, that&apos;s {fmtTime(back, tz)} for you, and your brief is the first thing he reads.</>}
        </p>
      </div>
      <p className="absolute bottom-6 left-6 text-[24px] leading-none [font-family:var(--font-hand)] sm:bottom-8 sm:left-8" style={{ color: "var(--orange)" }}>— Fahad Ali,<br />founder</p>
    </aside>
  );
}
