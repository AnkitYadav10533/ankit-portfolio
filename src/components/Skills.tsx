"use client";

import { motion } from "framer-motion";
import { Database, LineChart, Code, Brain, Cpu, Terminal, GitBranch } from "lucide-react";
import GlassCard from "./GlassCard";

interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  percentage: number;
  icon: React.ReactNode;
  category: "core" | "framework" | "tool";
}

export default function Skills() {
  const skills: SkillItem[] = [
    {
      name: "Python",
      level: "Intermediate",
      percentage: 65,
      icon: (
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.87 2c-3.15 0-2.95 1.37-2.95 1.37v1.43h3v.45H7.76s-3.05-.36-3.05 2.94c0 3.3 2.66 3.19 2.66 3.19h.93v-1.3s-.05-1.56 1.51-1.56h4.1s1.42 0 1.42-1.39V4.6S15.53 2 11.87 2zm-2.22 1.34c.37 0 .66.3.66.66a.66.66 0 1 1-.66-.66zM12.13 22c3.15 0 2.95-1.37 2.95-1.37v-1.43h-3v-.45h4.16s3.05.36 3.05-2.94c0-3.3-2.66-3.19-2.66-3.19h-.93v1.3s.05 1.56-1.51 1.56h-4.1s-1.42 0-1.42 1.39v2.75S8.47 22 12.13 22zm2.22-1.34a.66.66 0 1 1 .66-.66.66.66 0 0 1-.66.66z" />
        </svg>
      ),
      category: "core",
    },
    {
      name: "MySQL",
      level: "Intermediate",
      percentage: 60,
      icon: <Database className="w-8 h-8 text-[#00f0ff]" />,
      category: "core",
    },
    {
      name: "MS Excel",
      level: "Advanced",
      percentage: 85,
      icon: <LineChart className="w-8 h-8 text-[#00ffd8]" />,
      category: "tool",
    },
    {
      name: "Git & GitHub",
      level: "Intermediate",
      percentage: 60,
      icon: <GitBranch className="w-8 h-8 text-[#bd00ff]" />,
      category: "tool",
    },
    {
      name: "Machine & Deep Learning",
      level: "Intermediate",
      percentage: 65,
      icon: <Brain className="w-8 h-8 text-primary" />,
      category: "core",
    },
    {
      name: "TensorFlow & Scikit Learn",
      level: "Intermediate",
      percentage: 60,
      icon: <Cpu className="w-8 h-8 text-secondary" />,
      category: "framework",
    },
    {
      name: "Data Analytics & Pandas/NumPy",
      level: "Advanced",
      percentage: 80,
      icon: <Terminal className="w-8 h-8 text-accent" />,
      category: "core",
    },
    {
      name: "OpenCV & Django/Streamlit",
      level: "Intermediate",
      percentage: 60,
      icon: <Code className="w-8 h-8 text-[#00f0ff]" />,
      category: "framework",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const badgeColors = {
    Beginner: "bg-red-500/10 border-red-500/20 text-red-400",
    Intermediate: "bg-primary/10 border-primary/20 text-primary",
    Advanced: "bg-accent/10 border-accent/20 text-accent",
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/40">
      {/* Background glow */}
      <div className="absolute top-[40%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            EXPERTISE
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
            Technical Skills
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Description / Introduction */}
        <div className="max-w-3xl mb-12">
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            A visual overview of my technical capabilities. I specialize in python data operations, relational database querying, statistical cleaning, and modern machine learning frameworks.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard
                glowColor={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "purple" : "accent"}
                className="h-full flex flex-col justify-between group"
              >
                <div>
                  {/* Skill header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-primary/30 group-hover:scale-110 shadow-md">
                      {skill.icon}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                        badgeColors[skill.level]
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill name */}
                  <h3 className="font-syne text-lg font-bold text-white mb-6 group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                </div>

                {/* Progress bar info */}
                <div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-mono mb-2">
                    <span>PROFICIENCY</span>
                    <span className="text-white font-bold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
