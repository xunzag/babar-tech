"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const ringX = useSpring(cursorX, { stiffness: 200, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 28 });

  const dotX = useSpring(cursorX, { stiffness: 600, damping: 35 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 35 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.8 : 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ scale: { duration: 0.2 } }}
      >
        <div
          className="w-8 h-8 rounded-full border border-orange-500/50"
          style={{
            boxShadow: isHovering
              ? "0 0 15px rgba(255,107,53,0.4)"
              : "0 0 8px rgba(255,107,53,0.2)",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ scale: { duration: 0.15 } }}
      >
        <div className="w-2 h-2 rounded-full bg-orange-500" />
      </motion.div>
    </>
  );
}
