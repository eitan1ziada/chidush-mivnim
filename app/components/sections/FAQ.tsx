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
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
            שאלות נפוצות
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
          >
            יש לכם שאלות?
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded overflow-hidden"
              style={{ border: "1px solid rgba(201,168,76,0.12)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-right transition-all duration-300"
                style={{
                  background: open === i ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)",
                  color: "#F5F3EF",
                }}
              >
                <span className="font-semibold text-base text-right flex-1">{faq.q}</span>
                <div
                  className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: open === i ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.04)",
                    color: "#C9A84C",
                  }}
                >
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6" style={{ color: "#B8B4AE" }}>
                      <div className="h-px mb-4" style={{ background: "rgba(201,168,76,0.1)" }} />
                      <p className="leading-relaxed">{faq.a}</p>
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
