"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "accent" | "none";
  hoverLift?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "none",
  hoverLift = true,
}: GlassCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const glowStyles = {
    cyan: "hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    purple: "hover:border-secondary/30 hover:shadow-[0_0_30px_rgba(189,0,255,0.15)]",
    accent: "hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,255,216,0.15)]",
    none: "",
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={hoverLift ? { y: -6 } : {}}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      className={`spotlight-card spotlight-card-border glass-panel rounded-2xl p-6 backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden transition-all duration-300 ${
        glowStyles[glowColor]
      } ${className}`}
    >
      {/* Absolute spot light gradient */}
      <div className="absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
