"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FLOORS = 6;
const WINDOWS_PER_FLOOR = 4;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0); // 0..FLOORS = floors built, FLOORS+1 = roof, FLOORS+2 = done
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Each floor appears every 280ms
    for (let i = 1; i <= FLOORS; i++) {
      timers.push(setTimeout(() => setStep(i), i * 280));
    }
    // Roof
    timers.push(setTimeout(() => setStep(FLOORS + 1), FLOORS * 280 + 200));
    // Done
    timers.push(
      setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 700);
      }, FLOORS * 280 + 900)
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  // Building dimensions
  const bW = 180; // building width
  const fH = 36;  // floor height
  const bH = FLOORS * fH;
  const svgW = 260;
  const svgH = bH + 80; // +roof+base

  const buildingX = (svgW - bW) / 2;
  const baseY = svgH - 20;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "#0A0908",
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }} />

          {/* Building SVG */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} style={{ overflow: "visible" }}>
              {/* Ground line */}
              <motion.line
                x1={buildingX - 20} y1={baseY} x2={buildingX + bW + 20} y2={baseY}
                stroke="rgba(201,168,76,0.3)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />

              {/* Floors - built bottom up */}
              {Array.from({ length: FLOORS }).map((_, fi) => {
                const floorIndex = FLOORS - 1 - fi; // 0 = top floor, FLOORS-1 = bottom
                const builtOrder = fi + 1; // bottom floor = 1, top = FLOORS
                const visible = step >= builtOrder;
                const y = baseY - (fi + 1) * fH;

                return (
                  <motion.g
                    key={fi}
                    initial={{ opacity: 0, y: 10 }}
                    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {/* Floor rectangle */}
                    <rect
                      x={buildingX} y={y}
                      width={bW} height={fH}
                      fill="rgba(26,25,23,0.9)"
                      stroke="rgba(201,168,76,0.25)"
                      strokeWidth="0.8"
                    />
                    {/* Floor highlight (top edge) */}
                    <line
                      x1={buildingX} y1={y}
                      x2={buildingX + bW} y2={y}
                      stroke="rgba(201,168,76,0.5)"
                      strokeWidth="0.8"
                    />
                    {/* Windows */}
                    {Array.from({ length: WINDOWS_PER_FLOOR }).map((_, wi) => {
                      const wW = 22, wH = 16;
                      const gap = (bW - WINDOWS_PER_FLOOR * wW) / (WINDOWS_PER_FLOOR + 1);
                      const wx = buildingX + gap + wi * (wW + gap);
                      const wy = y + (fH - wH) / 2;
                      const lit = Math.random() > 0.3;
                      return (
                        <motion.rect
                          key={wi}
                          x={wx} y={wy} width={wW} height={wH}
                          rx={1}
                          fill={lit ? "rgba(201,168,76,0.18)" : "rgba(10,9,8,0.8)"}
                          stroke="rgba(201,168,76,0.3)"
                          strokeWidth="0.6"
                          initial={{ opacity: 0 }}
                          animate={visible ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 + wi * 0.04 }}
                        />
                      );
                    })}
                  </motion.g>
                );
              })}

              {/* Roof / triangle */}
              <motion.polygon
                points={`${buildingX},${baseY - FLOORS * fH} ${buildingX + bW / 2},${baseY - FLOORS * fH - 36} ${buildingX + bW},${baseY - FLOORS * fH}`}
                fill="rgba(15,14,13,0.95)"
                stroke="rgba(201,168,76,0.4)"
                strokeWidth="1"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={step >= FLOORS + 1 ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                style={{ transformOrigin: `${svgW / 2}px ${baseY - FLOORS * fH}px` }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Gold star on roof tip */}
              <motion.circle
                cx={svgW / 2} cy={baseY - FLOORS * fH - 40}
                r={3}
                fill="#C9A84C"
                initial={{ opacity: 0, scale: 0 }}
                animate={step >= FLOORS + 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                style={{ transformOrigin: `${svgW / 2}px ${baseY - FLOORS * fH - 40}px` }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Glow under building */}
              <ellipse
                cx={svgW / 2} cy={baseY + 2}
                rx={bW * 0.6} ry={6}
                fill="rgba(201,168,76,0.06)"
              />
            </svg>
          </motion.div>

          {/* Logo text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginTop: "28px", textAlign: "center" }}
          >
            <div style={{
              fontSize: "22px", fontWeight: 800, letterSpacing: "0.05em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              חידוש מבנים
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginTop: "8px", transformOrigin: "center" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ fontSize: "11px", letterSpacing: "4px", color: "#6B6762", marginTop: "8px", textTransform: "uppercase" }}
            >
              בנייה פרימיום
            </motion.p>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", gap: "6px", marginTop: "32px" }}
          >
            {Array.from({ length: FLOORS }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ background: step > i ? "#C9A84C" : "rgba(201,168,76,0.15)" }}
                transition={{ duration: 0.2 }}
                style={{ width: "6px", height: "6px", borderRadius: "50%" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
