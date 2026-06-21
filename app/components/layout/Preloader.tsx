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
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#060504" }}
        >
          {/* Video background */}
          <video
            autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/house-animation.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)",
          }} />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              zIndex: 10, padding: "0 24px", textAlign: "center",
            }}
          >
            {/* Gold line top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                width: "40px", height: "1px", marginBottom: "24px",
                background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              }}
            />

            <div style={{
              fontSize: "clamp(32px, 10vw, 64px)", fontWeight: 800, letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.1, marginBottom: "16px",
            }}>
              חידוש מבנים
            </div>

            <div style={{
              width: "120px", height: "1px", margin: "0 auto 16px",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
            }} />

            <div style={{
              fontSize: "clamp(9px, 2.5vw, 11px)", letterSpacing: "5px",
              color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
            }}>
              בנייה פרימיום
            </div>
          </motion.div>

          {/* Skip — bottom center */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            onClick={handleDone}
            style={{
              position: "absolute", bottom: "6vh", left: "50%", transform: "translateX(-50%)",
              zIndex: 20, background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.45)", padding: "10px 32px",
              fontSize: "10px", letterSpacing: "4px", cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            דלג
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
