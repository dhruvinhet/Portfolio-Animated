"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Matrix() {
  const [active, setActive] = useState(false);
  const keysPassed = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keys when typing in an input
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'input') return;

      keysPassed.current += e.key.toLowerCase();
      if (keysPassed.current.length > 5) {
        keysPassed.current = keysPassed.current.slice(-5);
      }
      
      // Look for "/ai" trigger to toggle the easter egg
      if (keysPassed.current.includes("/ai")) {
        setActive((prev) => !prev);
        keysPassed.current = ""; 
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5 }}
           className="fixed inset-0 z-[9998] pointer-events-none mix-blend-screen opacity-20"
        >
          <MatrixCanvas />
          
          <div className="absolute bottom-10 right-10 z-[9999] px-4 py-2 bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-lg text-emerald-500 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Network breach / Neural uplink established
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const MatrixCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nums = "0123456789";
        const charset = latin + nums + "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            // Paint black with trailing opacity effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = charset.charAt(Math.floor(Math.random() * charset.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Fill drops array if it expanded
            const newCols = canvas.width / fontSize;
            while(drops.length < newCols) { drops.push(0); }
        };
        window.addEventListener("resize", handleResize);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
}
