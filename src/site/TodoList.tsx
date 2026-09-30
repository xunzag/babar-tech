"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "./content";
import { fmtTime, useNow, useTimeZone } from "./useClock";

/* A paper to-do list that the team empties while you watch.
   Illustrative: the tasks are typical of each service line, not client data. */

type Who = { name: string; photo: string };
const RYAN: Who = { name: "Ryan", photo: "/img/team/ryan-400.webp" };
const RIA: Who = { name: "Ria", photo: "/img/team/ria-400.webp" };
const IZMA: Who = { name: "Izma", photo: "/img/team/izma-400.webp" };
const FAHAD: Who = { name: "Fahad", photo: "/img/team/fahad-400.webp" };
const HOORIA: Who = { name: "Hooria", photo: "/img/team/hooria-400.webp" };
const SAMRA: Who = { name: "Samra", photo: "/img/team/samra-400.webp" };

const TASKS: { text: string; note: string; who: Who }[] = [
  { text: "Answer the refund emails", note: "refunded, customer stayed", who: RYAN },
  { text: "Clear my inbox (34 unread)", note: "inbox zero", who: RIA },
  { text: "Call the Texas roofing leads", note: "3 inspections booked", who: IZMA },
  { text: "Fix the checkout rounding bug", note: "shipped", who: FAHAD },
  { text: "Onboard the two new accounts", note: "both live, call done", who: HOORIA },
  { text: "Chase supplier invoices", note: "all paid, filed", who: SAMRA },
  { text: "Move Thursday's board call", note: "now Fri 10:00", who: RIA },
  { text: "Follow up with the dental clinic", note: "demo booked, Thu 3pm", who: IZMA },
  { text: "Reply to the angry review", note: "replied, customer happy", who: RYAN },
  { text: "Connect Stripe to the sheet", note: "automated", who: FAHAD },
  { text: "Check in on quiet accounts", note: "1 saved from churning", who: HOORIA },
  { text: "Write the returns SOP", note: "in Notion", who: SAMRA },
];

type Row = { id: number; task: number; state: "todo" | "done" | "leaving"; age: number };
const VISIBLE = 5;

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="todo-check absolute inset-0 h-full w-full" aria-hidden>
      <path d="M5 12.5 9.8 17 19.5 6.5" fill="none" stroke="var(--orange)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

export default function TodoList() {
  const now = useNow(1000 * 30);
  const tz = useTimeZone();
  const [rows, setRows] = useState<Row[]>(() => Array.from({ length: VISIBLE }, (_, i) => ({ id: i, task: i, state: "todo", age: 0 })));
  const [closed, setClosed] = useState(126);
  const [running, setRunning] = useState(false);
  const next = useRef({ id: VISIBLE, task: VISIBLE });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // One tick: finished rows fold away, new ones get written in, and the next task gets done.
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      setRows((cur) => {
        let out = cur.filter((r) => r.state !== "leaving");
        out = out.map((r) => (r.state === "done" ? { ...r, age: r.age + 1 } : r));
        out = out.map((r) => (r.state === "done" && r.age >= 3 ? { ...r, state: "leaving" } : r));
        // Write the replacement in while the finished row folds away, so the list never jumps
        while (out.filter((r) => r.state !== "leaving").length < VISIBLE) {
          out = [...out, { id: next.current.id++, task: next.current.task++ % TASKS.length, state: "todo", age: 0 }];
        }
        const first = out.findIndex((r) => r.state === "todo");
        if (first >= 0 && out.filter((r) => r.state === "done").length < 3) {
          out = out.map((r, i) => (i === first ? { ...r, state: "done", age: 0 } : r));
          setClosed((c) => c + 1);
        }
        return out;
      });
    }, 1500);
    return () => window.clearInterval(t);
  }, [running]);

  const local = tz && now ? fmtTime(now, tz) : "--:--";
  const team = now ? fmtTime(now, SITE.teamTz) : "--:--";

  return (
    <div ref={ref} className="relative mx-auto max-w-[620px] pt-4" role="img" aria-label="Illustration: a to-do list whose tasks are ticked off one by one by Babar Tech team members">
      {/* sheets underneath */}
      <div aria-hidden className="paper absolute inset-x-3 top-6 bottom-[-10px] rotate-[2.4deg] opacity-80" />
      <div aria-hidden className="paper absolute inset-x-1 top-5 bottom-[-4px] -rotate-[1.6deg] opacity-90" />

      <div className="paper paper-front relative -rotate-[0.8deg] px-5 pt-9 pb-5 sm:px-8 sm:pt-11 sm:pb-7">
        {/* tape */}
        <span aria-hidden className="tape absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-[3deg]" />

        <div className="flex items-end justify-between gap-4 border-b-2 pb-3" style={{ borderColor: "rgb(15 17 20 / .8)" }}>
          <p className="hand text-[34px] leading-none sm:text-[40px]">To do</p>
          <p className="hand text-right text-[17px] leading-tight sm:text-[19px]" style={{ color: "var(--mute)" }}>
            you: <span className="tnum">{local}</span> · team: <span className="tnum">{team}</span>
            <br />
            <span style={{ color: "var(--orange)" }}>{closed} done today</span>
          </p>
        </div>

        <ul className="relative h-[350px] overflow-hidden sm:h-[370px]">
          {rows.map((r) => {
            const t = TASKS[r.task];
            const done = r.state !== "todo";
            return (
              <li key={r.id} className={`todo-row ${r.state === "leaving" ? "is-leaving" : ""} ${done ? "is-done" : ""}`}>
                <div>
                <div className="grid h-[70px] grid-cols-[28px_1fr_auto] items-center gap-3 border-b sm:h-[74px] sm:gap-4" style={{ borderColor: "rgb(35 80 224 / .16)" }}>
                  {/* hand-drawn box */}
                  <span className="relative h-6 w-6">
                    <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full" aria-hidden>
                      <path d="M3.5 4.2c5.4-.6 11.2-.5 16.6-.2.5 5.2.6 10.6.2 15.9-5.5.4-11 .5-16.5.1-.4-5.3-.6-10.6-.3-15.8Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    {done && <Check />}
                  </span>

                  <div className="min-w-0">
                    <p className="todo-text relative inline-block max-w-full truncate text-[15px] sm:text-[17px]">
                      {t.text}
                      {done && (
                        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="todo-strike pointer-events-none absolute inset-x-[-2%] top-1/2 h-3 w-[104%] -translate-y-1/2" aria-hidden>
                          <path d="M1 6.2C18 4.4 34 6.8 52 5.1S84 4.2 99 5.6" fill="none" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" pathLength={1} />
                        </svg>
                      )}
                    </p>
                    <p className="hand todo-note h-[22px] truncate text-[19px] leading-[22px] sm:text-[21px]" style={{ color: "var(--orange)" }}>
                      {done ? `${t.note} — ${t.who.name}` : " "}
                    </p>
                  </div>

                  <span className="todo-avatar h-9 w-9 overflow-hidden rounded-full sm:h-10 sm:w-10" style={{ boxShadow: "0 0 0 2px #fdfcf8, 0 0 0 3px rgb(15 17 20 / .12)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.who.photo} alt="" width={40} height={40} className="h-full w-full object-cover" />
                  </span>
                </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-[12px]" style={{ color: "var(--faint)" }}>An example day. Tasks are typical of each service line.</p>
      </div>
    </div>
  );
}
