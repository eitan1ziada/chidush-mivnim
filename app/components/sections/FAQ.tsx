"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/app/lib/data";

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="section-pad">
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "56px" }}
        >
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>
            שאלות נפוצות
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF" }}>
            יש לכם שאלות?
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ border: "1px solid rgba(201,168,76,0.12)", borderRadius: "4px", overflow: "hidden" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "20px 24px",
                  background: open === i ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)",
                  color: "#F5F3EF",
                  cursor: "pointer",
                  border: "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: open === i ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.04)",
                    color: "#C9A84C",
                  }}
                >
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
                <span style={{ fontWeight: 600, fontSize: "16px", flex: 1, textAlign: "center" }}>{faq.q}</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div style={{ padding: "0 24px 20px", color: "#B8B4AE", textAlign: "center" }}>
                      <div style={{ height: "1px", background: "rgba(201,168,76,0.1)", marginBottom: "16px" }} />
                      <p style={{ lineHeight: 1.8, fontSize: "15px" }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
