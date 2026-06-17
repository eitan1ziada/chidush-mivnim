"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDone = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onDone, 900);
  };

  useEffect(() => {
    timerRef.current = setTimeout(handleDone, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", background: "#000" }}
        >
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/house-animation.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)",
          }} />

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div style={{
              fontSize: "clamp(28px, 5vw, 60px)", fontWeight: 800, letterSpacing: "0.1em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A, #C9A84C)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "16px", textShadow: "none",
            }}>
              חידוש מבנים
            </div>
            <div style={{
              width: "180px", height: "1px", margin: "0 auto 16px",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)",
            }} />
            <div style={{
              fontSize: "11px", letterSpacing: "6px",
              color: "rgba(255,255,255,0.65)", textTransform: "uppercase",
            }}>
              בנייה פרימיום
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            onClick={handleDone}
            style={{
              position: "absolute", bottom: "5vh", right: "5vw", zIndex: 20,
              background: "transparent", border: "1px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.55)", padding: "8px 24px",
              fontSize: "11px", letterSpacing: "3px", cursor: "pointer",
              textTransform: "uppercase", backdropFilter: "blur(4px)",
            }}
          >
            דלג
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
