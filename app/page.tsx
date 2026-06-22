"use client";
import { useState, useEffect } from "react";
import Preloader from "@/app/components/layout/Preloader";
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
