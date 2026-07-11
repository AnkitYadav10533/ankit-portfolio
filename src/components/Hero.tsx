"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const TYPING_WORDS = ["Data Analyst", "AI/ML Enthusiast", "Problem Solver", "CSE Student"];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typing Effect Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = TYPING_WORDS[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    const wordDelay = isDeleting ? 200 : 1500;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        if (currentText === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), wordDelay);
          return;
        }
      } else {
        setCurrentText(currentWord.slice(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
          return;
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // Attempt to play video and catch errors (e.g. autoplay blocking)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projSection = document.getElementById("projects");
    if (projSection) {
      projSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6 md:px-12"
    >
      {/* Background Autoplay Video */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: 0.35 }}
          onError={() => setVideoError(true)}
        >
          <source
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022f73bcfad6c89163f4582f059cb51&profile_id=139&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      ) : (
        /* Fallback dark glowing backdrop gradient if video blocked/fails */
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#06030c] to-[#010910] opacity-80 z-0" />
      )}

      {/* Dark Readability Overlay */}
      <div className="absolute inset-0 bg-[#030303]/80 z-0 pointer-events-none" />

      {/* Gradient ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-[180px] pointer-events-none z-0 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12 md:py-24">
        {/* Hero Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
        >
          <motion.span
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-wider text-primary mb-6 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            B.Tech CSE Student @ SRMCEM
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-syne text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
          >
            Ankit Yadav
          </motion.h1>

          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6 h-12 flex items-center"
          >
            <span className="font-mono text-primary font-bold mr-2">&gt;</span>
            <span className="gradient-text font-syne">{currentText}</span>
            <span className="w-1 h-8 bg-primary ml-1 animate-pulse" />
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          >
            "Turning Data into Insights and Building Intelligent Solutions." Aspiring Data Analyst and AI/ML Engineer passionate about database structures, machine learning models, and real-world analytical datasets.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase text-xs tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.03] cursor-none"
            >
              <span className="font-extrabold text-white tracking-widest">CONTACT ME</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </a>
            <a
              href="/resume.pdf"
              download="Ankit_Yadav_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 text-white font-semibold uppercase text-xs tracking-wider transition-all duration-300 hover:bg-white/10 cursor-none"
            >
              Download CV
            </a>
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="text-xs uppercase font-bold tracking-widest text-primary hover:text-accent transition-colors ml-2 cursor-none"
            >
              View Projects
            </a>
          </motion.div>

          {/* Social Links & Details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5 w-full max-w-xl"
          >
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/AnkitYadav10533"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-primary hover:border-primary/40 hover:scale-115 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-none"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-yadav-a83094306"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-primary hover:border-primary/40 hover:scale-115 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-none"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:adityayadav10533@gmail.com"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-primary hover:border-primary/40 hover:scale-115 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-none"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ankit.ydv_1122/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-primary hover:border-primary/40 hover:scale-115 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-none"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            <a
              href="tel:+917007986661"
              className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-primary transition-colors cursor-none"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 70079 86661
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Right Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" as const }}
          className="lg:col-span-5 flex justify-center order-1 lg:order-2"
        >
          <div className="relative group w-64 h-64 md:w-80 md:h-80 select-none">
            {/* Glowing Border effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full opacity-65 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-700 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-[-4px] bg-gradient-to-tr from-primary via-secondary to-accent rounded-full p-[4px] animate-spin-slow">
              <div className="w-full h-full bg-[#030303] rounded-full" />
            </div>

            {/* Profile Image Wrapper */}
            <div className="absolute inset-3 rounded-full overflow-hidden border border-white/10 bg-[#030303] z-10 flex items-center justify-center">
              <img
                src="/assets/images/profile.jpg"
                alt="Ankit Yadav Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              />
            </div>

            {/* Micro Interaction Glowing Badge */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 bg-[#030303]/90 backdrop-blur-md border border-primary/30 rounded-full px-3 py-1.5 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                OPEN TO WORK
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
