import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Plain text; use `|` to force a line break, and wrap a word in *asterisks* to accent it. */
  text: string;
  id?: string;
};

/** Headline that reveals word by word from behind a mask. */
export default function Words({ as: Tag = "h2", className = "", delay = 0, text, id }: Props) {
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
    <Tag id={id} className={`words ${className}`} style={{ ["--d" as string]: delay }} aria-label={text.replace(/\|/g, " ").replace(/\*/g, "")}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
