"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VALUES = [
  { title: "איכות", desc: "לא מתפשרים על שום פרט." },
  { title: "אמינות", desc: "מה שמבטיחים — מקיימים." },
  { title: "חדשנות", desc: "תמיד עם הטכנולוגיה הכי מתקדמת." },
  { title: "שקיפות", desc: "תקשורת פתוחה בכל שלב." },
];

const STATS = [
  { value: "200+", label: "פרויקטים" },
  { value: "180+", label: "לקוחות מרוצים" },
  { value: "15+", label: "שנות ניסיון" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}
        >
          מי אנחנו
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: "#F5F3EF", marginBottom: "24px" }}
        >
          מעל 15 שנה של
          <br />
          <span style={{ background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            מצוינות בבנייה
          </span>
        </motion.h2>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 32px" }}
        />

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ color: "#F0ECE4", fontSize: "20px", fontWeight: 500, lineHeight: 1.9, marginBottom: "16px", maxWidth: "680px", margin: "0 auto 16px" }}
        >
          חידוש מבנים היא חברת בנייה ושיפוץ פרימיום המובילה בישראל. אנו מאמינים שכל מבנה הוא יצירת אמנות — ומחויבים להוציא לפועל את החזון שלכם בדיוק כפי שדמיינתם אותו.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ color: "#C7C2BA", fontSize: "17px", lineHeight: 1.9, maxWidth: "600px", margin: "0 auto 56px" }}
        >
          מהתכנון הראשוני ועד למסירת המפתח, אנו מלווים אתכם בכל שלב עם צוות מקצועי, חומרים מהמובחרים ותשומת לב לכל פרט.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: "flex", justifyContent: "center", gap: "60px", marginBottom: "56px", flexWrap: "wrap" }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                style={{ fontSize: "40px", fontWeight: 800, color: "#C9A84C", lineHeight: 1 }}
              >
                {s.value}
              </motion.p>
              <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "13px", marginTop: "6px", letterSpacing: "1px" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", maxWidth: "600px", margin: "0 auto" }}
        >
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1 }}
              whileHover={{ y: -8, borderColor: "rgba(201,168,76,0.8)", boxShadow: "0 20px 40px rgba(201,168,76,0.15)" }}
              className="value-card"
              style={{
                padding: "28px 24px",
                background: "linear-gradient(135deg, rgba(15,14,13,0.8) 0%, rgba(20,18,16,0.9) 100%)",
                border: "2px solid rgba(201,168,76,0.4)",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
              }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, rgba(201,168,76,0.1) 0%, transparent 70%)",
                opacity: 0,
                pointerEvents: "none",
              }} className="glow" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontWeight: 700, color: "#C9A84C", marginBottom: "8px", fontSize: "18px" }}>{v.title}</div>
                <div style={{ fontSize: "14px", color: "#A0A09A", lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <style>{`
          .value-card:hover .glow { opacity: 1; }
          @media (max-width: 600px) {
            .value-card { padding: 18px 14px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
