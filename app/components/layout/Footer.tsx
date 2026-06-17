"use client";
import { COMPANY } from "@/app/lib/data";

const LINKS = [
  { label: "אודות", href: "#about" },
  { label: "פרויקטים", href: "#portfolio" },
  { label: "תהליך", href: "#process" },
  { label: "המלצות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#080807", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-manrope)",
                background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {COMPANY.name}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6762" }}>
              {COMPANY.tagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>ניווט</p>
            <ul className="flex flex-col gap-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: "#6B6762" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>יצירת קשר</p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "#6B6762" }}>
              <a href={`tel:${COMPANY.phone}`} className="hover:text-[#C9A84C] transition-colors">{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-[#C9A84C] transition-colors">{COMPANY.email}</a>
              <span>{COMPANY.address}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "rgba(201,168,76,0.08)" }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#3A3835" }}>
            © {new Date().getFullYear()} {COMPANY.name}. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs hover:text-[#C9A84C] transition-colors" style={{ color: "#3A3835" }}>
              מדיניות פרטיות
            </a>
            <a href="#" className="text-xs hover:text-[#C9A84C] transition-colors" style={{ color: "#3A3835" }}>
              תנאי שימוש
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
