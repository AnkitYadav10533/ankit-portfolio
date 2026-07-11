"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Timeline" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [bgOpacity, setBgOpacity] = useState(0.72);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(currentTheme);

    const savedOpacity = localStorage.getItem("bg-opacity");
    if (savedOpacity) {
      const val = parseFloat(savedOpacity);
      setBgOpacity(val);
      document.documentElement.style.setProperty("--bg-image-opacity", val.toString());
    } else {
      const defaultOpacity = currentTheme === "dark" ? 0.72 : 0.88;
      setBgOpacity(defaultOpacity);
      document.documentElement.style.setProperty("--bg-image-opacity", defaultOpacity.toString());
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      if (!localStorage.getItem("bg-opacity")) {
        setBgOpacity(0.72);
        document.documentElement.style.setProperty("--bg-image-opacity", "0.72");
      }
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      if (!localStorage.getItem("bg-opacity")) {
        setBgOpacity(0.88);
        document.documentElement.style.setProperty("--bg-image-opacity", "0.88");
      }
    }
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setBgOpacity(val);
    document.documentElement.style.setProperty("--bg-image-opacity", val.toString());
    localStorage.setItem("bg-opacity", val.toString());
  };

  const OpacityControl = () => (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        onClick={() => setShowSlider(!showSlider)}
        aria-label="Adjust Background Opacity"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-primary/40 text-[var(--theme-icon)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:scale-105 outline-none cursor-none mr-2"
      >
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 110 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center bg-black/50 dark:bg-black/75 border border-white/10 rounded-full px-3 py-1.5 h-9 backdrop-blur-md overflow-hidden z-50 absolute right-11"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={bgOpacity}
              onChange={handleOpacityChange}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
              style={{
                background: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${bgOpacity * 100}%, rgba(255,255,255,0.2) ${bgOpacity * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const ThemeToggle = () => (
    <motion.button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      whileTap={{ scale: 0.92 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-primary/40 text-[var(--theme-icon)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:scale-105 outline-none cursor-none overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 45, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? (
            <svg className="w-4.5 h-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
      <span className="absolute inset-0 bg-primary/5 rounded-full scale-0 hover:scale-100 transition-transform duration-500 pointer-events-none" />
    </motion.button>
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor active section via Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Focus middle of viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 md:px-12 py-4 ${
          scrolled
            ? "bg-[#030303]/70 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="group flex items-center gap-1 font-syne text-xl md:text-2xl font-extrabold tracking-widest text-white cursor-none"
          >
            AY
            <span className="text-primary transition-all duration-300 group-hover:text-secondary group-hover:scale-150 inline-block">
              .
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-none ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary/25 to-secondary/25 border border-primary/20 rounded-full"
                      transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Download Resume */}
          <div className="hidden md:flex items-center gap-4">
            <OpacityControl />
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download="Ankit_Yadav_Resume.pdf"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 hover:border-primary/50 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:scale-[1.03] cursor-none"
            >
              Resume
              <Download className="w-3.5 h-3.5 group-hover:translate-y-[1px] transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-3">
            <OpacityControl />
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download="Ankit_Yadav_Resume.pdf"
              className="p-2 rounded-full bg-white/5 border border-white/5 text-gray-300 hover:text-white"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-white transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[68px] z-30 p-6 mx-6 rounded-2xl bg-black/95 border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                        : "bg-transparent border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00f0ff]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
