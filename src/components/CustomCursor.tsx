"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop screens
    if (window.innerWidth <= 768) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive") ||
        target.getAttribute("role") === "button";
      
      setHovered(!!isInteractive);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          boxShadow: clicked
            ? "0 0 15px rgba(189, 0, 255, 0.8)"
            : hovered
            ? "0 0 25px rgba(0, 240, 255, 0.6)"
            : "0 0 8px rgba(0, 240, 255, 0.2)",
          borderColor: clicked ? "#bd00ff" : hovered ? "#00ffd8" : "#00f0ff",
          backgroundColor: hovered ? "rgba(0, 240, 255, 0.05)" : "transparent",
        }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
        }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: 12,
          marginTop: 12,
          backgroundColor: clicked ? "#bd00ff" : hovered ? "#00ffd8" : "#00f0ff",
        }}
        animate={{
          scale: clicked ? 1.5 : hovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
