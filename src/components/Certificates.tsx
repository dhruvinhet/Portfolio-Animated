"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

const CERTIFICATES = [
  {
    id: 1,
    title: "CS50 Introduction to Programming with Python",
    issuer: "Harvard University (edX)",
    image: "/certificate/CS50P.jpeg",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    title: "Data Analytics and Visualization Job Simulation",
    issuer: "Accenture (Forage)",
    image: "/certificate/Data Analytics and Visulization Job Simulation.jpeg",
    color: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    title: "Data Visualization: Empowering Business with Effective Insights",
    issuer: "Tata Virtual Experience Program",
    image: "/certificate/Data Visulization TATA.jpeg",
    color: "from-emerald-600 to-teal-500",
  },
  {
    id: 4,
    title: "Technology Simulation Experience",
    issuer: "Hewlett Packard Enterprise",
    image: "/certificate/TSA.jpeg",
    color: "from-amber-600 to-orange-500",
  },
  {
    id: 5,
    title: "Internship Letter",
    issuer: "Alchemyte Data Solutions LLP",
    image: "/certificate/Dhruvin_Internship_Letter.jpeg",
    color: "from-red-600 to-rose-500",
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[0] | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

  const openModal = (cert: typeof CERTIFICATES[0]) => setSelectedCert(cert);
  const closeModal = () => setSelectedCert(null);

  const handleNextModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCert) {
      const currentIdx = CERTIFICATES.findIndex((c) => c.id === selectedCert.id);
      const nextIdx = currentIdx === CERTIFICATES.length - 1 ? 0 : currentIdx + 1;
      setSelectedCert(CERTIFICATES[nextIdx]);
    }
  };

  const handlePrevModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCert) {
      const currentIdx = CERTIFICATES.findIndex((c) => c.id === selectedCert.id);
      const prevIdx = currentIdx === 0 ? CERTIFICATES.length - 1 : currentIdx - 1;
      setSelectedCert(CERTIFICATES[prevIdx]);
    }
  };

  return (
    <section className="relative z-20 bg-[#000000] py-20 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="mb-12 md:mb-16 flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 text-sm tracking-wide uppercase font-semibold mb-6 backdrop-blur-md">
            <Award className="w-4 h-4" />
            Certifications
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-tighter">
              Licenses & Certifications
            </h2>
            <p className="mt-4 text-zinc-400 font-medium max-w-2xl mx-auto">
              Professional credentials validating my foundational knowledge.
            </p>
          </div>
        </motion.div>

        {/* Grid Display */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              onClick={() => openModal(cert)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900/40 border border-zinc-800 aspect-[4/3] cursor-pointer hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50 block"
            >
              {/* Thumbnail Display */}
              <img
                src={cert.image}
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Click instruction overlay */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                    <Maximize2 className="w-6 h-6" />
                 </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-10 pointer-events-none" />

              {/* Tint Glow overlay */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${cert.color} rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-10`} />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1 shadow-black drop-shadow-md">
                  {cert.issuer}
                </p>
                <h3 className="text-lg font-bold text-white mb-1 tracking-tight drop-shadow-md leading-tight">
                  {cert.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Interactive Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl"
            onClick={closeModal}
          >
            {/* Header */}
            <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent" onClick={(e) => e.stopPropagation()}>
              <div className="pr-12">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{selectedCert.title}</h3>
                <p className="text-zinc-400 text-sm font-medium">{selectedCert.issuer}</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-12 h-12 flex flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 w-full h-full flex items-center justify-center relative px-4 py-24 md:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedCert.id}
                  src={selectedCert.image}
                  alt="Certificate large view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-[85vh] w-auto max-w-full rounded-md shadow-2xl shadow-black object-contain border border-zinc-800/50 bg-white"
                />
              </AnimatePresence>

              {/* Stage Arrows */}
              <button 
                onClick={handlePrevModal}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-white hover:bg-white hover:text-black hover:scale-110 transition-all z-50"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={handleNextModal}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-white hover:bg-white hover:text-black hover:scale-110 transition-all z-50"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
