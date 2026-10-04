"use client";

import { useState, type ReactNode } from "react";
import type { VizKind } from "../content";

/* Scroll-driven demos for the services page. Every demo is a pure function of
   `p` (0→1 progress through its chapter) and is labelled as an example. */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** progress of `p` within [a, b] */
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function Frame({ title, tool, children }: { title: string; tool: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px]" style={{ background: "var(--card)", color: "var(--ink)", boxShadow: "0 40px 80px -40px rgb(15 17 20 / .45), 0 0 0 1px rgb(15 17 20 / .06)" }}>
      <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: 0.85 }} />)}</span>
          <span className="text-[13px] font-medium">{title}</span>
        </div>
        <span className="flex items-center gap-2">
          <span className="chip !py-0.5 !text-[11px] mono">{tool}</span>
          <span className="rounded-full px-2 py-0.5 mono text-[10px] uppercase tracking-[0.08em]" style={{ background: "var(--paper-2)", color: "var(--mute)" }}>Example</span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1 p-5">{children}</div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: ReactNode; accent?: boolean }) {
  return (
    <div className="rounded-2xl px-4 py-3" style={{ background: "var(--paper)" }}>
      <p className="mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--mute)" }}>{label}</p>
      <p className="display tnum mt-1 !text-[clamp(1.6rem,2.6vw,2.3rem)] !leading-none" style={{ color: accent ? "var(--orange)" : undefined }}>{value}</p>
    </div>
  );
}

