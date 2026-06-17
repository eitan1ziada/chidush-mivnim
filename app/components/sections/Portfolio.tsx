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
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
            עבודות נבחרות
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
          >
            הפרויקטים שלנו
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="text-sm font-medium transition-all duration-300 pb-1"
              style={
                cat === c
                  ? { color: "#C9A84C", borderBottom: "1px solid #C9A84C" }
                  : { color: "#6B6762", borderBottom: "1px solid transparent" }
              }
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setSelected(p)}
                className="group cursor-pointer rounded overflow-hidden"
                style={{ border: "1px solid rgba(201,168,76,0.1)" }}
              >
                {/* Image placeholder */}
                <div
                  className="aspect-[4/3] relative flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, #1A1917 0%, ${p.color}22 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <div
                    className="text-6xl font-bold opacity-20"
                    style={{ fontFamily: "var(--font-manrope)", color: p.color }}
                  >
                    {p.id}
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center"
                      style={{ background: "rgba(201,168,76,0.9)", color: "#080807" }}
                    >
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </div>

                <div className="p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base leading-tight" style={{ color: "#F5F3EF", fontFamily: "var(--font-manrope)" }}>
                      {p.title}
                    </h3>
                    <span className="text-xs flex-shrink-0" style={{ color: "#6B6762" }}>
                      {p.year}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#6B6762" }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(8,8,7,0.9)", backdropFilter: "blur(20px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded overflow-hidden"
              style={{ background: "#1A1917", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <div
                className="aspect-video flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, #0F0E0D, ${selected.color}33)` }}
              >
                <div
                  className="text-9xl font-bold opacity-20"
                  style={{ fontFamily: "var(--font-manrope)", color: selected.color }}
                >
                  {selected.id}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 left-4 w-9 h-9 rounded-sm flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <X size={16} color="#F5F3EF" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-3 py-1 rounded-sm" style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C" }}>
                    {selected.category}
                  </span>
                  <span className="text-xs" style={{ color: "#6B6762" }}>{selected.year}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}>
                  {selected.title}
                </h3>
                <p className="mb-4 leading-relaxed" style={{ color: "#B8B4AE" }}>{selected.desc}</p>
                <div className="flex items-center gap-4 text-sm" style={{ color: "#6B6762" }}>
                  <span>לקוח: <span style={{ color: "#C9A84C" }}>{selected.client}</span></span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
