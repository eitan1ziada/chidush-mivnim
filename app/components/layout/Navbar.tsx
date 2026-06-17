"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/app/lib/data";

const LINKS = [
  { label: "אודות", href: "#about" },
  { label: "פרויקטים", href: "#portfolio" },
  { label: "תהליך", href: "#process" },
  { label: "המלצות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(15,14,13,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between" style={{direction:"ltr"}}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-manrope)",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {COMPANY.name}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-sm font-medium transition-colors duration-200 hover:text-[#C9A84C]"
                  style={{ color: "#B8B4AE" }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #9A7A2E, #C9A84C)", color: "#080807" }}
          >
            בואו נדבר
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="תפריט"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  open
                    ? i === 0 ? { rotate: 45, y: 8 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className="block w-6 h-px"
                style={{ background: "#C9A84C", transition: "all 0.3s" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(10,9,9,0.97)", backdropFilter: "blur(20px)" }}
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => scrollTo(l.href)}
                className="text-3xl font-light hover:text-[#C9A84C] transition-colors"
                style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: LINKS.length * 0.07 + 0.05, duration: 0.4 }}
              onClick={() => scrollTo("#contact")}
              className="mt-4 px-8 py-3 rounded-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #9A7A2E, #C9A84C)", color: "#080807" }}
            >
              בואו נדבר
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
