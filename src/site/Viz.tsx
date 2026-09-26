import type { CSSProperties } from "react";
import type { VizKind } from "./content";

/* Small animated scenes that show what each service actually does.
   Pure CSS, so they cost nothing to hydrate and pause when offscreen. */

const k = (n: number) => ({ ["--k" as string]: n }) as CSSProperties;
const frame = "relative h-full w-full overflow-hidden rounded-[22px]";

function Support() {
  return (
    <div className={frame} style={{ background: "var(--card)" }}>
      <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "var(--line)" }}>
        <div>
          <p className="text-[13px] font-medium">Ticket #4821</p>
          <p className="mono text-[11px]" style={{ color: "var(--faint)" }}>Order arrived damaged</p>
        </div>
        <span className="chip !text-[11px] mono">Gorgias</span>
      </div>
      <div className="flex flex-col gap-2.5 p-5 text-[13.5px] leading-snug">
        <p className="chat-b max-w-[78%] self-start rounded-2xl rounded-bl-md px-3.5 py-2.5" style={{ ...k(0), background: "var(--paper-2)" }}>
          Hi, my order arrived with a cracked lid. Not happy.
        </p>
        <p className="chat-b max-w-[80%] self-end rounded-2xl rounded-br-md px-3.5 py-2.5" style={{ ...k(1), background: "var(--ink)", color: "var(--cream)" }}>
          So sorry about that. A replacement ships today and I&apos;ve refunded your shipping.
        </p>
        <p className="chat-b max-w-[70%] self-start rounded-2xl rounded-bl-md px-3.5 py-2.5" style={{ ...k(2), background: "var(--paper-2)" }}>
          Wow, that was fast. Thank you!
        </p>
        <p className="chat-b typing self-end rounded-2xl px-3.5 py-3" style={{ ...k(3), background: "var(--paper-2)", color: "var(--faint)" }}>
          <i /><i /><i />
        </p>
      </div>
      <div className="stamp absolute right-5 bottom-6 rounded-lg border-2 px-3 py-1.5 mono text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: "var(--green)", color: "var(--green)" }}>
        Resolved · 4 min
      </div>
    </div>
  );
}

function Assist() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks = [
    { d: 0, top: 8, h: 22, t: "Board call", c: "var(--ink)" },
    { d: 1, top: 40, h: 16, t: "Flights", c: "var(--orange)" },
    { d: 2, top: 14, h: 30, t: "Deep work", c: "var(--blue)" },
    { d: 3, top: 54, h: 18, t: "Investor 1:1", c: "var(--ink)" },
    { d: 4, top: 20, h: 16, t: "Hiring sync", c: "var(--orange)" },
    { d: 0, top: 58, h: 16, t: "Dentist", c: "var(--faint)" },
    { d: 2, top: 62, h: 14, t: "Payroll", c: "var(--ink)" },
    { d: 4, top: 46, h: 24, t: "Q3 review", c: "var(--blue)" },
  ];
  return (
    <div className={`${frame} grid grid-cols-[1fr_auto] gap-3 p-4`} style={{ background: "var(--card)" }}>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <div key={d} className="relative rounded-xl" style={{ background: "var(--paper)" }}>
            <p className="mono pt-2 text-center text-[10px] uppercase" style={{ color: "var(--faint)" }}>{d}</p>
            {blocks.filter((b) => b.d === i).map((b, j) => (
              <div
                key={j}
                className="cal-blk absolute inset-x-1 overflow-hidden rounded-md px-1.5 py-1 text-[10px] leading-tight text-white"
                style={{ ...k(i + j * 5), top: `${b.top + 12}%`, height: `${b.h}%`, background: b.c }}
              >
                {b.t}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-[92px] flex-col justify-between rounded-xl p-3" style={{ background: "var(--ink)", color: "var(--cream)" }}>
        <p className="mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "#8f8f88" }}>Inbox</p>
        <p className="inbox-n mono tnum text-[40px] leading-none tracking-tight" />
        <p className="text-[11px]" style={{ color: "#8f8f88" }}>unread</p>
      </div>
    </div>
  );
}

function Sales() {
  const stages = [
    { t: "Dialed", n: 120, w: 100 },
    { t: "Spoke", n: 34, w: 64 },
    { t: "Qualified", n: 11, w: 38 },
    { t: "Booked", n: 6, w: 22 },
  ];
  return (
    <div className={`${frame} p-5`} style={{ background: "var(--card)" }}>
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] font-medium">Outbound · Tuesday</p>
        <p className="mono text-[11px]" style={{ color: "var(--faint)" }}>GoHighLevel</p>
      </div>
      <div className="mt-4 space-y-2.5">
        {stages.map((s, i) => (
          <div key={s.t} className="grid grid-cols-[76px_1fr_32px] items-center gap-3 text-[12px]">
            <span style={{ color: "var(--mute)" }}>{s.t}</span>
            <div className="h-6 rounded-md" style={{ background: "var(--paper-2)" }}>
              <div className="h-full rounded-md" style={{ width: `${s.w}%`, background: i === 3 ? "var(--orange)" : "var(--ink)", opacity: 1 - i * 0.12 }} />
            </div>
            <span className="mono tnum text-right">{s.n}</span>
          </div>
        ))}
      </div>
      {/* Leads flowing down the funnel */}
      <div className="relative mt-5 h-12 rounded-xl" style={{ background: "var(--paper)" }}>
        <div className="absolute inset-x-4 top-1/2 h-px" style={{ background: "var(--line-strong)" }} />
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="fn-dot absolute top-[calc(50%-5px)] h-2.5 w-2.5"
            style={k(i)}
          >
            <span className={`block h-full w-full rounded-full ${i % 3 === 0 ? "" : "fn-drop"}`} style={{ ...k(i), background: i % 3 === 0 ? "var(--orange)" : "var(--ink)" }} />
          </span>
        ))}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 mono text-[10px] uppercase" style={{ color: "var(--orange)" }}>Calendar</span>
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className={`${frame} p-5`} style={{ background: "var(--card)" }}>
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] font-medium">Monthly churn</p>
        <p className="mono text-[11px]" style={{ color: "var(--faint)" }}>illustrative</p>
      </div>
      <svg viewBox="0 0 320 150" className="mt-3 w-full" aria-hidden>
        {[30, 70, 110].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--line)" />)}
        <path d="M0 28 C 50 32, 70 40, 100 58 S 160 96, 200 104 S 270 116, 320 118 L 320 150 L 0 150 Z" fill="var(--orange)" opacity=".08" />
        <path className="draw" pathLength={1} d="M0 28 C 50 32, 70 40, 100 58 S 160 96, 200 104 S 270 116, 320 118" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="96" x2="96" y1="0" y2="150" stroke="var(--ink)" strokeDasharray="3 4" opacity=".4" />
        <text x="102" y="14" fontSize="10" fill="var(--mute)" fontFamily="var(--font-mono)">CS playbook live</text>
      </svg>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="pop chip !text-[12px]" style={{ ["--dl" as string]: "0s", background: "var(--paper)" }}>Onboarding call · done</span>
        <span className="pop chip !text-[12px]" style={{ ["--dl" as string]: ".3s", background: "var(--paper)" }}>At-risk account · saved</span>
        <span className="pop chip !text-[12px]" style={{ ["--dl" as string]: ".6s", background: "var(--ink)", color: "var(--cream)", borderColor: "transparent" }}>Renewal · signed</span>
      </div>
    </div>
  );
}

