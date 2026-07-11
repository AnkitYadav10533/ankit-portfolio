"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, ShieldAlert } from "lucide-react";
import GlassCard from "./GlassCard";

interface Achievement {
  badge: string;
  title: string;
  description: string;
  color: "gold" | "bronze" | "cyan";
}

export default function Achievements() {
  const techHonors: Achievement[] = [
    {
      badge: "1st Position",
      title: "IIC Hackathon Winner",
      description: "Secured 1st place in the Institution's Innovation Council (IIC) Hackathon with an innovative tech solution.",
      color: "gold",
    },
    {
      badge: "3rd Position",
      title: "Data Analytics Hackathon",
      description: "Developed an analytical insights dashboard on actual business datasets, securing 3rd place overall.",
      color: "cyan",
    },
    {
      badge: "Participant",
      title: "Hackathon Engagements",
      description: "Active participant in multiple inter-college hackathons, testing skills under competitive environments.",
      color: "cyan",
    },
  ];

  const sportsHonors: Achievement[] = [
    {
      badge: "Gold Medal",
      title: "Kho-Kho Winner (Spardha '26)",
      description: "Secured the Gold Medal in Kho-Kho at the Spardha College Sports Meet 2026.",
      color: "gold",
    },
    {
      badge: "Bronze Medal",
      title: "Taekwondo Third Place",
      description: "Earned a Bronze Medal in Taekwondo, showing discipline, agility, and competitive focus.",
      color: "bronze",
    },
    {
      badge: "Overview",
      title: "Multi-Sport Athlete",
      description: "Active competitor in Kabaddi, Athletics, and Kho-Kho, and a regular participant in inter-college sports competitions.",
      color: "cyan",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const badgeColors = {
    gold: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    bronze: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    cyan: "bg-primary/10 border-primary/20 text-primary",
  };

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/40">
      {/* Glow Blob */}
      <div className="absolute top-[20%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            ACCOMPLISHMENTS
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
            Achievements & Sports
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Tech and Hackathon Achievements */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-syne text-xl md:text-2xl font-bold text-white">
                Hackathon & Tech Honors
              </h3>
            </div>

            <div className="space-y-4">
              {techHonors.map((hon, index) => (
                <GlassCard
                  key={index}
                  glowColor="cyan"
                  className="flex flex-col sm:flex-row items-start gap-4 p-5 hover:border-primary/20"
                >
                  <div
                    className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest font-mono shrink-0 mb-3 sm:mb-0 ${
                      badgeColors[hon.color]
                    }`}
                  >
                    {hon.badge}
                  </div>
                  <div>
                    <h4 className="font-syne text-base font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {hon.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{hon.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Sports and Extracurricular Achievements */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center">
                <Medal className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-syne text-xl md:text-2xl font-bold text-white">
                Sports Achievements
              </h3>
            </div>

            <div className="space-y-4">
              {sportsHonors.map((hon, index) => (
                <GlassCard
                  key={index}
                  glowColor="purple"
                  className="flex flex-col sm:flex-row items-start gap-4 p-5 hover:border-secondary/20"
                >
                  <div
                    className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest font-mono shrink-0 mb-3 sm:mb-0 ${
                      badgeColors[hon.color]
                    }`}
                  >
                    {hon.badge}
                  </div>
                  <div>
                    <h4 className="font-syne text-base font-bold text-white mb-1 group-hover:text-secondary transition-colors">
                      {hon.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{hon.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom micro quote/callout block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto backdrop-blur-md"
        >
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 shadow-lg">
            <Star className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed text-center sm:text-left">
            "Sports build discipline, resilience, and coordination—principles that I apply every single day to clean code, algorithm logic, and collaborative project management."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
