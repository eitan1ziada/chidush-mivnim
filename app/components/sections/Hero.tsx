"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll-driven parallax
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(${1 + scrollY * 0.0004}) translateY(${scrollY * 0.25}px)`;
        bgRef.current.style.opacity = String(Math.max(0, 1 - scrollY * 0.002));
      }
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
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
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
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#080807" }}
    >
      {/* Cinematic background layers */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ transformOrigin: "center center", willChange: "transform, opacity" }}
      >
        {/* Deep gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 30%, #1A1410 0%, #0A0807 60%, #050403 100%)",
          }}
        />
        {/* Warm light source */}
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60vw",
            height: "50vh",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(201,168,76,0.12) 0%, rgba(180,120,40,0.06) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #080807)" }}
      />

      {/* MAIN CONTENT */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Sub label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-medium uppercase mb-8 tracking-[0.5em]"
          style={{ color: "#C9A84C" }}
        >
          חידוש מבנים · בנייה פרימיום
        </motion.p>

        {/* MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-none mb-8"
          style={{
            fontFamily: "var(--font-manrope)",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
          }}
        >
          <span style={{ color: "#F5F3EF", display: "block" }}>בנייה שמשאירה</span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 45%, #E8C97A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            רושם לנצח
          </span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8"
          style={{
            height: "1px",
            width: "120px",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
          style={{ color: "#6B6762" }}
        >
          פרויקטי שיפוץ ובנייה פרימיום · מהתכנון ועד המסירה · 15 שנות ניסיון
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <button
            onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
            style={{
              color: "#F5F3EF",
              borderBottom: "1px solid rgba(245,243,239,0.3)",
              paddingBottom: "4px",
              letterSpacing: "0.15em",
            }}
          >
            הצג פרויקטים
          </button>
          <span style={{ color: "#3A3835" }}>·</span>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
            style={{
              color: "#C9A84C",
              borderBottom: "1px solid rgba(201,168,76,0.3)",
              paddingBottom: "4px",
              letterSpacing: "0.15em",
            }}
          >
            בואו נדבר
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex items-center justify-center gap-12 md:gap-20 mt-20 flex-wrap"
        >
          {[
            { value: "200+", label: "פרויקטים" },
            { value: "15+", label: "שנות ניסיון" },
            { value: "100%", label: "שביעות רצון" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ fontFamily: "var(--font-manrope)", color: "#C9A84C" }}
              >
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#3A3835" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <div className="text-xs tracking-[0.3em] uppercase" style={{ color: "#3A3835" }}>
          גלול
        </div>
        <div className="w-px h-12 overflow-hidden" style={{ background: "rgba(201,168,76,0.1)" }}>
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, #C9A84C)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
