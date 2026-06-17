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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="why-grid">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{
                  padding: "28px 24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "4px",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "4px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(201,168,76,0.1)", margin: "0 auto 20px",
                }}>
                  {Icon && <Icon size={22} color="#C9A84C" />}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F5F3EF", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6B6762", lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
