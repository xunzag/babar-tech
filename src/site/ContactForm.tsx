"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type ChangeEvent } from "react";
import { SERVICES, SITE } from "./content";
import { Arrow, Check } from "./Icons";
import { useTimeZone } from "./useClock";

const TEAM_PICK = "a few of these";
const HOURS = ["10 hours a week", "20 hours a week", "40 hours a week", "a one-off project", "a few hours to start"];
const STARTS = ["as soon as possible", "next week", "next month", "whenever suits"];

const noop = () => () => {};
const lower = (s: string) => s.toLowerCase();

/** A team draft sent from the services page builder (?roles=A|B&hours=20&start=…&tz=…). */
function parseDraft(search: string) {
  const q = new URLSearchParams(search);
  const names = SERVICES.map((s) => s.name);
  const roles = (q.get("roles") || "").split("|").filter((r) => names.includes(r));
  if (!roles.length) return null;
  const hours = Number(q.get("hours")) || 20;
  const start = (q.get("start") || "").toLowerCase();
  return {
    roles,
    role: roles.length > 1 ? TEAM_PICK : roles[0],
    hours: HOURS.find((h) => h.startsWith(`${hours} `)) ?? HOURS[1],
    start: STARTS.find((s) => s === start) ?? STARTS[0],
  };
}

/** An inline blank inside the sentence. A hidden mirror of the text sets its width, so it grows as you type. */
function Blank({ name, value, placeholder, onChange, type = "text", required, autoComplete, label }: {
  name: string; value: string; placeholder: string; onChange: (v: string) => void;
  type?: string; required?: boolean; autoComplete?: string; label: string;
}) {
  return (
    <span className={`tok tok--text ${value ? "is-filled" : ""}`}>
      <span aria-hidden className="tok__mirror">{value || placeholder}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-label={label}
        spellCheck={false}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </span>
  );
}

