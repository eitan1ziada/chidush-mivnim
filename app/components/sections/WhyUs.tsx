"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lightbulb, Cpu, User, Clock, MessageCircle } from "lucide-react";
import { WHY_US } from "@/app/lib/data";

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Shield, Lightbulb, Cpu, User, Clock, MessageCircle,
};

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="section-pad relative overflow-hidden">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "64px" }}
        >
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>
            למה אנחנו
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF" }}>
            מה מייחד אותנו
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }} className="why-grid">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{
                  padding: "40px 32px",
                  background: "linear-gradient(135deg, rgba(15,14,13,0.8) 0%, rgba(20,18,16,0.9) 100%)",
                  border: "2px solid rgba(201,168,76,0.4)",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
                whileHover={{ y: -8, borderColor: "rgba(201,168,76,0.8)", boxShadow: "0 20px 40px rgba(201,168,76,0.15)" }}
                className="why-card"
              >
                {/* Glow background on hover */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(201,168,76,0.1) 0%, transparent 70%)",
                  opacity: 0,
                  pointerEvents: "none",
                }} className="glow" />

                <div style={{
                  position: "relative",
                  zIndex: 1,
                }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.08) 100%)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    margin: "0 auto 28px",
                    transition: "all 0.4s ease",
                  }} className="icon-box">
                    {Icon && <Icon size={28} color="#C9A84C" />}
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#F5F3EF", marginBottom: "14px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#A0A09A", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-card:hover .glow {
          opacity: 1;
        }
        .why-card:hover .icon-box {
          background: linear-gradient(135deg, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.15) 100%);
          border-color: rgba(201,168,76,0.6);
          transform: scale(1.1);
        }
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
          .why-card {
            padding: 22px 14px !important;
            border-width: 1px !important;
          }
          .why-card .icon-box {
            width: 44px !important;
            height: 44px !important;
            margin-bottom: 14px !important;
            border-radius: 6px !important;
          }
          .why-card .icon-box svg { width: 20px !important; height: 20px !important; }
          .why-card h3 { font-size: 16px !important; margin-bottom: 8px !important; }
          .why-card p { font-size: 13px !important; line-height: 1.6 !important; }
        }
        @media (max-width: 600px) {
          .why-grid { gap: 10px !important; }
          .why-card { padding: 18px 12px !important; }
          .why-card h3 { font-size: 14.5px !important; }
          .why-card p { font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}
