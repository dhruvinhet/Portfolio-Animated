"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

export default function Education() {
  return (
    <section className="relative z-20 bg-[#000000] py-20 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Education Column */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Education
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative p-8 md:p-10 rounded-[2rem] bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-xl group hover:border-zinc-700/80 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:rotate-12 transform origin-center">
              <GraduationCap className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-sm font-semibold mb-6">
                Aug 2023 &ndash; Present
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
                B.Tech in Computer Science <br/><span className="text-zinc-500">(AI & Data Science)</span>
              </h3>
              <p className="text-xl text-zinc-400 font-medium mb-8">
                MIT World Peace University • Pune
              </p>
              
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-200 font-medium">CGPA: 8.40/10</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Column */}
        <div className="flex-1 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Honors & Activities
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              "Smart India Hackathon 2025 — Grand Finalist",
              "MumbaiHacks Agentic AI Hackathon 2025 — Grand Finalist (Top 25)",
              "Completed AI/ML for Geodata Analysis — ISRO (IIRS, Dehradun)",
              "Attended Winter Consulting Program 2024, IIT Guwahati",
              "Volunteered at RIDE'23, MIT World Peace University"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex items-center gap-5 p-5 bg-zinc-900/20 border border-zinc-800/80 rounded-2xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-zinc-300 font-medium text-sm md:text-base group-hover:text-white transition-colors">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
