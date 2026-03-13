"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Sparkles } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "DeepFake Detection",
    category: "Python, TensorFlow, Flask",
    description: "DeepFake Detection is a Flask‑based web application that classifies face images as Real or Deepfake and explains why. Preprocesses images by resizing to 224×224 and normalizing them, then runs a pre‑trained deepfake model indicating probability. If classified as Deepfake, it uses MediaPipe Face Mesh, Pose and Hands to analyze landmarks, scanning for colour inconsistencies across regions. Option to draw bounding boxes and create heatmaps to highlight suspicious areas. API returns JSON with label, confidence score, text, and diagnostic images.",
    techstack: ["Python", "TensorFlow", "Keras", "Flask", "MediaPipe", "OpenCV", "NumPy", "Matplotlib", "Seaborn", "Werkzeug"],
    image: "/projects/deepfake.png",
    link: "https://huggingface.co/spaces/dhruvin-patel/DeepFake-Image-Detector",
    color: "from-emerald-600 to-teal-500",
    icon: ExternalLink
  },
  {
    id: 2,
    title: "AI4Image",
    category: "YOLOv8, SAM, React",
    description: "Full‑stack web application for intelligent object detection and extraction from images. The /detect endpoint uses YOLOv8 to detect objects and returns bounding boxes. The /extract endpoint crops the region, passes it to SAM to generate candidate masks, and returns an extracted object with a transparent background along with AI/ML facts. The /refine endpoint lets users refine the mask (red/green points) and recomputes a smoothed map via Gaussian blur. React frontend integrated with Flask API.",
    techstack: ["Flask", "YOLOv8", "SAM", "OpenCV", "NumPy", "PyTorch", "React", "MUI", "Emotion"],
    image: "/projects/ai4image.png",
    link: "https://huggingface.co/spaces/dhruvin-patel/aies-object-extractor",
    color: "from-purple-600 to-pink-500",
    icon: Sparkles
  },
  {
    id: 3,
    title: "Synexor AI Suite",
    category: "Python, Flask, Multi-Agent",
    description: "Multi‑agent AI platform that generates complete, production‑ready projects from a single prompt. Simple Mode for smaller scripts, Advanced Mode for enterprise-grade projects. Project Manager routes prompts. Advanced mode uses PlannerAgent, ResearchAgent, DataEngineerAgent, MLEngineerAgent, ReviewerAgent, and DocumentationAgent working collaboratively to design UI, models, logic, testing and outputs. The backend writes projects to generated_projects/ and streams progress to a React + Vite frontend via Socket.IO.",
    techstack: ["Flask", "Socket.IO", "React", "Vite", "Gemini 2.0 Flash", "Pandas", "NumPy", "FAISS", "Tailwind CSS"],
    image: "/projects/synexor.png",
    link: "https://github.com/dhruvinhet",
    color: "from-blue-600 to-cyan-500",
    icon: Github
  },
  {
    id: 4,
    title: "Enterprise RAG",
    category: "Python, FAISS, LLMs",
    description: "Streamlit‑based Multi‑Document AI Assistant for RAG–style QA. File & image upload parses PDF, DOCX, PPTX, TXT. Images are handled with Tesseract and EasyOCR. Extracted text combines with explicit [SOURCE: filename] tags. It splits text using RecursiveCharacterTextSplitter and stores them via FAISS + HuggingFace embeddings. QA matches users query to chunks, passing them to an Ollama llama3 LLM via LangChain (load_qa_chain). Sidebar displays system resources like GPU availability.",
    techstack: ["Streamlit", "PyPDF2", "python-docx", "pytesseract", "LangChain", "HuggingFace", "FAISS", "Ollama (llama3)"],
    image: "/projects/rag.png",
    link: "https://dhruvinhet-rag.streamlit.app/",
    color: "from-amber-500 to-orange-500",
    icon: ExternalLink
  },
];

export default function Projects() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-20 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent left-0" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm tracking-wide uppercase font-semibold mb-6 flex items-center gap-2 backdrop-blur-md">
            Showcase
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const Icon = project.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Reverse movement for parallax push
    x.set((e.clientX - centerX) / -15);
    y.set((e.clientY - centerY) / -15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const xSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 25 });

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800 flex flex-col backdrop-blur-md overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-900/50 min-h-[450px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
         <motion.img 
            src={project.image} 
            alt={project.title}
            style={{ x: xSpring, y: ySpring, scale: 1.15 }}
            className="w-full h-full object-cover transition-transform duration-[800ms] pointer-events-none"
         />
      </div>
      
      {/* Dark gradient base on top of image to make bottom text readable initially */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      <div className="absolute top-6 right-6 h-14 w-14 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white z-20 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:-rotate-12">
        <ArrowUpRight className="w-6 h-6" />
      </div>

      <div className="p-10 relative z-20 mt-auto flex flex-col pointer-events-none">
        {/* These labels are visible normally */}
        <div className="flex items-center justify-between mb-4 group-hover:opacity-0 transition-opacity duration-300">
          <p className="inline-flex px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700 text-xs font-bold uppercase tracking-widest text-zinc-300 items-center gap-2 backdrop-blur-sm">
            <Icon className="w-4 h-4 text-zinc-400" />
            {project.category}
          </p>
        </div>
        <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-xl group-hover:-translate-y-4 group-hover:opacity-0 transition-all duration-500">
          {project.title}
        </h3>
      </div>

      {/* Highly detailed hover state sliding panel */}
      <div className="absolute inset-0 z-30 bg-zinc-950/95 backdrop-blur-2xl p-8 md:p-10 flex flex-col transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <div className="relative h-full flex flex-col">
          <h3 className="text-3xl font-bold text-white mb-6 tracking-tight flex-shrink-0">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
              {project.title}
            </span>
          </h3>
          
          {/* Scrollable details wrapper */}
          <div className="flex-1 overflow-y-auto mb-4 pr-4 scrollbar-hide space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 block pointer-events-none">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techstack.map((tech: string) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 pointer-events-none">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 block pointer-events-none">Architecture & Details</h4>
              <p className="text-zinc-400 text-sm leading-relaxed pointer-events-none">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300 font-bold uppercase tracking-wider text-xs border-t border-zinc-900/50 pt-6 mt-auto pointer-events-none">
            View Project <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
