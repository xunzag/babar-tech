"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Member = {
  name: string;
  role: string;
  hook: string;
  bio: string;
  skills: string[];
  photo: string | null;
  initials: string;
  stats: { label: string; value: string }[];
};

const FAHAD: Member = {
  name: "Fahad Ali",
  role: "CEO & Founder",
  hook: "The person who built the team, runs the agency, and is personally accountable for every result.",
  bio: "Former Customer Experience Supervisor at Allstate, managing teams across three locations. Fahad brings 7+ years of CX leadership, software sales, and project management expertise. He founded Babar Tech Solutions to give businesses direct access to elite remote talent — without the Upwork lottery.",
  skills: ["CX Leadership", "Project Management", "Software Sales", "Team Building", "Client Strategy"],
  photo: "/team/fahad.jpg",
  initials: "FA",
  stats: [
    { label: "Upwork JSS", value: "100%"      },
    { label: "Rating",     value: "5.0 ★"    },
    { label: "Badge",      value: "Top Rated" },
  ],
};

const TEAM: Member[] = [
  {
    name: "Ryan",
    role: "Head of Customer Service",
    hook: "Turns angry customers into loyal ones. 8 years of doing it without breaking a sweat.",
    bio: "8+ years building and leading customer service teams across diverse industries. Ryan specialises in turning high-volume support queues into seamless client experiences — through team leadership, CRM strategy, and escalation management.",
    skills: ["Team Leadership", "CRM Systems", "Escalation Management", "Client Relations", "Quality Assurance"],
    photo: "/team/ryan.jpg",
    initials: "RY",
    stats: [{ label: "Experience", value: "8+ yrs" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Izma Hussain",
    role: "Sales Support & VA Lead",
    hook: "Turns cold pipelines into booked calls. Founders close deals — Izma makes sure there are deals to close.",
    bio: "Results-driven VA and sales specialist who turns cold pipelines into booked calls. Izma handles outreach, inbox management, lead nurturing, and social media — so founders can focus on closing, not chasing.",
    skills: ["Sales Support", "Lead Generation", "Inbox & Calendar Mgmt", "Social Media", "CRM"],
    photo: "/team/Izma.jpg",
    initials: "IH",
    stats: [{ label: "Specialty", value: "Sales VA" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Ria K.",
    role: "Virtual Assistant Specialist",
    hook: "Already handled it before you asked. The kind of VA you keep for years.",
    bio: "People-first VA who keeps businesses running behind the scenes. Ria manages calendars, CRM pipelines, research, admin tasks, and client communication — proactively, reliably, and always a step ahead.",
    skills: ["Virtual Assistance", "CRM", "Lead Generation", "Admin Support", "Cold Calling"],
    photo: "/team/Ria.jpg",
    initials: "RK",
    stats: [{ label: "Specialty", value: "VA & Outreach" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Hooria Aslam",
    role: "Customer Success Specialist",
    hook: "Reduces churn before clients even think about leaving. Retention isn't reactive — it's a system.",
    bio: "Turns chaos into structure for SMEs and growth-stage startups. Hooria builds customer success playbooks, retention strategies, and loyalty systems that reduce churn and drive measurable revenue.",
    skills: ["Customer Success", "Churn Reduction", "CS Strategy", "Sales Support", "Onboarding"],
    photo: null,
    initials: "HA",
    stats: [{ label: "Focus", value: "Retention" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Samra",
    role: "Customer & Operations Specialist",
    hook: "Five tools, four years, one specialist who never drops a ball.",
    bio: "4+ years spanning customer service, finance, and project management. Samra is proficient in Gorgias, HubSpot, Freshdesk, and GoHighLevel — equally comfortable handling escalations, payroll, and ops coordination.",
    skills: ["Customer Support", "HubSpot", "Finance & Payroll", "Project Coordination", "Gorgias"],
    photo: "/team/Samra.jpg",
    initials: "SA",
    stats: [{ label: "Experience", value: "4+ yrs" }, { label: "Tools", value: "5+" }],
  },
];

const ALL_MEMBERS: Member[] = [FAHAD, ...TEAM];
const ACCENT = (i: number) => (i % 2 === 0 ? "#F06529" : "#1464CC");

/* ── Single name row in the typographic hero ── */
function NameRevealRow({
  member,
  index,
  active,
  onEnter,
  onLeave,
}: {
  member: Member;
  index: number;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const accentColor = ACCENT(index);
  const memberId = `member-${index}`;

  const scrollToMember = () => {
    const el = document.getElementById(memberId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative overflow-hidden cursor-pointer select-none"
      style={{ borderTop: "1px solid var(--border)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={scrollToMember}
      onKeyDown={(e) => e.key === "Enter" && scrollToMember()}
    >
      {/* Photo tint reveal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden
      >
        {member.photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.photo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 15%",
                filter: "brightness(0.16) saturate(1.5)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(100deg, ${accentColor}20 0%, transparent 50%)` }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(100deg, ${accentColor}12 0%, transparent 70%)` }}
          />
        )}
      </div>

      {/* Row content */}
      <div className="relative z-10 flex items-center min-w-0 px-8 md:px-14 xl:px-20">
        <span
          className="font-mono text-xs flex-shrink-0 w-7 mr-4 md:mr-6"
          style={{
            color: active ? accentColor : "var(--border-strong)",
            transition: "color 0.3s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="font-black leading-none py-4 md:py-6 min-w-0"
          style={{
            fontSize: "clamp(1.9rem, 6vw, 5rem)",
            letterSpacing: "-0.04em",
            color: active ? "#FFFFFF" : "var(--text-subtle)",
            transition: "color 0.38s cubic-bezier(0.4,0,0.2,1)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {member.name.toUpperCase()}
        </span>

        <span
          className="hidden md:block text-xs font-semibold uppercase tracking-[0.11em] flex-shrink-0 ml-6"
          style={{
            color: accentColor,
            opacity: active ? 1 : 0,
            transform: active ? "translateX(0px)" : "translateX(-8px)",
            transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
          }}
        >
          {member.role}
        </span>

        <div className="flex-1" />

        <div
          className="hidden lg:block flex-shrink-0 overflow-hidden ml-6"
          style={{
            width: active ? 64 : 0,
            height: 48,
            borderRadius: "8px",
            opacity: active ? 1 : 0,
            border: active ? `1px solid ${accentColor}55` : "none",
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
          }}
        >
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-xs font-black"
              style={{ background: "var(--bg-elevated)", color: "var(--border-strong)" }}
            >
              {member.initials}
            </div>
          )}
        </div>

        <span
          className="flex-shrink-0 ml-4 md:ml-6 text-base"
          style={{
            color: active ? accentColor : "var(--border)",
            transform: active ? "translateX(3px) translateY(-2px)" : "none",
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
        >
          ↗
        </span>
      </div>
    </div>
  );
}

/* ── Typographic hero ── */
function TeamHero() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }}
      />

      <div className="flex items-end justify-between px-8 md:px-14 xl:px-20 pt-20 pb-10">
        <div>
          <div className="section-label">The Team · Six Specialists</div>
          <p className="mt-2 hidden md:block" style={{ fontSize: "0.8rem", color: "var(--text-subtle)" }}>
            Hover a name — click to jump to their profile.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-8">
          {[
            { value: "5.0 ★",    label: "Avg. Rating"  },
            { value: "100%",      label: "Job Success"  },
            { value: "Top Rated", label: "Upwork Badge" },
          ].map((s) => (
            <div key={s.label} className="text-right">
              <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {ALL_MEMBERS.map((member, i) => (
          <NameRevealRow
            key={member.name}
            member={member}
            index={i}
            active={active === i}
            onEnter={() => setActive(i)}
            onLeave={() => setActive(null)}
          />
        ))}
      </div>

      <div
        className="flex items-center justify-between px-8 md:px-14 xl:px-20 py-5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
          Scroll to meet each specialist ↓
        </span>
        <span className="hidden sm:block text-xs" style={{ color: "var(--text-subtle)" }}>
          Onboard within 24h · &lt; 2h response
        </span>
      </div>
    </section>
  );
}

/* ── Left sticky photo panel ── */
function StickyPhotoPanel({ member, accent }: { member: Member; accent: string }) {
  const idx = ALL_MEMBERS.findIndex((m) => m.name === member.name);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#080d18" }}>
      {member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 12%",
            filter: "brightness(0.65) saturate(0.95)",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "var(--bg-elevated)" }}
        >
          <span
            style={{
              fontSize: "clamp(5rem, 10vw, 9rem)",
              fontWeight: 900,
              color: "var(--border-strong)",
              letterSpacing: "-0.05em",
            }}
          >
            {member.initials}
          </span>
        </div>
      )}

      {/* Cinematic edge vignette — darkens corners, not the face */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 80% at 50% 40%, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Bottom black fade — clean text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 22%, transparent 50%)",
        }}
      />
      {/* Subtle brand accent wash — bottom corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 55%, ${accent}22 100%)`,
        }}
      />

      {/* Name overlay — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-10">
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.58rem",
            color: accent,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
        >
          {member.role}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.035em",
            lineHeight: 1.03,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {member.name.toUpperCase()}
        </h2>
      </div>

      {/* Top-right index counter */}
      <div
        className="absolute top-8 right-8 font-mono text-xs"
        style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em" }}
      >
        {String(idx + 1).padStart(2, "0")} / {String(ALL_MEMBERS.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ── Editorial section per member ── */
function MemberEditorial({
  member,
  index,
  setRef,
}: {
  member: Member;
  index: number;
  setRef: (el: HTMLElement | null) => void;
}) {
  const accent = ACCENT(index);

  return (
    <section
      ref={setRef}
      id={`member-${index}`}
      className="relative flex flex-col justify-center px-8 md:px-12 xl:px-14 py-20"
      style={{
        borderBottom: "1px solid var(--border)",
        minHeight: "100vh",
      }}
    >
      {/* Mobile photo — hidden on lg */}
      {member.photo && (
        <div
          className="lg:hidden w-full mb-10 overflow-hidden rounded-xl"
          style={{ aspectRatio: "4 / 3", border: "1px solid var(--border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.photo}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      )}

      {/* Counter */}
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.65rem",
          color: accent,
          letterSpacing: "0.16em",
          marginBottom: "2rem",
        }}
      >
        {String(index + 1).padStart(2, "0")} &mdash; {String(ALL_MEMBERS.length).padStart(2, "0")}
      </p>

      {/* Name */}
      <h2
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
          fontWeight: 900,
          color: "var(--text)",
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          marginBottom: "0.45rem",
        }}
      >
        {member.name}
      </h2>

      {/* Role */}
      <p
        style={{
          fontSize: "0.68rem",
          color: "var(--text-subtle)",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          marginBottom: "2.25rem",
        }}
      >
        {member.role}
      </p>

      {/* Pull quote */}
      <blockquote
        style={{
          borderLeft: `2px solid ${accent}`,
          paddingLeft: "1.2rem",
          marginBottom: "2.25rem",
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.75vw, 1.175rem)",
            fontStyle: "italic",
            color: "var(--text)",
            lineHeight: 1.62,
          }}
        >
          &ldquo;{member.hook}&rdquo;
        </p>
      </blockquote>

      {/* Ruled separator */}
      <div style={{ width: "2.5rem", height: "1px", background: "var(--border-strong)", marginBottom: "2.25rem" }} />

      {/* Bio */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          lineHeight: 1.9,
          maxWidth: "440px",
          marginBottom: "2.75rem",
        }}
      >
        {member.bio}
      </p>

      {/* Stats — no card chrome, pure editorial */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem",
          marginBottom: "2.25rem",
          paddingBottom: "2.25rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {member.stats.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: accent,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--text-subtle)",
                marginTop: "5px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Skills — dot-separated, editorial text */}
      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--text-subtle)",
          letterSpacing: "0.05em",
          lineHeight: 1.9,
        }}
      >
        {member.skills.join(" · ")}
      </p>
    </section>
  );
}

/* ── Main page ── */
export default function TeamPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.35, rootMargin: "-10% 0px -35% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const activeMember = ALL_MEMBERS[activeIndex];
  const accent = ACCENT(activeIndex);

  return (
    <div style={{ background: "var(--bg)", paddingTop: "63px" }}>

      {/* ── Typographic name reveal hero ── */}
      <TeamHero />

      {/* ── Sticky split ── */}
      <div className="relative lg:flex">

        {/* Left: sticky photo panel */}
        <div
          className="hidden lg:block lg:w-1/2 flex-shrink-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            borderRight: "1px solid var(--border)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <StickyPhotoPanel member={activeMember} accent={accent} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: scrolling editorial sections */}
        <div className="w-full lg:w-1/2">
          {ALL_MEMBERS.map((member, i) => (
            <MemberEditorial
              key={member.name}
              member={member}
              index={i}
              setRef={(el) => {
                sectionRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Join CTA ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-14"
        style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-xl mb-1" style={{ color: "var(--text)" }}>
              Want to join our team?
            </h3>
            <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
              We&apos;re always looking for exceptional talent. If you&apos;re top-tier, we&apos;d love to hear from you.
            </p>
          </div>
          <Link
            href="mailto:hello@babartechsolutions.com"
            className="btn-accent flex items-center gap-2 text-sm flex-shrink-0"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
