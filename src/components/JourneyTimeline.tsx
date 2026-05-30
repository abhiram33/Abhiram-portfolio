import React from "react";
import { motion } from "motion/react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import { Award, GraduationCap, CheckCircle2, Milestone } from "lucide-react";
import { JOURNEY } from "../data";

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 px-6 relative max-w-4xl mx-auto w-full">
      {/* Visual background element */}
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <Scroll3DWrapper>
        {/* Section Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Milestone className="w-4 h-4 text-secondary" />
          <span className="font-mono-technical text-[11px] text-secondary tracking-[0.4em] uppercase font-semibold">
            05 — CHRONOLOGY_INDEX
          </span>
        </div>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-white font-bold uppercase tracking-tight">
          System Journey Arc
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>

      {/* Timeline Layout */}
      <div className="relative space-y-16">
        {/* Longitudinal Rail Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-primary via-secondary/40 to-transparent opacity-25" />

        {JOURNEY.map((item, idx) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              key={item.year}
              className="relative pl-16 group"
            >
              {/* Outer circular badge node */}
              <div className="absolute left-0 w-14 h-14 rounded-full bg-white/3 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-primary/40 transition-transform z-10 shadow-lg">
                {idx === 0 ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-on-surface-variant/75" />
                )}
              </div>

              {/* Text Cards */}
              <div className="space-y-3 transform transition-transform group-hover:translate-x-1.5 duration-300 bg-white/2 border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="block font-mono-technical text-[10px] text-primary tracking-widest uppercase font-semibold">
                      {item.year}
                    </span>
                    <h3 className="font-headline-lg text-xl md:text-2xl text-white font-bold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono-technical text-[9px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest">
                    {item.badge}
                  </span>
                </div>

                <p className="font-mono-technical text-xs text-on-surface-variant/50">
                  {item.subtitle}
                </p>

                <p className="font-body-md text-xs md:text-sm text-on-surface-variant/80 leading-relaxed pt-2 border-t border-white/5">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      </Scroll3DWrapper>
    </section>
  );
}
