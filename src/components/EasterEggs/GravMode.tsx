"use client";

import { useEffect, useState, useRef } from "react";

export default function GravMode() {
  const [active, setActive] = useState(false);
  const keysPassed = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      keysPassed.current += e.key.toLowerCase();
      if (keysPassed.current.length > 5) {
        keysPassed.current = keysPassed.current.slice(-5);
      }
      
      if (keysPassed.current.includes("/grav")) {
        setActive((prev) => {
          const next = !prev;
          if (next) {
            document.body.classList.add('grav-mode-active');
          } else {
            document.body.classList.remove('grav-mode-active');
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
    <div className="fixed top-4 left-4 z-[100000] px-4 py-2 bg-blue-900/80 backdrop-blur-md border border-blue-500/50 rounded-lg text-blue-300 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.4)] pointer-events-none animate-pulse">
      ZERO GRAVITY: ENGAGED
    </div>
  );
}
