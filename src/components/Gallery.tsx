"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MapPin, Calendar, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Smart India Hackathon 2025",
    subtitle: "Grand Finalist",
    date: "2025",
    location: "National Level",
    thumbnail: "/gallery/SIH2025/6.jpeg",
    images: Array.from({ length: 10 }, (_, i) => `/gallery/SIH2025/${i + 1}.jpeg`),
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    title: "MumbaiHacks Agentic AI",
    subtitle: "Grand Finalist (Top 25)",
    date: "2025",
    location: "Mumbai",
    images: Array.from({ length: 4 }, (_, i) => `/gallery/MumbaiHacks/${i + 1}.jpeg`),
    color: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    title: "Industry Project Showcase",
    subtitle: "TATA Tech Global COE Head-PLM",
    date: "2024",
    location: "Industry Showcase",
    images: Array.from({ length: 7 }, (_, i) => `/gallery/Tata/${i + 1}.jpeg`),
    color: "from-emerald-600 to-teal-500",
  },
  {
    id: 4,
    title: "Smart India Hackathon 2024",
    subtitle: "Participant / Finalist",
    date: "2024",
    location: "National Level",
    images: Array.from({ length: 4 }, (_, i) => `/gallery/SIH2024/${i + 1}.jpeg`),
    color: "from-amber-500 to-orange-500",
  }
];

export default function Gallery() {
  const [selectedGallery, setSelectedGallery] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [currentModalImageIdx, setCurrentModalImageIdx] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedGallery]);

  const openModal = (gallery: typeof GALLERY_ITEMS[0]) => {
    setSelectedGallery(gallery);
    setCurrentModalImageIdx(0);
  };

  const closeModal = () => {
    setSelectedGallery(null);
  };

  const handleNextModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGallery) {
      setCurrentModalImageIdx((prev) => 
        prev === selectedGallery.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGallery) {
      setCurrentModalImageIdx((prev) => 
        prev === 0 ? selectedGallery.images.length - 1 : prev - 1
      );
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
            <Camera className="w-4 h-4" />
            Photo Gallery
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-tighter">
              Moments & Achievements
            </h2>
            <p className="mt-4 text-zinc-400 font-medium max-w-2xl mx-auto">
              Visual highlights from hackathons and project showcases. Click to explore albums.
            </p>
          </div>
        </motion.div>

        {/* Grid Display */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => openModal(item)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/3] md:aspect-[3/2] cursor-pointer hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50 block"
            >
              {/* Thumbnail Display (Explicit Thumbnail or First Image) */}
              <img
                src={(item as any).thumbnail || item.images[0]}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Multi-image indicator */}
              <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white tracking-widest flex items-center gap-2">
                <Camera className="w-3.5 h-3.5" />
                {item.images.length} Photos
              </div>

              {/* Click instruction overlay */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <Maximize2 className="w-6 h-6" />
                 </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${item.color} rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-10`} />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <div className="flex flex-wrap items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 delay-100">
                  <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-zinc-300 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 px-3 py-1.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-zinc-300 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-zinc-300 font-medium text-sm md:text-base drop-shadow">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Interactive Modal */}
      <AnimatePresence>
        {selectedGallery && (
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
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{selectedGallery.title}</h3>
                <p className="text-zinc-400 text-sm font-medium">{selectedGallery.subtitle}</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 w-full h-full flex items-center justify-center relative px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentModalImageIdx}
                  src={selectedGallery.images[currentModalImageIdx]}
                  alt="Gallery large view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-2xl shadow-black object-contain border border-zinc-800/50"
                />
              </AnimatePresence>

              {/* Stage Arrows */}
              {selectedGallery.images.length > 1 && (
                <>
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
                </>
              )}
            </div>

            {/* Thumbnails Filmstrip Bottom */}
            <div className="h-32 w-full bg-black/80 border-t border-zinc-900 overflow-x-auto px-6 flex items-center gap-4 scrollbar-hide shrink-0" onClick={(e) => e.stopPropagation()}>
              {selectedGallery.images.map((imgUrl, srcIdx) => (
                <button
                  key={srcIdx}
                  onClick={() => setCurrentModalImageIdx(srcIdx)}
                  className={`relative flex-shrink-0 h-20 w-32 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentModalImageIdx === srcIdx 
                      ? 'border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                      : 'border-zinc-800 opacity-50 hover:opacity-100 hover:border-zinc-600'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${srcIdx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Global style for hiding scrollbar */}
            <style dangerouslySetInnerHTML={{__html: `
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
