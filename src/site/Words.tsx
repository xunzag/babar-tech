import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** Animate on page load with CSS alone (for above-the-fold headlines) instead of on scroll. */
  auto?: boolean;
  className?: string;
  delay?: number;
  /** Plain text; use `|` to force a line break, and wrap a word in *asterisks* to accent it. */
  text: string;
  id?: string;
};

/** Headline that reveals word by word from behind a mask. */
export default function Words({ as: Tag = "h2", auto = false, className = "", delay = 0, text, id }: Props) {
  let i = 0;
  let accent = false;
  const lines = text.split("|");
  const out: ReactNode[] = [];
  lines.forEach((line, li) => {
    line
      .trim()
      .split(/\s+/)
      .forEach((raw, wi, arr) => {
        // `*` may sit inside surrounding punctuation, e.g. “*98%.*” — toggle on each one
        const opens = /^[^\p{L}\p{N}]*\*/u.test(raw);
        if (opens) accent = true;
        const on = accent;
        if (/\*[^\p{L}\p{N}]*$/u.test(raw) && (raw.match(/\*/g)?.length ?? 0) >= (opens ? 2 : 1)) accent = false;
        const word = raw.replace(/\*/g, "");
        out.push(
          <span className="w" key={`${li}-${wi}`}>
            <span style={{ ["--i" as string]: i++ }} className={on ? "serif-i" : undefined}>
              {word}
            </span>
          </span>,
        );
        if (wi < arr.length - 1) out.push(" ");
      });
    if (li < lines.length - 1) out.push(<br key={`br-${li}`} />);
  });
  return (
    <Tag id={id} className={`words ${auto ? "words-auto" : ""} ${className}`} style={{ ["--d" as string]: delay }}>
      <span className="sr-only">{text.replace(/\|/g, " ").replace(/\*/g, "")}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
