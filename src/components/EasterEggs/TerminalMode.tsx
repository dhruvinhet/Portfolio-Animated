"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Log = { text: string; type: "input" | "output" | "error" | "system" };

export default function TerminalMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<Log[]>([
    { text: "DHRUVIN OS [Version 10.0.19045.5134]", type: "system" },
    { text: "(c) Corporation. All rights reserved.", type: "system" },
    { text: "Type 'help' to see available commands.", type: "system" }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim().toLowerCase();
    const newLogs: Log[] = [...logs, { text: `C:\\Users\\Dhruvin> ${cmd}`, type: "input" }];

    switch (cmd) {
      case "help":
        newLogs.push({ text: "AVAILABLE COMMANDS:", type: "output" });
        newLogs.push({ text: "  whoami      - Display user info", type: "output" });
        newLogs.push({ text: "  projects    - Fetch system repositories", type: "output" });
        newLogs.push({ text: "  skills      - Dump technical arsenal", type: "output" });
        newLogs.push({ text: "  clear       - Clear screen", type: "output" });
        newLogs.push({ text: "  exit        - Close terminal", type: "output" });
        break;
      case "whoami":
        newLogs.push({ text: "Dhruvinkumar Patel", type: "output" });
        newLogs.push({ text: "AI & Data Science Enthusiast", type: "output" });
        newLogs.push({ text: "STATUS: Ready to build.", type: "output" });
        break;
      case "projects":
        newLogs.push({ text: "Fetching internal repositories...", type: "system" });
        newLogs.push({ text: "[1] DeepFake Detection (Python, TensorFlow)", type: "output" });
        newLogs.push({ text: "[2] AI4Image (YOLOv8, SAM)", type: "output" });
        newLogs.push({ text: "[3] Synexor AI Suite (Multi-Agent)", type: "output" });
        newLogs.push({ text: "[4] Enterprise RAG (FAISS, LLMs)", type: "output" });
        break;
      case "skills":
        newLogs.push({ text: "=> Python, C++, SQL, PyTorch, TensorFlow, React", type: "output" });
        newLogs.push({ text: "=> RAG, Multi-Agent Systems, Object Detection", type: "output" });
        newLogs.push({ text: "=> Git, Docker, Flask, OpenCV, LangChain", type: "output" });
        break;
      case "clear":
        setLogs([]);
        setInputVal("");
        return;
      case "exit":
        setIsOpen(false);
        break;
      case "/ai":
      case "/boom":
      case "/dev":
      case "/grav":
      case "/flip":
      case "/rave":
        // Secretly dispatch the keys to the document body to trigger global easter eggs
        cmd.split("").forEach((char) => {
          document.body.dispatchEvent(new KeyboardEvent("keydown", { key: char, bubbles: true }));
        });
        // We DON'T add anything to newLogs so it is completely invisible that a command ran.
        // We also pop the last standard input log "C:\Users\Dhruvin> /boom" so it vanishes instantly
        newLogs.pop();
        break;
      default:
        newLogs.push({ text: `'${cmd}' is not recognized as an internal or external command.`, type: "error" });
    }

    setLogs(newLogs);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 w-full h-[50vh] bg-black/90 backdrop-blur-xl border-b border-zinc-800 z-[100001] font-mono text-sm shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="w-full bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
            <span className="text-zinc-400 text-xs">Terminal - bash</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {logs.map((log, i) => (
              <div 
                key={i} 
                className={`${
                  log.type === "error" ? "text-red-500" : 
                  log.type === "system" ? "text-zinc-500" : 
                  log.type === "input" ? "text-emerald-400" : 
                  "text-zinc-300"
                }`}
              >
                {log.text}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex flex-row items-center pt-2">
              <span className="text-emerald-400 mr-2">C:\Users\Dhruvin&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-zinc-300 placeholder-zinc-700 font-mono"
                spellCheck={false}
                autoComplete="off"
                autoFocus
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
