"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Member = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  photo: string | null;
  initials: string;
  stats: { label: string; value: string }[];
};

const FAHAD: Member = {
  name: "Fahad Ali",
  role: "CEO & Founder",
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
    bio: "8+ years building and leading customer service teams across diverse industries. Ryan specialises in turning high-volume support queues into seamless client experiences — through team leadership, CRM strategy, and escalation management.",
    skills: ["Team Leadership", "CRM Systems", "Escalation Management", "Client Relations", "Quality Assurance"],
    photo: "/team/ryan.jpg",
    initials: "RY",
    stats: [{ label: "Experience", value: "8+ yrs" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Izma Hussain",
    role: "Sales Support & VA Lead",
    bio: "Results-driven VA and sales specialist who turns cold pipelines into booked calls. Izma handles outreach, inbox management, lead nurturing, and social media — so founders can focus on closing, not chasing.",
    skills: ["Sales Support", "Lead Generation", "Inbox & Calendar Mgmt", "Social Media", "CRM"],
    photo: "/team/Izma.jpg",
    initials: "IH",
    stats: [{ label: "Specialty", value: "Sales VA" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Ria K.",
    role: "Virtual Assistant Specialist",
    bio: "People-first VA who keeps businesses running behind the scenes. Ria manages calendars, CRM pipelines, research, admin tasks, and client communication — proactively, reliably, and always a step ahead.",
    skills: ["Virtual Assistance", "CRM", "Lead Generation", "Admin Support", "Cold Calling"],
    photo: "/team/Ria.jpg",
    initials: "RK",
    stats: [{ label: "Specialty", value: "VA & Outreach" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Hooria Aslam",
    role: "Customer Success Specialist",
    bio: "Turns chaos into structure for SMEs and growth-stage startups. Hooria builds customer success playbooks, retention strategies, and loyalty systems that reduce churn and drive measurable revenue.",
    skills: ["Customer Success", "Churn Reduction", "CS Strategy", "Sales Support", "Onboarding"],
    photo: null,
    initials: "HA",
    stats: [{ label: "Focus", value: "Retention" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Samra",
    role: "Customer & Operations Specialist",
    bio: "4+ years spanning customer service, finance, and project management. Samra is proficient in Gorgias, HubSpot, Freshdesk, and GoHighLevel — equally comfortable handling escalations, payroll, and ops coordination.",
    skills: ["Customer Support", "HubSpot", "Finance & Payroll", "Project Coordination", "Gorgias"],
    photo: "/team/Samra.jpg",
    initials: "SA",
    stats: [{ label: "Experience", value: "4+ yrs" }, { label: "Tools", value: "5+" }],
  },
];

/* ── Team network SVG decoration ── */
function TeamNetworkSVG() {
  const nodes = [
    { id: "FA", label: "CEO & Founder",    x: 180, y:  58, primary: true  },
    { id: "RY", label: "Customer Service", x:  68, y: 150, primary: false },
    { id: "IH", label: "Sales & VA",       x: 112, y: 242, primary: false },
    { id: "RK", label: "VA Specialist",    x: 248, y: 242, primary: false },
    { id: "HA", label: "Cust. Success",    x: 292, y: 150, primary: false },
    { id: "SA", label: "Operations",       x: 180, y: 178, primary: false },
  ];
  const edges: [number, number][] = [
    [0,1],[0,4],[0,5],[1,2],[1,5],[2,3],[2,5],[3,4],[3,5],[4,5],
  ];
  return (
    <svg viewBox="0 0 360 292" fill="none" style={{ width: "100%", maxWidth: "320px" }} aria-hidden>
      <defs>
        <pattern id="tgrid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" fill="none" strokeWidth="0.5" style={{ stroke: "var(--border)" }} />
        </pattern>
      </defs>
      <rect width="360" height="292" fill="url(#tgrid)" opacity="0.6" />
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={i % 2 === 0 ? "#1464CC" : "#F06529"}
          strokeWidth="0.8" strokeDasharray="4 7" opacity="0.35"
        />
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.primary ? 24 : 19}
            style={{ fill: "var(--bg-surface)" }}
            stroke={n.primary ? "#F06529" : "#1464CC"}
            strokeWidth={n.primary ? 2 : 1.5}
          />
          <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
            fill={n.primary ? "#F06529" : "#1464CC"}
            fontSize={n.primary ? "10" : "8.5"} fontWeight="700"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >{n.id}</text>
          <text x={n.x} y={n.y + (n.primary ? 33 : 28)} textAnchor="middle"
            fontSize="7"
            style={{ fill: "var(--text-subtle)", fontFamily: "system-ui, sans-serif" }}
          >{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Photo box — responsive, never overflows viewport ── */
function PhotoBox({ member, size = 260 }: { member: Member; size?: number }) {
  const dim = `min(${size}px, calc(100vw - 3rem))`;
  const shared: React.CSSProperties = {
    width: dim,
    height: dim,
    background: "var(--bg-elevated)",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    flexShrink: 0,
    overflow: "hidden",
  };
  if (member.photo) {
    return (
      <div style={shared}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.photo}
          alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center" style={shared}>
      <span
        className="font-black select-none"
        style={{ fontSize: `min(${size * 0.35}px, calc((100vw - 3rem) * 0.35))`, color: "var(--border-strong)", lineHeight: 1 }}
      >
        {member.initials}
      </span>
    </div>
  );
}

/* ── Founder feature row ── */
function FounderRow() {
  return (
    <div
      className="w-full flex flex-col lg:flex-row items-stretch"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}
    >
      {/* Photo — contained box */}
      <div
        className="flex-shrink-0 flex items-center justify-center p-6 md:p-10 lg:p-12"
        style={{
          borderRight: "1px solid var(--border)",
          background: "var(--bg-elevated)",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: "min(300px, calc(100vw - 3rem))",
            aspectRatio: "5 / 6",
            overflow: "hidden",
            borderRadius: "14px",
            border: "1px solid var(--border-strong)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FAHAD.photo!}
            alt={FAHAD.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-8 md:px-12 xl:px-14 py-12 flex-1">
        <div className="section-label mb-6">Founder</div>

        <div
          className="inline-flex mb-3 px-3 py-1.5 rounded-full text-xs font-bold w-fit"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Founder & CEO
        </div>

        <h2
          className="font-bold mb-2"
          style={{
            fontSize: "clamp(2rem, 3vw, 2.75rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          {FAHAD.name}
        </h2>
        <div className="text-sm font-semibold mb-6" style={{ color: "var(--accent)" }}>{FAHAD.role}</div>

        <p className="text-sm leading-relaxed mb-8 max-w-lg" style={{ color: "var(--text-muted)" }}>
          {FAHAD.bio}
        </p>

        {/* Stats */}
        <div className="flex gap-8 mb-8 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
          {FAHAD.stats.map(s => (
            <div key={s.label}>
              <div className="font-bold text-lg" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {FAHAD.skills.map(skill => (
            <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Team member row ── */
function MemberRow({ member, index }: { member: Member; index: number }) {
  const flip        = index % 2 === 1;
  const accent      = index % 2 === 0 ? "#F06529" : "#1464CC";
  const accentAlpha = index % 2 === 0 ? "rgba(240,101,41,0.12)" : "rgba(20,100,204,0.12)";

  return (
    <div
      className={`relative w-full flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch`}
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}
    >
      {/* Coloured accent stripe — left edge for normal, right edge for flipped */}
      <div style={{
        position: "absolute",
        [flip ? "right" : "left"]: 0,
        top: 0, bottom: 0, width: "4px",
        background: `linear-gradient(180deg, transparent, ${accent} 25%, ${accent} 75%, transparent)`,
        zIndex: 2,
      }} />

      {/* Photo */}
      <div
        className="flex-shrink-0 flex items-center justify-center p-6 md:p-8 lg:p-10"
        style={{
          background: "var(--bg-elevated)",
          borderRight: flip ? "none" : "1px solid var(--border)",
          borderLeft:  flip ? "1px solid var(--border)" : "none",
          minWidth: 0,
        }}
      >
        <div style={{
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: `0 0 0 2px ${accent}30, 0 12px 40px ${accent}20`,
          flexShrink: 0,
        }}>
          <PhotoBox member={member} size={270} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-8 md:px-10 xl:px-12 py-10 flex-1">

        {/* Role badge */}
        <span
          className="inline-flex mb-4 px-3 py-1.5 rounded-full text-xs font-semibold w-fit"
          style={{ background: accentAlpha, border: `1px solid ${accent}35`, color: accent }}
        >
          {member.role}
        </span>

        <h3
          className="font-bold mb-4"
          style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)", color: "var(--text)", letterSpacing: "-0.025em" }}
        >
          {member.name}
        </h3>

        <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "var(--text-muted)" }}>
          {member.bio}
        </p>

        {/* Stats as coloured badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {member.stats.map(s => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: accentAlpha, border: `1px solid ${accent}28` }}
            >
              <span className="font-bold text-sm" style={{ color: accent }}>{s.value}</span>
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {member.skills.map(skill => (
            <span key={skill} className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-subtle)" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", paddingTop: "63px" }}>

      {/* ── Hero Header ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="w-full grid lg:grid-cols-2">

          {/* LEFT: Content */}
          <div
            className="flex flex-col justify-center px-8 md:px-14 xl:px-20 pt-16 pb-14"
            style={{ borderRight: "1px solid var(--border)" }}
          >
            <div className="section-label mb-10">The Team · Six Specialists</div>

            <h1
              className="font-bold mb-7"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "var(--text)",
              }}
            >
              The people behind
              <br />
              <span style={{ color: "var(--accent)" }}>every result.</span>
            </h1>

            <p className="mb-10 max-w-md" style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
              Six pre-vetted specialists, each expert in their vertical. All 5.0★ rated on
              Upwork with verified client reviews — one accountable roof.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-5 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { value: "6",         label: "Specialists"  },
                { value: "5.0 ★",    label: "Avg. Rating"  },
                { value: "Top Rated", label: "Upwork Badge" },
                { value: "< 2h",      label: "Response Time"},
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-bold text-2xl" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Team network + Fahad quote */}
          <div
            className="hidden lg:flex flex-col items-center justify-center py-12 px-12"
            style={{ background: "var(--bg-elevated)" }}
          >
            <TeamNetworkSVG />

            <div
              className="mt-8 w-full max-w-xs"
              style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
            >
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, fontStyle: "italic" }}>
                &ldquo;We built this team to be the agency we wished existed — accountable,
                expert, and ready to start tomorrow.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/fahad.jpg"
                  alt="Fahad Ali"
                  style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border-strong)" }}
                />
                <div>
                  <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>Fahad Ali</div>
                  <div className="text-xs" style={{ color: "var(--accent)" }}>CEO & Founder</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Founder ── */}
      <FounderRow />

      {/* ── Team members ── */}
      {TEAM.map((member, i) => (
        <MemberRow key={member.name} member={member} index={i} />
      ))}

      {/* ── Join CTA ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-14"
        style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-xl mb-1" style={{ color: "var(--text)" }}>Want to join our team?</h3>
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