function Ops() {
  const cols = ["To do", "Doing", "Done"];
  const cards = [
    { t: "Supplier invoices", c: "var(--orange)" },
    { t: "Update SOP: returns", c: "var(--blue)" },
    { t: "Launch checklist", c: "var(--green)" },
  ];
  return (
    <div className={`${frame} p-4`} style={{ background: "var(--card)" }}>
      <div className="relative grid h-full grid-cols-3 gap-2.5">
        {cols.map((c) => (
          <div key={c} className="rounded-xl p-2.5" style={{ background: "var(--paper)" }}>
            <p className="mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--faint)" }}>{c}</p>
            <div className="mt-2 space-y-1.5 opacity-50">
              <div className="h-9 rounded-lg border border-dashed" style={{ borderColor: "var(--line-strong)" }} />
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 top-[42px] grid grid-cols-3 gap-2.5 px-2.5">
          {cards.map((c, i) => (
            <div
              key={c.t}
              className="kb-card col-start-1 row-start-1 rounded-lg p-2.5 text-[11.5px] leading-tight shadow-sm"
              style={{ ...k(i), marginTop: i * 52, background: "var(--card)", border: "1px solid var(--line)" }}
            >
              <span className="mb-1.5 block h-1 w-6 rounded-full" style={{ background: c.c }} />
              {c.t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dev() {
  const lines: { t: React.ReactNode; w: number; ind?: number }[] = [
    { t: <><span style={{ color: "#c792ea" }}>export async function</span> <span style={{ color: "#82aaff" }}>checkout</span>(cart) {"{"}</>, w: 36 },
    { t: <><span style={{ color: "#c792ea" }}>const</span> tax = <span style={{ color: "#82aaff" }}>round</span>(cart.total * rate, <span style={{ color: "#f78c6c" }}>2</span>)</>, w: 38, ind: 1 },
    { t: <><span style={{ color: "#c792ea" }}>await</span> stripe.<span style={{ color: "#82aaff" }}>charge</span>({"{"} ...cart, tax {"}"})</>, w: 34, ind: 1 },
    { t: <><span style={{ color: "#c792ea" }}>return</span> <span style={{ color: "#c3e88d" }}>&quot;ok&quot;</span></>, w: 12, ind: 1 },
    { t: <>{"}"}</>, w: 2 },
  ];
  return (
    <div className={`${frame} flex flex-col`} style={{ background: "#14171c", color: "#d6deeb" }}>
      <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: "rgb(255 255 255 / .07)" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />)}
        <span className="mono ml-3 text-[11px]" style={{ color: "#6b7280" }}>checkout.ts</span>
      </div>
      <div className="mono flex-1 space-y-1.5 p-4 text-[12px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="flex">
            <span className="w-6 flex-none select-none" style={{ color: "#3b4252" }}>{i + 1}</span>
            <span className="code-ln" style={{ ...k(i), ["--w" as string]: `${l.w}ch`, paddingLeft: `${(l.ind ?? 0) * 2}ch` } as CSSProperties}>{l.t}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 border-t px-4 py-3" style={{ borderColor: "rgb(255 255 255 / .07)" }}>
        <div className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: "rgb(255 255 255 / .08)" }}>
          <div className="deploy-bar h-full rounded-full" style={{ background: "#6fd6a4" }} />
        </div>
        <span className="deploy mono rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.08em]">Live</span>
      </div>
    </div>
  );
}

const MAP: Record<VizKind, () => React.ReactElement> = { support: Support, assist: Assist, sales: Sales, success: Success, ops: Ops, dev: Dev };

export default function Viz({ kind, className = "" }: { kind: VizKind; className?: string }) {
  const C = MAP[kind];
  return (
    <div data-anim className={`viz ${className}`} role="img" aria-label={`Animated illustration: ${kind}`}>
      <C />
    </div>
  );
}
