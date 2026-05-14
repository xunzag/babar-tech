"use client";

import { useState } from "react";

/** Renders /logo.png. Falls back to the SVG mark if the file isn't there yet. */
export default function Logo({ size = 36 }: { size?: number }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.jpg"
        alt="Babar Tech Solutions"
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
      />
    );
  }

  /* ── SVG fallback (used until logo.png is placed in /public) ── */
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="accent-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#FF8C42" />
        </linearGradient>
      </defs>
      {/* Rounded background */}
      <rect width="40" height="40" rx="10" fill="url(#bg-grad)" />
      {/* Orange accent bar */}
      <rect x="0" y="16" width="40" height="8" rx="0" fill="url(#accent-grad)" opacity="0.85" />
      {/* Letter B */}
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="18"
      >
        B
      </text>
    </svg>
  );
}
