import type { CSSProperties } from "react";

/** A statement whose words ink in one by one as it scrolls past. `*word*` accents a word. */
export default function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(/\s+/);
  const flags: boolean[] = [];
  for (let i = 0, on = false; i < words.length; i++) {
    if (words[i].startsWith("*")) on = true;
    flags.push(on);
    if (words[i].replace(/[^\w*]+$/, "").endsWith("*")) on = false;
  }
  return (
    <p data-scrub className={`scrub ${className}`} style={{ ["--n" as string]: words.length } as CSSProperties}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">
        {words.map((raw, i) => {
          const on = flags[i];
          return (
            <span key={i}>
              <span className={`sw ${on ? "acc" : ""}`} style={{ ["--wi" as string]: i } as CSSProperties}>{raw.replace(/\*/g, "")}</span>{" "}
            </span>
          );
        })}
      </span>
    </p>
  );
}
