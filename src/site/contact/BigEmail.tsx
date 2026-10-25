"use client";

import { useState, type CSSProperties } from "react";
import { SITE } from "../content";

/** The email address as one huge line: letters roll on hover, a click copies it. */
export default function BigEmail() {
  const [copied, setCopied] = useState(false);

  async function copy(e: React.MouseEvent) {
    try {
      await navigator.clipboard.writeText(SITE.email);
      e.preventDefault();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable: let the mailto link open the email app
    }
  }

  return (
    <div className="relative">
      <a href={`mailto:${SITE.email}`} onClick={copy} className="roll display block !text-[clamp(1.3rem,5.6vw,6.2rem)] !leading-[1.1] break-all" aria-label={`Copy ${SITE.email}`}>
        {SITE.email.split("").map((c, i) => (
          <span key={i} className="roll__c" style={{ ["--i" as string]: i } as CSSProperties}>
            <span>{c}</span>
          </span>
        ))}
      </a>
      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]" style={{ color: "var(--mute)" }}>
        <span role="status" className="mono text-[12px] uppercase tracking-[0.08em]" style={{ color: copied ? "var(--green)" : undefined }}>
          {copied ? "Copied ✓" : "Click to copy"}
        </span>
        <a href={`mailto:${SITE.email}`} className="link-u">or open your email app</a>
      </p>
    </div>
  );
}
