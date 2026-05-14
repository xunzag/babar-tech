"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, UserCog, Headphones, ClipboardList,
  Wrench, Palette, Bot, Building2, ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Full-stack web applications built with Next.js, React, TypeScript, and modern tooling. Performant, scalable, pixel-perfect.",
    color: "#3B82F6",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: UserCog,
    title: "Virtual Assistant",
    desc: "Professional VAs handling scheduling, research, email management, and administrative tasks with reliability.",
    color: "#FF6B35",
    tags: ["Admin", "Research", "Scheduling"],
  },
  {
    icon: Headphones,
    title: "Customer Service",
    desc: "Dedicated CSR professionals delivering exceptional support experiences across all channels and time zones.",
    color: "#10B981",
    tags: ["Support", "Live Chat", "Email"],
  },
  {
    icon: ClipboardList,
    title: "Admin Support",
    desc: "Comprehensive administrative support to streamline your operations, data entry, and backend processes.",
    color: "#8B5CF6",
    tags: ["Data Entry", "Operations", "Backend"],
  },
  {
    icon: Wrench,
    title: "Technical Support",
    desc: "Tier 1–3 technical support teams that resolve issues fast and keep your users satisfied.",
    color: "#F59E0B",
    tags: ["Helpdesk", "Tier 1-3", "IT"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Award-level interface design. From wireframes to polished Figma prototypes that convert visitors into customers.",
    color: "#EC4899",
    tags: ["Figma", "Prototyping", "Design System"],
  },
  {
    icon: Bot,
    title: "Automation Solutions",
    desc: "Business process automation with Zapier, Make, n8n, and custom scripts that eliminate manual work.",
    color: "#06B6D4",
    tags: ["Zapier", "Make", "n8n"],
  },
  {
    icon: Building2,
    title: "Business Support",
    desc: "End-to-end business support including project management, consulting, and growth strategy.",
    color: "#84CC16",
    tags: ["Strategy", "PM", "Consulting"],
  },
];

function ServiceRow({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.045, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="group relative flex items-center gap-5 md:gap-8 py-6 cursor-default"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Left hover accent line */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-300"
        style={{ background: `linear-gradient(180deg, transparent, ${service.color}, transparent)` }}
      />

      {/* Index number */}
      <div className="hidden sm:flex flex-shrink-0 w-12 justify-end">
        <span
          className="text-3xl font-black leading-none transition-opacity duration-300 opacity-[0.07] group-hover:opacity-25"
          style={{ color: service.color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Icon */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: `${service.color}12`, border: `1px solid ${service.color}22` }}
      >
        <service.icon className="w-5 h-5" style={{ color: service.color }} />
      </div>

      {/* Title + desc */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-base mb-1 leading-tight group-hover:text-white/95 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors line-clamp-2">
          {service.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="hidden lg:flex flex-wrap gap-1.5 justify-end max-w-[175px]">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap"
            style={{
              background: `${service.color}0e`,
              color: `${service.color}bb`,
              border: `1px solid ${service.color}18`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <ArrowUpRight
        className="flex-shrink-0 w-4 h-4 text-slate-700 opacity-0 group-hover:opacity-100 group-hover:text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: "#05091A" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(180deg, transparent, rgba(255,107,53,0.4), transparent)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,101,41,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
            style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", color: "#FF8C42" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            What We Offer
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-xl"
            >
              Premium Services,{" "}
              <span className="text-gradient">Exceptional Results</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-slate-500 text-base max-w-xs md:text-right"
            >
              Eight specialized verticals, each delivered by dedicated experts.
            </motion.p>
          </div>
        </div>

        {/* Service list */}
        <div>
          {SERVICES.map((svc, i) => (
            <ServiceRow key={i} service={svc} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mt-10"
        >
          <Link
            href="/services"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-300 hover:text-white hover:scale-105"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            View Detailed Solutions
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
