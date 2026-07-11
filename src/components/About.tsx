"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Heart, Award, CheckCircle } from "lucide-react";
import GlassCard from "./GlassCard";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-syne font-extrabold text-3xl md:text-4xl text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/40">
      {/* Glow Blob */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            INTRODUCTION
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
            About Me
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Info Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12"
        >
          {/* Left Bio Section */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <GlassCard className="h-full" glowColor="cyan" hoverLift={false}>
              <h3 className="font-syne text-xl md:text-2xl font-bold text-white mb-6">
                Aspiring Tech Professional & Data Enthusiast
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                I am Ankit Yadav, currently pursuing my B.Tech in Computer Science Engineering from Shri Ramswaroop Memorial College of Engineering and Management (SRMCEM), Lucknow. I have a strong interest in Data Analytics and Artificial Intelligence/Machine Learning.
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                I enjoy transforming raw data into meaningful insights and actively participate in hackathons to enhance my practical skills. I am continuously learning new technologies to build a strong foundation in the tech domain.
              </p>

              {/* Bio details dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong className="text-white">College:</strong> SRMCEM, Lucknow
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong className="text-white">University:</strong> AKTU
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong className="text-white">Location:</strong> Lucknow, UP, India
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong className="text-white">Status:</strong> Open to Internships
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Goals / Hobbies Section */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
            {/* Career Goals */}
            <GlassCard glowColor="purple" className="relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center border border-secondary/20">
                  <Target className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-syne text-lg font-bold text-white">Career Goals</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold mb-1">
                    Short-Term
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Master advanced analytics tools, develop video editing skills, and build practical Data Analytics expertise.
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold mb-1">
                    Long-Term
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Build a strong career in Data Analytics, become highly proficient in AI/ML, and contribute to impactful tech solutions.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Hobbies / Interests */}
            <GlassCard glowColor="accent" className="relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/20">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-syne text-lg font-bold text-white">Interests & Hobbies</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Emerging Tech", "Photography", "Sports & Fitness", "AI/ML Innovations"].map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300 hover:border-accent/30 hover:text-white transition-all duration-300 shadow-md"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Counter Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8"
        >
          {[
            { value: 2, suffix: "+", label: "Hackathon Wins" },
            { value: 1, suffix: "", label: "GFG Team Coordinator" },
            { value: 6, suffix: "+", label: "Years Sports Experience" },
            { value: 1, suffix: "", label: "Gold Medal (Kho-Kho)" },
            { value: 1, suffix: "", label: "Bronze Medal (Taekwondo)" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 text-center relative group backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center">
                <Award className="w-5 h-5 text-primary mb-3 opacity-60 group-hover:scale-110 group-hover:text-accent transition-all" />
                <Counter value={stat.value} suffix={stat.suffix} />
                <span className="text-xs text-gray-400 font-medium tracking-wide mt-2 block select-none">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
