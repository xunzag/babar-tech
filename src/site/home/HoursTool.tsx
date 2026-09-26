"use client";

import { useMemo, useState } from "react";
import { SITE } from "../content";
import { hourIn, tzOffset, useNow, useTimeZone } from "../useClock";

const CITIES = [
  { label: "New York", tz: "America/New_York" },
  { label: "Chicago", tz: "America/Chicago" },
  { label: "Los Angeles", tz: "America/Los_Angeles" },
  { label: "Toronto", tz: "America/Toronto" },
  { label: "London", tz: "Europe/London" },
  { label: "Berlin", tz: "Europe/Berlin" },
  { label: "Dubai", tz: "Asia/Dubai" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

const mod = (n: number) => ((n % 24) + 24) % 24;
const pad = (h: number) => {
  const m = Math.round(mod(h) * 60);
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

/** A band on a 24h rail that may wrap past midnight. Returns 1–2 segments in % units. */
function segs(start: number, end: number) {
  const s = mod(start), e = mod(end);
  if (s < e) return [[s, e]];
  return [[s, 24], [0, e]].filter(([a, b]) => b > a);
}

export default function HoursTool() {
  const now = useNow(60_000);
  const detected = useTimeZone();
  const [picked, setTz] = useState<string | null>(null);
  const usable = detected && detected !== SITE.teamTz ? detected : null;
  const mine = usable && !CITIES.some((c) => c.tz === usable)
    ? { label: `Your time (${usable.split("/").pop()!.replace(/_/g, " ")})`, tz: usable }
    : null;
  const tz = picked ?? usable ?? CITIES[0].tz;

  const options = mine ? [mine, ...CITIES] : CITIES;
  const city = options.find((c) => c.tz === tz) ?? CITIES[0];

  const { diff, yourStart, yourEnd, teamStart, teamEnd, nowH } = useMemo(() => {
    const t = now ?? Date.UTC(2026, 0, 15, 12);
    const d = tzOffset(t, SITE.teamTz) - tzOffset(t, tz);
    return {
      diff: d,
      yourStart: 9, yourEnd: 17,
      teamStart: mod(9 + d), teamEnd: mod(17 + d),
      nowH: hourIn(t, tz),
    };
  }, [now, tz]);

  // Team's own daytime shift (09–18 PKT) expressed on the client's clock
  const handoff = segs(9 - diff, 18 - diff);
  const overlapsDay = Math.abs(diff) < 3;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap gap-2 border-b p-4 sm:p-5" style={{ borderColor: "var(--line)" }} role="radiogroup" aria-label="Choose your city">
        {options.map((c) => (
          <button
            key={c.tz}
            role="radio"
            aria-checked={tz === c.tz}
            onClick={() => setTz(c.tz)}
            className="rounded-full px-3.5 py-2 text-[14px] transition-all duration-300"
            style={tz === c.tz ? { background: "var(--ink)", color: "var(--paper)" } : { boxShadow: "inset 0 0 0 1px var(--line)", color: "var(--mute)" }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-8">
        <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] leading-snug tracking-tight">
          Your 09:00–17:00 in <strong className="font-semibold">{city.label.replace(/^Your time \((.*)\)$/, "$1")}</strong> is{" "}
          <strong className="font-semibold" style={{ color: "var(--orange)" }}>{pad(teamStart)}–{pad(teamEnd)}</strong> for the team.{" "}
          <span style={{ color: "var(--mute)" }}>
            {overlapsDay
              ? "Your days line up almost exactly."
              : "We staff that shift on purpose, so you get a live teammate during your working day."}
          </span>
        </p>

        {/* Rails */}
        <div className="mt-8 select-none">
          {[
            { label: "Your day", sub: city.label.replace(/^Your time \((.*)\)$/, "$1"), shift: 0 },
            { label: "Team", sub: "Pakistan", shift: diff },
          ].map((row, ri) => (
            <div key={row.label} className="grid grid-cols-[64px_1fr] items-center gap-3 sm:grid-cols-[92px_1fr] sm:gap-4">
              <div className="leading-tight">
                <p className="text-[13px] font-medium">{row.label}</p>
                <p className="mono text-[10px] uppercase" style={{ color: "var(--faint)" }}>{row.sub}</p>
              </div>
              <div className={`relative h-11 ${ri === 0 ? "rounded-t-xl" : "rounded-b-xl"}`} style={{ background: "var(--paper)" }}>
                {/* hour ticks */}
                <div className="absolute inset-0 grid grid-cols-24">
                  {Array.from({ length: 24 }).map((_, h) => (
                    <div key={h} className="relative" style={{ borderLeft: h ? "1px solid var(--line)" : undefined }}>
                      {h % 3 === 0 && (
                        <span className="mono absolute left-1 top-1 text-[9px] tnum max-sm:hidden" style={{ color: "var(--faint)" }}>
                          {String(Math.floor(mod(h + row.shift))).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {/* business-hours band (same instant, so same x on both rails) */}
                <div
                  className="absolute bottom-1.5 h-4 rounded-md transition-all duration-700"
                  style={{ left: `${(yourStart / 24) * 100}%`, width: `${((yourEnd - yourStart) / 24) * 100}%`, background: "var(--orange)", transitionTimingFunction: "var(--ease-out)" }}
                />
                {/* team's own daytime = your overnight handoff */}
                {ri === 1 &&
                  !overlapsDay &&
                  handoff.map(([a, b], i) => (
                    <div
                      key={i}
                      className="absolute top-1.5 h-2 rounded-full transition-all duration-700"
                      style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%`, background: "var(--blue)", opacity: 0.85, transitionTimingFunction: "var(--ease-out)" }}
                    />
                  ))}
                {/* now */}
                {now && (
                  <div className="absolute inset-y-0 w-px" style={{ left: `${(nowH / 24) * 100}%`, background: "var(--ink)" }}>
                    {ri === 0 && <span className="mono absolute -top-5 -translate-x-1/2 text-[10px] uppercase" style={{ color: "var(--ink)" }}>now</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px]" style={{ color: "var(--mute)" }}>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-4 rounded-sm" style={{ background: "var(--orange)" }} /> Live shift during your hours</span>
          {!overlapsDay && (
            <span className="inline-flex items-center gap-2"><span className="h-1.5 w-4 rounded-full" style={{ background: "var(--blue)" }} /> Overnight handoff: done before you wake up</span>
          )}
        </div>
      </div>
    </div>
  );
}
