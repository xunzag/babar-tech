"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES, SITE, TEAM, type VizKind } from "../content";
import { Arrow, Check } from "../Icons";
import { tzOffset, useNow, useTimeZone } from "../useClock";

const LEAD: Record<VizKind, string> = { support: "ryan", assist: "ria", sales: "izma", success: "hooria", ops: "samra", dev: "fahad" };
const HOURS = [10, 20, 40] as const;
const STARTS = ["As soon as possible", "Next week", "Next month"] as const;
const ZONES = [
  ["America/New_York", "New York"],
  ["America/Chicago", "Chicago"],
  ["America/Los_Angeles", "Los Angeles"],
  ["Europe/London", "London"],
  ["Europe/Berlin", "Berlin"],
  ["Asia/Dubai", "Dubai"],
  ["Australia/Sydney", "Sydney"],
] as const;

const pad = (h: number) => {
  const m = Math.round((((h % 24) + 24) % 24) * 60);
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

/** Pick roles, hours and start date; see the team you'd get, then send it as a brief. */
export default function Builder() {
  const detected = useTimeZone();
  const now = useNow(60_000);
  const [picked, setPicked] = useState<VizKind[]>(["support"]);
  const [hours, setHours] = useState<(typeof HOURS)[number]>(20);
  const [start, setStart] = useState<(typeof STARTS)[number]>("As soon as possible");
  const [zone, setZone] = useState<string | null>(null);

  const knownDetected = detected && ZONES.some(([z]) => z === detected) ? detected : null;
  const tz = zone ?? knownDetected ?? "America/New_York";
  const city = ZONES.find(([z]) => z === tz)?.[1] ?? tz;
  const diff = now ? tzOffset(now, SITE.teamTz) - tzOffset(now, tz) : 9;
  const toggle = (k: VizKind) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  const team = SERVICES.filter((s) => picked.includes(s.viz)).map((s) => ({ s, m: TEAM.find((t) => t.slug === LEAD[s.viz])! }));
  const total = team.length * hours;

  const brief = new URLSearchParams({
    roles: team.map(({ s }) => s.name).join("|"),
    hours: String(hours),
    start,
    tz,
  }).toString();

  return (
    <section id="build" className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <p className="eyebrow" data-reveal><span className="n">07</span><span className="inline-block h-px w-6" style={{ background: "var(--line-strong)" }} />Build your team</p>
        <h2 className="h2 mt-5 max-w-[16ch]" data-reveal>Put your team together in thirty seconds.</h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* choices */}
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <fieldset>
              <legend className="font-medium">1 · Which roles do you need?</legend>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SERVICES.map((s) => {
                  const on = picked.includes(s.viz);
                  const lead = TEAM.find((t) => t.slug === LEAD[s.viz])!;
                  return (
                    <button
                      type="button"
                      key={s.id}
                      aria-pressed={on}
                      onClick={() => toggle(s.viz)}
                      className="group relative flex flex-col items-start gap-3 rounded-2xl p-4 text-left transition-all duration-300"
                      style={on ? { background: "var(--ink)", color: "var(--cream)" } : { background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span className="mono text-[11px]" style={{ color: on ? "var(--orange)" : "var(--orange-ink)" }}>{s.num}</span>
                        <span className="grid h-5 w-5 place-items-center rounded-full transition-all duration-300" style={on ? { background: "var(--orange)", color: "#fff" } : { boxShadow: "inset 0 0 0 1.5px var(--line-strong)" }}>
                          {on && <Check size={12} />}
                        </span>
                      </span>
                      <span className="text-[15px] font-medium leading-tight">{s.name}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={lead.photo.replace("-400", "-96")} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium">2 · Hours per week, per role</legend>
              <div className="mt-4 grid w-full max-w-md grid-cols-3 rounded-full p-1" style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }} role="radiogroup" aria-label="Hours per week">
                {HOURS.map((h) => (
                  <button key={h} type="button" role="radio" aria-checked={hours === h} onClick={() => setHours(h)} className="rounded-full px-2 py-2.5 text-[14px] transition-all duration-300" style={hours === h ? { background: "var(--ink)", color: "var(--paper)" } : { color: "var(--mute)" }}>
                    {h} hrs<span className="max-sm:hidden">{h === 40 ? " · full-time" : ""}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-10 sm:grid-cols-2">
              <fieldset>
                <legend className="font-medium">3 · Your time zone</legend>
                <select
                  aria-label="Your time zone"
                  value={tz}
                  onChange={(e) => setZone(e.target.value)}
                  className="mt-4 w-full rounded-xl px-4 py-3 text-[15px] outline-none"
                  style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line-strong)" }}
                >
                  {ZONES.map(([z, c]) => <option key={z} value={z}>{c}</option>)}
                </select>
              </fieldset>
              <fieldset>
                <legend className="font-medium">4 · When should they start?</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STARTS.map((s) => (
                    <button key={s} type="button" aria-pressed={start === s} onClick={() => setStart(s)} className="rounded-full px-4 py-2.5 text-[14px] transition-all duration-300" style={start === s ? { background: "var(--ink)", color: "var(--paper)" } : { boxShadow: "inset 0 0 0 1px var(--line-strong)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* the team you'd get */}
          <aside className="min-w-0 lg:col-span-5">
            <div className="rounded-[28px] p-6 sm:p-7 lg:sticky lg:top-[calc(var(--nav-h)+24px)]" style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 40px 80px -40px rgb(15 17 20 / .5)" }}>
              <div className="flex items-center justify-between">
                <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "#8f8f88" }}>Your team · draft</p>
                <p className="mono text-[11px]" style={{ color: "#8f8f88" }}>{city}</p>
              </div>

              {team.length === 0 ? (
                <p className="py-14 text-center text-[15px]" style={{ color: "#a3a39d" }}>Pick a role to start building your team.</p>
              ) : (
                <ul className="mt-5 space-y-2">
                  {team.map(({ s, m }) => (
                    <li key={s.id} className="sheet-in flex items-center gap-3 rounded-2xl p-3" style={{ background: "rgb(255 255 255 / .05)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.photo.replace("-400", "-96")} alt="" width={44} height={44} className="h-11 w-11 flex-none rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-medium">{s.name}</p>
                        <p className="truncate text-[12px]" style={{ color: "#a3a39d" }}>Led by {m.name.split(" ")[0]} · works 09:00–{hours === 40 ? "17:00" : hours === 20 ? "13:00" : "11:00"} your time</p>
                      </div>
                      <span className="mono flex-none text-[12px]" style={{ color: "var(--orange)" }}>{hours}h</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 grid grid-cols-3 gap-2 border-t pt-5 text-center" style={{ borderColor: "rgb(255 255 255 / .1)" }}>
                {[
                  [String(team.length), team.length === 1 ? "specialist" : "specialists"],
                  [String(total), "hrs / week"],
                  [start === "As soon as possible" ? "24h" : start === "Next week" ? "7d" : "30d", "to start"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p className="display tnum !text-[32px] !leading-none">{v}</p>
                    <p className="mt-1 text-[11px]" style={{ color: "#8f8f88" }}>{l}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[12px] leading-relaxed" style={{ color: "#8f8f88" }}>
                Your 09:00 in {city} is {pad(9 + diff)} for the team in Pakistan; we staff that shift on purpose. Managed by Fahad Ali, with a weekly report.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <Link href={`/contact/?${brief}`} className={`btn btn-orange w-full ${team.length ? "" : "pointer-events-none opacity-40"}`} aria-disabled={!team.length}>
                  Send this team as a brief <Arrow size={16} className="arr" />
                </Link>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="text-center text-[14px] underline-offset-4 hover:underline" style={{ color: "#a3a39d" }}>
                  or talk it through on a 30-min call
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
