"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { OWNER } from "@/app/lib/data";

export default function Owner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="owner" className="section-pad relative overflow-hidden" style={{ background: "#0F0E0D" }}>
      {/* subtle gold glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>
            הצוות שלנו
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#F5F0E8",
            }}
          >
            מאחורי כל פרויקט{" "}
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              אדם אחד שמוביל
            </span>
          </h2>
        </motion.div>

        {/* two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="owner-grid"
        >
          {/* image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            {/* frame */}
            <div
              style={{
                position: "absolute",
                inset: "-16px",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "4px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                background: "linear-gradient(160deg, #1A1917 0%, #0F0E0D 100%)",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* placeholder portrait silhouette */}
              <div style={{ textAlign: "center" }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="42" r="28" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                  <ellipse cx="60" cy="110" rx="46" ry="28" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
                </svg>
                <p style={{ color: "rgba(201,168,76,0.4)", fontSize: "12px", marginTop: "12px", letterSpacing: "2px" }}>תמונה בקרוב</p>
              </div>

              {/* gold corner accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "120px",
                  background: "linear-gradient(to top, rgba(201,168,76,0.08), transparent)",
                }}
              />
            </div>

            {/* floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                position: "absolute",
                bottom: "-24px",
                right: "-24px",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
                backdropFilter: "blur(20px)",
                padding: "20px 28px",
                borderRadius: "4px",
              }}
            >
              <p style={{ color: "#C9A84C", fontSize: "32px", fontWeight: 800, lineHeight: 1 }}>15+</p>
              <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "13px", marginTop: "4px" }}>שנות ניסיון</p>
            </motion.div>
          </motion.div>

          {/* text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ textAlign: "right" }}
          >
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#F5F0E8", marginBottom: "8px" }}>
                {OWNER.name}
              </h3>
              <p style={{ color: "#C9A84C", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "32px" }}>
                {OWNER.title}
              </p>
            </div>

            {/* gold divider */}
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)", marginBottom: "32px", marginRight: "auto", marginLeft: "auto" }} />

            <div style={{ textAlign: "right" }}>
              <p style={{ color: "rgba(245,240,232,0.75)", fontSize: "17px", lineHeight: 1.9, marginBottom: "20px" }}>
                {OWNER.bio}
              </p>
              <p style={{ color: "rgba(245,240,232,0.55)", fontSize: "16px", lineHeight: 1.9, marginBottom: "40px" }}>
                {OWNER.bio2}
              </p>
            </div>

            {/* stats row */}
            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
              {OWNER.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  style={{ textAlign: "center" }}
                >
                  <p style={{ fontSize: "28px", fontWeight: 800, color: "#C9A84C", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: "12px", color: "rgba(245,240,232,0.5)", marginTop: "4px", letterSpacing: "1px" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                style={{
                  display: "inline-block",
                  marginTop: "40px",
                  color: "#C9A84C",
                  fontSize: "15px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(201,168,76,0.4)",
                  paddingBottom: "4px",
                  textDecoration: "none",
                }}
              >
                דברו איתי ישירות ←
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .owner-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
