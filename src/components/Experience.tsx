"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays, Zap } from "lucide-react";

const EXPERIENCES = [
  {
    id: 1,
    role: "AI Engineer Intern",
    company: "Alchemyte Data Solutions LLP",
    location: "On-Site",
    period: "Jun 2025 - Jul 2025",
    description: [
      "Designed and implemented a Retrieval-Augmented Generation (RAG) pipeline using vector databases FAISS and transformer-based LLMs for enterprise document search and question answering.",
      "Optimized retrieval and response generation latency from 1.8s to 1.1s through improved chunking and indexing strategies.",
      "Deployed the entire RAG pipeline as a Dockerized REST API for seamless integration."
    ],
    color: "from-emerald-400 to-cyan-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    id: 2,
    role: "AI/ML Engineer Intern",
    company: "Ahir Infotech",
    location: "Remote",
    period: "Apr 2025 - Jun 2025",
    description: [
      "Built and trained a disease prediction model using symptom datasets, implementing data preprocessing, feature encoding, and supervised learning pipelines.",
      "Fine-tuned a Gradient Boosting model through hyperparameter optimization, improving F1-score from 0.71 to 0.83 on a held-out validation set."
    ],
    color: "from-blue-500 to-indigo-500",
    shadow: "shadow-indigo-500/20"
  }
];

export default function Experience() {
  return (
    <section className="relative z-20 bg-[#000000] py-20 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
           whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="mb-12 md:mb-16 flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/30 text-zinc-300 text-sm tracking-wide uppercase font-semibold mb-6 backdrop-blur-md">
            Journey So Far
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-tighter text-center">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-12 relative">
          {/* Timeline Line */}
          <div className="absolute left-[28px] md:left-[228px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative pl-20 md:pl-0 group"
            >
              <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16 items-start">
                
                {/* Desktop Date */}
                <div className="hidden md:flex flex-col items-end pt-5 text-zinc-500 font-medium text-sm pr-12 group-hover:text-zinc-300 transition-colors duration-300 relative">
                  {/* Timeline Dot (Desktop) */}
                  <div className={`absolute right-[-33px] top-6 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-transparent group-hover:bg-gradient-to-br transition-all duration-500 z-10 ${exp.color} group-hover:scale-125`} />
                  
                  <span className="flex items-center gap-2 mb-1">
                    <CalendarDays className="w-4 h-4" />
                    {exp.period.split('-')[0].trim()}
                  </span>
                  <span>to {exp.period.split('-')[1]?.trim()}</span>
                </div>

                {/* Mobile Date & Dot */}
                <div className="md:hidden absolute left-[21px] top-6 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700 z-10 group-hover:border-transparent group-hover:bg-gradient-to-br transition-all duration-500 ${exp.color} group-hover:scale-125" />
                <div className="md:hidden mb-4 inline-flex items-center gap-2 text-zinc-400 text-sm font-medium bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800">
                  <CalendarDays className="w-4 h-4" />
                  {exp.period}
                </div>

                {/* Content Card */}
                <div className="relative p-8 md:p-10 rounded-[2rem] bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-800/40 hover:border-zinc-700/50 transition-all duration-500 overflow-hidden group/card shadow-2xl">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ maskImage: "linear-gradient(#fff, #fff)", maskComposite: "exclude" }} />
                  
                  <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${exp.color} rounded-full blur-[100px] opacity-10 group-hover/card:opacity-20 transition-opacity duration-700 pointer-events-none`} />

                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-zinc-400 transition-all duration-300">
                    {exp.role}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold mb-8">
                    <span className="flex items-center gap-1.5 text-zinc-200 bg-zinc-800/80 border border-zinc-700 px-4 py-2 rounded-full">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-400 bg-zinc-800/40 border border-zinc-800 px-4 py-2 rounded-full">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-zinc-400 leading-relaxed text-sm md:text-base flex items-start">
                        <Zap className={`w-5 h-5 mr-4 mt-0.5 flex-shrink-0 opacity-50 text-white group-hover/card:text-cyan-400 group-hover/card:opacity-100 transition-all duration-300`} />
                        <span className="group-hover/card:text-zinc-300 transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
