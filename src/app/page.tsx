"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#030303] text-gray-100 flex flex-col justify-between selection:bg-primary/20 selection:text-accent font-sans">
          {/* Custom interactive cursor */}
          <CustomCursor />

          {/* Interactive neon-particle background */}
          <BackgroundEffects />

          {/* Floating glass navigation header */}
          <Navbar />

          {/* Main Layout sections */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Timeline />
            <Skills />
            <Projects />
            <Achievements />
            <Contact />
          </main>

          {/* Wave footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
