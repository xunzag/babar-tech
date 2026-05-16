"use client";

import { useEffect } from "react";
import { renderCanvas, stopCanvas } from "@/lib/canvas-silk";

export default function SilkCanvas() {
  useEffect(() => {
    renderCanvas();
    return () => stopCanvas();
  }, []);

  return (
    <canvas
      id="silk-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
