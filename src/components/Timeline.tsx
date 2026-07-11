"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, ChevronRight, Calendar } from "lucide-react";
import GlassCard from "./GlassCard";

const EDUCATION_ITEMS = [
  {
    period: "2024 - 2028 (Expected)",
    title: "B.Tech in Computer Science Engineering",
    institution: "Shri Ramswaroop Memorial College of Engineering and Management, Lucknow",
    board: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    description: "Focusing on foundational software engineering concepts, database structures, algorithmic logic, and computing analytics.",
  },
];

const EXPERIENCE_ITEMS = [
  {
    period: "Last 4 Months (Current)",
    title: "Team Coordinator",
    institution: "GFG SRMCEM Campus Body",
    description: "Coordinating campus-level technical activities, student engagement initiatives, and tech community events. Collaborating on coding programs and technical learning modules.",
    bullets: [
      "Organizing technical events & hackathons",
      "Coordinating student learning activities",
      "Managing cross-team collaboration",
    ],
  },
];

export default function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemLeftVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const itemRightVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section id="education" className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/60">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            MY JOURNEY
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
            Education & Experience
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Timeline Desktop Structure */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Middle Connecting Glowing Vertical Line (Only on Desktop) */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent opacity-30 -translate-x-1/2 hidden lg:block" />

          {/* Left Column: Education */}
          <div className="flex flex-col gap-8 relative">
            <div className="flex items-center gap-3 mb-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-syne text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="flex flex-col gap-8 relative">
              {EDUCATION_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemLeftVariants}
                  className="relative pl-0 lg:pr-10"
                >
                  {/* Glowing Node Indicator */}
                  <div className="absolute right-[-14px] top-6 w-6 h-6 rounded-full bg-black border-[3px] border-primary z-10 shadow-[0_0_15px_#00f0ff] hidden lg:block" />

                  <GlassCard glowColor="cyan" className="relative group">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <h4 className="font-syne text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm font-semibold text-gray-300 mb-1">{item.institution}</p>
                    <p className="text-xs text-gray-500 font-mono mb-4">{item.board}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience & Leadership */}
          <div className="flex flex-col gap-8 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(189,0,255,0.15)]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-syne text-2xl font-bold text-white">Experience & Leadership</h3>
            </div>

            <div className="flex flex-col gap-8">
              {EXPERIENCE_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemRightVariants}
                  className="relative pl-0 lg:pl-10"
                >
                  {/* Glowing Node Indicator */}
                  <div className="absolute left-[-14px] top-6 w-6 h-6 rounded-full bg-black border-[3px] border-secondary z-10 shadow-[0_0_15px_#bd00ff] hidden lg:block" />

                  <GlassCard glowColor="purple" className="relative group">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono text-secondary mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <h4 className="font-syne text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm font-semibold text-gray-300 mb-4">{item.institution}</p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{item.description}</p>

                    {/* Bullet Highlights */}
                    <div className="border-t border-white/5 pt-4">
                      <span className="text-xs uppercase font-mono tracking-wider text-secondary font-bold mb-3 block">
                        Responsibilities
                      </span>
                      <ul className="space-y-2">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
