"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 60; // 00 to 59

const preloadImages = () => {
  if (typeof window === "undefined") return [];
  const images: HTMLImageElement[] = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    const frameIndex = i.toString().padStart(2, "0");
    const img = new Image();
    img.src = `/sequence/frame_${frameIndex}_delay-0.066s.png`;
    images.push(img);
  }
  return images;
};

export default function ScrollyCanvas({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const preloaded = preloadImages();
    setImages(preloaded);

    if (preloaded[0]) {
      preloaded[0].onload = () => renderFrame(0, preloaded);
    }
  }, []);

  const renderFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgArray[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgArray[index];
    
    // Maintain correct internal resolution
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dark background for canvas itself as fallback
    ctx.fillStyle = "#0a0a0a"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length > 0) {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latest * FRAME_COUNT))
      );
      renderFrame(frameIndex, images);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0) {
        const latest = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(latest * FRAME_COUNT))
        );
        renderFrame(frameIndex, images);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full object-cover bg-[#0a0a0a]" />;
}
