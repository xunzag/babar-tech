"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { SERVICES, SITE } from "./content";
import { Arrow, Check } from "./Icons";
import { useTimeZone } from "./useClock";

const COMMIT = ["Part-time", "Full-time", "One-off project", "Not sure yet"];

const noop = () => () => {};

/** A team draft sent from the services page builder (?roles=A|B&hours=20&start=…&tz=…). */
function parseDraft(search: string) {
  const q = new URLSearchParams(search);
  const names = SERVICES.map((s) => s.name);
  const roles = (q.get("roles") || "").split("|").filter((r) => names.includes(r));
  if (!roles.length) return null;
  const hours = Number(q.get("hours")) || 20;
  const start = q.get("start") || "";
  const tz = q.get("tz") || "";
  return {
    roles,
    commit: hours >= 40 ? "Full-time" : "Part-time",
    message: [
      "Team draft from your services page:",
      ...roles.map((r) => `• ${r}, ${hours} hrs/week`),
      ...(start ? [`Start: ${start}`] : []),
      ...(tz ? [`My time zone: ${tz}`] : []),
      "",
      "A bit about what we need: ",
    ].join("\n"),
  };
}

export default function ContactForm() {
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  const draft = useMemo(() => parseDraft(search), [search]);
  // The draft supplies defaults until the visitor changes something
  const [pickedState, setPicked] = useState<string[] | null>(null);
  const [commitState, setCommit] = useState<string | null>(null);
  const picked = pickedState ?? draft?.roles ?? [];
  const commit = commitState ?? draft?.commit ?? "";
  const tz = useTimeZone() ?? "";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mail">("idle");

  const toggle = (s: string) => setPicked(picked.includes(s) ? picked.filter((x) => x !== s) : [...picked, s]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("form-name", "brief");
    fd.set("services", picked.join(", "));
    fd.set("commitment", commit);
    fd.set("timezone", tz);
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
      const body = [
        `Name: ${fd.get("name")}`, `Company: ${fd.get("company") || "-"}`, `Services: ${picked.join(", ") || "-"}`,
        `Commitment: ${commit || "-"}`, `Time zone: ${tz}`, "", String(fd.get("message") || ""),
      ].join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`New brief from ${fd.get("name")}`)}&body=${encodeURIComponent(body)}`;
      setState("mail");
    }
  }

  if (state === "sent") {
    return (
      <div className="card sheet-in p-8 sm:p-12">
        <span className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "var(--green)", color: "#fff" }}><Check size={22} /></span>
        <h2 className="h3 mt-6">Got it. Thank you.</h2>
        <p className="mt-3 max-w-md" style={{ color: "var(--mute)" }}>
          Fahad will read your brief personally and reply, usually within two hours during the working day. If it&apos;s urgent, grab a slot on the calendar.
        </p>
        <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-orange mt-8">Book a call now <Arrow size={16} className="arr" /></a>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-xl bg-[var(--card)] px-4 py-3.5 text-[16px] outline-none transition-shadow focus:shadow-[inset_0_0_0_1.5px_var(--ink)]";
  const fieldStyle = { boxShadow: "inset 0 0 0 1px var(--line-strong)" };

  return (
    <form onSubmit={submit} className="card p-6 sm:p-10">
      <p hidden><label>Leave this empty <input name="bot-field" /></label></p>
      {draft && (
        <p className="sheet-in mb-8 flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px]" style={{ background: "rgb(242 112 31 / .1)", color: "var(--ink)" }} role="status">
          <Check size={16} className="flex-none" style={{ color: "var(--orange)" }} />
          Your team draft is filled in below. Add a line about the work and send.
        </p>
      )}

      <fieldset>
        <legend className="font-medium">What do you need help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const on = picked.includes(s.name);
            return (
              <button
                type="button"
                key={s.id}
                aria-pressed={on}
                onClick={() => toggle(s.name)}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] transition-all duration-300"
                style={on ? { background: "var(--ink)", color: "var(--paper)" } : { boxShadow: "inset 0 0 0 1px var(--line-strong)" }}
              >
                {on && <Check size={14} />} {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-medium">How much?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {COMMIT.map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={commit === c}
              onClick={() => setCommit(c)}
              className="rounded-full px-4 py-2.5 text-[14px] transition-all duration-300"
              style={commit === c ? { background: "var(--ink)", color: "var(--paper)" } : { boxShadow: "inset 0 0 0 1px var(--line-strong)" }}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-medium">
          Your name
          <input name="name" required autoComplete="name" className={field} style={fieldStyle} />
        </label>
        <label className="block text-[14px] font-medium">
          Work email
          <input name="email" type="email" required autoComplete="email" className={field} style={fieldStyle} />
        </label>
        <label className="block text-[14px] font-medium sm:col-span-2">
          Company <span style={{ color: "var(--faint)" }}>(optional)</span>
          <input name="company" autoComplete="organization" className={field} style={fieldStyle} />
        </label>
        <label className="block text-[14px] font-medium sm:col-span-2">
          What&apos;s the job?
          <textarea
            key={search}
            name="message"
            required
            rows={draft ? 8 : 5}
            defaultValue={draft?.message}
            placeholder="e.g. We get ~200 support emails a day and need someone covering 9–5 Eastern in Gorgias."
            className={`${field} resize-y`}
            style={fieldStyle}
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[13px]" style={{ color: "var(--faint)" }}>
          We use these details only to reply to you. See our <Link href="/privacy/" className="underline underline-offset-2">privacy policy</Link>.
          {tz && <> Detected time zone: <span className="mono">{tz}</span>.</>}
        </p>
        <button type="submit" disabled={state === "sending"} className="btn btn-orange disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send brief"} <Arrow size={16} className="arr" />
        </button>
      </div>
      {state === "mail" && (
        <p className="mt-4 text-[14px]" style={{ color: "var(--mute)" }} role="status">
          We opened your email app with the brief filled in. If nothing happened, email us at{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}
    </form>
  );
}
