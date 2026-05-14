"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: "500+", label: "Projects", color: "#FF6B35" },
  { value: "100%", label: "Job Success", color: "#3B82F6" },
  { value: "7+", label: "Years Exp.", color: "#8B5CF6" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ background: "#05091A" }}>
      <div className="absolute inset-0 grid-bg-sm opacity-50" />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,102,204,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Left: text ── */}
          <div>
            <FadeIn>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#60A5FA" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                About Babar Tech Solutions
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                We Are the Agency{" "}
                <span className="text-gradient">Built for Results</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="text-slate-400 text-lg leading-relaxed mb-5">
                Founded by <span className="text-white font-medium">Fahad Ali</span>, Babar Tech Solutions
                is a premium freelancing and software solutions agency operating globally through Upwork
                and direct partnerships. We combine the agility of a freelance collective with the
                discipline of an enterprise team.
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <p className="text-slate-500 leading-relaxed mb-10">
                Our remote professionals deliver across web development, UI/UX design, virtual assistance,
                automation, and customer support — bringing Fortune 500-level quality to businesses of every size.
              </p>
            </FadeIn>

            {/* Trust tags */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-10">
                {["Upwork Top Rated", "500+ Projects", "Global Clients", "24/7 Support"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#94A3B8" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.36}>
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors duration-200"
              >
                Meet the Team
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeIn>
          </div>

          {/* ── Right: Fahad's photo ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Ambient glow */}
              <div
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,107,53,0.12), transparent)",
                  filter: "blur(30px)",
                }}
              />

              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                className="relative w-[260px] xl:w-[300px] rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,107,53,0.18)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.08)",
                  aspectRatio: "4/5",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/fahad.jpg"
                  alt="Fahad Ali, CEO — Babar Tech Solutions"
                  className="w-full h-full object-cover object-top"
                />
                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28"
                  style={{ background: "linear-gradient(transparent, rgba(5,9,26,0.92))" }}
                />
                {/* Name tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-semibold text-sm">Fahad Ali</div>
                  <div className="text-xs" style={{ color: "#FF8C42" }}>CEO & Founder</div>
                </div>
              </motion.div>

              {/* Floating stat: Projects */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-4 -right-10 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(10,18,34,0.95)",
                  border: "1px solid rgba(255,107,53,0.2)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="text-2xl font-black" style={{ color: "#FF6B35" }}>500+</div>
                <div className="text-xs text-slate-500 mt-0.5">Projects Done</div>
              </motion.div>

              {/* Floating stat: JSS */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute -bottom-4 -left-10 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(10,18,34,0.95)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="text-2xl font-black text-blue-400">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Job Success</div>
              </motion.div>

              {/* Floating badge: Top Rated */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-1/3 -left-14 flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(10,18,34,0.95)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400">Top Rated</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
