"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -150]);

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [100, -100]);

  // Section 3: 55% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [100, -100]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-2xl uppercase">
          Dhruvinkumar Patel
        </h1>
        <p className="mt-4 text-xl md:text-3xl text-zinc-300 font-medium tracking-wide">
          AI Engineer.
        </p>
      </motion.div>

      {/* Scroll Indicator for Section 1 */}
      <motion.div
        style={{ opacity: opacity1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.3em]">
          Scroll to Explore
        </span>
        <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-zinc-600 rounded-full flex justify-center pt-1.5"
        >
            <div className="w-1 h-1.5 bg-zinc-400 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight drop-shadow-xl">
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">scalable ML systems</span> that drive real impact.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white max-w-xl leading-tight drop-shadow-xl mb-6">
          Specializing in Computer Vision, GenAI, and RAG architectures.
        </h2>
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="h-[1px] w-32 bg-zinc-300"
        />
      </motion.div>
    </div>
  );
}
