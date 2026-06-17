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
      <div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-sm blur-3xl opacity-8 pointer-events-none"
        style={{ background: "#C9A84C" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
            למה אנחנו
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
          >
            מה מייחד אותנו
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-7 rounded cursor-default transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)",
                    border: "1px solid rgba(201,168,76,0.18)",
                  }}
                />

                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(201,168,76,0.1)" }}
                >
                  {Icon && <Icon size={22} color="#C9A84C" />}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6762" }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
