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
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
            מה אומרים עלינו
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
          >
            המלצות לקוחות
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div
            className="rounded p-10 md:p-14 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)" }}
          >
            {/* Quote mark */}
            <div
              className="text-8xl font-bold leading-none mb-6 opacity-20"
              style={{ color: "#C9A84C", fontFamily: "var(--font-manrope)" }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#C9A84C" color="#C9A84C" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light" style={{ color: "#E2DED9" }}>
                  {t.text}
                </p>

                <div>
                  <div className="font-bold text-lg" style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}>
                    {t.name}
                  </div>
                  <div className="text-sm" style={{ color: "#C9A84C" }}>{t.company}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#C9A84C" }}
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="rounded-sm transition-all duration-300"
                    style={{
                      width: i === idx ? "24px" : "6px",
                      height: "6px",
                      background: i === idx ? "#C9A84C" : "rgba(201,168,76,0.2)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#C9A84C" }}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
