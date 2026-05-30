import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ShieldAlert, Cpu } from "lucide-react";

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "NEURAL SKILLS", href: "#skills" },
    { label: "PROJECT LOGS", href: "#projects" },
    { label: "CHRONOLOGY", href: "#journey" },
    { label: "RECRUITER AI", href: "#recruiter-ai" },
    { label: "CONNECT", href: "#contact" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 mx-auto max-w-7xl mt-5 px-6 md:px-12 transition-all duration-500`}
      >
        <div
          className={`flex items-center justify-between px-6 py-3.5 rounded-full border transition-all duration-500 backdrop-blur-xl ${
            scrolled
              ? "bg-black/40 border-primary/20 shadow-[0_10px_30px_-15px_rgba(173,198,255,0.3)]"
              : "bg-white/5 border-white/10"
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("hero");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="flex items-center gap-2 group cursor-pointer pointer-events-auto"
          >
            <div className="p-1.5 rounded-full bg-primary/10 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="font-headline-lg font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              ABHIRAM A.
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 pointer-events-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.replace("#", "");
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="font-label-caps text-[11px] font-semibold text-on-surface-variant hover:text-primary transition-all tracking-wider relative group cursor-pointer pointer-events-auto"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Connected Indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary absolute"></span>
              <span className="font-label-caps text-[9px] font-bold text-primary tracking-widest uppercase">
                SYS_ONLINE
              </span>
            </div>

            {/* Mobile Actions */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-white/10 bg-white/5 text-on-surface hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Swipe Container */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-surface-container-low border-l border-white/10 p-6 flex flex-col gap-8 transition-transform duration-500 ease-out lg:hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono-technical font-semibold text-xs tracking-wider text-white">
              CORE_SHELL
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full border border-white/10 hover:text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Links list */}
        <div className="flex flex-col gap-6 pointer-events-auto">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const targetId = item.href.replace("#", "");
                const element = document.getElementById(targetId);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="flex items-center gap-3 font-semibold text-sm hover:text-primary transition-colors text-on-surface-variant group cursor-pointer pointer-events-auto"
            >
              <span className="font-mono-technical text-[10px] text-primary/40">
                0{idx + 1}_
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Footer info inside sidebar */}
        <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-primary text-[10px] font-mono-technical">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>UPLINK APPROVED</span>
          </div>
          <div className="text-[10px] font-mono-technical text-on-surface-variant/40 leading-relaxed">
            GPS: KERALA, INDIA<br />
            IP: DIRECT_SESSION
          </div>
        </div>
      </div>
    </>
  );
}
