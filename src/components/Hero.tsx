import React from "react";
import { motion } from "motion/react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import { 
  ArrowRight, 
  Sparkles, 
  Database, 
  TrendingUp, 
  Bot, 
  Code2, 
  Cloud,
  Mail
} from "lucide-react";

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const row1Tags = [
    "Kerala, India",
    "Android Developer",
    "Gen AI Engineer",
    "AI Developer",
    "Python Developer"
  ];

  const row2Tags = [
    "Data Science",
    "Analytics",
    "Machine Learning",
    "RAG Systems",
    "NLP",
    "LangChain",
    "React Developer"
  ];

  const roles = [
    "Gen AI Engineer Intern",
    "AI Developer",
    "Python Developer",
    "Data Science Enthusiast",
    "Analytics Explorer",
    "RAG Developer",
    "Machine Learning Enthusiast",
    "NLP Developer",
    "AI Builder",
    "Generative AI Engineer"
  ];

  const skillCards = [
    {
      title: "Generative AI",
      tags: "LLMs • RAG • LangChain • Prompt Engineering",
      icon: Sparkles,
      color: "from-blue-500/20 to-indigo-500/10",
      borderColor: "group-hover:border-blue-400/30"
    },
    {
      title: "Data Science",
      tags: "Python • Pandas • NumPy • Data Visualization",
      icon: Database,
      color: "from-purple-500/20 to-pink-500/10",
      borderColor: "group-hover:border-purple-400/30"
    },
    {
      title: "Analytics",
      tags: "Business Intelligence • Insights • Reporting",
      icon: TrendingUp,
      color: "from-cyan-500/20 to-teal-500/10",
      borderColor: "group-hover:border-cyan-400/30"
    },
    {
      title: "AI Development",
      tags: "Machine Learning • NLP • Computer Vision",
      icon: Bot,
      color: "from-indigo-500/20 to-violet-500/10",
      borderColor: "group-hover:border-indigo-400/30"
    },
    {
      title: "Web Development",
      tags: "React • Next.js • Streamlit • APIs",
      icon: Code2,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "group-hover:border-emerald-400/30"
    },
    {
      title: "Cloud & Tools",
      tags: "GitHub • Docker • Vercel • Google AI Studio",
      icon: Cloud,
      color: "from-amber-500/20 to-orange-500/10",
      borderColor: "group-hover:border-amber-400/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-black text-white">
      {/* Visual Ambient Blur Gradients */}
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <Scroll3DWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center"
        >
          {/* Circular Profile Avatar */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 group cursor-pointer pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Soft blue ambient glow behind the avatar */}
            <div className="absolute -inset-6 rounded-full bg-blue-500/15 blur-2xl group-hover:bg-blue-500/25 transition-all duration-500" />
            
            {/* Subtle glowing blue outer ring */}
            <div className="relative w-[150px] h-[150px] md:w-[210px] md:h-[210px] rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-indigo-500/30 to-blue-400 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)] transition-all duration-500 flex items-center justify-center">
              {/* Thin white inner border enclosing overflow-hidden profile */}
              <div className="w-full h-full rounded-full border border-white/20 bg-black overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujfJszjKSgbN6KYJCv7g4uQoO5SBRvGIJrAV5fktbZW-qKT_W6YvsoymG9PHsHHfCxLYLbNMS8U2yXx7fvzIyBCQXrJYbc5arfhnvqan8dQ6-0S7SQEvY8cpuV0FHKozGxbItwK0lQ_GDEXndh4vR_lffUHZZpNyNMM8O-gUf02MQ74fnekHW2ilV-06qEhoVgJAWaXmyGS2TLrDaMJk9jJaVgtTGb2OjtaciCNC6fw35LmOkqQPCSJWZvE"
                  alt="Abhiram A."
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Hero Title and Logo Element */}
          <motion.div variants={itemVariants} className="relative mb-4">
            <span className="hidden md:inline-block absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono-technical text-primary/45 tracking-[0.4em] uppercase">
              PORTFOLIO INITIALIZED // SECURE
            </span>
            <h1 className="font-headline-lg text-5xl md:text-8xl tracking-tight leading-[0.95] text-white font-black select-none tracking-tighter">
              ABHIRAM A
            </h1>
          </motion.div>

          {/* Hero Subtitle - Premium Scrolling Role Marquee */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-xl md:max-w-2xl mx-auto mb-6 relative overflow-hidden py-1 flex items-center select-none z-20"
          >
            <style>{`
              @keyframes marquee-roles {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
              }
              .animate-marquee-roles {
                animation: marquee-roles 20s linear infinite;
                will-change: transform;
              }
            `}</style>
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            <div className="flex animate-marquee-roles whitespace-nowrap">
              <div className="flex shrink-0 gap-6 items-center pr-6">
                {roles.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-6 text-xs md:text-sm font-light tracking-widest uppercase text-white/90">
                    <span className="bg-gradient-to-r from-blue-300 via-white to-indigo-200 bg-clip-text text-transparent hover:text-white transition-colors duration-300 font-semibold drop-shadow-[0_0_8px_rgba(147,197,253,0.25)]">
                      {role}
                    </span>
                    <span className="text-blue-400 font-extrabold text-[10px] select-none opacity-60">•</span>
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 gap-6 items-center pr-6">
                {roles.map((role, idx) => (
                  <div key={`dup-${idx}`} className="flex items-center gap-6 text-xs md:text-sm font-light tracking-widest uppercase text-white/90">
                    <span className="bg-gradient-to-r from-blue-300 via-white to-indigo-200 bg-clip-text text-transparent hover:text-white transition-colors duration-300 font-semibold drop-shadow-[0_0_8px_rgba(147,197,253,0.25)]">
                      {role}
                    </span>
                    <span className="text-blue-400 font-extrabold text-[10px] select-none opacity-60">•</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hero Description */}
          <motion.p
            variants={itemVariants}
            className="text-on-surface-variant/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-white/70 font-sans tracking-wide"
          >
            Passionate AI Developer and Gen AI Engineer Intern focused on building intelligent applications using Generative AI, Machine Learning, Data Science, Analytics, NLP, RAG Systems, and Modern Web Technologies. Creating impactful AI solutions that transform data into meaningful experiences.
          </motion.p>

          {/* Dual-Direction Scrolling Marquee */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl mx-auto mt-10 mb-2 flex flex-col gap-4 select-none relative z-20 pointer-events-auto"
          >
            <style>{`
              @keyframes marquee-left {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
              }
              @keyframes marquee-right {
                0% { transform: translate3d(-50%, 0, 0); }
                100% { transform: translate3d(0, 0, 0); }
              }
              .animate-marquee-left {
                animation: marquee-left 30s linear infinite;
                will-change: transform;
              }
              .animate-marquee-right {
                animation: marquee-right 30s linear infinite;
                will-change: transform;
              }
            `}</style>

            {/* Row 1: Right to Left */}
            <div className="relative flex overflow-hidden w-full py-1">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
              
              <div className="flex animate-marquee-left hover:[animation-play-state:paused] pointer-events-auto">
                <div className="flex shrink-0 gap-3 items-center pr-3">
                  {row1Tags.map((tag, idx) => (
                    <div 
                      key={idx} 
                      className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-blue-400/35 hover:bg-white/[0.04] text-xs font-sans font-medium tracking-wide text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.18)] flex-shrink-0 cursor-default"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex shrink-0 gap-3 items-center pr-3">
                  {row1Tags.map((tag, idx) => (
                    <div 
                      key={`dup1-${idx}`} 
                      className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-blue-400/35 hover:bg-white/[0.04] text-xs font-sans font-medium tracking-wide text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.18)] flex-shrink-0 cursor-default"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Left to Right */}
            <div className="relative flex overflow-hidden w-full py-1">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
              
              <div className="flex animate-marquee-right hover:[animation-play-state:paused] pointer-events-auto">
                <div className="flex shrink-0 gap-3 items-center pr-3">
                  {row2Tags.map((tag, idx) => (
                    <div 
                      key={idx} 
                      className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-blue-400/35 hover:bg-white/[0.04] text-xs font-sans font-medium tracking-wide text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.18)] flex-shrink-0 cursor-default"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex shrink-0 gap-3 items-center pr-3">
                  {row2Tags.map((tag, idx) => (
                    <div 
                      key={`dup2-${idx}`} 
                      className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-blue-400/35 hover:bg-white/[0.04] text-xs font-sans font-medium tracking-wide text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.18)] flex-shrink-0 cursor-default"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-10 w-full pointer-events-auto"
          >
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="group relative px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 text-white text-[11px] font-semibold tracking-widest font-label-caps transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden cursor-pointer pointer-events-auto"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="group relative px-8 py-4 rounded-full bg-primary hover:bg-primary-container text-on-primary-fixed hover:text-white font-bold text-[11px] tracking-widest font-label-caps transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(173,198,255,0.25)] hover:shadow-[0_0_40px_rgba(173,198,255,0.45)] cursor-pointer pointer-events-auto"
            >
              <span>CONTACT ME</span>
              <Mail className="w-3.5 h-3.5 text-on-primary-fixed group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          {/* Redesigned Premium Professional Skill Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl w-full mt-20"
          >
            {skillCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="group relative p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all duration-300 backdrop-blur-md text-left overflow-hidden flex flex-col justify-between"
                  style={{ minHeight: "135px" }}
                >
                  {/* Glowing background aura on hover */}
                  <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-tr ${card.color} rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
                      <IconComp className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono-technical text-white/20 group-hover:text-primary/45 transition-colors">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="font-headline-lg text-[13px] md:text-sm font-bold text-white tracking-wide uppercase mb-1 flex items-center gap-1.5 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-mono-technical text-[10px] text-white/45 tracking-wide leading-relaxed">
                      {card.tags}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </Scroll3DWrapper>
    </section>
  );
}
