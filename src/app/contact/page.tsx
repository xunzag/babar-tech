import type { Metadata } from "next";
import { pageMeta } from "@/site/meta";
import { Eyebrow } from "@/site/Blocks";
import ContactForm from "@/site/ContactForm";
import BigEmail from "@/site/contact/BigEmail";
import FahadStatus from "@/site/contact/FahadStatus";
import { RECORD, SITE } from "@/site/content";
import { Arrow, ArrowUR, Clock } from "@/site/Icons";

export const metadata: Metadata = {
  ...pageMeta({ title: "Hire a Remote Specialist · Babar Tech Solutions", description: "Tell us the role you need filled. We'll match a vetted specialist the same day and have them working within 24 hours.", path: "/contact/", image: "/og/contact.jpg" }),
  title: "Hire a Remote Specialist",
};

export default function ContactPage() {
  return (
    <>
      {/* ───────────── The brief, as one sentence ───────────── */}
      <section className="pt-[calc(var(--nav-h)+48px)] pb-24 sm:pt-[calc(var(--nav-h)+80px)] sm:pb-32">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>Contact · Tell us the job</Eyebrow>
            <p className="inline-flex items-center gap-2 text-[14px]" style={{ color: "var(--mute)" }} data-reveal>
              <Clock size={16} /> Matched the same day. Working within 24 hours.
            </p>
          </div>
          <h1 className="sr-only">Contact Babar Tech Solutions</h1>
          <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-8" data-reveal>
              <ContactForm />
            </div>
            <div className="lg:col-span-4" data-reveal="scale">
              <FahadStatus />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Or the quick way ───────────── */}
      <section className="py-24 sm:py-32" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <Eyebrow>Or the quick way</Eyebrow>
          <div className="mt-10" data-reveal>
            <BigEmail />
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2" data-reveal>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 rounded-[24px] p-7 transition-colors sm:p-9" style={{ background: "var(--orange)", color: "var(--ink)" }}>
              <span>
                <span className="block text-[clamp(1.4rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">Book a 30-minute call</span>
                <span className="mt-1 block text-[14px] opacity-75">Pick a time that suits you, free</span>
              </span>
              <span className="grid h-14 w-14 flex-none place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-45deg]" style={{ background: "var(--ink)", color: "var(--cream)" }}><Arrow size={20} /></span>
            </a>
            <a href={SITE.upwork} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 rounded-[24px] p-7 sm:p-9" style={{ background: "var(--ink)", color: "var(--cream)" }}>
              <span>
                <span className="block text-[clamp(1.4rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">Hire us on Upwork</span>
                <span className="mt-1 block text-[14px]" style={{ color: "#a3a39d" }}>{RECORD.badge} agency, {RECORD.jss} Job Success</span>
              </span>
              <span className="grid h-14 w-14 flex-none place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45" style={{ background: "var(--orange)", color: "var(--ink)" }}><ArrowUR size={20} /></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
