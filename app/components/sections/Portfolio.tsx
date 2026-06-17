"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { PROJECTS } from "@/app/lib/data";

const CATS = ["הכל", "בנייה חדשה", "שיפוץ", "מסחרי"];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [cat, setCat] = useState("הכל");
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null);

  const filtered = cat === "הכל" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <section id="portfolio" ref={ref} className="section-pad relative overflow-hidden">
      <div style={{ width: "100%", maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", padding: "0 24px", textAlign: "center" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "48px" }}>
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>עבודות נבחרות</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF" }}>הפרויקטים שלנו</h2>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }} style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "48px", flexWrap: "wrap" }}>
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ fontSize: "14px", fontWeight: 500, background: "none", border: "none", borderBottom: cat === c ? "1px solid #C9A84C" : "1px solid transparent", color: cat === c ? "#C9A84C" : "#6B6762", paddingBottom: "4px", cursor: "pointer", transition: "all 0.3s" }}>
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setSelected(p)}
                style={{ cursor: "pointer", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)" }}
              >
                {/* Image */}
                <div style={{ aspectRatio: "4/3", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, #1A1917 0%, ${p.color}22 100%)` }}>
                  <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                  <div style={{ fontSize: "64px", fontWeight: 800, opacity: 0.2, color: p.color }}>{p.id}</div>
                </div>
                {/* Info */}
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#6B6762" }}>{p.year}</span>
                    <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#F5F3EF" }}>{p.title}</h3>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6B6762", lineHeight: 1.6, textAlign: "center" }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "rgba(8,8,7,0.9)", backdropFilter: "blur(20px)" }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "640px", width: "100%", borderRadius: "4px", overflow: "hidden", background: "#1A1917", border: "1px solid rgba(201,168,76,0.2)" }}>
              <div style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: `linear-gradient(135deg, #0F0E0D, ${selected.color}33)` }}>
                <div style={{ fontSize: "96px", fontWeight: 800, opacity: 0.2, color: selected.color }}>{selected.id}</div>
                <button onClick={() => setSelected(null)} style={{ position: "absolute", top: "16px", left: "16px", width: "36px", height: "36px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer" }}>
                  <X size={16} color="#F5F3EF" />
                </button>
              </div>
              <div style={{ padding: "32px", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "#C9A84C", letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>{selected.category} · {selected.year}</p>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#F5F3EF", marginBottom: "12px" }}>{selected.title}</h3>
                <p style={{ color: "#B8B4AE", lineHeight: 1.8, marginBottom: "16px" }}>{selected.desc}</p>
                <p style={{ fontSize: "13px", color: "#6B6762" }}>לקוח: <span style={{ color: "#C9A84C" }}>{selected.client}</span></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