/* 01 · Support: an inbox that empties as you scroll */
function Support({ p }: { p: number }) {
  const tickets = [
    ["Order arrived damaged", "Maya R."],
    ["Where is my refund?", "Tom W."],
    ["Change delivery address", "Aisha K."],
    ["Discount code not working", "Leo P."],
    ["Cancel my subscription", "Grace H."],
    ["Wrong size sent", "Omar S."],
    ["Can't log in on mobile", "Nina B."],
  ];
  const done = Math.floor(seg(p, 0.08, 0.86) * tickets.length + 0.001);
  return (
    <Frame title="Support inbox" tool="Gorgias">
      <div className="grid grid-cols-3 gap-2.5">
        <Stat label="Open" value={tickets.length - done} accent={done < tickets.length} />
        <Stat label="Resolved today" value={34 + done} />
        <Stat label="First reply" value="4 min" />
      </div>
      <ul className="mt-4 space-y-1.5">
        {tickets.map(([subj, who], i) => {
          const isDone = i < done;
          const working = i === done;
          return (
            <li key={subj} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors duration-500" style={{ background: working ? "rgb(242 112 31 / .08)" : "transparent", boxShadow: working ? "inset 0 0 0 1px rgb(242 112 31 / .35)" : undefined }}>
              <span className="mono w-14 flex-none text-[11px]" style={{ color: "var(--mute)" }}>#{4821 + i}</span>
              <span className="min-w-0 flex-1 truncate" style={{ color: isDone ? "var(--faint)" : undefined, textDecoration: isDone ? "line-through" : undefined }}>{subj}</span>
              <span className="hidden w-20 flex-none truncate text-[12px] sm:block" style={{ color: "var(--mute)" }}>{who}</span>
              <span
                className="w-[78px] flex-none rounded-full py-1 text-center mono text-[10px] uppercase tracking-[0.06em] transition-all duration-500"
                style={isDone ? { background: "var(--green)", color: "#fff" } : working ? { background: "var(--orange-ink)", color: "#fff" } : { boxShadow: "inset 0 0 0 1px var(--line-strong)", color: "var(--mute)" }}
              >
                {isDone ? "Resolved" : working ? "Replying" : "Open"}
              </span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

/* 02 · Assistance: the week fills itself, the inbox drains */
function Assist({ p }: { p: number }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks = [
    { d: 0, s: 9, e: 10.5, t: "Board call", c: "var(--ink)" },
    { d: 1, s: 13, e: 14, t: "Flights booked", c: "var(--orange)" },
    { d: 2, s: 9.5, e: 12, t: "Deep work", c: "var(--blue)" },
    { d: 3, s: 15, e: 16, t: "Investor 1:1", c: "var(--ink)" },
    { d: 4, s: 10, e: 11, t: "Hiring sync", c: "var(--orange)" },
    { d: 0, s: 14, e: 15, t: "Dentist", c: "var(--faint)" },
    { d: 2, s: 15, e: 16.5, t: "Payroll", c: "var(--ink)" },
    { d: 4, s: 13.5, e: 15.5, t: "Q3 review", c: "var(--blue)" },
    { d: 1, s: 9, e: 10, t: "Supplier call", c: "var(--blue)" },
    { d: 3, s: 10, e: 11.5, t: "Prep brief", c: "var(--orange)" },
  ];
  const shown = Math.floor(seg(p, 0.05, 0.75) * blocks.length + 0.001);
  const inbox = Math.round(34 * (1 - seg(p, 0.1, 0.9)));
  const H0 = 9, H1 = 17;
  return (
    <Frame title="Your week" tool="Google Workspace">
      <div className="grid h-full grid-cols-[1fr_120px] gap-3 max-sm:grid-cols-1">
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, di) => (
            <div key={d} className="relative min-h-[240px] rounded-xl" style={{ background: "var(--paper)" }}>
              <p className="mono pt-2 text-center text-[10px] uppercase" style={{ color: "var(--mute)" }}>{d}</p>
              {blocks.map((b, bi) =>
                b.d === di ? (
                  <div
                    key={bi}
                    className="absolute inset-x-1 overflow-hidden rounded-md px-1.5 py-1 text-[10px] leading-tight text-white transition-all duration-500"
                    style={{
                      top: `calc(22px + ${((b.s - H0) / (H1 - H0)) * 100}% * .86)`,
                      height: `calc(${((b.e - b.s) / (H1 - H0)) * 100}% * .86)`,
                      background: b.c,
                      opacity: bi < shown ? 1 : 0,
                      transform: bi < shown ? "none" : "scaleY(.3)",
                      transformOrigin: "top",
                    }}
                  >
                    {b.t}
                  </div>
                ) : null,
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 max-sm:flex-row">
          <div className="flex flex-1 flex-col justify-between rounded-2xl p-3" style={{ background: "var(--ink)", color: "var(--cream)" }}>
            <p className="mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "#8f8f88" }}>Inbox</p>
            <p className="display tnum !text-[44px] !leading-none" style={{ color: inbox === 0 ? "#3ad08a" : undefined }}>{inbox}</p>
            <p className="text-[11px]" style={{ color: "#8f8f88" }}>{inbox === 0 ? "inbox zero" : "unread"}</p>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-[11px]" style={{ background: "var(--paper)" }}>
            {["Flights", "CRM notes", "Brief", "Invoices"].map((t, i) => (
              <p key={t} className="flex items-center gap-1.5 py-0.5" style={{ color: p > 0.2 + i * 0.17 ? "var(--ink)" : "var(--mute)" }}>
                <span className="grid h-3.5 w-3.5 place-items-center rounded-[4px] text-[9px] text-white" style={{ background: p > 0.2 + i * 0.17 ? "var(--orange)" : "var(--line-strong)" }}>✓</span>
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 03 · Sales: interactive funnel with a labelled example estimate */
function Sales({ p }: { p: number }) {
  const [calls, setCalls] = useState(40);
  // Illustrative rates, not a promise: 28% connect, 35% qualify, 55% book
  const dials = calls * 5;
  const spoke = dials * 0.28;
  const qualified = spoke * 0.35;
  const booked = qualified * 0.55;
  const rows = [
    { t: "Dials / week", n: dials, w: 1 },
    { t: "Conversations", n: spoke, w: 0.64 },
    { t: "Qualified", n: qualified, w: 0.38 },
    { t: "Meetings booked", n: booked, w: 0.22 },
  ];
  return (
    <Frame title="Outbound pipeline" tool="GoHighLevel">
      <label className="block">
        <span className="flex items-baseline justify-between text-[13px]">
          <span style={{ color: "var(--mute)" }}>Calls per day</span>
          <span className="display tnum !text-[28px] !leading-none">{calls}</span>
        </span>
        <input type="range" min={10} max={80} step={5} value={calls} onChange={(e) => setCalls(+e.target.value)} className="range mt-2 w-full" aria-label="Calls per day" />
      </label>
      <div className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <div key={r.t} className="grid grid-cols-[120px_1fr_56px] items-center gap-3 text-[13px] sm:grid-cols-[140px_1fr_56px]">
            <span style={{ color: "var(--mute)" }}>{r.t}</span>
            <div className="h-8 overflow-hidden rounded-lg" style={{ background: "var(--paper-2)" }}>
              <div className="h-full rounded-lg transition-[width] duration-500" style={{ width: `${r.w * seg(p, 0.05 + i * 0.12, 0.35 + i * 0.12) * 100}%`, background: i === 3 ? "var(--orange)" : "var(--ink)", opacity: 1 - i * 0.1 }} />
            </div>
            <span className="mono tnum text-right text-[14px]">{Math.round(r.n)}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: "var(--ink)", color: "var(--cream)" }}>
        <span className="text-[13px]" style={{ color: "#a3a39d" }}>≈ meetings on your calendar each week</span>
        <span className="display tnum !text-[34px] !leading-none" style={{ color: "var(--orange)" }}>{Math.round(booked * seg(p, 0.4, 0.75))}</span>
      </div>
      <p className="mt-3 text-[11px] leading-snug" style={{ color: "var(--mute)" }}>
        Example estimate using illustrative conversion rates (28% connect, 35% qualify, 55% book). Real results depend on your list, offer and market.
      </p>
    </Frame>
  );
}

/* 04 · Success: the churn curve bends down, accounts turn healthy */
function Success({ p }: { p: number }) {
  const draw = seg(p, 0.05, 0.7);
  const accounts = ["Northwind", "Brightline", "Kettle & Co", "Fieldnote", "Arbor Labs"];
  return (
    <Frame title="Customer health" tool="HubSpot">
      <svg viewBox="0 0 400 160" className="w-full" aria-hidden>
        {[40, 80, 120].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--line)" />)}
        <path d="M0 30 C 60 34, 90 44, 130 62 S 210 110, 270 122 S 350 132, 400 134 L 400 160 L 0 160 Z" fill="var(--orange)" opacity={0.08 * draw} />
        <path d="M0 30 C 60 34, 90 44, 130 62 S 210 110, 270 122 S 350 132, 400 134" fill="none" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
        <line x1="120" x2="120" y1="0" y2="160" stroke="var(--ink)" strokeDasharray="3 4" opacity={0.35} />
        <text x="126" y="14" fontSize="10" fill="var(--mute)" fontFamily="var(--font-mono)">playbook live</text>
        <text x="4" y="14" fontSize="10" fill="var(--mute)" fontFamily="var(--font-mono)">monthly churn</text>
      </svg>
      <ul className="mt-3 space-y-1.5">
        {accounts.map((a, i) => {
          const ok = p > 0.25 + i * 0.12;
          return (
            <li key={a} className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px]" style={{ background: "var(--paper)" }}>
              <span className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full transition-colors duration-500" style={{ background: ok ? "var(--green)" : i % 2 ? "#e0a400" : "#d94a3a" }} />
                {a}
              </span>
              <span className="mono text-[11px] uppercase tracking-[0.06em] transition-colors duration-500" style={{ color: ok ? "var(--green)" : "var(--mute)" }}>
                {ok ? ["renewed", "onboarded", "saved", "upsold", "renewed"][i] : i % 2 ? "quiet 21 days" : "at risk"}
              </span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

/* 05 · Operations: cards travel across the board */
function Ops({ p }: { p: number }) {
  const cards = ["Supplier invoices", "Returns SOP", "Launch checklist", "Hire freelancer", "Q3 report", "Warehouse move"];
  const col = (i: number) => (p > 0.3 + i * 0.09 ? 2 : p > 0.08 + i * 0.06 ? 1 : 0);
  const doneN = cards.filter((_, i) => col(i) === 2).length;
  return (
    <Frame title="Projects" tool="Asana">
      <div className="mb-3 flex items-center gap-3 text-[13px]">
        <span style={{ color: "var(--mute)" }}>Launch week</span>
        <span className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "var(--paper-2)" }}>
          <span className="block h-full rounded-full transition-[width] duration-500" style={{ width: `${(doneN / cards.length) * 100}%`, background: "var(--green)" }} />
        </span>
        <span className="mono tnum">{doneN}/{cards.length}</span>
      </div>
      <div className="grid h-[calc(100%-36px)] grid-cols-3 gap-2.5">
        {["To do", "Doing", "Done"].map((c, ci) => (
          <div key={c} className="rounded-2xl p-2.5" style={{ background: "var(--paper)" }}>
            <p className="mono mb-2 text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--mute)" }}>{c}</p>
            <div className="space-y-2">
              {cards.map((t, i) =>
                col(i) === ci ? (
                  <div key={t} className="sheet-in rounded-xl p-2.5 text-[12px] leading-tight" style={{ background: ci === 2 ? "rgb(36 161 100 / .1)" : "var(--card)", boxShadow: "0 0 0 1px var(--line)" }}>
                    <span className="mb-1.5 block h-1 w-6 rounded-full" style={{ background: ["var(--orange)", "var(--blue)", "var(--green)"][i % 3] }} />
                    <span style={{ textDecoration: ci === 2 ? "line-through" : undefined, color: ci === 2 ? "var(--mute)" : undefined }}>{t}</span>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 06 · Web: code on the left, the site assembling itself on the right */
function Dev({ p }: { p: number }) {
  const code = [
    "<Nav logo={brand} />",
    "<Hero title=\"Fresh coffee, daily\" />",
    "<Grid>",
    "  {products.map(Card)}",
    "</Grid>",
    "<Checkout stripe />",
  ];
  const typed = seg(p, 0.03, 0.6) * code.length;
  const show = (i: number) => typed > i + 0.6;
  const live = p > 0.78;
  return (
    <Frame title="new-store.vercel.app" tool="Next.js">
      <div className="grid h-full grid-cols-2 gap-3 max-sm:grid-cols-1">
        <div className="mono rounded-2xl p-4 text-[11.5px] leading-[1.9]" style={{ background: "#14171c", color: "#d6deeb" }}>
          {code.map((l, i) => (
            <div key={i} className="whitespace-pre" style={{ clipPath: `inset(0 ${(1 - clamp(typed - i)) * 100}% 0 0)` }}>
              <span style={{ color: "#3b4252" }}>{i + 1}  </span>
              <span style={{ color: i === 3 ? "#c3e88d" : "#82aaff" }}>{l}</span>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <span className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: "rgb(255 255 255 / .08)" }}>
              <span className="block h-full rounded-full" style={{ width: `${seg(p, 0.6, 0.78) * 100}%`, background: "#6fd6a4" }} />
            </span>
            <span className="rounded-full px-2 py-0.5 text-[9px] uppercase transition-colors duration-500" style={{ background: live ? "var(--green)" : "#2a2e36", color: live ? "#fff" : "#a3a39d" }}>{live ? "Live" : "Build"}</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl" style={{ background: "#fff", boxShadow: "0 0 0 1px var(--line)" }}>
          <div className="flex items-center justify-between px-3 py-2 transition-opacity duration-500" style={{ opacity: show(0) ? 1 : 0, borderBottom: "1px solid var(--line)" }}>
            <span className="text-[11px] font-semibold">Roastery</span>
            <span className="flex gap-2 text-[9px]" style={{ color: "var(--mute)" }}><span>Shop</span><span>About</span><span>Cart (2)</span></span>
          </div>
          <div className="m-2 rounded-xl p-3 transition-all duration-500" style={{ background: "#2b1d14", color: "#f5e9dc", opacity: show(1) ? 1 : 0, transform: show(1) ? "none" : "translateY(8px)" }}>
            <p className="text-[13px] font-semibold leading-tight">Fresh coffee, daily</p>
            <p className="mt-1 text-[9px] opacity-70">Roasted this morning, at your door tomorrow.</p>
          </div>
          <div className="grid grid-cols-3 gap-1.5 px-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="rounded-lg p-1.5 transition-all duration-500" style={{ background: "#f4efe9", opacity: show(3) ? 1 : 0, transform: show(3) ? "none" : "scale(.9)", transitionDelay: `${k * 80}ms` }}>
                <div className="aspect-square rounded-md" style={{ background: ["#c8a27a", "#8b5e3c", "#e3c9a8"][k] }} />
                <p className="mt-1 text-[8px]">Blend {k + 1}</p>
              </div>
            ))}
          </div>
          <div className="m-2 rounded-lg py-1.5 text-center text-[10px] font-semibold text-white transition-opacity duration-500" style={{ background: "var(--orange)", opacity: show(5) ? 1 : 0 }}>Checkout</div>
          <p className="pb-2 text-center mono text-[9px] transition-opacity duration-500" style={{ color: "var(--green)", opacity: live ? 1 : 0 }}>● deployed · 98 performance</p>
        </div>
      </div>
    </Frame>
  );
}

export default function Demo({ kind, p }: { kind: VizKind; p: number }) {
  switch (kind) {
    case "support": return <Support p={p} />;
    case "assist": return <Assist p={p} />;
    case "sales": return <Sales p={p} />;
    case "success": return <Success p={p} />;
    case "ops": return <Ops p={p} />;
    case "dev": return <Dev p={p} />;
  }
}
