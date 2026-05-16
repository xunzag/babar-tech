"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-strong)",
        color: "var(--text-muted)",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
    >
      {isDark
        ? <Sun className="w-3.5 h-3.5" />
        : <Moon className="w-3.5 h-3.5" />
      }
    </button>
  );
}
