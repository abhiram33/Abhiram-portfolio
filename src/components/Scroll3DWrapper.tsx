import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface Scroll3DWrapperProps {
  children: React.ReactNode;
}

export default function Scroll3DWrapper({ children }: Scroll3DWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the standardized progress (-1 to 1) relative to viewport center
  const progressVal = useMotionValue(0);

  // Buttery-smooth spring motion with natural damping for high cinematic feel
  const smoothProgress = useSpring(progressVal, {
    stiffness: 18,  // Much lower stiffness for slow, organic motion
    damping: 38,    // High damping to eliminate jarring snaps and make it ultra-smooth
    mass: 1.2,      // Gentle inertia
    restDelta: 0.0005,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let absoluteTop = 0;
    let absoluteHeight = 0;

    const measureLayout = () => {
      const rect = container.getBoundingClientRect();
      absoluteTop = rect.top + window.scrollY;
      absoluteHeight = rect.height;
    };

    // Cache initial layout properties once
    measureLayout();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      const rectTop = absoluteTop - scrollTop;
      const elementCenter = rectTop + absoluteHeight / 2;
      const viewportCenter = viewportHeight / 2;
      
      // divisor covers the distance from "just entering bottom" to "just exiting top"
      const divisor = (viewportHeight + absoluteHeight) / 2;
      const rawProgress = (elementCenter - viewportCenter) / (divisor || 1);
      
      // Clamp values slightly past limits for seamless edges & smooth fade
      const clampedProgress = Math.max(-1.15, Math.min(1.15, rawProgress));
      progressVal.set(clampedProgress);
    };

    // Calculate initial state on layout load
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleResize = () => {
      measureLayout();
      handleScroll();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [progressVal]);

  // Transform maps:
  // Progress = 1 (Coming in from bottom): tilts back slightly, scaled beautifully, subtle offset and depth
  // Progress = 0 (Perfect center viewport): level, full-scale, centered, 3D on-plane
  // Progress = -1 (Departing through top): tilts forward slightly, scaled beautifully
  const rotateX = useTransform(smoothProgress, [-1.1, 0, 1.1], [5, 0, -6]);
  const scale = useTransform(smoothProgress, [-1.15, -1, 0, 1, 1.15], [0.93, 0.96, 1, 0.96, 0.93]);
  const y = useTransform(smoothProgress, [-1, 0, 1], [-30, 0, 30]);
  
  // High-contrast smooth fade: fully visible when active, fading out towards boundary edges
  const opacity = useTransform(smoothProgress, [-1.1, -0.9, 0, 0.9, 1.1], [0, 1, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      style={{ perspective: "1500px" }}
      className="w-full relative py-2 pointer-events-auto"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
        }}
        className="w-full h-full relative z-10 pointer-events-auto"
      >
        {children}
      </motion.div>
    </div>
  );
}
