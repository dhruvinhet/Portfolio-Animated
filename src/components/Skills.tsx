"use client";

import { motion } from "framer-motion";
import { Code2, BrainCircuit, Wrench } from "lucide-react";

const SKILLS = [
  {
    category: "Languages & Frameworks",
    icon: Code2,
    items: ["Python", "C++", "SQL", "PyTorch", "TensorFlow", "React", "scikit-learn", "Hugging Face"],
    color: "from-cyan-400 to-blue-600",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50"
  },
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    items: ["RAG", "LLM Fine-Tuning", "Multi-Agent Systems", "YOLOv8 & SAM", "Object Detection", "Image Segmentation", "Deepfake Detection"],
    color: "from-purple-400 to-pink-600",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50"
  },
  {
    category: "Tools & Platforms",
    icon: Wrench,
    items: ["Git", "Docker", "Flask", "Streamlit", "FAISS", "LangChain", "OpenCV", "MediaPipe", "Pandas", "NumPy"],
    color: "from-amber-400 to-orange-600",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500/50"
  }
];

export default function Skills() {
  return (
    <section className="relative z-20 bg-[#050505] py-20 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t items-center border-zinc-900/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm tracking-wide uppercase font-semibold mb-6 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Capabilities
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center">
            Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILLS.map((skillSet, index) => {
            const Icon = skillSet.icon;
            return (
              <motion.div
                key={skillSet.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative group rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-500 ${skillSet.border} hover:shadow-2xl overflow-hidden`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${skillSet.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />

                <div className={`w-14 h-14 rounded-2xl ${skillSet.bg} flex items-center justify-center mb-8 border border-white/5`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${skillSet.color}`}>
                    {skillSet.category.split(' ')[0]}
                  </span>{" "}
                  {skillSet.category.split(' ').slice(1).join(' ')}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {skillSet.items.map((skill, i) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 lg:px-5 lg:py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-300 font-medium text-sm hover:border-zinc-600 hover:text-white transition-all duration-300 cursor-none"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
