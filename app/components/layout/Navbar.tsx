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
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);
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
          transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          background: scrolled
            ? "rgba(6,5,4,0.88)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        }}
      >
        {/* Top gold accent line */}
        {scrolled && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)",
          }} />
        )}

        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 40px",
          height: scrolled ? "64px" : "80px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "height 0.5s ease",
          direction: "ltr",
        }}>

          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{
              fontSize: "20px", fontWeight: 800, letterSpacing: "0.04em",
              background: "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 50%, #E8C97A 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1,
            }}>
              {COMPANY.name}
            </span>
            <span style={{
              fontSize: "9px", letterSpacing: "4px", color: "rgba(201,168,76,0.5)",
              textTransform: "uppercase", fontWeight: 400,
            }}>
              בנייה פרימיום
            </span>
          </button>

          {/* ── Desktop links ── */}
          <ul
            style={{ display: "flex", alignItems: "center", gap: "0", listStyle: "none", margin: 0, padding: 0, position: "relative" }}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Animated underline */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1, left: lineStyle.left, width: lineStyle.width }}
                  exit={{ opacity: 0, scaleX: 0.5 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute", bottom: -4, height: "1px",
                    background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                    transformOrigin: "center",
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
                    padding: "8px 20px",
                    fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em",
                    color: hovered === l.href ? "#E8C97A" : "#8A8680",
                    background: "none", border: "none", cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* ── Right side ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Phone */}
            <a
              href={`tel:${COMPANY.phone}`}
              style={{
                fontSize: "13px", color: "rgba(201,168,76,0.6)", letterSpacing: "0.05em",
                textDecoration: "none", transition: "color 0.2s",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.6)")}
            >
              {COMPANY.phone}
            </a>

            {/* Divider */}
            <div style={{ width: "1px", height: "20px", background: "rgba(201,168,76,0.15)" }} />

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              style={{
                position: "relative", overflow: "hidden",
                padding: "10px 28px", fontSize: "12px", fontWeight: 600,
                letterSpacing: "3px", textTransform: "uppercase",
                color: "#080807", cursor: "pointer", border: "none",
                background: "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 50%, #E8C97A 100%)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              בואו נדבר
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen(!open)}
            style={{ display: "none", flexDirection: "column", gap: "5px", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
            className="md-hidden-show"
            aria-label="תפריט"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  open
                    ? i === 0 ? { rotate: 45, y: 7 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.3 }}
                style={{ display: "block", width: "22px", height: "1px", background: "#C9A84C", transformOrigin: "center" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(4,3,3,0.97)", backdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "12px",
            }}
          >
            {/* Gold lines */}
            <div style={{ position: "absolute", top: "20%", left: "10%", width: "1px", height: "60%", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)" }} />
            <div style={{ position: "absolute", top: "20%", right: "10%", width: "1px", height: "60%", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)" }} />

            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(l.href)}
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300,
                  letterSpacing: "0.08em", color: "#F5F3EF",
                  background: "none", border: "none", cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C9A84C";
                  (e.currentTarget.style as any).WebkitTextFillColor = "transparent";
                  e.currentTarget.style.backgroundImage = "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)";
                  (e.currentTarget.style as any).WebkitBackgroundClip = "text";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#F5F3EF";
                  e.currentTarget.style.backgroundImage = "none";
                  (e.currentTarget.style as any).WebkitTextFillColor = "#F5F3EF";
                }}
              >
                {l.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "12px 0" }}
            />

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
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
