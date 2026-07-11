"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20; // Update every 20ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400); // Small delay for final visual completion
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#020205] z-50 flex flex-col justify-center items-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          filter: "blur(20px)",
          scale: 1.05,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }}
      >
        {/* Futuristic Glowing Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

        <div className="flex flex-col items-center max-w-md w-full px-6 z-10">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-card-bg glass-panel border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden">
              <span className="font-syne text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
                AY
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-30 animate-pulse" />
            </div>
          </motion.div>

          {/* Animated Name */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-syne text-2xl font-extrabold tracking-[0.3em] uppercase text-white mb-2 text-center"
          >
            ANKIT YADAV
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-8"
          >
            Portfolio Experience
          </motion.p>

          {/* Loading Progress Bar Container */}
          <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          {/* Percentage Counter */}
          <div className="flex justify-between items-center w-full px-1 text-xs text-gray-500 font-mono">
            <span className="tracking-wider">SYSTEM INITIALIZATION</span>
            <span className="text-primary font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
