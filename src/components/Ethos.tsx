"use client";

import { motion } from "framer-motion";

export default function Ethos() {
  return (
    <section className="relative z-20 bg-[#000000] py-32 px-6 md:px-12 lg:px-24 flex items-center justify-center min-h-[50vh] border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-1.5 h-16 bg-gradient-to-b from-transparent via-emerald-500 to-transparent mb-12 opacity-50"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 leading-tight md:leading-tight lg:leading-[1.15] tracking-tight relative z-10 group"
          style={{ textWrap: "balance" } as any}
        >
          "I engineer intelligent systems that bridge the gap between complex data and human intuition."
          
          {/* Secret cheat sheet hover trigger hidden in the large text */}
          <span className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 p-4 bg-zinc-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-lg text-emerald-400 font-mono text-xs shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 delay-1000 z-50 pointer-events-none text-left font-normal" style={{ letterSpacing: "normal" }}>
            <span className="block text-[#fff] font-bold mb-2 uppercase tracking-widest text-[10px] border-b border-zinc-800 pb-1">Hidden System Triggers:</span>
            <span className="block">`~` : Open Terminal</span>
            <span className="block">/boom : Target Mode</span>
            <span className="block">/flip : Inception Mirror</span>
            <span className="block">/rave : Cyberpunk</span>
          </span>
        </motion.p>
        
        <motion.span 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 1 }}
           className="mt-8 text-sm md:text-base text-emerald-500 font-bold uppercase tracking-[0.2em] block relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"
        >
            Hint: Hover over the text above for 1 second.
        </motion.span>
        
        {/* Subtle background glow for typography emphasis */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-emerald-700/5 blur-[120px] rounded-full pointer-events-none" />

      </div>
    </section>
  );
}
