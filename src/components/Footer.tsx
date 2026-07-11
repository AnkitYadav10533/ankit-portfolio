"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#020205] border-t border-white/5 py-12 px-6 md:px-12 overflow-hidden">
      {/* Top Gradient Border Separator */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-secondary/30" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 select-none">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-syne text-2xl font-extrabold tracking-widest text-white cursor-none"
          >
            AY<span className="text-primary">.</span>
          </a>
          <p className="text-xs text-gray-500 max-w-xs font-medium leading-relaxed">
            "Turning Data into Insights and Building Intelligent Solutions"
          </p>
        </div>

        {/* Social Icons row */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AnkitYadav10533"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/15 flex items-center justify-center transition-all cursor-none"
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
            className="w-9 h-9 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/15 flex items-center justify-center transition-all cursor-none"
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
            className="w-9 h-9 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/15 flex items-center justify-center transition-all cursor-none"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/ankit.ydv_1122/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/15 flex items-center justify-center transition-all cursor-none"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Copyright and Back to Top button */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Ankit Yadav. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Scroll Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white border border-primary/20 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-110 active:scale-95 transition-all cursor-none"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </footer>
  );
}
