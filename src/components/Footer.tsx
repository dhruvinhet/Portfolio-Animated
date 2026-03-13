"use client";

import { motion } from "framer-motion";
import { Copy, ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";
import Magnetic from "./Magnetic";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("dhruvin5134@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#020202] min-h-[80vh] flex flex-col items-center justify-between pb-12 pt-32 px-6 border-t border-zinc-900/50 overflow-hidden z-20" id="contact">
      {/* Background desaturated glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[50vh] bg-zinc-600/10 blur-[150px] pointer-events-none rounded-t-[100%]" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center flex-1 justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            What's Next?
          </div>
          <h2 className="text-[12vw] md:text-[8rem] font-black text-white tracking-tighter leading-none mb-12 uppercase drop-shadow-2xl flex flex-col">
            <span>LET'S</span> <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-300 to-zinc-700">BUILD</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 w-full">
            <Magnetic>
              <button 
                onClick={copyEmail}
                className="group relative flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-white text-black font-black text-lg hover:bg-zinc-200 transition-colors duration-300 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 bg-zinc-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" style={{ transform: copied ? 'translateY(0)' : 'translateY(100%)' }} />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300" style={{ color: copied ? 'white' : 'black' }}>
                  {copied ? "Copied to Clipboard!" : "dhruvin5134@gmail.com"}
                  <Copy className="w-5 h-5" />
                </span>
              </button>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="/resume/Dhruvin_Patel.pdf"
                download="Dhruvin_Patel_CV.pdf"
                className="group relative flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-zinc-900 border border-zinc-700 text-white font-black text-lg hover:bg-zinc-800 transition-colors duration-300 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Download Résumé
                  <Download className="w-5 h-5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-24 z-10 text-zinc-500 font-medium border-t border-zinc-900 pt-8 pb-16 gap-6 mb-8">
        <p className="tracking-wide text-sm text-zinc-500 hover:text-white transition-colors">
          © {new Date().getFullYear()} Dhruvinkumar Patel. All rights reserved.
        </p>
        
        <div className="flex items-center gap-8">
          <Magnetic>
            <a href="https://github.com/dhruvinhet" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer uppercase tracking-widest text-xs font-bold">
              Github <ArrowUpRight className="w-4 h-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://linkedin.com/in/dhruvinkumarpatel" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer uppercase tracking-widest text-xs font-bold">
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
