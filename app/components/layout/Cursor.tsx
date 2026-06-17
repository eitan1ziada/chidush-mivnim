"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      ringX = lerp(ringX, dotX, 0.1);
      ringY = lerp(ringY, dotY, 0.1);

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "60px";
        ringRef.current.style.height = "60px";
        ringRef.current.style.opacity = "0.3";
      }
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.opacity = "0.6";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ position: "fixed", top: 0, left: 0, width: 6, height: 6,
          background: "#C9A84C", borderRadius: "50%", pointerEvents: "none",
          zIndex: 9999, transform: "translate(-50%,-50%)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36,
          border: "1.5px solid rgba(201,168,76,0.5)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)",
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
          opacity: 0.6 }}
      />
    </>
  );
}
