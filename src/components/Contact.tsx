"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import GlassCard from "./GlassCard";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Trigger canvas-confetti blast
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#bd00ff", "#00ffd8"],
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success notification after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/60">
      {/* Glow ambient circle */}
      <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            CONNECT
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
            Contact Me
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch select-none">
          {/* Left Column: Details & Map Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="font-syne text-2xl font-bold text-white">Let's Connect</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                I am looking for internship opportunities in Data Analytics, Database Management, and AI/ML project assistance. Feel free to contact me for collaborations or inquiries.
              </p>

              {/* Methods List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary shadow-md">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      Email Address
                    </span>
                    <a
                      href="mailto:adityayadav10533@gmail.com"
                      className="text-xs md:text-sm text-gray-300 hover:text-primary transition-colors cursor-none"
                    >
                      adityayadav10533@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary shadow-md">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      LinkedIn Profile
                    </span>
                    <a
                      href="https://www.linkedin.com/in/ankit-yadav-a83094306"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-gray-300 hover:text-secondary transition-colors cursor-none"
                    >
                      linkedin.com/in/ankit-yadav
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent shadow-md">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      GitHub Profile
                    </span>
                    <a
                      href="https://github.com/AnkitYadav10533"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-gray-300 hover:text-accent transition-colors cursor-none"
                    >
                      github.com/AnkitYadav10533
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Cyber Map Coordinate Box */}
            <div className="relative rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-40" />
              <div className="relative z-10 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-accent">
                    <MapPin className="w-4 h-4 animate-bounce" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">
                      LUCKNOW, INDIA
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500">SECURE CONNECT // ON</span>
                </div>

                {/* Coordinate Grid display */}
                <div className="font-mono text-xs text-gray-400 space-y-1">
                  <div>LATITUDE: 26.8467° N</div>
                  <div>LONGITUDE: 80.9462° E</div>
                  <div>LOCATION: UTTAR PRADESH</div>
                </div>

                {/* Micro radar visual */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    RECRUITMENT SIGNAL active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="purple" className="relative h-full flex flex-col justify-between" hoverLift={false}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label htmlFor="fullName" className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-primary/50 focus:bg-white/10 outline-none transition-all duration-300 cursor-none"
                      placeholder="e.g. John Doe"
                    />
                    {errors.fullName && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-primary/50 focus:bg-white/10 outline-none transition-all duration-300 cursor-none"
                      placeholder="e.g. john@example.com"
                    />
                    {errors.email && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="relative">
                  <label htmlFor="subject" className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-primary/50 focus:bg-white/10 outline-none transition-all duration-300 cursor-none"
                    placeholder="Inquiry or Project Collaboration"
                  />
                  {errors.subject && (
                    <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.subject}</span>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 block">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-primary/50 focus:bg-white/10 outline-none transition-all duration-300 resize-none cursor-none"
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.01] disabled:opacity-50 disabled:hover:shadow-none disabled:hover:scale-100 cursor-none"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Toast Success Message */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-6 bottom-6 p-4 rounded-xl bg-[#091515] border border-[#143d3a] flex items-center gap-3 text-[#5eead4] z-20 shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent animate-bounce" />
                    <div>
                      <h5 className="text-xs font-bold font-syne uppercase tracking-wider">Message Dispatched</h5>
                      <p className="text-[10px] text-teal-400/80 mt-0.5 font-mono">
                        Data payload transmitted successfully. Talk soon!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
