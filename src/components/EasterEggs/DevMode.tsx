"use client";

import { useEffect, useState, useRef } from "react";

export default function DevMode() {
  const [active, setActive] = useState(false);
  const keysPassed = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      keysPassed.current += e.key.toLowerCase();
      if (keysPassed.current.length > 5) {
        keysPassed.current = keysPassed.current.slice(-5);
      }
      
      if (keysPassed.current.includes("/dev")) {
        setActive((prev) => {
          const next = !prev;
          if (next) {
            document.body.classList.add('dev-mode-active');
          } else {
            document.body.classList.remove('dev-mode-active');
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100000] px-4 py-2 bg-black/80 backdrop-blur-md border border-emerald-500/50 rounded-lg text-emerald-500 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)] pointer-events-none">
      Developer X-Ray Mode: ON
    </div>
  );
}
