"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderAnimation } from "@/app/components/ui/shader-lines";

const VIDEOS = [
  {
    src: "/house-animation.mp4",
    scenes: [
      {
        from: 0, to: 0.22,
        label: "חידוש מבנים · בנייה פרימיום",
        title: "בנייה שמשאירה",
        accent: "רושם לנצח",
        desc: "פרויקטי שיפוץ ובנייה פרימיום · מהתכנון ועד המסירה",
      },
      {
        from: 0.22, to: 0.45,
        label: "עיצוב · Design",
        title: "כל פרט",
        accent: "מתוכנן במדויק",
        desc: "אדריכלות ועיצוב פנים ברמה הגבוהה ביותר",
      },
      {
        from: 0.45, to: 0.68,
        label: "חומרים · Materials",
        title: "רק חומרים",
        accent: "יוקרתיים",
        desc: "קונקרט, זכוכית, עץ טבעי — ללא פשרות",
      },
      {
        from: 0.68, to: 0.88,
        label: "ניסיון · Experience",
        title: "15 שנות",
        accent: "מצוינות",
        desc: "200+ פרויקטים · 100% שביעות רצון לקוחות",
      },
    ],
    projects: [
      { title: "וילה פרטית",    location: "הרצליה פיתוח", area: '450 מ"ר', price: "4.2M ₪" },
      { title: "פנטהאוס יוקרה", location: "תל אביב",       area: '280 מ"ר', price: "6.8M ₪" },
      { title: "בית גינה",      location: "כפר שמריהו",    area: '380 מ"ר', price: "3.5M ₪" },
    ],
  },
];

const SCROLL_MULTIPLIER = 5; // 500vh per video

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [videoIdx, setVideoIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [showCards, setShowCards] = useState(false);

  const video = VIDEOS[videoIdx];
  const scene = video.scenes[sceneIdx];

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = container.offsetHeight - window.innerHeight;
      const sectionProgress = Math.max(0, Math.min(1, scrolled / scrollable));

      setProgress(sectionProgress);

      // Scrub video
      const vid = videosRef.current[0];
      if (vid && vid.duration) {
        vid.currentTime = sectionProgress * vid.duration;
      }

      // Scene index
      const idx = VIDEOS[0].scenes.findIndex(
        (s) => sectionProgress >= s.from && sectionProgress < s.to
      );
      setSceneIdx(idx !== -1 ? idx : VIDEOS[0].scenes.length - 1);
      setShowCards(sectionProgress >= 0.88);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalHeight = `${SCROLL_MULTIPLIER * VIDEOS.length * 100}vh`;

  return (
    <div ref={containerRef} style={{ height: totalHeight, position: "relative" }}>

      {/* ── Background video (fixed) ── */}
      <video
        ref={bgVideoRef}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.85; }}
        onEnded={(e) => {
          const vid = e.target as HTMLVideoElement;
          // Smooth loop: fade out, restart, fade in
          vid.currentTime = 0;
          vid.play();
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.35,
        }}
      >
        <source src="/house-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Video sections ── */}
      {VIDEOS.map((v, idx) => (
        <div
          key={idx}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            visibility: videoIdx === idx ? "visible" : "hidden",
          }}
        >

          {/* Video */}
          <video
            ref={(el) => {
              videosRef.current[idx] = el;
            }}
            muted
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={v.src} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.75) 100%)",
            }}
          />


          {/* ── Text scenes ── */}
          <AnimatePresence mode="wait">
            {videoIdx === idx && !showCards && scene && (
              <motion.div
                key={`${idx}-${sceneIdx}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "0 24px",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "6px",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: "24px",
                  }}
                >
                  {scene.label}
                </p>

                <h2
                  style={{
                    fontWeight: 800,
                    lineHeight: 0.94,
                    marginBottom: "0",
                    fontSize: "clamp(3rem, 8vw, 7.5rem)",
                    color: "#F5F3EF",
                  }}
                >
                  <span style={{ display: "block" }}>{scene.title}</span>
                  <span
                    style={{
                      display: "block",
                      background:
                        "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 50%, #E8C97A 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {scene.accent}
                  </span>
                </h2>

                <div
                  style={{
                    width: "80px",
                    height: "1px",
                    margin: "28px auto",
                    background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                  }}
                />

                <p
                  style={{
                    color: "#A0A09A",
                    fontSize: "16px",
                    fontWeight: 300,
                    maxWidth: "480px",
                  }}
                >
                  {scene.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Project cards ── */}
          <AnimatePresence>
            {videoIdx === idx && showCards && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                  pointerEvents: "none",
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "6px",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: "40px",
                  }}
                >
                  פרויקטים נבחרים
                </motion.p>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {v.projects.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.15 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        background: "rgba(10,9,8,0.55)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: "4px",
                        padding: "28px 32px",
                        textAlign: "center",
                        minWidth: "190px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#C9A84C",
                          letterSpacing: "3px",
                          textTransform: "uppercase",
                          marginBottom: "10px",
                        }}
                      >
                        {p.location}
                      </div>
                      <div
                        style={{
                          fontSize: "19px",
                          fontWeight: 700,
                          color: "#F5F3EF",
                          marginBottom: "6px",
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#5A5753",
                          marginBottom: "18px",
                        }}
                      >
                        {p.area}
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 800,
                          background:
                            "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {p.price}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    marginTop: "40px",
                    padding: "14px 44px",
                    background: "none",
                    cursor: "pointer",
                    borderRadius: "2px",
                    border: "1px solid rgba(201,168,76,0.45)",
                    color: "#C9A84C",
                    fontSize: "12px",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    transition: "all 0.3s",
                    pointerEvents: "auto",
                  }}
                >
                  בואו נדבר
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Progress bar ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "rgba(255,255,255,0.08)",
              zIndex: 20,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                background:
                  "linear-gradient(90deg, #9A7A2E, #C9A84C, #E8C97A)",
                transition: "width 0.05s linear",
              }}
            />
          </div>

          {/* ── Scroll hint ── */}
          <AnimatePresence>
            {videoIdx === idx && progress < 0.04 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  bottom: "36px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "4px",
                    color: "#3A3835",
                    textTransform: "uppercase",
                  }}
                >
                  גלול
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: "1px",
                    height: "36px",
                    background:
                      "linear-gradient(to bottom, transparent, #C9A84C)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ))}
    </div>
  );
}
