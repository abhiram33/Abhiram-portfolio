import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import {
  FolderGit2,
  ExternalLink,
  Github,
  Play,
  RotateCcw,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle,
  AlertTriangle,
  Code,
} from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activePlayground, setActivePlayground] = useState<string | null>(null);

  // Playground 1 State (RAG)
  const [ragDoc, setRagDoc] = useState(
    "Abhiram A is a Generative AI Engineer specialized in RAG. He is based in Kerala, India and uses FAISS vector search database with LangChain orchestration layers."
  );
  const [ragQuery, setRagQuery] = useState("Where is Abhiram based?");
  const [ragResult, setRagResult] = useState<{
    chunks: string[];
    matchingIndex: number;
    response: string;
    steps: string[];
  } | null>(null);
  const [ragLoading, setRagLoading] = useState(false);

  // Playground 2 State (ATS)
  const [atsJobDesc, setAtsJobDesc] = useState(
    "Looking for a Generative AI Engineer skilled in NLP, Python, LangChain, FAISS vector search, and model grounding."
  );
  const [atsResume, setAtsResume] = useState(
    "Abhiram A - Generative AI Engineer. Experienced in Python data pipelines, prompt engineering, and RAG architectures."
  );
  const [atsResult, setAtsResult] = useState<{
    score: number;
    matchingKeywords: string[];
    missingKeywords: string[];
    recommendations: string[];
  } | null>(null);
  const [atsLoading, setAtsLoading] = useState(false);

  // Playground 3 State (Scraping)
  const [scrapingUrl, setScrapingUrl] = useState("https://news.ycombinator.com");
  const [scrapingDepth, setScrapingDepth] = useState(1);
  const [scrapingLoading, setScrapingLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<{
    title: string;
    extractedCount: number;
    averageDensity: number;
    semanticSummary: string;
    items: Array<{ title: string; score: string; age: string }>;
    steps: string[];
  } | null>(null);

  // Playground 4 State (AI Voice Sentry)
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [voiceCommand, setVoiceCommand] = useState("Analyze vocal telemetry logs");
  const [voiceResponse, setVoiceResponse] = useState("");
  const [vocalFrequencyMultiplier, setVocalFrequencyMultiplier] = useState(1);

  // Simulation Trigger: RAG
  const runRagSimulation = () => {
    if (!ragDoc.trim() || !ragQuery.trim()) return;
    setRagLoading(true);
    setRagResult(null);

    const steps = [
      "[SYS] Initiating document ingestion protocol...",
      "[SYS] Compiling recursive text splitter with overlap set to 30 characters...",
      "[SYS] Calculating vector embeddings using huggingface sentence-encoders...",
      "[SYS] Seeding local FAISS similarity flat map index...",
      "[SYS] Searching partitions via Cosine similarity matching...",
    ];

    setTimeout(() => {
      // Split doc into roughly chunks based on sentences
      const chunks = ragDoc
        .split(/[.!?]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // Find matching index
      let matchingIndex = 0;
      let highestOverlap = 0;
      const queryWords = ragQuery.toLowerCase().split(/\s+/);

      chunks.forEach((chunk, idx) => {
        let overlapCount = 0;
        queryWords.forEach((word) => {
          if (word.length > 3 && chunk.toLowerCase().includes(word)) {
            overlapCount++;
          }
        });
        if (overlapCount > highestOverlap) {
          highestOverlap = overlapCount;
          matchingIndex = idx;
        }
      });

      // Frame answer grounded in retrieved chunk
      const matchedChunk = chunks[matchingIndex] || chunks[0] || "No context found.";
      let generatedResponse = "";

      if (ragQuery.toLowerCase().includes("where") || ragQuery.toLowerCase().includes("based")) {
        generatedResponse = `Based on the retrieved context chunk: "${matchedChunk}", Abhiram A is located/based in Kerala, India.`;
      } else if (ragQuery.toLowerCase().includes("specialized") || ragQuery.toLowerCase().includes("skill")) {
        generatedResponse = `Derived from system source alignment: Abhiram A specializes in Generative AI, RAG chains, and FAISS database structures.`;
      } else {
        generatedResponse = `Synthesized Response (Context Grounded): Verified against local FAISS database, the ground truth resides in: "${matchedChunk}".`;
      }

      setRagResult({
        chunks,
        matchingIndex,
        response: generatedResponse,
        steps,
      });
      setRagLoading(false);
    }, 1800);
  };

  // Simulation Trigger: ATS
  const runAtsSimulation = () => {
    if (!atsJobDesc.trim() || !atsResume.trim()) return;
    setAtsLoading(true);
    setAtsResult(null);

    setTimeout(() => {
      const keywords = ["python", "langchain", "faiss", "nlp", "grounding", "rag", "vector search"];
      const resumeLower = atsResume.toLowerCase();
      const jdLower = atsJobDesc.toLowerCase();

      const matchingKeywords = keywords.filter(
        (kw) => resumeLower.includes(kw) && jdLower.includes(kw)
      );
      const missingKeywords = keywords.filter(
        (kw) => jdLower.includes(kw) && !resumeLower.includes(kw)
      );

      const baseScore = Math.round(
        (matchingKeywords.length / (matchingKeywords.length + missingKeywords.length || 1)) * 100
      );
      const randomOffset = Math.floor(Math.random() * 8) - 4; // realistic variance
      const score = Math.max(20, Math.min(98, baseScore + randomOffset));

      const recommendations = [
        "Include active projects focusing on specialized vector systems.",
        missingKeywords.length > 0
          ? `Add concrete bullet points referencing your experience with: ${missingKeywords.join(", ")}.`
          : "Your resume represents strong alignment! Expand on metrics highlighting query speed or accuracy ratios.",
      ];

      setAtsResult({
        score,
        matchingKeywords,
        missingKeywords,
        recommendations,
      });
      setAtsLoading(false);
    }, 1500);
  };

  // Simulation Trigger: Scraping
  const runScrapingSimulation = () => {
    if (!scrapingUrl.trim()) return;
    setScrapingLoading(true);
    setScrapedData(null);

    const steps = [
      "[WEB_DRIVER] Opening headless browser instance (Selenium Engine)...",
      "[PARSER] Downloading HTML structure & extracting selective BeautifulSoup nodes...",
      "[CLEANER] Detaching scripts, style grids, and boilerplate metadata wrappers...",
      "[LLM_INTEGRATION] Routing textual elements to Gemini API for semantic clustering...",
      "[RENDER] Rendering analytical visualization widgets on the Streamlit stage...",
    ];

    setTimeout(() => {
      const items = [
        { title: "Show HN: FAISS Vector search on client networks", score: "142 points", age: "2 hours ago" },
        { title: "Why Python is the leading language for LLM orchestration", score: "318 points", age: "5 hours ago" },
        { title: "BeautifulSoup vs Regulatory Scraping API specifications", score: "88 points", age: "8 hours ago" },
        { title: "Selenium headless workflows under extreme server protection matrices", score: "95 points", age: "1 day ago" }
      ];
      
      let summary = "Scraped data processed from target domain. Semantic mapping of text strings identifies high keyword density related to AI engineering, vector storage parameters, and automated browser simulations. High-priority feeds clustered around technical solutions rather than general chatter.";
      
      let extractedCount = 42;
      let title = "Hacker News - Tech & Startups";
      
      if (scrapingUrl.toLowerCase().includes("github")) {
        title = "GitHub - Trending Machine Learning Repositories";
        items[0] = { title: "langchain-ai/langchain: Orchestrate agent networks", score: "42.1k stars", age: "Built today" };
        items[1] = { title: "google-gemini/vocalis-voice-sentry: Realtime TTS", score: "1.2k stars", age: "Built today" };
        items[2] = { title: "beautifulsoup4: HTML nodes and tag configurations", score: "8.5k stars", age: "1 week ago" };
        items[3] = { title: "selenium/webdriver: Dynamic browser execution layer", score: "29.2k stars", age: "3 days ago" };
        summary = "Extracted active repository labels. Data intelligence nodes flag an intense build focus on Agent APIs, multi-voice biometrics systems, and headless Chrome diagnostic utilities.";
        extractedCount = 74;
      } else if (scrapingUrl.toLowerCase().includes("medium") || scrapingUrl.toLowerCase().includes("blog")) {
        title = "Medium - AI & Predictive Modeling Feed";
        items[0] = { title: "How I built a full standalone voice pipeline in under an hour", score: "1.4k claps", age: "3 days ago" };
        items[1] = { title: "Deepdive: BeautifulSoup selectors for non-tabular grids", score: "920 claps", age: "4 days ago" };
        items[2] = { title: "Behind the scenes of automated RAG databases and citation loops", score: "2.1k claps", age: "6 days ago" };
        items[3] = { title: "Solving memory leaks in Selenium Chrome profile initializations", score: "540 claps", age: "12 days ago" };
        summary = "Identified editorial clusters regarding low-latency vocal synthesis setups and Selenium performance improvements. Data intelligence shows growing user search queries on prompt structuring.";
        extractedCount = 15;
      }

      setScrapedData({
        title,
        extractedCount,
        averageDensity: 94.2,
        semanticSummary: summary,
        items,
        steps
      });
      setScrapingLoading(false);
    }, 2200);
  };

  // Simulation Trigger: Voice
  const runVoiceSimulation = () => {
    if (!voiceCommand.trim() || voiceStatus !== "idle") return;
    
    // Step 1: Listening
    setVoiceStatus("listening");
    setVoiceResponse("");
    setVocalFrequencyMultiplier(2.5); // Accelerated frequency activity
    
    setTimeout(() => {
      // Step 2: Processing / Parse Intent
      setVoiceStatus("processing");
      setVocalFrequencyMultiplier(1.0); // Steady compression amplitude
      
      setTimeout(() => {
        // Step 3: Speech Synthesis response Formulation
        setVoiceStatus("speaking");
        setVocalFrequencyMultiplier(4.2); // Resonated speech peaks
        
        let reply = "";
        const cmd = voiceCommand.toLowerCase();
        if (cmd.includes("telemetry") || cmd.includes("log")) {
          reply = "[Vocalis-Sentry]: Synthesizing vocal frequency logs. Spectral calculations report a stable resonance at 112 Hertz. Zero active anomalies detected in the streaming audio buffer.";
        } else if (cmd.includes("diagnostic") || cmd.includes("audit")) {
          reply = "[Vocalis-Sentry]: Initiating biometric voice node diagnostics. Waveform analysis complete. Neural vector matching integrity verified at 99.4% security threshold.";
        } else if (cmd.includes("health") || cmd.includes("pipeline")) {
          reply = "[Vocalis-Sentry]: System telemetry health: Speech pipelines are fully live. Express, React, and client-side FAISS layers are operating at peak efficiency.";
        } else {
          reply = `[Vocalis-Sentry]: Speech intent parsed correctly. Signal input sequence: "${voiceCommand}" mapped. All synthesizers are locked on secure bandwidths.`;
        }
        
        setVoiceResponse(reply);
        
        // Trigger browser native speech synthesis (wrapped safely)
        if (typeof window !== "undefined" && window.speechSynthesis) {
          try {
            window.speechSynthesis.cancel();
            const cleanText = reply.replace("[Vocalis-Sentry]:", "");
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.02;
            utterance.pitch = 0.95;
            utterance.onend = () => {
              setVoiceStatus("idle");
              setVocalFrequencyMultiplier(1.0);
            };
            utterance.onerror = () => {
              setVoiceStatus("idle");
              setVocalFrequencyMultiplier(1.0);
            };
            window.speechSynthesis.speak(utterance);
          } catch (err) {
            // Safe fallback timer
            setTimeout(() => {
              setVoiceStatus("idle");
              setVocalFrequencyMultiplier(1.0);
            }, 4000);
          }
        } else {
          // Fallback if speech synth is not available in iframe sandbox
          setTimeout(() => {
            setVoiceStatus("idle");
            setVocalFrequencyMultiplier(1.0);
          }, 4000);
        }
      }, 1200);
    }, 1400);
  };

  return (
    <section id="projects" className="py-24 px-6 relative max-w-7xl mx-auto w-full">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <Scroll3DWrapper>
        {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-secondary" />
            <span className="font-mono-technical text-[11px] text-secondary tracking-[0.4em] uppercase font-semibold">
              03 — CODESPACE_LOBBY
            </span>
          </div>
          <h2 className="font-headline-lg text-4xl md:text-5xl text-white font-bold uppercase tracking-tight">
            Active System Logs
          </h2>
          <div className="w-20 h-0.5 bg-primary/30" />
        </div>
        <div className="font-mono-technical text-primary/45 text-[10px] tracking-widest bg-white/3 border border-white/5 py-1.5 px-4 rounded-full">
          STATUS // STABLE_MODULES_ONLINE
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl bg-white/3 border border-white/5 overflow-hidden backdrop-blur-md hover:border-primary/20 hover:shadow-[0_20px_40px_-20px_rgba(173,198,255,0.15)] transition-all duration-500 flex flex-col h-full"
          >
            {/* Image banner */}
            <div className="h-48 relative overflow-hidden bg-black/45">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 font-mono-technical text-[9px] px-3 py-1 bg-black/60 border border-white/10 rounded-full text-primary">
                {project.category}
              </span>
            </div>

            {/* Content info */}
            <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-headline-lg text-2xl text-white font-bold tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-on-surface-variant/80 leading-relaxed min-h-[60px]">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-technical text-[9px] text-on-surface-variant/50 px-2 py-0.5 bg-white/5 border border-white/8 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-auto">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/3 text-xs text-on-surface-variant/30 border border-transparent select-none cursor-not-allowed">
                    <Code className="w-3.5 h-3.5" />
                    <span>PRIVATE</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setActivePlayground(project.simulationType);
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl bg-primary hover:bg-primary-container text-xs text-on-primary-fixed font-semibold transition-colors shadow-md"
                >
                  <Play className="w-3 h-3 text-on-primary-fixed" />
                  <span>PLAYGROUND</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Simulation Expander Block */}
      <AnimatePresence>
        {selectedProject && activePlayground && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="mt-12 p-8 rounded-[2.5rem] bg-white/3 border border-primary/20 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          >
            {/* Visual Header */}
            <div className="flex justify-between items-start border-b border-white/5 pb-6 mb-6">
              <div className="space-y-1">
                <span className="font-mono-technical text-[9px] text-primary tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  LIVE SYSTEM_SIMULATOR ACTIVE
                </span>
                <h3 className="font-headline-lg text-2xl font-bold text-white uppercase">
                  {selectedProject.title} Sandbox
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setActivePlayground(null);
                }}
                className="px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-[10px] text-white font-mono-technical tracking-wider"
              >
                SHUT_DOWN.EXE
              </button>
            </div>

            {/* Dynamic Playgrounds Router */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left explanation info */}
              <div className="space-y-4 bg-white/2 p-6 rounded-2xl border border-white/5">
                <h4 className="font-label-caps text-xs text-white font-bold">
                  About Project Pipelines
                </h4>
                <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                  {selectedProject.detailedExplanation}
                </p>
                <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex gap-3 text-[11px] text-on-surface-variant/70">
                  <span className="material-symbols-outlined text-yellow-500/60 mt-0.5">info</span>
                  <span>
                    This simulation runs authentic matching and splitting logic client-side to demonstrate practical vector, retrieval, and analytical methodologies.
                  </span>
                </div>
              </div>

              {/* Right interaction dashboard */}
              <div>
                {/* 1. RAG PLAYGROUND */}
                {activePlayground === "rag" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        Knowledge base document context
                      </label>
                      <textarea
                        value={ragDoc}
                        onChange={(e) => setRagDoc(e.target.value)}
                        className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        Semantic query prompt
                      </label>
                      <input
                        type="text"
                        value={ragQuery}
                        onChange={(e) => setRagQuery(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>

                    <button
                      onClick={runRagSimulation}
                      disabled={ragLoading}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary-fixed hover:text-on-primary font-bold text-xs font-mono-technical transition-colors flex items-center justify-center gap-2"
                    >
                      {ragLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>GROUNDING VECTORS...</span>
                        </>
                      ) : (
                        <span>INITIATE RAG SIMULATION</span>
                      )}
                    </button>

                    {/* Result */}
                    {ragResult && (
                      <div className="space-y-3 pt-3">
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                          <span className="block text-[8px] font-mono-technical text-primary/40 uppercase">
                            SIMULATED FAISS RETRIEVED SEGREGATIONS ({ragResult.chunks.length} chunks)
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {ragResult.chunks.map((ck, i) => (
                              <div
                                key={i}
                                className={`p-2 rounded text-[11px] font-mono-technical border ${
                                  ragResult.matchingIndex === i
                                    ? "bg-primary/10 border-primary/20 text-white"
                                    : "bg-white/2 border-transparent text-white/40"
                                }`}
                              >
                                {ragResult.matchingIndex === i ? "➔ [FAISS_MATCH] " : "[CHUNK] "} {ck}.
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 space-y-1">
                          <span className="block text-[8px] font-mono-technical text-primary uppercase">
                            FINAL CONTEXTULIZED LLM GENERATION
                          </span>
                          <p className="text-xs text-white leading-relaxed">
                            {ragResult.response}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. ATS PLAYGROUND */}
                {activePlayground === "ats" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        Target Job Description Requirements
                      </label>
                      <textarea
                        value={atsJobDesc}
                        onChange={(e) => setAtsJobDesc(e.target.value)}
                        className="w-full h-20 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        Candidate Resume Summary / Focus Section
                      </label>
                      <textarea
                        value={atsResume}
                        onChange={(e) => setAtsResume(e.target.value)}
                        className="w-full h-20 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>

                    <button
                      onClick={runAtsSimulation}
                      disabled={atsLoading}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary-fixed hover:text-on-primary font-bold text-xs font-mono-technical transition-colors flex items-center justify-center gap-2"
                    >
                      {atsLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>NLP PARSING ACTIVES...</span>
                        </>
                      ) : (
                        <span>EXECUTE ATS MATRIX SCORE</span>
                      )}
                    </button>

                    {/* Result */}
                    {atsResult && (
                      <div className="space-y-3 pt-3">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-center">
                            <span className="block text-[8px] font-mono-technical text-primary/45 uppercase">MATCH_SCORE</span>
                            <span className="block text-3xl font-headline-lg font-bold text-white">
                              {atsResult.score}%
                            </span>
                          </div>
                          <div className="h-10 w-[1px] bg-white/10" />
                          <div>
                            <span className="block text-[8px] font-mono-technical text-primary/45 uppercase mb-1">ALIGNMENT RATING</span>
                            <span className={`text-[10px] font-mono-technical font-semibold px-2 py-0.5 rounded ${
                              atsResult.score >= 80
                                ? "bg-green-500/10 text-green-400 border border-green-500/15"
                                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/15"
                            }`}>
                              {atsResult.score >= 80 ? "STRONG_ALIGNMENT" : "GAPS_DETECTED"}
                            </span>
                          </div>
                        </div>

                        {/* Recommendation bullet grids */}
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2 text-xs">
                          <span className="block text-[8px] font-mono-technical text-primary/45">SEMANTIC MATCH DATA</span>
                          <div className="flex flex-wrap gap-1.5">
                            {atsResult.matchingKeywords.map((kw) => (
                              <span key={kw} className="px-2 py-0.5 rounded bg-green-500/5 text-green-400 font-mono-technical text-[9px] border border-green-500/10">
                                ✓ {kw}
                              </span>
                            ))}
                            {atsResult.missingKeywords.map((kw) => (
                              <span key={kw} className="px-2 py-0.5 rounded bg-red-500/5 text-red-400 font-mono-technical text-[9px] border border-red-500/10 border-dashed">
                                ✗ {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SCRAPING PLAYGROUND */}
                {activePlayground === "scraping" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        Target Scraping URL Domain Address
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={scrapingUrl}
                          onChange={(e) => setScrapingUrl(e.target.value)}
                          disabled={scrapingLoading}
                          className="flex-grow bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50 font-mono-technical"
                          placeholder="e.g., https://news.ycombinator.com"
                        />
                      </div>
                    </div>

                    {/* Pre-written selection presets */}
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono-technical text-white/40 uppercase">
                        Payload presets
                      </label>
                      <div className="flex gap-2">
                        {[
                          { name: "Hacker News", url: "https://news.ycombinator.com" },
                          { name: "GitHub Trending", url: "https://github.com/trending/machine-learning" },
                          { name: "AI Web Blogs", url: "https://medium.com/tag/artificial-intelligence" }
                        ].map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            disabled={scrapingLoading}
                            onClick={() => setScrapingUrl(p.url)}
                            className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono-technical transition-all ${
                              scrapingUrl === p.url
                                ? "bg-primary/10 border-primary/45 text-primary"
                                : "bg-black/20 border-white/5 text-white/60 hover:border-white/10"
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={runScrapingSimulation}
                      disabled={scrapingLoading}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary-fixed hover:text-on-primary font-bold text-xs font-mono-technical transition-colors flex items-center justify-center gap-2"
                    >
                      {scrapingLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>SCRAPING SECTIONS & RUNNING BEAUTIFULSOUP...</span>
                        </>
                      ) : (
                        <span>EXECUTE BeautifulSoup DOM INGESTION</span>
                      )}
                    </button>

                    {/* Progress steps or result outputs */}
                    {scrapingLoading && (
                      <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2">
                        <span className="block text-[8px] font-mono-technical text-primary/60 uppercase animate-pulse">
                          AUTOMATED INGESTION SEQUENCE STARTED
                        </span>
                        <div className="space-y-1.5 font-mono-technical text-[9px] text-white/60">
                          <div className="flex items-center gap-2 text-primary">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                            <span>[SELENIUM] Initializing Chrome Driver headless environment...</span>
                          </div>
                          <div className="text-white/30">[BEAUTIFULSOUP] Waiting for document structure query tags...</div>
                          <div className="text-white/30">[GEMINI_API] Waiting to cluster contextual trends...</div>
                        </div>
                      </div>
                    )}

                    {scrapedData && (
                      <div className="space-y-3 pt-2">
                        {/* Summary Widget */}
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl space-y-2">
                          <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                            <span className="block text-[8px] font-mono-technical text-primary uppercase">
                              DATA OBJECTS STRUCTURAL PARSE
                            </span>
                            <span className="text-[7.5px] font-mono-technical text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                              SUCCESS // DENSITY: {scrapedData.averageDensity}%
                            </span>
                          </div>
                          <h5 className="text-[11px] font-headline-lg font-bold text-white uppercase tracking-tight">
                            Source Title: {scrapedData.title}
                          </h5>
                          <p className="text-[11px] text-on-surface-variant/90 leading-relaxed font-mono-technical italic text-white/80">
                            &gt; Semantic AI Classification: "{scrapedData.semanticSummary}"
                          </p>
                        </div>

                        {/* Extracted tabular list */}
                        <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2">
                          <span className="block text-[8px] font-mono-technical text-white/40 uppercase">
                            BeautifulSoup Extracted Nodes Table ({scrapedData.extractedCount} elements tagged)
                          </span>
                          <div className="space-y-1.5 max-h-36 overflow-y-auto scroll-bar-nav">
                            {scrapedData.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="p-2 rounded bg-white/2 border border-white/5 flex justify-between items-center text-[10px] font-mono-technical hover:bg-white/5 transition-colors"
                              >
                                <span className="text-white font-medium truncate max-w-[200px] sm:max-w-[280px]">
                                  {idx + 1}. {it.title}
                                </span>
                                <div className="flex gap-1.5 shrink-0">
                                  <span className="px-1.5 py-0.5 bg-primary/15 text-primary text-[8px] rounded border border-primary/10">
                                    {it.score}
                                  </span>
                                  <span className="px-1.5 py-0.5 bg-white/5 text-white/45 text-[8px] rounded">
                                    {it.age}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. VOICE PLAYGROUND */}
                {activePlayground === "voice" && (
                  <div className="space-y-6">
                    {/* Status indicator and Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/30 p-4 border border-white/5 rounded-2xl gap-4">
                      <div className="space-y-1">
                        <span className="block font-mono-technical text-[8px] text-primary/45 uppercase">VOICE INTERACTIVE BIOMETRIC NODE</span>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            voiceStatus === "listening" ? "bg-amber-500 animate-ping" :
                            voiceStatus === "processing" ? "bg-purple-500 animate-pulse" :
                            voiceStatus === "speaking" ? "bg-green-400 animate-pulse" :
                            "bg-primary/40"
                          }`} />
                          <span className="text-xs font-mono-technical font-semibold uppercase text-white">
                            {voiceStatus === "idle" && "IDLE // READY_FOR_SIGNAL"}
                            {voiceStatus === "listening" && "Capturing Audio Signals..."}
                            {voiceStatus === "processing" && "Performing Semantic Analysis..."}
                            {voiceStatus === "speaking" && "Vocalizing Response..."}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={runVoiceSimulation}
                        disabled={voiceStatus !== "idle"}
                        className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-mono-technical transition-all flex items-center gap-2 ${
                          voiceStatus !== "idle"
                            ? "bg-white/5 text-white/30 border border-transparent cursor-not-allowed"
                            : "bg-primary hover:bg-primary-container text-on-primary-fixed hover:shadow-lg shadow-primary/10 border border-primary/20"
                        }`}
                      >
                        {voiceStatus === "listening" && "AWAITING..."}
                        {voiceStatus === "processing" && "COMPILING INTENTS..."}
                        {voiceStatus === "speaking" && "VOCALIZING..."}
                        {voiceStatus === "idle" && (
                          <>
                            <Play className="w-3.5 h-3.5 text-on-primary-fixed" />
                            <span>SPEAK TRIGGER COMMAND</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Pre-written Command selections */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        Select a Biometric voice command payload
                      </label>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {[
                          "Analyze vocal telemetry logs",
                          "Biometric node diagnostic audit",
                          "Verify system API connections"
                        ].map((cmd) => (
                          <button
                            key={cmd}
                            type="button"
                            disabled={voiceStatus !== "idle"}
                            onClick={() => setVoiceCommand(cmd)}
                            className={`p-3 rounded-xl border text-[10px] font-mono-technical text-left transition-all ${
                              voiceCommand === cmd
                                ? "bg-primary/10 border-primary/40 text-primary font-medium"
                                : "bg-black/30 border-white/5 hover:border-white/20 text-white/70"
                            } ${voiceStatus !== "idle" ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            &gt; "{cmd}"
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Graphic Equalizer/Oscillating Waves */}
                    <div className="h-28 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden px-4">
                      {/* Grid background coordinate lines */}
                      <div className="absolute inset-x-0 h-[1px] bg-white/5 top-1/2" />
                      <div className="absolute inset-y-0 w-[1px] bg-white/5 left-1/3" />
                      <div className="absolute inset-y-0 w-[1px] bg-white/5 left-2/3" />
                      
                      <div className="flex items-end gap-1 z-10 w-full justify-center max-w-sm h-[80px]">
                        {Array.from({ length: 24 }).map((_, idx) => {
                          const centerFactor = Math.sin((idx / 23) * Math.PI); // 0 at ends, 1 at center
                          return (
                            <motion.div
                              key={idx}
                              initial={{ height: 12 }}
                              animate={{
                                height: voiceStatus === "idle"
                                  ? [10 + centerFactor * 8, 12 + centerFactor * 14, 10 + centerFactor * 8]
                                  : voiceStatus === "listening"
                                  ? [12, centerFactor * 48 + Math.random() * 20, 12]
                                  : voiceStatus === "processing"
                                  ? [15, centerFactor * 24 + Math.random() * 10, 15]
                                  : [12, centerFactor * 78 + Math.random() * 25, 12] // spoken wave peaks
                              }}
                              transition={{
                                duration: voiceStatus === "speaking" ? 0.45 : voiceStatus === "listening" ? 0.7 : 1.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: idx * 0.02
                              }}
                              className={`w-1 rounded-full transition-colors duration-500 ${
                                voiceStatus === "listening" ? "bg-amber-400" :
                                voiceStatus === "processing" ? "bg-purple-400" :
                                voiceStatus === "speaking" ? "bg-primary" :
                                "bg-white/10"
                              }`}
                            />
                          );
                        })}
                      </div>

                      <span className="absolute bottom-2 right-4 text-[7px] text-white/30 font-mono-technical tracking-widest uppercase">
                        AUDIO_WAVE telemetry // GAIN_{vocalFrequencyMultiplier.toFixed(1)}X
                      </span>
                    </div>

                    {/* Final Output subtitle response panel */}
                    <AnimatePresence>
                      {voiceResponse && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          className="p-5 rounded-2xl bg-primary/10 border border-primary/20 space-y-3"
                        >
                          <div className="flex justify-between items-center border-b border-primary/15 pb-2">
                            <span className="block text-[8px] font-mono-technical text-primary uppercase tracking-widest">
                              SECURE BIOMETRIC RE-SYNTH VOICE BUFFER
                            </span>
                          </div>
                          
                          <p className="text-xs text-white leading-relaxed font-mono-technical">
                            <span className="text-primary font-bold mr-2">&gt;</span>
                            {voiceResponse}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </Scroll3DWrapper>
    </section>
  );
}
