"use client";
import { COMPANY } from "@/app/lib/data";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const LINKS = [
  { label: "אודות", href: "#about" },
  { label: "פרויקטים", href: "#portfolio" },
  { label: "תהליך", href: "#process" },
  { label: "המלצות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

const headingStyle: React.CSSProperties = {
  color: "#C9A84C", fontSize: "12px", fontWeight: 700,
  letterSpacing: "3px", textTransform: "uppercase", marginBottom: "22px",
};

// Every row uses this: full width, content pinned to the right edge.
const rowStyle: React.CSSProperties = {
  color: "#A8A39B", fontSize: "14.5px", textDecoration: "none",
  transition: "color 0.2s ease",
  display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px",
};

export default function Footer() {
  return (
    <footer dir="rtl" style={{ background: "#080807", borderTop: "1px solid rgba(201,168,76,0.12)", direction: "rtl" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 32px 0" }}>
        <div
          dir="rtl"
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            paddingBottom: "48px",
          }}
        >
          {/* ── Brand (right) ── */}
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <span style={{
                width: "42px", height: "42px", borderRadius: "10px", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.04))",
                border: "1px solid rgba(201,168,76,0.35)",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20V9.5L12 4l8 5.5V20" stroke="#E8C97A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 20v-6h5v6" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{
                fontSize: "22px", fontWeight: 800, letterSpacing: "0.02em",
                background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {COMPANY.name}
              </span>
            </div>
            <p style={{ color: "#8A857D", fontSize: "14.5px", lineHeight: 1.8, marginBottom: "22px" }}>
              {COMPANY.tagline}
            </p>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-wa"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "8px", fontSize: "13.5px", fontWeight: 600,
                color: "#E8C97A", textDecoration: "none",
                background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.22)",
                transition: "all 0.2s ease",
              }}
            >
              <MessageCircle size={16} />
              שלחו הודעה ב-WhatsApp
            </a>
          </div>

          {/* ── Nav (center) ── */}
          <div style={{ textAlign: "right" }}>
            <p style={headingStyle}>ניווט</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "13px", listStyle: "none", margin: 0, padding: 0 }}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="footer-link" style={{ color: "#A8A39B", fontSize: "14.5px", textDecoration: "none", transition: "color 0.2s ease" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact (left) ── */}
          <div style={{ textAlign: "right" }}>
            <p style={headingStyle}>יצירת קשר</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <a href={`tel:${COMPANY.phone}`} className="footer-link" style={rowStyle}>
                <Phone size={15} color="#C9A84C" style={{ flexShrink: 0 }} />
                <span dir="ltr">{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="footer-link" style={rowStyle}>
                <Mail size={15} color="#C9A84C" style={{ flexShrink: 0 }} />
                <span dir="ltr">{COMPANY.email}</span>
              </a>
              <div style={rowStyle}>
                <MapPin size={15} color="#C9A84C" style={{ flexShrink: 0 }} />
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

        {/* Bottom */}
        <div
          dir="rtl"
          className="footer-bottom"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "16px", padding: "24px 0 28px", flexWrap: "wrap",
          }}
        >
          <p style={{ color: "#5A5650", fontSize: "12.5px" }}>
            © {new Date().getFullYear()} {COMPANY.name}. כל הזכויות שמורות.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#" className="footer-link" style={{ color: "#5A5650", fontSize: "12.5px", textDecoration: "none", transition: "color 0.2s" }}>מדיניות פרטיות</a>
            <a href="#" className="footer-link" style={{ color: "#5A5650", fontSize: "12.5px", textDecoration: "none", transition: "color 0.2s" }}>תנאי שימוש</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #E8C97A !important; }
        .footer-wa:hover { background: rgba(201,168,76,0.16) !important; border-color: rgba(201,168,76,0.4) !important; }
        @media (max-width: 760px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}
