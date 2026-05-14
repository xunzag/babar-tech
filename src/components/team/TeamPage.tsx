"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Member = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  color: string;
  photo: string | null;
  initials: string;
  stats: { label: string; value: string }[];
};

const FAHAD: Member = {
  name: "Fahad Ali",
  role: "CEO & Founder",
  bio: "Former Customer Experience Supervisor at Allstate, managing teams across three locations. Fahad brings 7+ years of CX leadership, software sales, and project management expertise. He founded Babar Tech Solutions to give businesses direct access to elite remote talent — without the Upwork lottery.",
  skills: ["CX Leadership", "Project Management", "Software Sales", "Team Building", "Client Strategy"],
  color: "#F06529",
  photo: "/team/fahad.jpg",
  initials: "FA",
  stats: [
    { label: "Upwork JSS", value: "100%" },
    { label: "Rating", value: "5.0 ★" },
    { label: "Badge", value: "Top Rated" },
  ],
};

const TEAM: Member[] = [
  {
    name: "Ryan",
    role: "Head of Customer Service",
    bio: "8+ years building and leading customer service teams across diverse industries. Ryan specialises in turning high-volume support queues into seamless client experiences — through team leadership, CRM strategy, and escalation management.",
    skills: ["Team Leadership", "CRM Systems", "Escalation Management", "Client Relations", "Quality Assurance"],
    color: "#1666CC",
    photo: "/team/ryan.jpg",
    initials: "RY",
    stats: [{ label: "Experience", value: "8+ yrs" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Izma Hussain",
    role: "Sales Support & VA Lead",
    bio: "Results-driven VA and sales specialist who turns cold pipelines into booked calls. Izma handles outreach, inbox management, lead nurturing, and social media — so founders can focus on closing, not chasing.",
    skills: ["Sales Support", "Lead Generation", "Inbox & Calendar Mgmt", "Social Media", "CRM"],
    color: "#10B981",
    photo: "/team/Izma.jpg",
    initials: "IH",
    stats: [{ label: "Specialty", value: "Sales VA" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Ria K.",
    role: "Virtual Assistant Specialist",
    bio: "People-first VA who keeps businesses running behind the scenes. Ria manages calendars, CRM pipelines, research, admin tasks, and client communication — proactively, reliably, and always a step ahead.",
    skills: ["Virtual Assistance", "CRM", "Lead Generation", "Admin Support", "Cold Calling"],
    color: "#EC4899",
    photo: "/team/Ria.jpg",
    initials: "RK",
    stats: [{ label: "Specialty", value: "VA & Outreach" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Hooria Aslam",
    role: "Customer Success Specialist",
    bio: "Turns chaos into structure for SMEs and growth-stage startups. Hooria builds customer success playbooks, retention strategies, and loyalty systems that reduce churn and drive measurable revenue.",
    skills: ["Customer Success", "Churn Reduction", "CS Strategy", "Sales Support", "Onboarding"],
    color: "#8B5CF6",
    photo: null,
    initials: "HA",
    stats: [{ label: "Focus", value: "Retention" }, { label: "Rating", value: "5.0 ★" }],
  },
  {
    name: "Samra",
    role: "Customer & Operations Specialist",
    bio: "4+ years spanning customer service, finance, and project management. Samra is proficient in Gorgias, HubSpot, Freshdesk, and GoHighLevel — equally comfortable handling escalations, payroll, and ops coordination.",
    skills: ["Customer Support", "HubSpot", "Finance & Payroll", "Project Coordination", "Gorgias"],
    color: "#F59E0B",
    photo: "/team/Samra.jpg",
    initials: "SA",
    stats: [{ label: "Experience", value: "4+ yrs" }, { label: "Tools", value: "5+" }],
  },
];

/* ── Fahad featured row ── */
function FeaturedRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="grid lg:grid-cols-[42%_58%] overflow-hidden rounded-2xl mb-2"
      style={{
        border: "1px solid rgba(240,101,41,0.2)",
        boxShadow: "0 20px 80px rgba(0,0,0,0.4), 0 0 60px rgba(240,101,41,0.05)",
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ minHeight: 460 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FAHAD.photo!}
          alt={FAHAD.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, transparent 50%, rgba(8,13,30,0.8) 80%, rgba(8,13,30,1) 100%), linear-gradient(to top, rgba(8,13,30,0.5) 0%, transparent 35%)" }}
        />
        {/* Founder badge */}
        <div
          className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: "rgba(240,101,41,0.18)", border: "1px solid rgba(240,101,41,0.4)", color: "#F5803A", backdropFilter: "blur(8px)" }}
        >
          Founder & CEO
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center p-8 lg:p-12" style={{ background: "rgba(8,13,30,0.97)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, rgba(240,101,41,0.35), transparent)" }} />

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-1">{FAHAD.name}</h2>
        <div className="text-sm font-semibold mb-5" style={{ color: "#F06529" }}>{FAHAD.role}</div>

        <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-lg">{FAHAD.bio}</p>

        <div className="flex gap-8 mb-7">
          {FAHAD.stats.map(s => (
            <div key={s.label}>
              <div className="text-xl font-black text-white">{s.value}</div>
              <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {FAHAD.skills.map(skill => (
            <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ background: "rgba(240,101,41,0.08)", border: "1px solid rgba(240,101,41,0.18)", color: "rgba(245,128,58,0.9)" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Timeline member row ── */
function TimelineRow({ member, index }: { member: Member; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const flip = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 }}
      className="relative grid lg:grid-cols-2 items-stretch"
    >
      {/* Photo side */}
      <div className={`relative overflow-hidden ${flip ? "lg:order-2" : ""}`} style={{ minHeight: 400 }}>
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(145deg, ${member.color}20 0%, rgba(5,9,26,0.98) 100%)` }}>
            <span className="text-[120px] font-black leading-none" style={{ color: `${member.color}12` }}>
              {member.initials}
            </span>
          </div>
        )}
        {/* Gradient toward content */}
        <div
          className="absolute inset-0"
          style={{
            background: flip
              ? "linear-gradient(to left, transparent 50%, rgba(8,13,30,0.9) 85%, rgba(8,13,30,1) 100%)"
              : "linear-gradient(to right, transparent 50%, rgba(8,13,30,0.9) 85%, rgba(8,13,30,1) 100%)",
          }}
        />
      </div>

      {/* Content side */}
      <div
        className={`flex flex-col justify-center p-8 lg:p-12 ${flip ? "lg:order-1" : ""}`}
        style={{ background: "rgba(8,13,30,0.97)" }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit"
          style={{ background: `${member.color}12`, border: `1px solid ${member.color}28`, color: member.color }}
        >
          {member.role}
        </div>

        <h3 className="text-3xl font-bold text-white mb-4">{member.name}</h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">{member.bio}</p>

        <div className="flex gap-7 mb-6">
          {member.stats.map(s => (
            <div key={s.label}>
              <div className="text-lg font-black" style={{ color: member.color }}>{s.value}</div>
              <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {member.skills.map(skill => (
            <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ background: `${member.color}0d`, border: `1px solid ${member.color}1e`, color: `${member.color}cc` }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Horizontal divider between rows */}
      {index < TEAM.length - 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px lg:hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      )}
    </motion.div>
  );
}

export default function TeamPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#030711" }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.15]" />
        <div className="absolute" style={{
          width: "55vw", height: "55vw", left: "22%", top: "-8%",
          background: "radial-gradient(circle, rgba(22,102,204,0.06) 0%, transparent 65%)",
        }} />
        <div className="absolute" style={{
          width: "45vw", height: "45vw", right: "-5%", bottom: "10%",
          background: "radial-gradient(circle, rgba(240,101,41,0.05) 0%, transparent 65%)",
        }} />
      </div>

      {/* ── Header ── */}
      <section className="relative pt-36 pb-14">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20"
          style={{ background: "linear-gradient(180deg, rgba(240,101,41,0.5), transparent)" }} />

        <div ref={headerRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(240,101,41,0.08)", border: "1px solid rgba(240,101,41,0.2)", color: "#F5803A" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F06529" }} />
            The People Behind the Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          >
            Meet the <span className="text-gradient">Elite Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Six specialists. One mission. Delivering exceptional outcomes for every client, every time.
          </motion.p>
        </div>
      </section>

      {/* ── Fahad ── */}
      <section className="relative px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pb-0">
        <FeaturedRow />
      </section>

      {/* ── Center divider line ── */}
      <div className="hidden lg:block relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-px h-10"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08))" }} />
      </div>

      {/* ── Team timeline ── */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-16">
        {/* Vertical center line (desktop only) */}
        <div
          className="absolute hidden lg:block left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.06) 90%, transparent)" }}
        />

        <div className="flex flex-col divide-y divide-white/[0.04]">
          {TEAM.map((member, i) => (
            <TimelineRow key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="relative pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-2xl"
            style={{ background: "rgba(8,13,30,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <div className="text-white font-bold text-xl mb-1">Want to Join Our Team?</div>
              <p className="text-slate-500 text-sm">We&apos;re always looking for exceptional talent. If you&apos;re top-tier, we&apos;d love to hear from you.</p>
            </div>
            <a
              href="mailto:hello@babartechsolutions.com"
              className="flex-shrink-0 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #F06529, #f97316)", boxShadow: "0 0 24px rgba(240,101,41,0.28)" }}
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
