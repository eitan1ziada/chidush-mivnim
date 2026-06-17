"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax text on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - scrollY * 0.003));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Canvas ambient particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let raf: number;
    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.3 + 0.05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      style={{
        position: "relative", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay over the fixed video */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)",
      }} />

      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(to bottom, transparent, #080807)",
        pointerEvents: "none", zIndex: 10,
      }} />

      {/* Hero text */}
      <div ref={textRef} style={{
        position: "relative", zIndex: 5, textAlign: "center", padding: "0 24px",
        willChange: "transform, opacity",
      }}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase",
            marginBottom: "32px", letterSpacing: "0.5em", color: "#C9A84C" }}
        >
          חידוש מבנים · בנייה פרימיום
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontWeight: 800, lineHeight: 0.92, marginBottom: "32px",
            fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.02em" }}
        >
          <span style={{ color: "#F5F3EF", display: "block" }}>בנייה שמשאירה</span>
          <span style={{
            display: "block",
            background: "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 45%, #E8C97A 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            רושם לנצח
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            height: "1px", width: "120px", margin: "0 auto 32px",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            transformOrigin: "center",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ color: "#A0A09A", maxWidth: "560px", margin: "0 auto 48px",
            lineHeight: 1.8, fontSize: "17px", fontWeight: 300 }}
        >
          פרויקטי שיפוץ ובנייה פרימיום · מהתכנון ועד המסירה · 15 שנות ניסיון
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}
        >
          <button
            onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
            style={{ color: "#F5F3EF", fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", paddingBottom: "4px", background: "none",
              border: "none", borderBottom: "1px solid rgba(245,243,239,0.3)", cursor: "pointer" }}
          >
            הצג פרויקטים
          </button>
          <span style={{ color: "#3A3835" }}>·</span>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ color: "#C9A84C", fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", paddingBottom: "4px", background: "none",
              border: "none", borderBottom: "1px solid rgba(201,168,76,0.3)", cursor: "pointer" }}
          >
            בואו נדבר
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center",
            gap: "80px", marginTop: "80px", flexWrap: "wrap" }}
        >
          {[
            { value: "200+", label: "פרויקטים" },
            { value: "15+", label: "שנות ניסיון" },
            { value: "100%", label: "שביעות רצון" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700,
                marginBottom: "4px", color: "#C9A84C" }}>{s.value}</div>
              <div style={{ fontSize: "11px", textTransform: "uppercase",
                letterSpacing: "0.2em", color: "#3A3835" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
        }}
      >
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#3A3835" }}>
          גלול
        </div>
        <div style={{ width: "1px", height: "48px", overflow: "hidden", background: "rgba(201,168,76,0.1)" }}>
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "100%", height: "50%",
              background: "linear-gradient(to bottom, transparent, #C9A84C)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
