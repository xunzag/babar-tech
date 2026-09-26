import { Eyebrow } from "./Blocks";
import Words from "./Words";

export default function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="pt-[calc(var(--nav-h)+48px)] pb-24 sm:pt-[calc(var(--nav-h)+80px)] sm:pb-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
            <Eyebrow>Legal</Eyebrow>
            <Words as="h1" className="h2 mt-6" text={title} />
            <p className="mono mt-6 text-[12px] uppercase tracking-[0.06em]" style={{ color: "var(--faint)" }}>Last updated {updated}</p>
          </div>
        </div>
        <article className="prose-legal max-w-2xl lg:col-span-8">{children}</article>
      </div>
    </section>
  );
}
