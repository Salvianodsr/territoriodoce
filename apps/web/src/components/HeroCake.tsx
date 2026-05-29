"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function HeroCake() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Total of images
  const frameCount = 35;
  const images = useRef<HTMLImageElement[]>([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Captura o scroll relativo ao contêiner hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload das imagens com carregamento progressivo e instantâneo do primeiro frame
  useEffect(() => {
    const imgList: HTMLImageElement[] = [];
    
    // 1. Carrega o primeiro frame imediatamente para exibição instantânea
    const firstImg = new Image();
    firstImg.src = `/assets/cake-sequence/ezgif-frame-001.jpg`;
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      
      // 2. Carrega as outras imagens em segundo plano
      let loadedCount = 1;
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/assets/cake-sequence/ezgif-frame-${paddedIndex}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };
        imgList[i - 1] = img;
      }
    };
    
    imgList[0] = firstImg;
    images.current = imgList;
  }, []);

  // Frame calculation based on scroll
  // The sequence goes from 0 to 100% of the scroll
  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useMotionValueEvent(currentFrame, "change", (latest) => {
    if (!canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    if (context) {
      const frameIndex = Math.floor(latest);
      const img = images.current[frameIndex];
      
      // Estratégia de Fallback progressivo:
      // Se a imagem exata do frame não estiver carregada ainda, desenha a imagem carregada mais próxima
      let imgToDraw = img;
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        let found = false;
        for (let j = frameIndex; j >= 0; j--) {
          const tempImg = images.current[j];
          if (tempImg && tempImg.complete && tempImg.naturalWidth !== 0) {
            imgToDraw = tempImg;
            found = true;
            break;
          }
        }
        if (!found) {
          imgToDraw = images.current[0];
        }
      }
      
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth !== 0) {
        // Clear and draw
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Calculate scale to fit or cover
        const hRatio = canvasRef.current.width / imgToDraw.width;
        const vRatio = canvasRef.current.height / imgToDraw.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvasRef.current.width - imgToDraw.width * ratio) / 2;
        const centerShift_y = (canvasRef.current.height - imgToDraw.height * ratio) / 2;  
        
        context.drawImage(
          imgToDraw, 
          0, 0, imgToDraw.width, imgToDraw.height,
          centerShift_x, centerShift_y, imgToDraw.width * ratio, imgToDraw.height * ratio
        );
      }
    }
  });

  // Draw first frame when loaded
  useEffect(() => {
    if (firstFrameLoaded && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const img = images.current[0];
      if (context && img && img.complete) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const hRatio = canvasRef.current.width / img.width;
        const vRatio = canvasRef.current.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvasRef.current.width - img.width * ratio) / 2;
        const centerShift_y = (canvasRef.current.height - img.height * ratio) / 2;  
        context.drawImage(
          img, 
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
    }
  }, [firstFrameLoaded]);

  // Partículas flutuantes ambientais
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-chocolate text-cream">
      
      {/* 1. FUNDO PREMIUM CINEMATOGRÁFICO COM DEGRADÊ */}
      <div className="sticky top-0 left-0 right-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-20 select-none">
        
        {/* Luzes de palco */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#19110F] via-[#0E0908] to-[#19110F]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full filter blur-[120px] bg-velvet/10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] bg-champagne/5 mix-blend-screen pointer-events-none"></div>

        {/* Partículas douradas flutuando */}
        <motion.div style={{ y: particleY }} className="absolute inset-0 opacity-40 pointer-events-none z-0">
          <div className="absolute top-10 left-[15%] w-2 h-2 rounded-full bg-champagne animate-pulse"></div>
          <div className="absolute top-48 right-[10%] w-1.5 h-1.5 rounded-full bg-velvet animate-ping"></div>
          <div className="absolute bottom-32 left-[8%] w-1 h-1 rounded-full bg-champagne"></div>
          <div className="absolute bottom-72 right-[20%] w-2 h-2 rounded-full bg-champagne/80 animate-pulse"></div>
          <div className="absolute top-1/3 left-[40%] w-1.5 h-1.5 rounded-full bg-velvet"></div>
          <div className="absolute top-[60%] right-[35%] w-2 h-2 rounded-full bg-champagne animate-ping"></div>
        </motion.div>

        {/* 2. A SEQUÊNCIA DE IMAGENS DO BOLO (CANVAS) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none">
          <canvas 
            ref={canvasRef} 
            width={1920} 
            height={1080} 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
