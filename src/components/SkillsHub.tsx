import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import { Cpu, Search, Sparkles, Filter, Database, CheckCircle } from "lucide-react";
import { SKILLS } from "../data";
import { Skill } from "../types";

export default function SkillsHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories = ["All", "Languages", "Orchestration", "Retrieval", "ML & Analytical", "Systems"];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="skills" className="py-24 px-6 relative max-w-7xl mx-auto w-full">
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

      <Scroll3DWrapper>
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Cpu className="w-4 h-4 text-secondary" />
            <span className="font-mono-technical text-[11px] text-secondary tracking-[0.4em] uppercase font-semibold">
              02 — NEURAL_TOOLSET
            </span>
          </div>
          <h2 className="font-headline-lg text-4xl md:text-5xl text-white font-bold uppercase tracking-tight">
            Neural Tooling Grid
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Filtering Actions Hub */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/3 border border-white/5 backdrop-blur-md p-4 rounded-3xl mb-12">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <input
              type="text"
              placeholder="Search credentials (e.g. FAISS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors font-mono-technical"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-caps text-[9px] tracking-wider font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary-fixed shadow-[0_0_15px_rgba(173,198,255,0.25)]"
                    : "bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-6 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 ${
                  hoveredSkill?.name === skill.name ? "shadow-[0_15px_30px_rgba(0,0,0,0.4)]" : ""
                }`}
              >
                {/* Radial Progress Display */}
                <div className="relative w-20 h-20 mx-auto mb-6 select-none">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="3.5"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="transparent"
                      stroke={skill.category === "Languages" || skill.category === "Retrieval" ? "#adc6ff" : "#e9b3ff"}
                      strokeWidth="3.5"
                      strokeDasharray="213.6"
                      initial={{ strokeDashoffset: 213.6 }}
                      animate={{ strokeDashoffset: 213.6 - (213.6 * skill.percentage) / 100 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-mono-technical text-xs font-bold text-white">
                    {skill.percentage}%
                  </div>
                </div>

                {/* Text metadata */}
                <div className="text-center space-y-1">
                  <span className="block font-mono-technical text-[8px] text-primary/40 tracking-wider uppercase">
                    {skill.category}
                  </span>
                  <h3 className="font-label-caps text-[11px] font-bold text-white tracking-wide group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating skill desc overlay card */}
        <div className="mt-10 min-h-24">
          <AnimatePresence mode="wait">
            {hoveredSkill ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-white/4 border border-primary/20 backdrop-blur-lg flex gap-4 items-center max-w-3xl mx-auto"
              >
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-label-caps font-bold text-xs text-white">
                      {hoveredSkill.name}
                    </h4>
                    <span className="font-mono-technical text-[9px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/15">
                      {hoveredSkill.percentage}% ALIGNED
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/80">
                    {hoveredSkill.description}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex justify-center items-center gap-2 text-on-surface-variant/40 font-mono-technical text-[10px] py-4">
                <Filter className="w-3.5 h-3.5" />
                <span>HOVER ANY COEFFICIENT METER TO RETRIEVE ARCHITECTURE INTEGRATION NOTES</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Scroll3DWrapper>
    </section>
  );
}
