"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink, Clock, Send, CheckCircle2 } from "lucide-react";

const SERVICES = [
  "Customer Service / Support",
  "Virtual Assistant",
  "Sales Support & Lead Generation",
  "Customer Success & Retention",
  "Operations & Project Management",
  "Web / Software Development",
  "Other",
];

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

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
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#F1F5F9",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{ background: "#05091A" }}
    >
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(240,101,41,0.35), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(240,101,41,0.08)", border: "1px solid rgba(240,101,41,0.2)", color: "#F5803A" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F06529" }} />
            Let&apos;s Work Together
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Start a Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Tell us what you need. We&apos;ll match you with the right specialist and have them working within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(8,13,30,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your email client is ready</h3>
                <p className="text-slate-400 text-sm max-w-sm">
                  Your message has been pre-filled. Just hit Send and we&apos;ll get back to you within 2 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-sm text-slate-500 hover:text-white transition-colors underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Your Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jane Smith"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "rgba(240,101,41,0.45)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@company.com"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "rgba(240,101,41,0.45)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Company</label>
                    <input
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Acme Inc. (optional)"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "rgba(240,101,41,0.45)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Service Needed *</label>
                    <select
                      required
                      value={form.service}
                      onChange={set("service")}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={e => (e.target.style.borderColor = "rgba(240,101,41,0.45)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
                    >
                      <option value="" style={{ background: "#111827" }}>Select a service…</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} style={{ background: "#111827" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={set("message")}
                    rows={5}
                    placeholder="Tell us about your project, timeline, and what you're looking for…"
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(240,101,41,0.45)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #F06529, #f97316)",
                    boxShadow: "0 0 32px rgba(240,101,41,0.35)",
                  }}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>

                <p className="text-center text-slate-600 text-xs">
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
                color: "#F06529",
              },
              {
                icon: null,
                label: "Hire on Upwork",
                value: "upwork.com/agencies/babartechsolutions",
                href: "https://www.upwork.com/agencies/babartechsolutions/",
                color: "#10B981",
              },
              {
                icon: Clock,
                label: "Response Time",
                value: "Usually within 2 hours",
                href: null,
                color: "#1666CC",
              },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(8,13,30,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  {Icon ? (
                    <Icon className="w-5 h-5" style={{ color }} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/upwork%20logo.png" alt="Upwork" width={22} height={22} style={{ borderRadius: "50%" }} />
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-white font-medium flex items-center gap-1.5 hover:underline underline-offset-2 transition-colors"
                      style={{ color: "#F1F5F9" }}>
                      {value}
                      {href.startsWith("http") && <ExternalLink className="w-3 h-3 text-slate-500" />}
                    </a>
                  ) : (
                    <div className="text-sm font-medium" style={{ color: "#F1F5F9" }}>{value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Trust bullets */}
            <div className="p-5 rounded-2xl" style={{ background: "rgba(8,13,30,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Why Teams Choose Us</div>
              <div className="space-y-3">
                {[
                  "Matched with a specialist same day",
                  "Onboarded and working within 24 hours",
                  "100% Job Success Score on Upwork",
                  "Top Rated agency — verified reviews",
                  "No lock-in contracts",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#F06529" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
