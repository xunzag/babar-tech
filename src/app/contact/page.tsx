import type { Metadata } from "next";
import { pageMeta } from "@/site/meta";
import { Eyebrow } from "@/site/Blocks";
import ContactForm from "@/site/ContactForm";
import { SITE } from "@/site/content";
import { ArrowUR, Calendar, Clock, Mail } from "@/site/Icons";
import Words from "@/site/Words";

export const metadata: Metadata = {
  ...pageMeta({ title: "Contact · Babar Tech Solutions", description: "Tell us the role you need filled. We'll match a vetted specialist the same day and have them working within 24 hours.", path: "/contact/", image: "/og/contact.jpg" }),
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="pt-[calc(var(--nav-h)+48px)] pb-24 sm:pt-[calc(var(--nav-h)+80px)] sm:pb-36">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <Words as="h1" className="display mt-8" text="Tell us | the *job.*" />
          <p className="lede mt-8 max-w-md" data-reveal>
            A few lines is plenty. Fahad reads every brief himself and replies with who fits, when they can start and what it costs.
          </p>

          <ul className="mt-12 space-y-px overflow-hidden rounded-[20px]" data-reveal>
            {[
              { Icon: Calendar, t: "Book a 30-minute call", s: "Pick a time that suits you", href: SITE.calendly, ext: true },
              { Icon: Mail, t: SITE.email, s: "For anything at all", href: `mailto:${SITE.email}` },
              { Icon: ArrowUR, t: "Hire us on Upwork", s: "Top Rated agency profile", href: SITE.upwork, ext: true },
            ].map(({ Icon, t, s, href, ext }) => (
              <li key={t}>
                <a
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 p-5 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                  style={{ background: "var(--card)" }}
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full" style={{ boxShadow: "inset 0 0 0 1px var(--line-strong)" }}><Icon size={18} /></span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{t}</span>
                    <span className="block text-[14px] opacity-60">{s}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 inline-flex items-center gap-2 text-[14px]" style={{ color: "var(--mute)" }} data-reveal>
            <Clock size={16} /> Typical reply time: under 2 hours on working days.
          </p>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
