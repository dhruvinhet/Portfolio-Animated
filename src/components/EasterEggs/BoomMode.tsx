"use client";

import { useEffect, useState, useRef } from "react";

export default function BoomMode() {
  const [active, setActive] = useState(false);
  const keysPassed = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      keysPassed.current += e.key.toLowerCase();
      if (keysPassed.current.length > 6) {
        keysPassed.current = keysPassed.current.slice(-6);
      }
      
      if (keysPassed.current.includes("/boom")) {
        setActive((prev) => {
          const next = !prev;
          if (next) {
            document.body.classList.add('boom-mode-active');
            alert("⚠️ DESTRUCTIVE MODE ACTIVATED. CLICK ANYTHING TO DESTROY IT.");
          } else {
            document.body.classList.remove('boom-mode-active');
          }
          return next;
        });
        keysPassed.current = ""; 
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!active) return;
    
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      
      const target = e.target as HTMLElement;
      if (target === document.body || target === document.documentElement) return;

      target.classList.add('explode-animation');
      
      // Cleanup DOM node visually after animation
      setTimeout(() => {
        target.style.visibility = 'hidden';
      }, 1000);
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed top-4 left-4 z-[100000] px-4 py-2 bg-orange-900/80 backdrop-blur-md border border-orange-500/50 rounded-lg text-orange-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,165,0,0.4)] pointer-events-none animate-bounce">
      TARGETING SYSTEM: ONLINE
    </div>
  );
}
