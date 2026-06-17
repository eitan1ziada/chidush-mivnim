"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onDone, 800);
          }, 300);
          return 100;
        }
        return c + Math.floor(Math.random() * 4) + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0F0E0D" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, #C9A84C22 0%, transparent 70%)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mb-12 text-center"
          >
            <div
              className="text-5xl md:text-7xl font-bold mb-2 tracking-tight"
              style={{
                fontFamily: "var(--font-manrope)",
                background: "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 50%, #E8C97A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              חידוש מבנים
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px origin-left"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
            />
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-4 w-48"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-light" style={{ color: "#C9A84C", fontFamily: "var(--font-manrope)" }}>
                {count}
              </span>
              <span className="text-xl" style={{ color: "#6B6762" }}>%</span>
            </div>
            <div className="w-full h-px" style={{ background: "#1A1917" }}>
              <motion.div
                className="h-full"
                style={{
                  width: `${count}%`,
                  background: "linear-gradient(90deg, #9A7A2E, #C9A84C)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
