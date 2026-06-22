"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/app/lib/data";

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="process" ref={ref} className="section-pad relative">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "64px" }}
        >
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>
            איך אנחנו עובדים
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF" }}>
            תהליך העבודה שלנו
          </h2>
        </motion.div>

        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: "40px 36px",
                background: "linear-gradient(135deg, rgba(15,14,13,0.8) 0%, rgba(20,18,16,0.9) 100%)",
                border: "2px solid rgba(201,168,76,0.35)",
                borderRadius: "8px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
              whileHover={{ y: -6, borderColor: "rgba(201,168,76,0.7)", boxShadow: "0 20px 40px rgba(201,168,76,0.12)" }}
              className="process-card"
            >
              {/* Glow background */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
                opacity: 0,
                pointerEvents: "none",
              }} className="glow" />

              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "100px", fontWeight: 900, color: "rgba(201,168,76,0.06)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
                {step.num}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "12px", letterSpacing: "3px", color: "#C9A84C", marginBottom: "12px", textTransform: "uppercase", fontWeight: 600 }}>
                  שלב {step.num}
                </p>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#F5F3EF", marginBottom: "14px" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#A0A09A", fontSize: "16px", lineHeight: 1.8 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .process-card:hover .glow {
          opacity: 1;
        }
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
          .process-card { padding: 24px 14px !important; border-width: 1px !important; }
          .process-card h3 { font-size: 17px !important; margin-bottom: 8px !important; }
          .process-card p:last-child { font-size: 13px !important; line-height: 1.6 !important; }
        }
        @media (max-width: 600px) {
          .process-grid { gap: 10px !important; }
          .process-card { padding: 20px 12px !important; }
          .process-card h3 { font-size: 15px !important; }
          .process-card p:last-child { font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}
