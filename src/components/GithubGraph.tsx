"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const YEAR_OPTIONS = ["2026", "2025", "2024", "2023"];

export default function GithubGraph() {
  const explicitTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const [allData, setAllData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/dhruvinhet')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch contribution data.");
        return res.json();
      })
      .then(resData => {
        const cleaned = resData.contributions.map((c: any) => ({
          ...c,
          date: c.date.replace(/-0(\d{2})-/, '-$1-')
        }));
        setAllData(cleaned);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const yearData = useMemo(() => {
    return allData.filter((d) => d.date.startsWith(selectedYear));
  }, [allData, selectedYear]);

  const stats = useMemo(() => {
    if (!yearData.length) return { total: 0, maxStreak: 0, currentStreak: 0 };
    
    let total = 0;
    let maxStreak = 0;
    let currentStreak = 0;
    let ongoingStreak = 0;

    yearData.forEach((day, i) => {
      total += day.count;
      
      if (day.count > 0) {
        ongoingStreak++;
        currentStreak = ongoingStreak;
        maxStreak = Math.max(maxStreak, ongoingStreak);
      } else {
        ongoingStreak = 0;
      }
    });

    return { total, maxStreak, currentStreak };
  }, [yearData]);

  return (
    <section className="relative z-20 bg-[#000000] py-20 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900/50">
      {/* Cinematic subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="mb-12 md:mb-16 flex flex-col items-center w-full"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full max-w-5xl gap-10">
            <div className="text-center md:text-left">
              <span className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                Open Source
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                Contributions
              </h2>
            </div>
            
            <div className="flex items-center gap-6 pb-2">
              {YEAR_OPTIONS.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`relative text-xl md:text-2xl font-bold transition-all duration-300 ${
                    selectedYear === year ? "text-white" : "text-zinc-700 hover:text-zinc-400"
                  }`}
                >
                  {year}
                  {selectedYear === year && (
                    <motion.div
                      layoutId="activeYearIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Minimalist Typographic Stats Row */}
        <div className="w-full max-w-5xl flex flex-wrap gap-16 md:gap-32 mb-12 border-y border-zinc-900 py-8 justify-start md:justify-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Activity</p>
            {mounted && <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">{stats.total}</p>}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Longest Streak</p>
            {mounted && <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">{stats.maxStreak} <span className="text-3xl text-zinc-600 font-medium tracking-normal -ml-2">d</span></p>}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Current Streak</p>
            {mounted && <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">{stats.currentStreak} <span className="text-3xl text-zinc-600 font-medium tracking-normal -ml-2">d</span></p>}
          </motion.div>
        </div>

        {/* Graph Display */}
        <motion.a 
          href="https://github.com/dhruvinhet"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="group block relative w-full max-w-5xl cursor-pointer"
          style={{ textDecoration: 'none' }}
        >
          {/* Edge Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-[2rem]" />

          <div className="relative z-10 w-full overflow-x-auto overflow-y-hidden pb-6 py-4 px-2 custom-scrollbar">
            <div className="w-max min-w-full mx-auto flex justify-start md:justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedYear}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                >
                  {mounted && !loading && !error && yearData.length > 0 ? (
                    <>
                      <ActivityCalendar 
                        data={yearData}
                        theme={explicitTheme as any}
                        colorScheme="dark"
                        blockSize={16}
                        blockMargin={6}
                        fontSize={14}
                        renderBlock={(block: any, activity: any) => React.cloneElement(block, {
                          'data-tooltip-id': 'react-tooltip',
                          'data-tooltip-html': `${activity.count} contributions on ${activity.date}`,
                        })}
                      />
                      <Tooltip id="react-tooltip" />
                    </>
                  ) : error ? (
                    <div className="h-[150px] flex items-center justify-center text-red-500 font-medium tracking-wide">
                      Failed to load GitHub streak: {error.message}
                    </div>
                  ) : (
                    <div className="h-[150px] flex items-center justify-center text-zinc-600 font-medium tracking-wider uppercase text-sm">
                      Syncing data...
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.a>
        
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </section>
  );
}
