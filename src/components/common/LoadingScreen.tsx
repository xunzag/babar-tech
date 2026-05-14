"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const p = Math.min(100, Math.round((step / steps) * 100));
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "#05091A" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Radial glow */}
          <div className="absolute inset-0 radial-glow-orange" />

          {/* Logo */}
          <motion.div
            className="relative z-10 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                B
              </motion.div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight">
                  Babar Tech
                  <span className="text-gradient-orange"> Solutions</span>
                </div>
                <div className="text-xs text-slate-500 tracking-widest uppercase">
                  Premium Digital Agency
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative z-10 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Initializing experience</span>
              <span className="text-orange-500">{progress}%</span>
            </div>
            <div className="h-px bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF6B35, #FF8C42)",
                  width: `${progress}%`,
                  transition: "width 0.03s linear",
                  boxShadow: "0 0 8px rgba(255,107,53,0.5)",
                }}
              />
            </div>
          </motion.div>

          {/* Floating dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-orange-500/40"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 15}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
