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

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
            איך אנחנו עובדים
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
          >
            תהליך העבודה שלנו
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute right-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)" }}
          />

          <div className="flex flex-col gap-8 md:gap-0">
            {PROCESS_STEPS.map((step, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative md:grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-8 ${
                    isRight ? "" : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                  }`}
                >
                  {/* Content */}
                  <div className={`p-7 rounded ${isRight ? "md:text-right" : ""}`}
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)" }}>
                    <div
                      className="text-5xl font-bold mb-3 opacity-30"
                      style={{ fontFamily: "var(--font-manrope)", color: "#C9A84C" }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "#6B6762" }}>{step.desc}</p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute right-1/2 translate-x-1/2 w-4 h-4 rounded-sm items-center justify-center"
                    style={{ background: "#C9A84C", boxShadow: "0 0 20px rgba(201,168,76,0.4)" }}>
                    <div className="w-2 h-2 rounded-sm" style={{ background: "#080807" }} />
                  </div>

                  {/* Empty side */}
                  <div />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
