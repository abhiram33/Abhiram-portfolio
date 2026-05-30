import React from "react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import { Fingerprint, Landmark, MapPin, Database, Award, Info } from "lucide-react";

export default function About() {
  const metrics = [
    {
      title: "FOCUS_MATRIX",
      value: "Multi-Agent Chains & RAG",
      icon: Database,
    },
    {
      title: "LOC_COORDS",
      value: "Kerala, India (UTC+5:30)",
      icon: MapPin,
    },
  ];

  return (
    <section id="about" className="py-24 px-6 relative max-w-5xl mx-auto w-full">
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-secondary/3 rounded-full blur-[100px] pointer-events-none" />

      <Scroll3DWrapper>
        <div className="space-y-12">
          {/* Identity Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-secondary" />
              <span className="font-mono-technical text-[11px] text-secondary tracking-[0.4em] uppercase font-semibold">
                01 — SYSTEM_IDENTITY
              </span>
            </div>
            <h2 className="font-headline-lg text-4xl md:text-5xl text-white font-bold leading-tight">
              SYSTEM_OVERVIEW
            </h2>
            <div className="w-16 h-0.5 bg-primary/30" />
          </div>

          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-7 space-y-6 text-on-surface-variant/95">
              <p className="font-body-md text-lg leading-relaxed">
                I am Abhiram A, a <span className="text-primary font-semibold">Generative AI Engineer Intern</span> dedicated to architecting robust layers connecting modern neural architectures with concrete enterprise databases.
              </p>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant/80 leading-relaxed">
                My engineering focus is centered on grounding large language models, perfecting chunk segregation strategies in RAG pipelines, training multi-agent routers, and evaluating vector distance partitions (FAISS indices).
              </p>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant/80 leading-relaxed">
                Drawing from a foundational background in Auto Electronics Diagnostics, I approach codebases with methodical, diagnostic-first precision. This allows me to analyze token efficiency, latency buffers, and prediction logs systematically.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="md:col-span-5 grid gap-4 w-full">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/3 border border-white/5 backdrop-blur-md flex items-start gap-4 transition-all duration-300 hover:bg-white/5 hover:border-white/10"
                  >
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 mt-1">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="block font-mono-technical text-[9px] text-on-surface-variant/40 tracking-wider">
                        {metric.title}
                      </span>
                      <span className="block mt-0.5 text-xs text-white font-semibold font-mono-technical">
                        {metric.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Scroll3DWrapper>
    </section>
  );
}
