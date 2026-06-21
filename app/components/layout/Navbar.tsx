"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/app/lib/data";

const LINKS = [
  { label: "אודות",    href: "#about" },
  { label: "פרויקטים", href: "#portfolio" },
  { label: "תהליך",   href: "#process" },
  { label: "המלצות",  href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [hovered, setHovered]   = useState<string | null>(null);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const linksRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hovered) {
      const el = linksRef.current.get(hovered);
      if (el) {
        const rect = el.getBoundingClientRect();
        const parentRect = el.closest("ul")!.getBoundingClientRect();
        setLineStyle({ left: rect.left - parentRect.left, width: rect.width });
      }
    }
  }, [hovered]);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.6s ease, backdrop-filter 0.6s ease, border 0.6s ease",
          background: scrolled ? "rgba(6,5,4,0.92)" : "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        }}
      >
        {scrolled && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
          }} />
        )}

        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? "60px" : "76px",
          transition: "height 0.4s ease",
          direction: "rtl",
        }}>

          {/* Logo — right */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "2px" }}
          >
            <span style={{
              fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, letterSpacing: "0.04em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1,
            }}>
              {COMPANY.name}
            </span>
            <span style={{ fontSize: "8px", letterSpacing: "3px", color: "rgba(201,168,76,0.45)", textTransform: "uppercase" }}>
              בנייה פרימיום
            </span>
          </button>

          {/* Desktop links — center (hidden on mobile) */}
          <ul className="hidden md:flex" style={{
            alignItems: "center", gap: 0, listStyle: "none", margin: 0, padding: 0,
            position: "relative",
          }} onMouseLeave={() => setHovered(null)}>
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.4 }}
                  animate={{ opacity: 1, scaleX: 1, left: lineStyle.left, width: lineStyle.width }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    position: "absolute", bottom: -2, height: "1px",
                    background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  ref={(el) => { if (el) linksRef.current.set(l.href, el); }}
                  onClick={() => scrollTo(l.href)}
                  onMouseEnter={() => setHovered(l.href)}
                  style={{
                    padding: "8px 18px", fontSize: "13px", fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: hovered === l.href ? "#E8C97A" : "#8A8680",
                    background: "none", border: "none", cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Spacer on desktop / hamburger on mobile */}
          <div className="hidden md:block" style={{ width: "160px" }} />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden"
            style={{ flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "8px" }}
            aria-label="תפריט"
          >
            {[0, 1, 2].map((i) => (
              <motion.span key={i}
                animate={
                  open
                    ? i === 0 ? { rotate: 45, y: 6 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.28 }}
                style={{ display: "block", width: "24px", height: "1px", background: "#C9A84C", transformOrigin: "center" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(4,3,3,0.97)", backdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "8px",
              direction: "rtl",
            }}
          >
            <div style={{ position: "absolute", top: "15%", right: "12%", width: "1px", height: "70%", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.12), transparent)" }} />
            <div style={{ position: "absolute", top: "15%", left: "12%", width: "1px", height: "70%", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.12), transparent)" }} />

            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  fontSize: "clamp(1.6rem, 8vw, 2.6rem)", fontWeight: 300,
                  letterSpacing: "0.06em", color: "#F5F3EF",
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 0", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A84C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#F5F3EF"; }}
              >
                {l.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{ width: "50px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "16px 0" }}
            />

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={() => scrollTo("#contact")}
              style={{
                padding: "14px 48px", fontSize: "12px", fontWeight: 600,
                letterSpacing: "4px", textTransform: "uppercase",
                background: "linear-gradient(135deg, #9A7A2E, #C9A84C)",
                color: "#080807", border: "none", cursor: "pointer",
              }}
            >
              בואו נדבר
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
