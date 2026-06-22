"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { FAQS, COMPANY } from "@/app/lib/data";

type Msg = { from: "bot" | "user"; text: string };

const WELCOME =
  "שלום! 👋 אני העוזר הדיגיטלי של חידוש מבנים. בחרו שאלה מהרשימה ואשמח לעזור.";

export default function FaqBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: WELCOME }]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  // auto-scroll to newest message
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const ask = (i: number) => {
    const faq = FAQS[i];
    setMessages((m) => [...m, { from: "user", text: faq.q }]);
    setAsked((a) => (a.includes(i) ? a : [...a, i]));
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: faq.a }]);
    }, 700);
  };

  const remaining = FAQS.map((_, i) => i).filter((i) => !asked.includes(i));

  return (
    <>
      {/* Launcher button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="שאלות נפוצות"
        style={{
          position: "fixed", bottom: "24px", left: "24px", zIndex: 60,
          width: "60px", height: "60px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
          color: "#0A0908", border: "none", cursor: "pointer",
          boxShadow: "0 8px 28px rgba(201,168,76,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={26} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* notification dot */}
        {!open && (
          <span style={{
            position: "absolute", top: "2px", right: "2px", width: "14px", height: "14px",
            borderRadius: "50%", background: "#E87A7A", border: "2px solid #0A0908",
          }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", bottom: "96px", left: "24px", zIndex: 60,
              width: "min(370px, calc(100vw - 48px))", height: "min(540px, calc(100vh - 140px))",
              display: "flex", flexDirection: "column", direction: "rtl",
              background: "rgba(12,11,10,0.96)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,168,76,0.25)", borderRadius: "16px",
              overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "16px 18px",
              borderBottom: "1px solid rgba(201,168,76,0.18)",
              background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.02))",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, #9A7A2E, #C9A84C)",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20V9.5L12 4l8 5.5V20" stroke="#0A0908" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 20v-6h5v6" stroke="#0A0908" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#F5F3EF" }}>{COMPANY.name}</div>
                <div style={{ fontSize: "11.5px", color: "#9A958C", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5BD08A", display: "inline-block" }} />
                  עוזר וירטואלי · זמין עכשיו
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-start" : "flex-end" }}>
                  <div style={{
                    maxWidth: "82%", padding: "11px 15px", fontSize: "14px", lineHeight: 1.65,
                    borderRadius: m.from === "user" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
                    background: m.from === "user"
                      ? "linear-gradient(135deg, #9A7A2E, #C9A84C)"
                      : "rgba(255,255,255,0.05)",
                    color: m.from === "user" ? "#0A0908" : "#E8E4DC",
                    border: m.from === "user" ? "none" : "1px solid rgba(201,168,76,0.12)",
                    fontWeight: m.from === "user" ? 600 : 400,
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ padding: "13px 16px", borderRadius: "14px 14px 4px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.12)", display: "flex", gap: "4px" }}>
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A84C", display: "inline-block" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(201,168,76,0.15)", maxHeight: "190px", overflowY: "auto" }}>
              {remaining.length > 0 ? (
                <>
                  <div style={{ fontSize: "11px", color: "#8A8680", marginBottom: "9px", letterSpacing: "0.5px" }}>בחרו שאלה:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {remaining.map((i) => (
                      <button
                        key={i}
                        onClick={() => ask(i)}
                        style={{
                          textAlign: "right", padding: "10px 13px", fontSize: "13px",
                          borderRadius: "9px", cursor: "pointer", color: "#E8C97A",
                          background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.15)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.07)"; }}
                      >
                        {FAQS[i].q}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "12px", fontSize: "14px", fontWeight: 700, borderRadius: "9px",
                    textDecoration: "none", color: "#0A0908",
                    background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
                  }}
                >
                  <Send size={15} />
                  יש לכם עוד שאלה? דברו איתנו
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
