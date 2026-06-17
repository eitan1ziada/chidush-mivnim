"use client";
import { useState, useEffect, useRef } from "react";
import Preloader from "@/app/components/layout/Preloader";
import Cursor from "@/app/components/layout/Cursor";
import ScrollProgress from "@/app/components/layout/ScrollProgress";
import Navbar from "@/app/components/layout/Navbar";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Owner from "@/app/components/sections/Owner";
import WhyUs from "@/app/components/sections/WhyUs";
import Portfolio from "@/app/components/sections/Portfolio";
import Process from "@/app/components/sections/Process";
import Testimonials from "@/app/components/sections/Testimonials";
import FAQ from "@/app/components/sections/FAQ";
import Contact from "@/app/components/sections/Contact";
import Footer from "@/app/components/layout/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const video = videoRef.current;
    if (!video) return;

    let forward = true;
    let lastTs: number | null = null;
    let rafId: number;

    const tick = (ts: number) => {
      if (!video.duration) { rafId = requestAnimationFrame(tick); return; }
      if (lastTs === null) { lastTs = ts; rafId = requestAnimationFrame(tick); return; }

      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (forward) {
        video.currentTime = Math.min(video.duration, video.currentTime + dt);
        if (video.currentTime >= video.duration) forward = false;
      } else {
        video.currentTime = Math.max(0, video.currentTime - dt);
        if (video.currentTime <= 0) forward = true;
      }

      rafId = requestAnimationFrame(tick);
    };

    video.pause();
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [loaded]);


  useEffect(() => {
    if (!loaded) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (time: number) => {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    });
    return () => { lenis?.destroy(); };
  }, [loaded]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            style={{
              position: "fixed", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", zIndex: -1, opacity: 0.25,
            }}
          >
            <source src="/house-animation.mp4" type="video/mp4" />
          </video>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Owner />
            <WhyUs />
            <Portfolio />
            <Process />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
