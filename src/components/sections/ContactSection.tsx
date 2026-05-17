"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink, Clock, Send, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  "Customer Service / Support",
  "Virtual Assistant",
  "Sales Support & Lead Generation",
  "Customer Success & Retention",
  "Operations & Project Management",
  "Web / Software Development",
  "Other",
];

const CYCLING_PHRASES = [
  "dream team.",
  "sales pipeline.",
  "support system.",
  "remote workforce.",
];

function ContactCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % CYCLING_PHRASES.length);
        setVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        color: "var(--accent)",
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(-10px)",
        transition: "opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        minWidth: "12ch",
      }}
    >
      {CYCLING_PHRASES[index]}
    </span>
  );
}

export default function ContactSection() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry${form.company ? ` — ${form.company}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}${form.company ? `\nCompany: ${form.company}` : ""}\nService: ${form.service}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:hello@babartechsolutions.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const inputStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-strong)",
    color: "var(--text)",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <div style={{ paddingTop: "63px", background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="w-full grid lg:grid-cols-2">

          {/* LEFT: Headline with cycling phrase */}
          <div
            ref={heroRef}
            className="flex flex-col justify-center px-8 md:px-14 xl:px-20 pt-16 pb-14"
            style={{ borderRight: "1px solid var(--border)" }}
          >
            <div className="section-label mb-10">Let&apos;s Talk · Start Today</div>

            <h1
              className="font-bold mb-7"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "var(--text)",
              }}
            >
              Let&apos;s build your
              <br />
              <ContactCycler />
            </h1>

            <p className="mb-10 max-w-md" style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
              Tell us what you need — we match you with the right specialist the same day
              and have them working within 24 hours. No contracts, no friction.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="#contact-form" className="btn-accent flex items-center gap-2 text-sm">
                Send a Message <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://calendly.com/farhan-babar123/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2 text-sm"
              >
                Book a Call
              </a>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-5 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { value: "< 2h",    label: "Response Time"    },
                { value: "Same Day", label: "Specialist Match" },
                { value: "24h",     label: "Onboarding Time"  },
                { value: "0",       label: "Lock-in Contracts"},
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-bold text-2xl" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: How it works + trust */}
          <div
            className="hidden lg:flex flex-col justify-center py-12 px-12"
            style={{ background: "var(--bg-surface)" }}
          >
            <div className="label-tag mb-6">How it works</div>

            <div className="flex flex-col gap-5 mb-10">
              {[
                { step: "01", title: "Tell us what you need", desc: "Fill out the form below or book a call. Takes 2 minutes." },
                { step: "02", title: "We match you same day",  desc: "We identify the right specialist from our vetted team and introduce you." },
                { step: "03", title: "Start within 24 hours", desc: "Your specialist is onboarded, briefed, and delivering results." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", color: "var(--accent)" }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text)" }}>{s.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upwork badge strip */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/upwork%20logo.png" alt="Upwork" width={32} height={32} style={{ borderRadius: "50%" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>Top Rated Upwork Agency</div>
                <div className="text-xs" style={{ color: "var(--text-subtle)" }}>100% Job Success · 5.0★ · Verified Reviews</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                Available now · Response within 2 hours
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Form ── */}
      <section
        id="contact"
        className="relative py-20 overflow-hidden"
        style={{ background: "var(--bg-surface)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <div id="contact-form" className="mb-10">
            <div className="section-label mb-4">Send a Message</div>
            <p className="text-sm max-w-lg" style={{ color: "var(--text-subtle)", lineHeight: 1.65 }}>
              Prefer to write? Fill in the details below and we&apos;ll pre-fill your email client — ready to send in one click.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65 }}
              className="rounded-2xl p-8"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Your email client is ready</h3>
                  <p className="text-sm max-w-sm" style={{ color: "var(--text-muted)" }}>
                    Your message has been pre-filled. Just hit Send and we&apos;ll get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm transition-colors underline underline-offset-2"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "var(--text-subtle)" }}>Your Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Smith"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "var(--text-subtle)" }}>Email Address *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@company.com"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "var(--text-subtle)" }}>Company</label>
                      <input
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Acme Inc. (optional)"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "var(--text-subtle)" }}>Service Needed *</label>
                      <select
                        required
                        value={form.service}
                        onChange={set("service")}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "var(--text-subtle)" }}>Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={set("message")}
                      rows={5}
                      placeholder="Tell us about your project, timeline, and what you're looking for…"
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 24px rgba(240,101,41,0.25)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                  <p className="text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                    Opens your email client pre-filled. We respond within 2 hours.
                  </p>
                </form>
              )}
            </motion.div>

            {/* ── Info sidebar ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="flex flex-col gap-4"
            >
              {[
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "hello@babartechsolutions.com",
                  href: "mailto:hello@babartechsolutions.com",
                },
                {
                  icon: null,
                  label: "Hire on Upwork",
                  value: "upwork.com/agencies/babartechsolutions",
                  href: "https://www.upwork.com/agencies/babartechsolutions/",
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Usually within 2 hours",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                    {Icon ? (
                      <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/upwork%20logo.png" alt="Upwork" width={20} height={20} style={{ borderRadius: "50%" }} />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                      style={{ color: "var(--text-subtle)" }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium flex items-center gap-1.5 hover:underline underline-offset-2"
                        style={{ color: "var(--text)" }}>
                        {value}
                        {href.startsWith("http") && <ExternalLink className="w-3 h-3" style={{ color: "var(--text-subtle)" }} />}
                      </a>
                    ) : (
                      <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-xl" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-4"
                  style={{ color: "var(--text-subtle)" }}>Why Teams Choose Us</div>
                <div className="space-y-3">
                  {[
                    "Matched with a specialist same day",
                    "Onboarded and working within 24 hours",
                    "100% Job Success Score on Upwork",
                    "Top Rated agency — verified reviews",
                    "No lock-in contracts",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
