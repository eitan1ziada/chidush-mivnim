"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderAnimation } from "@/app/components/ui/shader-animation";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  const handleDone = () => {
    setExiting(true);
    setTimeout(onDone, 900);
  };

  // Auto-dismiss after 4 seconds
  if (typeof window !== "undefined") {
    setTimeout(() => {
      if (!exiting) handleDone();
    }, 4000);
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          {/* Shader background */}
          <div style={{ position: "absolute", inset: 0 }}>
            <ShaderAnimation />
          </div>

          {/* Dark overlay for readability */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          }} />

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10 }}
          >
            <div style={{
              fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 800, letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "16px",
            }}>
              חידוש מבנים
            </div>
            <div style={{
              width: "160px", height: "1px", margin: "0 auto 16px",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
            }} />
            <div style={{ fontSize: "11px", letterSpacing: "6px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
              בנייה פרימיום
            </div>
          </motion.div>

          {/* Skip button */}
          <button
            onClick={handleDone}
            style={{
              position: "absolute", bottom: "5vh", right: "5vw", zIndex: 20,
              background: "transparent", border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.5)", padding: "8px 20px",
              fontSize: "11px", letterSpacing: "3px", cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            דלג
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
