"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#000000]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
