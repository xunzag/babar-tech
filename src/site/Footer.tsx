"use client";

import Link from "next/link";
import { SERVICES, SITE } from "./content";
import { openCookieSettings } from "./consent";
import { Facebook, Instagram, LinkedIn, Upwork } from "./Icons";
import { Mark } from "./Nav";
import Photo from "./Photo";

const COLS = [
  { title: "Services", links: SERVICES.map((s) => ({ href: `/services/#${s.id}`, label: s.name })) },
  {
    title: "Company",
    links: [
      { href: "/team/", label: "Team" },
      { href: "/#process", label: "How it works" },
      { href: "/#reviews", label: "Client reviews" },
      { href: "/contact/", label: "Contact" },
    ],
  },
];

const SOCIAL = [
  { href: SITE.upwork, label: "Upwork", Icon: Upwork },
  { href: SITE.linkedin, label: "LinkedIn", Icon: LinkedIn },
  { href: SITE.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE.facebook, label: "Facebook", Icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="ink relative overflow-hidden pt-20 sm:pt-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Mark size={36} />
              <span className="text-[18px] font-medium">Babar Tech Solutions</span>
            </div>
            <p className="mt-5 max-w-sm text-[15px]" style={{ color: "var(--mute)" }}>
              Vetted remote specialists for support, assistance, sales, operations and development. Working your hours since {SITE.founded}.
            </p>
            <a href={`mailto:${SITE.email}`} className="link-u mt-8 inline-block h3 !text-[clamp(1.15rem,5.2vw,2.25rem)]">{SITE.email}</a>
            <div className="mt-8 flex gap-2">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-[var(--cream)] hover:text-[var(--ink)]"
                  style={{ boxShadow: "inset 0 0 0 1px var(--line-strong)" }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="eyebrow">{c.title}</p>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-u" style={{ color: "#d6d3cb" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow">Legal</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li><Link href="/privacy/" className="link-u" style={{ color: "#d6d3cb" }}>Privacy policy</Link></li>
                <li><Link href="/cookies/" className="link-u" style={{ color: "#d6d3cb" }}>Cookie policy</Link></li>
                <li><button onClick={openCookieSettings} className="link-u text-left" style={{ color: "#d6d3cb" }}>Cookie settings</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-4 border-t py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--line)", color: "var(--faint)" }}>
          <p>© {new Date().getFullYear()} Babar Tech Solutions. All rights reserved.</p>
          <p className="mono">Top Rated on Upwork · 100% Job Success</p>
        </div>
      </div>

      {/* End of the day: the list is done, the lamp is still on */}
      <div aria-hidden className="pointer-events-none relative select-none overflow-hidden">
        <div className="aspect-[16/9] sm:aspect-[3/1]">
          <Photo name="footer-night" alt="" sizes="100vw" className="h-full w-full object-cover object-[72%_60%]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-2/3" style={{ background: "linear-gradient(var(--ink), rgb(15 17 20 / .4) 55%, transparent)" }} />
        <p className="hand absolute left-[6%] bottom-[12%] text-[clamp(20px,2.4vw,34px)]" style={{ color: "#f5c58f", textShadow: "0 2px 18px rgb(0 0 0 / .6)" }}>
          all done for today ✓
        </p>
      </div>
    </footer>
  );
}
