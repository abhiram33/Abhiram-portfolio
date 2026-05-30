import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Scroll3DWrapper from "./Scroll3DWrapper";
import {
  Mail,
  Linkedin,
  Github,
  CheckCircle,
  Sparkles,
  MapPin,
  Clock,
  Terminal,
  Send,
  Loader,
} from "lucide-react";

export default function ContactTerminal() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success">("idle");
  const [correlationId, setCorrelationId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitStatus("sending");

    setTimeout(() => {
      setCorrelationId(`ID-${Math.floor(Math.random() * 9000000 + 1000000)}`);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1800);
  };

  const contactNodes = [
    {
      label: "EMAIL_CHANNEL",
      value: "abhiramkichuz@gmail.com",
      href: "mailto:abhiramkichuz@gmail.com",
      icon: Mail,
      color: "border-primary/20 hover:border-primary/50 focus:ring-primary/40 active:scale-[0.98]",
    },
    {
      label: "LINKEDIN_NODE",
      value: "linkedin.com/in/abhiram-a-9b5233378",
      href: "https://www.linkedin.com/in/abhiram-a-9b5233378",
      icon: Linkedin,
      color: "border-secondary/20 hover:border-secondary/50 focus:ring-secondary/40 active:scale-[0.98]",
    },
    {
      label: "GITHUB_REPOS",
      value: "github.com/abhiram33",
      href: "https://github.com/abhiram33",
      icon: Github,
      color: "border-white/10 hover:border-white/35 focus:ring-white/30 active:scale-[0.98]",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative max-w-7xl mx-auto w-full">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      <Scroll3DWrapper>
        {/* Grid of details */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: System Coordinate Node */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-secondary" />
              <span className="font-mono-technical text-[11px] text-secondary tracking-[0.4em] uppercase font-semibold">
                06 — CONNECTION_UPLINK
              </span>
            </div>
            <h2 className="font-headline-lg text-4xl md:text-5xl text-white font-bold leading-tight">
              CONNECT COORDINATES
            </h2>
            <div className="w-16 h-0.5 bg-primary/35" />
          </div>

          <p className="font-body-md text-sm md:text-base text-on-surface-variant/80 leading-relaxed">
            Systems monitored and ready. Reach out directly through the verified primary channels below or dispatch an automated payload form.
          </p>

          <div className="flex flex-col gap-4">
            {contactNodes.map((node) => {
              const Icon = node.icon;
              return (
                <a
                  key={node.label}
                  href={node.href}
                  target={node.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`p-6 rounded-3xl bg-white/3 border ${node.color} backdrop-blur-md flex items-center gap-4 transition-all duration-300 hover:bg-white/5 cursor-pointer pointer-events-auto shadow-sm hover:shadow-[0_4px_20px_rgba(173,198,255,0.06)]`}
                >
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-on-surface" />
                  </div>
                  <div>
                    <span className="block font-mono-technical text-[8px] text-on-surface-variant/30 tracking-widest uppercase mb-1">
                      {node.label}
                    </span>
                    <span className="block text-xs md:text-sm font-semibold font-mono-technical text-primary">
                      {node.value}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="pt-8 opacity-45 space-y-1">
            <span className="block font-mono-technical text-[8px] tracking-[0.5em] uppercase">
              GPS :: KERALA, INDIA // 8.5241° N, 76.9366° E
            </span>
            <div className="flex items-center gap-2 font-mono-technical text-[8px] text-on-surface-variant/70 uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>STABLE ZONE UPLINK UTC+5:30</span>
            </div>
          </div>
        </div>

        {/* Right Side: Message Payload dispatch Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/3 border border-white/5 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <span className="absolute top-0 right-0 p-12 opacity-[0.02] transform translate-x-8 -translate-y-8 select-none pointer-events-none">
              <Terminal className="w-[200px] h-[200px]" />
            </span>

            <h3 className="font-headline-lg text-2xl font-bold text-white uppercase mb-6">
              Dispatch Message Payload
            </h3>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-12"
                >
                  <div className="w-16 h-16 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-full mx-auto shadow-lg animate-pulse">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-label-caps text-sm text-white font-bold tracking-wider">
                      UPLINK TRANSMITTED SUCCESSFULLY
                    </h4>
                    <p className="text-xs text-on-surface-variant/80 max-w-sm mx-auto leading-relaxed">
                      Correlation established. System tracking ID: <strong className="text-primary font-mono-technical">{correlationId}</strong>. Abhiram's clone has logged this telemetry. No further action needed.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-[10px] font-mono-technical text-white tracking-widest hover:border-white/30 transition-all uppercase"
                  >
                    DISPATCH_NEW_PACKET.EXE
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        SENDER_IDENTIFIER
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={submitStatus === "sending"}
                        placeholder="Your full name"
                        className="w-full bg-black/45 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                        REPLY_UPLINK_MAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={submitStatus === "sending"}
                        placeholder="e.g. name@domain.com"
                        className="w-full bg-black/45 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono-technical text-white/50 uppercase">
                      MESSAGE_PAYLOAD_CONTENT
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={submitStatus === "sending"}
                      rows={4}
                      placeholder="Input pipeline specs, recruitment details, or structural telemetry requests..."
                      className="w-full bg-black/45 border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === "sending"}
                    className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary-fixed hover:text-on-primary font-bold text-xs tracking-widest font-mono-technical transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {submitStatus === "sending" ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin text-on-primary-fixed" />
                        <span>DISPATCHING PACKET SEEDS...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT PAYLOAD PROTOCOL</span>
                        <Send className="w-3.5 h-3.5 text-on-primary-fixed" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </Scroll3DWrapper>
    </section>
  );
}
