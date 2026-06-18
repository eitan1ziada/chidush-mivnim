"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, X } from "lucide-react";
import { TESTIMONIALS } from "@/app/lib/data";

interface UserReview {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [idx, setIdx] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [formData, setFormData] = useState({ name: "", company: "", text: "", rating: 5 });

  // Load reviews from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chidush-reviews");
    if (saved) {
      try {
        setUserReviews(JSON.parse(saved));
      } catch (e) {
        // Error parsing, ignore
      }
    }
  }, []);

  // Combine testimonials with user reviews
  const allReviews = [...TESTIMONIALS, ...userReviews];
  const t = allReviews[idx];

  const prev = () => setIdx((i) => (i - 1 + allReviews.length) % allReviews.length);
  const next = () => setIdx((i) => (i + 1) % allReviews.length);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.text.trim()) {
      const newReview: UserReview = {
        id: Date.now().toString(),
        name: formData.name,
        company: formData.company,
        text: formData.text,
        rating: formData.rating,
      };
      const updated = [...userReviews, newReview];
      setUserReviews(updated);
      localStorage.setItem("chidush-reviews", JSON.stringify(updated));
      setFormData({ name: "", company: "", text: "", rating: 5 });
      setShowReviewForm(false);
    }
  };

  return (
    <section id="testimonials" ref={ref} className="section-pad relative overflow-hidden">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "760px", marginLeft: "auto", marginRight: "auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "56px" }}>
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>מה אומרים עלינו</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF" }}>המלצות לקוחות</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <div style={{ padding: "48px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "80px", fontWeight: 800, lineHeight: 0.8, marginBottom: "24px", opacity: 0.15, color: "#C9A84C" }}>"</div>

            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "24px" }}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={18} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <p style={{ fontSize: "20px", lineHeight: 1.8, marginBottom: "28px", color: "#E2DED9", fontWeight: 300 }}>{t.text}</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "18px", color: "#F5F3EF" }}>{t.name}</div>
                  <div style={{ fontSize: "13px", color: "#C9A84C", marginTop: "4px" }}>{t.company}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "36px" }}>
              <button onClick={prev} style={{ width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#C9A84C", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201,168,76,0.2)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(201,168,76,0.1)"}>
                <ChevronRight size={18} />
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                {allReviews.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} style={{ height: "6px", width: i === idx ? "24px" : "6px", borderRadius: "3px", background: i === idx ? "#C9A84C" : "rgba(201,168,76,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
              <button onClick={next} style={{ width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#C9A84C", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201,168,76,0.2)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(201,168,76,0.1)"}>
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* Review count and write review button */}
            <div style={{ marginTop: "28px", paddingTop: "28px", borderTop: "1px solid rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <p style={{ fontSize: "13px", color: "rgba(245,240,232,0.6)" }}>
                {allReviews.length} ביקורות
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReviewForm(true)}
                style={{
                  padding: "10px 28px",
                  background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.08) 100%)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  borderRadius: "4px",
                  color: "#C9A84C",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.3s",
                }}
              >
                כתוב ביקורת
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewForm(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 40,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: "520px",
                background: "linear-gradient(135deg, rgba(15,14,13,0.95) 0%, rgba(20,18,16,0.98) 100%)",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "8px",
                padding: "40px 32px",
                zIndex: 41,
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#F5F3EF" }}>כתוב ביקורת</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#C9A84C",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Rating */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 600 }}>דירוג</label>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <Star
                          size={28}
                          fill={rating <= formData.rating ? "#C9A84C" : "transparent"}
                          color="#C9A84C"
                          style={{ transition: "all 0.2s" }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>שם</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="שם מלא"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "4px",
                      color: "#F5F3EF",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                </div>

                {/* Company */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>תפקיד / חברה</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="לדוגמה: בעל נכס, תל אביב"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "4px",
                      color: "#F5F3EF",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>הביקורת שלך</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="ספר לנו על חוויתך..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "4px",
                      color: "#F5F3EF",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      outline: "none",
                      transition: "all 0.3s",
                      minHeight: "120px",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
                      border: "none",
                      borderRadius: "4px",
                      color: "#0F0E0D",
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    שלח ביקורת
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "transparent",
                      border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: "4px",
                      color: "#C9A84C",
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    ביטול
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
