"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none"
      style={{ background: "#1A1917" }}>
      <div
        ref={barRef}
        className="h-full w-0"
        style={{ background: "linear-gradient(90deg, #9A7A2E, #C9A84C, #E8C97A)",
          transition: "width 0.1s linear" }}
      />
    </div>
  );
}
