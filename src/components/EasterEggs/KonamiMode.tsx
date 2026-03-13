"use client";

import { useEffect, useState, useRef } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", 
  "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", 
  "ArrowLeft", "ArrowRight", 
  "b", "a"
];

export default function KonamiMode() {
  const [active, setActive] = useState(false);
  const keySequence = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key;
      keySequence.current.push(key);
      
      // Keep only the last N keys
      if (keySequence.current.length > KONAMI_CODE.length) {
        keySequence.current.shift();
      }

      // Check match
      const isMatch = keySequence.current.every((val, index) => val.toLowerCase() === KONAMI_CODE[index].toLowerCase());
      
      if (isMatch) {
        setActive((prev) => {
          const next = !prev;
          if (next) {
            document.body.classList.add('crt-mode-active');
          } else {
            document.body.classList.remove('crt-mode-active');
          }
          return next;
        });
        keySequence.current = [];
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed top-4 right-4 z-[100000] px-4 py-2 bg-red-900/80 backdrop-blur-md border border-red-500/50 rounded-lg text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.2)] pointer-events-none animate-pulse">
      ARCADE CRT: INITIALIZED
    </div>
  );
}
