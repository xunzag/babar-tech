"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "./content";
import { fmtTime, useNow, useTimeZone } from "./useClock";

type Lane = { key: string; label: string; who: string; photo: string; color: string; tasks: [string, string][] };

const LANES: Lane[] = [
  {
    key: "support", label: "Support", who: "Ryan", photo: "/img/team/ryan-400.webp", color: "var(--orange)",
    tasks: [
      ["Refund request #4821", "refunded, customer kept"],
      ["“Where's my order?” #4822", "tracking sent"],
      ["Downgrade request #4830", "saved with annual plan"],
      ["Damaged item, photo attached #4833", "replacement shipped"],
      ["Login loop on mobile #4841", "fixed, logged for dev"],
    ],
  },
  {
    key: "assist", label: "Assist", who: "Ria", photo: "/img/team/ria-400.webp", color: "#8aa4ff",
    tasks: [
      ["Clear inbox, 34 unread", "inbox zero"],
      ["Reschedule Thursday board call", "moved to Fri 10:00"],
      ["Book flights for the Lisbon trip", "booked + calendar"],
      ["Update investor CRM notes", "12 records updated"],
      ["Prep Monday brief", "brief in Notion"],
    ],
  },
  {
    key: "sales", label: "Sales", who: "Izma", photo: "/img/team/izma-400.webp", color: "#f5c26b",
    tasks: [
      ["Call 40 roofing leads, Texas", "3 inspections booked"],
      ["Follow up: dental clinic lead", "demo booked Thu 3pm"],
      ["Qualify inbound demo request", "qualified, handed over"],
      ["Build list: 200 HVAC owners", "list in CRM"],
      ["Re-engage cold pipeline", "2 replies, 1 call set"],
    ],
  },
  {
    key: "dev", label: "Build", who: "Fahad", photo: "/img/team/fahad-400.webp", color: "#6fd6a4",
    tasks: [
      ["Fix checkout tax rounding", "deployed"],
      ["Ship new pricing page", "live, 98 Lighthouse"],
      ["Zap: Stripe → Google Sheets", "running"],
      ["Compress product images", "page 2.1s faster"],
      ["Review PR #212", "merged"],
    ],
  },
];

type Active = { id: number; lane: number; task: number; dur: number; start: number };
type Done = { id: number; lane: number; task: number; at: number };

function cityOf(tz: string) {
  return tz.split("/").pop()!.replace(/_/g, " ");
}

export default function LiveDesk() {
  const now = useNow(1000);
  const tz = useTimeZone();
  const [active, setActive] = useState<Active[]>(() => LANES.map((_, i) => ({ id: i, lane: i, task: 0, dur: 2600 + i * 700, start: 0 })));
  const [done, setDone] = useState<Done[]>([]);
  const [closed, setClosed] = useState(127);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const seq = useRef(10);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Restart every lane's clock when the desk comes back into view
    const io = new IntersectionObserver(
      ([e]) => {
        setRunning(e.isIntersecting);
        if (e.isIntersecting) setActive((cur) => cur.map((a) => ({ ...a, start: Date.now() })));
      },
      { threshold: 0.15 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Each lane completes its task after `dur`, logs it, and pulls the next one.
  useEffect(() => {
    if (!running) return;
    const timers = active.map((a) =>
      window.setTimeout(() => {
        const at = Date.now();
        setDone((d) => [{ id: seq.current++, lane: a.lane, task: a.task, at }, ...d].slice(0, 4));
        setClosed((c) => c + 1);
        setActive((cur) =>
          cur.map((x) =>
            x.lane === a.lane
              ? { id: seq.current++, lane: a.lane, task: (a.task + 1) % LANES[a.lane].tasks.length, dur: 2800 + Math.round(Math.random() * 3200), start: Date.now() }
              : x,
          ),
        );
      }, Math.max(0, a.start + a.dur - Date.now())),
    );
    return () => timers.forEach(clearTimeout);
  }, [running, active]);

  const same = tz === SITE.teamTz;

  return (
    <div
      ref={ref}
      data-anim
      className={`relative overflow-hidden rounded-[26px] text-[14px] ${running ? "" : "is-paused"}`}
      style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 50px 100px -40px rgb(15 17 20 / .55)" }}
    >
      {/* Clock header */}
      <div className="grid grid-cols-2 border-b" style={{ borderColor: "rgb(255 255 255 / .09)" }}>
        {[
          { k: "You", tz: tz ?? "UTC", city: tz ? cityOf(tz) : "…" },
          { k: "Team", tz: SITE.teamTz, city: "Pakistan" },
        ].map((c, i) => (
          <div key={c.k} className="px-5 py-4 sm:px-6" style={{ borderLeft: i ? "1px solid rgb(255 255 255 / .09)" : undefined }}>
            <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "#8f8f88" }}>
              {c.k} · {same && i === 0 ? "Local" : c.city}
            </p>
            <p className="mono tnum mt-1 text-[clamp(1.4rem,3.2vw,2rem)] leading-none tracking-tight">
              {now && tz ? fmtTime(now, c.tz, true) : "--:--:--"}
            </p>
          </div>
        ))}
      </div>

      {/* Lanes */}
      <ul className="px-3 pt-3 sm:px-4">
        {active.map((a) => {
          const lane = LANES[a.lane];
          const [title] = lane.tasks[a.task];
          return (
            <li key={lane.key} className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl px-2 py-2.5 sm:px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lane.photo} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px var(--ink), 0 0 0 3.5px ${lane.color}` }} />
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p key={a.id} className="flow-item truncate text-[14px]" style={{ color: "#f1efe9" }}>{title}</p>
                  <span className="mono flex-none text-[11px] uppercase tracking-[0.06em]" style={{ color: lane.color }}>{lane.label}</span>
                </div>
                <div className="mt-2 h-[3px] overflow-hidden rounded-full" style={{ background: "rgb(255 255 255 / .08)" }}>
                  <div key={`${a.id}-${a.start}`} className="flow-bar h-full rounded-full" style={{ background: lane.color, ["--t" as string]: `${a.dur}ms` }} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Done log */}
      <div className="mx-3 mt-2 mb-3 rounded-2xl p-4 sm:mx-4 sm:mb-4" style={{ background: "#171a1f" }}>
        <div className="flex items-center justify-between">
          <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "#8f8f88" }}>Done</p>
          <p className="mono tnum text-[11px]" style={{ color: "#8f8f88" }}>
            <span style={{ color: "#6fd6a4" }}>{closed}</span> closed today
          </p>
        </div>
        <ul className="mt-2 h-[112px] overflow-hidden">
          {done.length === 0 && (
            <li className="py-1.5 text-[13px]" style={{ color: "#6b6c66" }}>Waiting for the first handoff…</li>
          )}
          {done.map((d) => {
            const lane = LANES[d.lane];
            const [title, result] = lane.tasks[d.task];
            return (
              <li key={d.id} className="flow-done flex items-center gap-2.5 py-1.5 text-[13px]">
                <span className="grid h-4 w-4 flex-none place-items-center rounded-full" style={{ background: lane.color, color: "var(--ink)" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden><path d="m4 12.5 5 5L20 7" /></svg>
                </span>
                <span className="truncate" style={{ color: "#cfccc4" }}>{title}</span>
                <span className="ml-auto flex-none truncate pl-2 max-sm:hidden" style={{ color: "#85867f" }}>{result}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="px-5 pb-4 text-[11px] sm:px-6" style={{ color: "#6b6c66" }}>
        Illustrative feed of a typical day across our service lines.
      </p>
    </div>
  );
}