/** An inline choice: a token that opens a small menu card (listbox) under it. */
function Pick({ value, options, onChange, label }: { value: string; options: { v: string; l: string }[]; onChange: (v: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLSpanElement>(null);
  const id = useId();
  const current = options.find((o) => o.v === value)?.l ?? value;

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const show = () => { setActive(Math.max(0, options.findIndex((o) => o.v === value))); setOpen(true); };
  const choose = (i: number) => { onChange(options[i].v); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) { e.preventDefault(); show(); return; }
    if (!open) return;
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % options.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + options.length) % options.length); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <span ref={root} className="tok-wrap">
      <button
        type="button"
        className="tok tok--pick is-filled"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${label}: ${current}`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        {current}
        <svg className="tok__chev" viewBox="0 0 12 12" aria-hidden><path d="M3 4.5 6 7.5l3-3" /></svg>
      </button>
      {open && (
        <ul id={id} role="listbox" aria-label={label} className="tok-menu">
          {options.map((o, i) => (
            <li
              key={o.v}
              id={`${id}-${i}`}
              role="option"
              aria-selected={o.v === value}
              className={i === active ? "is-active" : ""}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
            >
              <span>{o.l}</span>
              {o.v === value && <Check size={16} />}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}

/** The brief as one sentence with blanks. On send it drops onto Fahad's to-do list. */
export default function ContactForm() {
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  const draft = useMemo(() => parseDraft(search), [search]);
  const tz = useTimeZone() ?? "";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [roleState, setRole] = useState<string | null>(null);
  const [hoursState, setHours] = useState<string | null>(null);
  const [startState, setStart] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const role = roleState ?? draft?.role ?? SERVICES[0].name;
  const hours = hoursState ?? draft?.hours ?? HOURS[1];
  const start = startState ?? draft?.start ?? STARTS[0];
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mail">("idle");

  const roleOptions = [...SERVICES.map((s) => ({ v: s.name, l: lower(s.name) })), { v: TEAM_PICK, l: TEAM_PICK }];
  const services = role === TEAM_PICK ? (draft && draft.roles.length > 1 ? draft.roles.join(", ") : "Several (see notes)") : role;
  const first = name.trim().split(/\s+/)[0] || "you";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const message = [
      `Hi, I'm ${name}${company ? ` from ${company}` : ""}. I need help with ${services.toLowerCase()}, for ${hours}, starting ${start}.`,
      ...(notes.trim() ? ["", notes.trim()] : []),
    ].join("\n");
    fd.set("form-name", "brief");
    fd.set("services", services);
    fd.set("commitment", hours);
    fd.set("start", start);
    fd.set("timezone", tz);
    fd.set("message", message);
    setState("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fd as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
    } catch {
      // No form backend available (e.g. local preview): hand off to the visitor's email app instead
      const body = [message, "", `Email: ${email}`, `Time zone: ${tz}`].join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`New brief from ${name}`)}&body=${encodeURIComponent(body)}`;
      setState("mail");
    }
  }

  if (state === "sent") {
    return (
      <div className="brief-sent grid gap-10 lg:grid-cols-12 lg:items-center" role="status">
        <div className="lg:col-span-6">
          <p className="mono text-[12px] uppercase tracking-[0.08em]" style={{ color: "var(--orange-ink)" }}>Sent</p>
          <h2 className="display mt-4 !text-[clamp(2.6rem,6vw,5rem)]">It&apos;s on Fahad&apos;s list.</h2>
          <p className="mt-5 max-w-md text-[17px]" style={{ color: "var(--mute)" }}>
            He reads every brief himself and will reply to <span style={{ color: "var(--ink)" }}>{email}</span> with who fits, when they can start and what it costs.
          </p>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-orange mt-8">In a hurry? Book a call <Arrow size={16} className="arr" /></a>
        </div>
        <div className="lg:col-span-6">
          <div className="todo-sheet mx-auto max-w-[460px] rounded-[10px] p-7 sm:p-9">
            <p className="text-[34px] leading-none [font-family:var(--font-hand)]">Fahad&apos;s list</p>
            <ul className="mt-6 space-y-1">
              <li className="brief-drop flex items-start gap-3 border-b py-3.5" style={{ borderColor: "var(--line)" }}>
                <span className="brief-tick mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-md" style={{ boxShadow: "inset 0 0 0 1.5px var(--ink)" }}><Check size={14} /></span>
                <span className="text-[17px] font-medium">Read {first === "you" ? "the new" : `${first}'s`} brief: {services.toLowerCase()}</span>
              </li>
              {["Match the right specialist · today", "Have them working · within 24h"].map((t) => (
                <li key={t} className="flex items-start gap-3 border-b py-3.5" style={{ borderColor: "var(--line)" }}>
                  <span className="mt-0.5 h-6 w-6 flex-none rounded-md" style={{ boxShadow: "inset 0 0 0 1.5px var(--line-strong)" }} />
                  <span className="text-[17px]" style={{ color: "var(--mute)" }}>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[22px] [font-family:var(--font-hand)]" style={{ color: "var(--orange-ink)" }}>reading it now ✓</p>
          </div>
        </div>
      </div>
    );
  }

  const filled = [name.trim(), email.trim()].filter(Boolean).length;

  return (
    <form onSubmit={submit} className="brief-card">
      <p hidden><label>Leave this empty <input name="bot-field" /></label></p>

      {/* header: who it goes to */}
      <div className="flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-8" style={{ borderColor: "var(--line)" }}>
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/team/fahad-96.webp" alt="" width={32} height={32} className="h-8 w-8 flex-none rounded-full object-cover" />
          <p className="truncate text-[14px]">
            <span style={{ color: "var(--mute)" }}>To </span><span className="font-medium">Fahad Ali</span>
            <span className="max-sm:hidden" style={{ color: "var(--mute)" }}> · founder, reads every brief</span>
          </p>
        </div>
        <div className="flex flex-none items-center gap-2" aria-label={`${filled} of 2 required details filled`}>
          <span className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--mute)" }}>New brief</span>
          <span className="flex gap-1">
            {[0, 1].map((i) => <span key={i} className="h-1.5 w-4 rounded-full transition-colors duration-500" style={{ background: i < filled ? "var(--orange)" : "var(--line-strong)" }} />)}
          </span>
        </div>
      </div>

      {/* body: the sentence */}
      <div className="px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12">
        {draft && (
          <p className="sheet-in mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px]" style={{ background: "rgb(242 112 31 / .1)" }} role="status">
            <Check size={14} className="flex-none" style={{ color: "var(--orange-ink)" }} />
            Filled in from your team{draft.roles.length > 1 ? `: ${draft.roles.join(", ")}` : ""}
          </p>
        )}
        <p className="brief__sentence">
          Hi, I&apos;m <Blank name="name" label="Your name" value={name} onChange={setName} placeholder="your name" required autoComplete="name" />
          {" "}from <Blank name="company" label="Company (optional)" value={company} onChange={setCompany} placeholder="your company" autoComplete="organization" />.
          {" "}I need help with <Pick label="What you need help with" value={role} onChange={setRole} options={roleOptions} />,
          {" "}for <Pick label="How much" value={hours} onChange={setHours} options={HOURS.map((h) => ({ v: h, l: h }))} />,
          {" "}starting <Pick label="When to start" value={start} onChange={setStart} options={STARTS.map((s) => ({ v: s, l: s }))} />.
          {" "}You can reach me at <Blank name="email" type="email" label="Work email" value={email} onChange={setEmail} placeholder="you@company.com" required autoComplete="email" />.
        </p>
      </div>

      {/* details */}
      <label className="block border-t px-5 py-5 sm:px-8" style={{ borderColor: "var(--line)" }}>
        <span className="sr-only">Anything else? (optional)</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add details, if you like: the tools you use, volume, the hours you need covered…"
          className="block w-full resize-none bg-transparent text-[16px] leading-relaxed outline-none placeholder:text-[var(--faint)]"
        />
      </label>

      {/* footer */}
      <div className="flex flex-col-reverse gap-4 rounded-b-[inherit] border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
        <p className="text-[12.5px]" style={{ color: "var(--faint)" }}>
          Only used to reply to you · <Link href="/privacy/" className="underline underline-offset-2">Privacy</Link>
        </p>
        <button type="submit" disabled={state === "sending"} className="btn btn-orange disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send brief"} <Arrow size={16} className="arr" />
        </button>
      </div>
      {state === "mail" && (
        <p className="border-t px-5 py-4 text-[14px] sm:px-8" style={{ borderColor: "var(--line)", color: "var(--mute)" }} role="status">
          We opened your email app with the brief filled in. If nothing happened, email us at{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}
    </form>
  );
}
