"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Send } from "lucide-react";
import { COMPANY } from "@/app/lib/data";

const schema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת מייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון לא תקין"),
  subject: z.string().min(2, "נושא חייב להכיל לפחות 2 תווים"),
  message: z.string().min(10, "הודעה חייבת להכיל לפחות 10 תווים"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "4px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F3EF",
    fontSize: "15px",
    outline: "none",
    textAlign: "right" as const,
  };

  return (
    <section id="contact" ref={ref} className="section-pad relative overflow-hidden">
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "56px" }}
        >
          <p style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>
            דברו איתנו
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F5F3EF", marginBottom: "16px" }}>
            בואו נתחיל לעבוד
          </h2>
          <p style={{ color: "#B8B4AE", fontSize: "17px", lineHeight: 1.8 }}>
            מוכנים להפוך את החלום למציאות? צרו קשר ואנו נחזור אליכם תוך 24 שעות.
          </p>
        </motion.div>

        {/* Contact info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "48px", flexWrap: "wrap" }}
        >
          {[
            { icon: Phone, label: COMPANY.phone, href: `tel:${COMPANY.phone}` },
            { icon: Mail, label: COMPANY.email, href: `mailto:${COMPANY.email}` },
            { icon: MapPin, label: COMPANY.address, href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#B8B4AE", textDecoration: "none", fontSize: "14px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.1)", flexShrink: 0 }}>
                <Icon size={16} color="#C9A84C" />
              </div>
              {label}
            </a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ padding: "60px 40px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", textAlign: "center" }}
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <CheckCircle size={64} color="#C9A84C" />
                </motion.div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#F5F3EF", marginBottom: "8px" }}>ההודעה נשלחה!</h3>
                <p style={{ color: "#B8B4AE" }}>ניצור איתכם קשר תוך 24 שעות.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <input {...register("name")} placeholder="שם מלא *" style={inputStyle} />
                    {errors.name && <p style={{ color: "#E87A7A", fontSize: "12px", marginTop: "4px" }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register("phone")} placeholder="טלפון *" style={inputStyle} />
                    {errors.phone && <p style={{ color: "#E87A7A", fontSize: "12px", marginTop: "4px" }}>{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <input {...register("email")} placeholder="כתובת מייל *" style={inputStyle} />
                  {errors.email && <p style={{ color: "#E87A7A", fontSize: "12px", marginTop: "4px" }}>{errors.email.message}</p>}
                </div>
                <div>
                  <input {...register("subject")} placeholder="נושא הפנייה *" style={inputStyle} />
                  {errors.subject && <p style={{ color: "#E87A7A", fontSize: "12px", marginTop: "4px" }}>{errors.subject.message}</p>}
                </div>
                <div>
                  <textarea {...register("message")} placeholder="ספרו לנו על הפרויקט שלכם *" rows={5} style={{ ...inputStyle, resize: "none" }} />
                  {errors.message && <p style={{ color: "#E87A7A", fontSize: "12px", marginTop: "4px" }}>{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    padding: "16px", borderRadius: "4px", fontWeight: 700, fontSize: "16px",
                    background: "linear-gradient(135deg, #9A7A2E, #C9A84C)", color: "#080807",
                    border: "none", cursor: "pointer", opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <div style={{ width: "20px", height: "20px", border: "2px solid rgba(8,8,7,0.3)", borderTopColor: "#080807", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  ) : (
                    <><Send size={18} />שלחו הודעה</>
                  )}
                </button>

                {/* Social links */}
                <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "8px" }}>
                  {[
                    { label: "WhatsApp", href: `https://wa.me/${COMPANY.whatsapp}`, icon: MessageCircle },
                  ].map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 20px", borderRadius: "4px", fontSize: "14px",
                        background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)",
                        color: "#C9A84C", textDecoration: "none",
                      }}
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  ))}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
