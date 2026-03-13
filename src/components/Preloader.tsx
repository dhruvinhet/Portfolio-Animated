"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 60; // Assuming 60 frames for ScrollyCanvas

export default function Preloader() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const imagesToLoad: HTMLImageElement[] = [];

    const handleLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
      if (loadedCount >= FRAME_COUNT) {
        setTimeout(() => setLoadingComplete(true), 600);
      }
    };

    // If there is no window, don't run
    if (typeof window === "undefined") return;

    // Block scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Start loading images into cache
    for (let i = 0; i < FRAME_COUNT; i++) {
        const frameIndex = i.toString().padStart(2, "0");
        const img = new Image();
        img.src = `/sequence/frame_${frameIndex}_delay-0.066s.png`;
        img.onload = handleLoad;
        img.onerror = handleLoad; // Count it anyway so we don't stall forever
        imagesToLoad.push(img);
    }
    
    // Fallback: If progress is stuck for 3+ sec, forcefully unmount to save user experience
    const timeoutForce = setTimeout(() => {
        setLoadingComplete(true);
    }, 4000);

    return () => {
        document.body.style.overflow = "auto";
        clearTimeout(timeoutForce);
    };
  }, []);

  return (
    <AnimatePresence>
      {!loadingComplete && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 animate-pulse">
              Initializing Environment
            </h1>
            <div className="text-[15vw] md:text-[10rem] font-black tracking-tighter text-white leading-none tabular-nums">
              {progress}<span className="text-zinc-700 text-[8vw] md:text-[6rem]">%</span>
            </div>
            
            {/* Visual loader bar */}
            <div className="w-64 md:w-96 h-1 bg-zinc-900 mt-10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </div>
          </div>
          
          <div className="absolute bottom-12 text-zinc-600 text-[10px] tracking-widest uppercase font-bold">
            Dhruvinkumar Patel © {new Date().getFullYear()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
