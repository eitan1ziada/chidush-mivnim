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

  const inputCls = "w-full px-5 py-3.5 rounded text-right outline-none transition-all duration-300 text-sm placeholder:text-[#3A3835] focus:border-[#C9A84C]/50";
  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "#F5F3EF",
  };

  return (
    <section id="contact" ref={ref} className="section-pad relative overflow-hidden">
      <div
        className="absolute -left-40 bottom-0 w-80 h-80 rounded-sm blur-3xl opacity-10 pointer-events-none"
        style={{ background: "#C9A84C" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: "#C9A84C" }}>
            דברו איתנו
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}
          >
            בואו נתחיל לעבוד
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#B8B4AE" }}>
              מוכנים להפוך את החלום למציאות? צרו קשר ואנו נחזור אליכם תוך 24 שעות עם הצעה מקצועית.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: Phone, label: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: Mail, label: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: MapPin, label: COMPANY.address, href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)" }}
                  >
                    <Icon size={18} color="#C9A84C" />
                  </div>
                  <span className="transition-colors duration-200 group-hover:text-[#C9A84C]" style={{ color: "#B8B4AE" }}>
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {[
                { label: "WhatsApp", href: `https://wa.me/${COMPANY.whatsapp}`, icon: MessageCircle },
                { label: "Instagram", href: COMPANY.instagram, icon: null },
                { label: "LinkedIn", href: COMPANY.linkedin, icon: null },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(201,168,76,0.07)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    color: "#C9A84C",
                  }}
                >
                  {Icon && <Icon size={14} />}
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center gap-5 py-16 rounded text-center"
                  style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  >
                    <CheckCircle size={64} color="#C9A84C" />
                  </motion.div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-manrope)", color: "#F5F3EF" }}>
                    ההודעה נשלחה!
                  </h3>
                  <p style={{ color: "#B8B4AE" }}>ניצור איתכם קשר תוך 24 שעות.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("name")}
                        placeholder="שם מלא *"
                        className={inputCls}
                        style={inputStyle}
                      />
                      {errors.name && <p className="text-xs mt-1 pr-1" style={{ color: "#E87A7A" }}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("phone")}
                        placeholder="טלפון *"
                        className={inputCls}
                        style={inputStyle}
                      />
                      {errors.phone && <p className="text-xs mt-1 pr-1" style={{ color: "#E87A7A" }}>{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="כתובת מייל *"
                      className={inputCls}
                      style={inputStyle}
                    />
                    {errors.email && <p className="text-xs mt-1 pr-1" style={{ color: "#E87A7A" }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("subject")}
                      placeholder="נושא הפנייה *"
                      className={inputCls}
                      style={inputStyle}
                    />
                    {errors.subject && <p className="text-xs mt-1 pr-1" style={{ color: "#E87A7A" }}>{errors.subject.message}</p>}
                  </div>
                  <div>
                    <textarea
                      {...register("message")}
                      placeholder="ספרו לנו על הפרויקט שלכם *"
                      rows={5}
                      className={inputCls + " resize-none"}
                      style={inputStyle}
                    />
                    {errors.message && <p className="text-xs mt-1 pr-1" style={{ color: "#E87A7A" }}>{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-4 rounded font-semibold transition-all duration-300 hover:scale-[1.02] hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #9A7A2E, #C9A84C)", color: "#080807" }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#080807]/30 border-t-[#080807] rounded-sm animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        שלחו הודעה
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
