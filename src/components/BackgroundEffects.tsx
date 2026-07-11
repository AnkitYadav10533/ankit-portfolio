"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      angle: number;
    }> = [];

    const colors = [
      "rgba(0, 240, 255, ",  // Primary Neon Blue/Cyan
      "rgba(189, 0, 255, ",  // Secondary Purple
      "rgba(0, 255, 216, ",  // Accent Cyan
      "rgba(255, 255, 255, ", // Soft White
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(45, Math.floor((canvas.width * canvas.height) / 38000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3,
          speedX: (Math.random() - 0.5) * 0.08, // Extra slow drift
          speedY: (Math.random() - 0.5) * 0.08,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.2 + 0.05,
          pulseSpeed: Math.random() * 0.008 + 0.002,
          angle: Math.random() * Math.PI,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        p.angle += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.angle) * 0.04;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color === "rgba(255, 255, 255, " ? "rgba(0, 240, 255, 0.3)" : p.color + "0.4)";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.max(0.01, Math.min(0.3, currentAlpha)) + ")";
        ctx.fill();
      }
      
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--theme-bg)] transition-colors duration-500">
      {/* Forest Background Image with premium blend */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500"
        style={{ opacity: "var(--bg-image-opacity)" }}
      >
        <img
          src="/assets/images/forest_bg.jpg"
          alt="Foggy forest background"
          className="w-full h-full object-cover mix-blend-luminosity dark:mix-blend-lighten"
        />
        {/* Dark/Light overlay gradients for text readability and cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--theme-overlay-from)] via-[var(--theme-overlay-via)] to-[var(--theme-overlay-to)] transition-all duration-500" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[var(--theme-overlay-to)] transition-all duration-500" />
      </div>

      {/* Cyber space grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />

      {/* Noise grain overlay for an analog paper feel */}
      <div className="noise-overlay" />

      {/* Slowly floating glowing blobs using macOS pastel blends or neon glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--theme-blob-1)] blur-[150px] animate-blob-1 transition-colors duration-500" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[var(--theme-blob-2)] blur-[140px] animate-blob-2 transition-colors duration-500" />
      <div className="absolute top-[35%] left-[55%] w-[45vw] h-[45vw] rounded-full bg-[var(--theme-blob-3)] blur-[130px] animate-blob-3 transition-colors duration-500" />
      <div className="absolute bottom-[40%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-[var(--theme-blob-4)] blur-[150px] animate-blob-4 transition-colors duration-500" />

      {/* Twinkling stardust layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
