"use client";

import { useEffect, useState, useRef } from "react";

export default function RaveMode() {
  const [active, setActive] = useState(false);
  const keysPassed = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      keysPassed.current += e.key.toLowerCase();
      if (keysPassed.current.length > 5) {
        keysPassed.current = keysPassed.current.slice(-5);
      }
      
      if (keysPassed.current.includes("/rave")) {
        setActive((prev) => {
          const next = !prev;
          if (next) {
            document.body.classList.add('rave-mode-active');
          } else {
            document.body.classList.remove('rave-mode-active');
          }
          return next;
        });
        keysPassed.current = ""; 
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100000] px-10 py-5 bg-pink-600 border border-yellow-300 rounded-full text-white font-black text-4xl uppercase tracking-tighter shadow-[0_0_100px_rgba(236,72,153,1)] pointer-events-none mix-blend-difference" style={{ animation: "heartbeat 0.5s infinite" }}>
      CYBERPUNK RAVE
    </div>
  );
}
