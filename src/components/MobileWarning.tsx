"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X } from "lucide-react";

export default function MobileWarning() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is mobile (width < 768px)
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsVisible(true);
      }
    };
    
    // 3.5s delay so it appears smoothly after the Preloader sequence finishes
    const timer = setTimeout(checkMobile, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-24 left-4 right-4 z-[100000] p-4 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl flex items-start gap-4 md:hidden"
        >
          <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-400 mt-0.5 flex-shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-white font-bold text-sm tracking-wide mb-1 uppercase">Desktop Recommended</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Open this portfolio on a desktop device for the best visual experience and to unlock interactive hidden features.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1.5 text-zinc-500 hover:text-white bg-zinc-800 rounded-full transition-colors flex-shrink-0"
            aria-label="Dismiss warning"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
