"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#about",    label: "About"    },
  { href: "/#services", label: "Services" },
  { href: "/team",      label: "Team"     },
  { href: "/services",  label: "Solutions"},
  { href: "/contact",   label: "Contact"  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [navHovered,  setNavHovered]  = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const isOpaque = scrolled || navHovered;
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Thin accent line at very top ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[1001] h-[3px]"
        style={{ background: "linear-gradient(90deg, var(--accent), rgba(240,101,41,0.4), transparent)" }}
      />

      <nav
        className="fixed top-[3px] left-0 right-0 z-[1000] transition-all duration-300"
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        style={{
          background: isOpaque ? "var(--bg-surface)" : "transparent",
          borderBottom: `1px solid ${isOpaque ? "var(--border)" : "transparent"}`,
          backdropFilter: isOpaque ? "blur(20px)" : "none",
        }}
      >
        <div className="w-full px-6 md:px-10 h-[60px] flex items-center justify-between gap-6">

          {/* ── Logo only ── */}
          <Link href="/" className="flex items-center group flex-shrink-0" aria-label="Babar Tech Solutions">
            <div className="transition-transform duration-200 group-hover:scale-105">
              <Logo size={38} />
            </div>
          </Link>

          {/* ── Center nav links ── */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] rounded-md transition-colors duration-150"
                  style={{ color: isActive ? "var(--text)" : "var(--text-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? "var(--text)" : "var(--text-subtle)")}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right: toggle + CTA ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-accent text-xs px-4 py-2.5 tracking-wide"
              style={{ borderRadius: "8px" }}
            >
              Get Started
            </Link>
          </div>

          {/* ── Mobile: toggle + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] pt-[63px] flex flex-col"
            style={{ background: "var(--bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Accent top */}
            <div className="h-[3px]" style={{ background: "var(--accent)" }} />
            <div className="flex flex-col px-6 pt-6 gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.18 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center py-3.5 px-3 text-sm font-semibold uppercase tracking-[0.1em] rounded-lg transition-colors duration-150"
                    style={{
                      color: pathname === link.href ? "var(--accent)" : "var(--text-muted)",
                      borderBottom: "1px solid var(--border)",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="btn-accent flex items-center justify-center w-full text-sm"
                  onClick={() => setMenuOpen(false)}
                >
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
