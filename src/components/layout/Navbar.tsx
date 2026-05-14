"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/services", label: "Solutions" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[1000]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      >
        <div
          className="mx-4 mt-4 rounded-2xl transition-all duration-700"
          style={{
            background: scrolled ? "rgba(3,7,17,0.88)" : "rgba(3,7,17,0.35)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: scrolled
              ? "1px solid rgba(255,107,53,0.12)"
              : "1px solid rgba(255,255,255,0.05)",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.03)" : "none",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Logo size={34} />
              </div>
              <div className="hidden sm:block">
                <span className="text-white/90 font-semibold text-sm tracking-tight">Babar Tech </span>
                <span className="text-gradient-orange font-semibold text-sm">Solutions</span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 group"
                    style={{ color: isActive ? "#FF8C42" : "rgba(148,163,184,0.8)" }}
                  >
                    <span className="relative z-10">{link.label}</span>

                    {/* Hover bg */}
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(255,107,53,0.05)" }}
                    />

                    {/* Active animated underline dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "#FF6B35", boxShadow: "0 0 6px rgba(255,107,53,0.8)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/#contact"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #f97316)",
                  boxShadow: "0 0 24px rgba(255,107,53,0.25)",
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] pt-24 px-4 pb-8 flex flex-col"
            style={{ background: "rgba(3,7,17,0.97)", backdropFilter: "blur(28px)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
          >
            <div className="absolute inset-0 grid-bg opacity-15" />
            <div className="relative z-10 flex flex-col gap-0.5 mt-6">
              {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.22 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 py-4 px-4 text-xl font-semibold rounded-xl transition-all duration-200"
                      style={{ color: isActive ? "#FF6B35" : "#94A3B8" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#FF6B35", boxShadow: "0 0 8px rgba(255,107,53,0.9)" }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-8 px-4"
              >
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #f97316)",
                    boxShadow: "0 0 28px rgba(255,107,53,0.35)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Zap className="w-4 h-4" />
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
