import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import { Terminal, Send, Cpu, Trash2, HelpCircle, ArrowRight, RefreshCw, Sparkles, User } from "lucide-react";
import { Message } from "../types";

export default function ChatTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Connection established with Abhiram's Recruit-Uplink. I'm his representative AI Clone. Ask me questions about his skills, vector DB setups, LangChain routing models, or coordinates!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggestions for fast tap inputs
  const presetPrompts = [
    { label: "RAG Experience", prompt: "Explain your experience with modern RAG architectures and FAISS vector structures." },
    { label: "Work Availability", prompt: "What is your current relocation or remote work availability? Do you have contact details?" },
    { label: "Education Arc", prompt: "Tell me about your transition from Mechanic Auto Electronics ITI to Data Science and Generative AI." },
    { label: "Core Skills", prompt: "List your strongest Python, LLM orchestration, and NLP technical skills." },
  ];

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error(data.error || "Uplink packet lost. Try resetting session.");
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `[ERROR] Synapse transmission interrupted: ${err.message || "Failed to contact Gemini backend service."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    setMessages([
      {
        role: "assistant",
        text: "Recruit-Uplink session refreshed. Terminals synced.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <section id="recruiter-ai" className="py-24 px-6 relative max-w-4xl mx-auto w-full">
      {/* Glow */}
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-primary/4 rounded-full blur-[130px] pointer-events-none" />

      <Scroll3DWrapper>
        {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Terminal className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono-technical text-[11px] text-primary tracking-[0.4em] uppercase font-semibold">
            04 — INTERACTIVE_AGENT_HOST
          </span>
        </div>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-white font-bold uppercase tracking-tight">
          AI Candidate Representative
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>

      {/* Central Interactive Chat Node Structure */}
      <div className="rounded-[2.5rem] bg-white/3 border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col h-[650px] max-w-3xl mx-auto relative group hover:border-primary/20 transition-all duration-500">
        {/* Terminal Header Hub bar */}
        <div className="bg-black/45 border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 pointer-events-none" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 pointer-events-none" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 pointer-events-none" />
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <div className="flex items-center gap-2 font-mono-technical text-[10px] text-white/50 tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>CANDIDATE_AI_CLONE v2.5</span>
            </div>
          </div>

          <button
            onClick={clearSession}
            title="Clear Stream History"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant/70 hover:text-red-400 transition-colors border border-white/10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Message Feed Display */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6 scroll-bar-nav bg-black/10">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Profile Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border select-none ${
                    msg.role === "user"
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-secondary/10 border-secondary/20 text-secondary"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Cpu className="w-4 h-4" />
                  )}
                </div>

                {/* Bubble details */}
                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-3xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-on-primary-fixed shadow-[0_4px_12px_rgba(173,198,255,0.1)] rounded-tr-none font-medium"
                        : "bg-white/4 text-white hover:bg-white/5 transition-colors rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`block font-mono-technical text-[8px] text-on-surface-variant/30 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-9 h-9 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary animate-pulse">
                <Cpu className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-3xl bg-white/3 border border-white/5 text-xs text-secondary/70 flex items-center gap-2 font-mono-technical rounded-tl-none shadow-sm">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>AI REPRESENTATIVE QUERYING DEEP PATHWAYS...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Preset tap guide selections */}
        <div className="px-6 py-3 border-t border-white/5 bg-black/15 flex gap-2.5 overflow-x-auto scroll-bar-nav whitespace-nowrap">
          {presetPrompts.map((prompt) => (
            <button
              key={prompt.label}
              onClick={() => sendMessage(prompt.prompt)}
              className="py-1.5 px-3.5 bg-white/5 text-on-surface-variant/85 hover:text-white hover:bg-white/10 text-[10px] font-mono-technical font-bold border border-white/10 rounded-full transition-all cursor-pointer inline-flex items-center gap-2 select-none"
            >
              <span>{prompt.label}</span>
              <ArrowRight className="w-3 h-3 text-primary" />
            </button>
          ))}
        </div>

        {/* Message dispatch zone */}
        <div className="bg-black/35 border-t border-white/5 p-4 sm:p-5 flex gap-3 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputMessage)}
            placeholder="Ask AI Representative Clone a technical question..."
            className="flex-grow bg-black/45 border border-white/10 pl-5 pr-4 py-3 rounded-2xl text-xs text-white placeholder-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            className="p-3.5 rounded-2xl bg-primary hover:bg-b-primary-container text-on-primary-fixed transition-transform active:scale-95 shadow-[0_0_15px_rgba(173,198,255,0.25)] cursor-pointer hover:shadow-[0_0_25px_rgba(173,198,255,0.4)]"
            title="Send Prompts"
          >
            <Send className="w-4 h-4 text-on-primary-fixed" />
          </button>
        </div>
      </div>
      </Scroll3DWrapper>
    </section>
  );
}
