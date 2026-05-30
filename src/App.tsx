import React from "react";
import ThreeBackground from "./components/ThreeBackground";
import FloatingNav from "./components/FloatingNav";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsHub from "./components/SkillsHub";
import ProjectGrid from "./components/ProjectGrid";
import ChatTerminal from "./components/ChatTerminal";
import JourneyTimeline from "./components/JourneyTimeline";
import ContactTerminal from "./components/ContactTerminal";

export default function App() {
  return (
    <div className="min-h-screen relative text-on-background bg-background overflow-hidden">
      {/* Dynamic Synaptic Starfield Canvas Background */}
      <ThreeBackground />

      {/* Floating System HUD Nav bar */}
      <FloatingNav />

      {/* Core Portfolio Scape Sections Layout */}
      <main className="relative z-10">
        <Hero />
        <About />
        <SkillsHub />
        <ProjectGrid />
        <ChatTerminal />
        <JourneyTimeline />
        <ContactTerminal />
      </main>

      {/* Futuristic System Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto py-16 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 mt-16 text-center md:text-left">
        <div>
          <p className="font-mono-technical text-[10px] text-on-surface-variant/40 tracking-widest uppercase">
            © 2026 ABHIRAM A. — ENGINEERED FOR GROUNDED INTELLIGENCE.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <span className="font-mono-technical text-[9px] text-primary/45 tracking-widest uppercase">
            v3.0.0-CINEMATIC_STABLE
          </span>
          <span className="font-mono-technical text-[9px] text-secondary/45 tracking-widest uppercase">
            NEURAL_NAV_CONNECTED
          </span>
        </div>
      </footer>
    </div>
  );
}
