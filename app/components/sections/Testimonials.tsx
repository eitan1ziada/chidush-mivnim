"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { TESTIMONIALS } from "@/app/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[idx];

  return (
    <section id="testimonials" ref={ref} className="section-pad relative overflow-hidden">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "760px", marginLeft: "auto", marginRight: "auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "56px" }}>
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>מה אומרים עלינו</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF" }}>המלצות לקוחות</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <div style={{ padding: "48px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "80px", fontWeight: 800, lineHeight: 0.8, marginBottom: "24px", opacity: 0.15, color: "#C9A84C" }}>"</div>

            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "24px" }}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={18} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <p style={{ fontSize: "20px", lineHeight: 1.8, marginBottom: "28px", color: "#E2DED9", fontWeight: 300 }}>{t.text}</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "18px", color: "#F5F3EF" }}>{t.name}</div>
                  <div style={{ fontSize: "13px", color: "#C9A84C", marginTop: "4px" }}>{t.company}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "36px" }}>
              <button onClick={prev} style={{ width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#C9A84C", cursor: "pointer" }}>
                <ChevronRight size={18} />
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} style={{ height: "6px", width: i === idx ? "24px" : "6px", borderRadius: "3px", background: i === idx ? "#C9A84C" : "rgba(201,168,76,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
              <button onClick={next} style={{ width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#C9A84C", cursor: "pointer" }}>
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
