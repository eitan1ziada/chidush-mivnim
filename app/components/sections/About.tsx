"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VALUES = [
  { title: "איכות", desc: "לא מתפשרים על שום פרט." },
  { title: "אמינות", desc: "מה שמבטיחים — מקיימים." },
  { title: "חדשנות", desc: "תמיד עם הטכנולוגיה הכי מתקדמת." },
  { title: "שקיפות", desc: "תקשורת פתוחה בכל שלב." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden">
      {/* Background element */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-sm blur-3xl opacity-10 pointer-events-none"
        style={{ background: "#C9A84C" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
                מי אנחנו
              </p>
              <h2
                className="text-5xl md:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
              >
                מעל 15 שנה של
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  מצוינות בבנייה
                </span>
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#B8B4AE" }}>
                חידוש מבנים היא חברת בנייה ושיפוץ פרימיום המובילה בישראל.
                אנו מאמינים שכל מבנה הוא יצירת אמנות — ומחויבים להוציא לפועל
                את החזון שלכם בדיוק כפי שדמיינתם אותו.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6B6762" }}>
                מהתכנון הראשוני ועד למסירת המפתח, אנו מלווים אתכם בכל שלב עם צוות
                מקצועי, חומרים מהמובחרים ותשומת לב לכל פרט.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4 mt-10"
            >
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="p-4 rounded transition-all duration-300 hover:border-[#C9A84C]/30"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <div className="font-bold mb-1" style={{ color: "#C9A84C", fontFamily: "var(--font-manrope)" }}>
                    {v.title}
                  </div>
                  <div className="text-sm" style={{ color: "#6B6762" }}>{v.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="relative rounded overflow-hidden aspect-[4/5]"
              style={{ background: "linear-gradient(135deg, #1A1917 0%, #0F0E0D 100%)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                <div
                  className="text-8xl font-bold"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    background: "linear-gradient(135deg, #9A7A2E, #C9A84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  15+
                </div>
                <div className="text-2xl font-light text-center" style={{ color: "#F5F3EF" }}>
                  שנות ניסיון
                  <br />
                  בבנייה ושיפוץ
                </div>
                <div
                  className="h-px w-24"
                  style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
                />
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: "#C9A84C", fontFamily: "var(--font-manrope)" }}>200+</div>
                    <div className="text-xs" style={{ color: "#6B6762" }}>פרויקטים</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold" style={{ color: "#C9A84C", fontFamily: "var(--font-manrope)" }}>180+</div>
                    <div className="text-xs" style={{ color: "#6B6762" }}>לקוחות</div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
