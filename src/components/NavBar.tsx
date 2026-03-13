"use client";

import { motion } from "framer-motion";
import { Home, Briefcase, Wrench, FolderGit2, Camera, Mail, Download } from "lucide-react";
import Magnetic from "./Magnetic";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { name: "Home", icon: Home, id: "home" },
  { name: "Experience", icon: Briefcase, id: "experience" },
  { name: "Skills", icon: Wrench, id: "skills" },
  { name: "Projects", icon: FolderGit2, id: "projects" },
  { name: "Gallery", icon: Camera, id: "gallery" },
  { name: "Contact", icon: Mail, id: "contact" },
];

export default function NavBar() {
  const [active, setActive] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after slightly scrolling down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Simple scroll spy logic
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      let currentActive = active;
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = section.id;
          }
        }
      }
      if (currentActive !== active) {
        setActive(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-3 py-2.5 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 shadow-2xl flex items-center gap-1 md:gap-2"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <Magnetic key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center justify-center p-3 md:px-5 md:py-2.5 rounded-full transition-all duration-300 group ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
              aria-label={item.name}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-zinc-800/80 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:block font-bold text-xs uppercase tracking-widest">{item.name}</span>
              </span>
            </button>
          </Magnetic>
        );
      })}
      
      <Magnetic>
        <a 
          href="/Resume/Dhruvin_Patel.pdf" 
          download="Dhruvin_Patel_CV.pdf"
          className="relative flex items-center justify-center p-3 md:px-5 md:py-2.5 rounded-full transition-all duration-300 text-black bg-white hover:bg-zinc-200 ml-1 md:ml-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Download className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:block font-bold text-xs uppercase tracking-widest whitespace-nowrap">Resume</span>
          </span>
        </a>
      </Magnetic>
    </motion.nav>
  );
}
