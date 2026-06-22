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
  const [active, setActive]     = useState<string>("");
  const [hovered, setHovered]   = useState<string | null>(null);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const linksRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Underline follows hovered link, falls back to active
  const target = hovered ?? active;
  useEffect(() => {
    if (target) {
      const el = linksRef.current.get(target);
      if (el) {
        const rect = el.getBoundingClientRect();
        const parentRect = el.closest("ul")!.getBoundingClientRect();
        setLineStyle({ left: rect.left - parentRect.left, width: rect.width });
      }
    }
  }, [target]);

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
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, border 0.5s ease, box-shadow 0.5s ease",
          background: scrolled ? "rgba(8,7,6,0.85)" : "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.14)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* top hairline accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.5s ease",
        }} />

        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? "64px" : "84px",
          transition: "height 0.4s ease",
          direction: "rtl",
        }}>

          {/* ── Logo (right) ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
          >
            {/* Monogram mark */}
            <span style={{
              position: "relative", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "9px",
              background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.04))",
              border: "1px solid rgba(201,168,76,0.35)",
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 20V9.5L12 4l8 5.5V20" stroke="#E8C97A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.5 20v-6h5v6" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start" }}>
              <span style={{
                fontSize: "clamp(16px, 4vw, 19px)", fontWeight: 800, letterSpacing: "0.02em",
                background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1,
              }}>
                {COMPANY.name}
              </span>
              <span style={{ fontSize: "8px", letterSpacing: "3px", color: "rgba(201,168,76,0.5)", textTransform: "uppercase", lineHeight: 1 }}>
                בנייה פרימיום
              </span>
            </span>
          </button>

          {/* ── Desktop links (center) ── */}
          <ul className="hidden md:flex" style={{
            alignItems: "center", gap: 0, listStyle: "none", margin: 0, padding: 0,
            position: "absolute", left: "50%", transform: "translateX(-50%)",
          }} onMouseLeave={() => setHovered(null)}>
            <AnimatePresence>
              {target && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, left: lineStyle.left, width: lineStyle.width }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute", bottom: -4, height: "2px", borderRadius: "2px",
                    background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>
            {LINKS.map((l) => {
              const isActive = active === l.href;
              const isHover = hovered === l.href;
              return (
                <li key={l.href}>
                  <button
                    ref={(el) => { if (el) linksRef.current.set(l.href, el); }}
                    onClick={() => scrollTo(l.href)}
                    onMouseEnter={() => setHovered(l.href)}
                    style={{
                      padding: "8px 20px", fontSize: "13.5px", fontWeight: 500,
                      letterSpacing: "0.03em",
                      color: isHover || isActive ? "#F0E2BC" : "#9A958C",
                      background: "none", border: "none", cursor: "pointer",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {l.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Right cluster: phone + CTA (desktop) ── */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "20px" }}>
            <a
              href={`tel:${COMPANY.phone}`}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                fontSize: "13px", fontWeight: 500, color: "#9A958C",
                textDecoration: "none", letterSpacing: "0.02em",
                transition: "color 0.25s ease", direction: "ltr",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#E8C97A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9A958C"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {COMPANY.phone}
            </a>

            <div style={{ width: "1px", height: "22px", background: "rgba(201,168,76,0.18)" }} />

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 24px", fontSize: "12.5px", fontWeight: 700,
                letterSpacing: "0.05em",
                background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
                color: "#0A0908", border: "none", borderRadius: "6px", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(201,168,76,0.25)",
              }}
            >
              בואו נדבר
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>

          {/* ── Hamburger (mobile) ── */}
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
                style={{ display: "block", width: "24px", height: "1.5px", background: "#C9A84C", transformOrigin: "center" }}
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

            <motion.a
              href={`tel:${COMPANY.phone}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontSize: "15px", color: "rgba(245,243,239,0.7)", textDecoration: "none",
                marginBottom: "8px", direction: "ltr",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {COMPANY.phone}
            </motion.a>

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={() => scrollTo("#contact")}
              style={{
                padding: "14px 48px", fontSize: "12px", fontWeight: 700,
                letterSpacing: "4px", textTransform: "uppercase", borderRadius: "6px",
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
