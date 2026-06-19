"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PersonalizedLearning() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the journey section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll progression to highlight the active node
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.25) {
        setActiveIndex(0);
      } else if (latest < 0.5) {
        setActiveIndex(1);
      } else if (latest < 0.75) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });
  }, [scrollYProgress]);

  // Map scroll progress to pathLength drawing ratio (0 to 1)
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Also drive straight mobile progress line height
  const mobileLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      id: "Step 01",
      title: "Learns How You Learn",
      description: "During the first few sessions, Homi understands how the student learns best and adapts explanations accordingly.",
      visual: (
        <div className="flex flex-col gap-8 bg-white border border-black/5 p-16 rounded-16 shadow-sm mt-10 w-full max-w-[340px]">
          <div className="flex items-center gap-8 bg-orange-500/5 border border-orange-500/15 p-8 rounded-10">
            <span className="text-14">📖</span>
            <span className="text-12 font-bold text-orange-950">Simple Explanation</span>
          </div>
          <div className="flex items-center gap-8 bg-blue-500/5 border border-black/5 p-8 rounded-10 opacity-70">
            <span className="text-14">🎨</span>
            <span className="text-12 font-semibold text-blue-950">Visual Example</span>
          </div>
          <div className="flex items-center gap-8 bg-green-500/5 border border-black/5 p-8 rounded-10 opacity-70">
            <span className="text-14">🌍</span>
            <span className="text-12 font-semibold text-green-950">Real-Life Analogy</span>
          </div>
        </div>
      )
    },
    {
      id: "Step 02",
      title: "Finds Weak Areas Early",
      description: "Homi identifies concepts that need more attention before they become larger academic struggles.",
      visual: (
        <div className="flex flex-col gap-8 bg-white border border-black/5 p-16 rounded-16 shadow-sm mt-10 w-full max-w-[340px]">
          <div className="flex justify-between items-center bg-green-500/5 border border-green-500/15 p-8 rounded-10">
            <span className="text-12 font-medium text-green-950">✓ Fractions Concept</span>
            <span className="text-10 text-green-700 bg-green-500/10 px-6 py-1 rounded">Mastered</span>
          </div>
          <div className="flex justify-between items-center bg-green-500/5 border border-green-500/15 p-8 rounded-10">
            <span className="text-12 font-medium text-green-950">✓ Decimals Concept</span>
            <span className="text-10 text-green-700 bg-green-500/10 px-6 py-1 rounded">Mastered</span>
          </div>
          <div className="flex justify-between items-center bg-orange-500/5 border border-orange-500/20 p-8 rounded-10">
            <span className="text-12 font-bold text-orange-950">⚠️ Algebra Gap Detected</span>
            <span className="text-10 text-orange-700 bg-orange-500/10 px-6 py-1 rounded font-semibold animate-pulse">Needs Prep</span>
          </div>
        </div>
      )
    },
    {
      id: "Step 03",
      title: "Personalizes Practice",
      description: "Practice questions automatically adjust to the student's current understanding and confidence level.",
      visual: (
        <div className="bg-white border border-black/5 p-16 rounded-16 shadow-sm mt-10 w-full max-w-[340px] flex flex-col gap-10">
          <div className="flex items-center justify-between gap-10 relative py-8 px-4">
            {/* Connector Dotted Line */}
            <div className="absolute left-6 right-6 top-[15px] h-[2px] bg-black/5 -z-10 rounded-full" />
            <div className="absolute left-6 right-[35%] top-[15px] h-[2px] bg-green-500 -z-10 rounded-full" />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-18 h-18 rounded-full bg-green-500 text-true-white flex items-center justify-center text-8 font-bold border-2 border-white shadow-sm">✓</div>
              <span className="text-8 font-semibold text-black/45">Lvl 1</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-18 h-18 rounded-full bg-green-500 text-true-white flex items-center justify-center text-8 font-bold border-2 border-white shadow-sm">✓</div>
              <span className="text-8 font-semibold text-black/45">Lvl 2</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-18 h-18 rounded-full bg-green-500 text-true-white flex items-center justify-center text-8 font-bold border-2 border-white shadow-sm">✓</div>
              <span className="text-8 font-semibold text-black/45">Lvl 3</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-18 h-18 rounded-full bg-blue-500 text-true-white flex items-center justify-center text-8 font-bold border-2 border-white shadow-sm animate-bounce">➔</div>
              <span className="text-8 font-bold text-blue-700">Lvl 4</span>
            </div>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-10 p-6 text-center text-10 text-blue-900 font-medium">
            Current Challenge: Solving linear variables
          </div>
        </div>
      )
    },
    {
      id: "Step 04",
      title: "Tracks Growth Over Time",
      description: "Every study session contributes to a clearer understanding of progress, strengths, and improvement areas.",
      visual: (
        <div className="flex flex-col gap-8 bg-white border border-black/5 p-16 rounded-16 shadow-sm mt-10 w-full max-w-[340px]">
          <div className="flex justify-between items-center border-b border-black/5 pb-4">
            <span className="text-[10px] font-mono text-black/35 uppercase">Live Metrics</span>
            <span className="text-8 bg-green-500/10 text-green-700 px-6 py-1 rounded font-semibold">Synced</span>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-11">
              <span className="text-black/70">Understanding</span>
              <span className="font-bold text-green-600">88% ↑</span>
            </div>
            <div className="flex items-center justify-between text-11">
              <span className="text-black/70">Confidence</span>
              <span className="font-bold text-green-600">92% ↑</span>
            </div>
            <div className="flex items-center justify-between text-11">
              <span className="text-black/70">Consistency</span>
              <span className="font-bold text-green-600">95% ↑</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Helper component to render glowing nodes
  const NodeIndicator = ({ idx, active }: { idx: number; active: boolean }) => {
    return (
      <div className="relative flex items-center justify-center">
        {/* Pulse Glow Background */}
        {active && (
          <motion.div 
            layoutId="journey-node-glow"
            className="absolute -inset-8 rounded-full bg-orange-500/25 blur-md pointer-events-none"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Core Dot bubble */}
        <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center text-12 font-bold shadow-sm transition-all duration-300 ${
          active 
            ? "bg-black border-black text-true-white scale-110 shadow-md" 
            : "bg-white border-black/10 text-quaternary"
        }`}>
          {idx + 1}
        </div>
      </div>
    );
  };

  return (
    <section ref={containerRef} id="how-it-works" className="py-80 800:py-120 max-w-1440 mx-auto px-20">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            Personalized Learning
          </span>
          <h2 className="h2--exposure text-center max-w-[22ch] mx-auto text-black">
            Learning Built Around Your Child
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            No two students learn the same way.
            <br />
            Homi adapts explanations, practice, and guidance based on each student's strengths, struggles, and learning pace.
          </p>
        </div>

        {/* Journey Map Container */}
        {/* Desktop Layout (>= 800px) */}
        <div className="hidden 800:block relative w-full h-[1120px] mt-80">
          
          {/* Centered Center Weaving SVG Area */}
          <div className="absolute left-[calc(50%-100px)] w-[200px] top-0 bottom-0 pointer-events-none z-0">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 200 1120" 
              preserveAspectRatio="none" 
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="journeyPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="45%" stopColor="#36AFFF" />
                  <stop offset="80%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
              
              {/* Background Track Line */}
              <path 
                d="M 100 0 C 100 50, 50 50, 50 140 C 50 280, 150 280, 150 420 C 150 560, 50 560, 50 700 C 50 840, 150 840, 150 980 C 150 1070, 100 1070, 100 1120"
                fill="none" 
                stroke="#EFEFEF" 
                strokeWidth="4" 
                strokeLinecap="round"
              />

              {/* Progress Drawing Overlay Line */}
              <motion.path 
                d="M 100 0 C 100 50, 50 50, 50 140 C 50 280, 150 280, 150 420 C 150 560, 50 560, 50 700 C 50 840, 150 840, 150 980 C 150 1070, 100 1070, 100 1120"
                fill="none" 
                stroke="url(#journeyPathGrad)" 
                strokeWidth="4" 
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>

            {/* Symmetrical timeline node bubbles overlaid on top of SVG path */}
            {/* Step 1 Node (x: 50px (25%), y: 140px (12.5%)) */}
            <div className="absolute left-[25%] top-[12.5%] -translate-x-1/2 -translate-y-1/2">
              <NodeIndicator idx={0} active={activeIndex === 0} />
            </div>
            
            {/* Step 2 Node (x: 150px (75%), y: 420px (37.5%)) */}
            <div className="absolute left-[75%] top-[37.5%] -translate-x-1/2 -translate-y-1/2">
              <NodeIndicator idx={1} active={activeIndex === 1} />
            </div>
            
            {/* Step 3 Node (x: 50px (25%), y: 700px (62.5%)) */}
            <div className="absolute left-[25%] top-[62.5%] -translate-x-1/2 -translate-y-1/2">
              <NodeIndicator idx={2} active={activeIndex === 2} />
            </div>
            
            {/* Step 4 Node (x: 150px (75%), y: 980px (87.5%)) */}
            <div className="absolute left-[75%] top-[87.5%] -translate-x-1/2 -translate-y-1/2">
              <NodeIndicator idx={3} active={activeIndex === 3} />
            </div>
          </div>

          {/* Alternating Journey Cards */}
          {/* Card 01 - Left side */}
          <div className="absolute right-[calc(50%+80px)] left-0 top-0 h-[280px] flex flex-col justify-center items-end text-right pr-20">
            <motion.div
              className={`w-full max-w-[400px] bg-white rounded-24 border border-black/8 shadow-sm p-24 flex flex-col gap-12 transition-all duration-300 text-left ${
                activeIndex === 0 ? "scale-[1.02] shadow-md border-black/15" : "opacity-60"
              }`}
            >
              <div>
                <span className="text-10 font-mono uppercase tracking-wider text-tertiary">{steps[0].id}</span>
                <h3 className="font-sans font-600 text-18 leading-tight text-primary mt-2">
                  {steps[0].title}
                </h3>
                <p className="text-13 leading-relaxed text-secondary mt-4 font-sans font-350">
                  {steps[0].description}
                </p>
              </div>
              {steps[0].visual}
            </motion.div>
          </div>

          {/* Card 02 - Right side */}
          <div className="absolute left-[calc(50%+80px)] right-0 top-[280px] h-[280px] flex flex-col justify-center items-start text-left pl-20">
            <motion.div
              className={`w-full max-w-[400px] bg-white rounded-24 border border-black/8 shadow-sm p-24 flex flex-col gap-12 transition-all duration-300 text-left ${
                activeIndex === 1 ? "scale-[1.02] shadow-md border-black/15" : "opacity-60"
              }`}
            >
              <div>
                <span className="text-10 font-mono uppercase tracking-wider text-tertiary">{steps[1].id}</span>
                <h3 className="font-sans font-600 text-18 leading-tight text-primary mt-2">
                  {steps[1].title}
                </h3>
                <p className="text-13 leading-relaxed text-secondary mt-4 font-sans font-350">
                  {steps[1].description}
                </p>
              </div>
              {steps[1].visual}
            </motion.div>
          </div>

          {/* Card 03 - Left side */}
          <div className="absolute right-[calc(50%+80px)] left-0 top-[560px] h-[280px] flex flex-col justify-center items-end text-right pr-20">
            <motion.div
              className={`w-full max-w-[400px] bg-white rounded-24 border border-black/8 shadow-sm p-24 flex flex-col gap-12 transition-all duration-300 text-left ${
                activeIndex === 2 ? "scale-[1.02] shadow-md border-black/15" : "opacity-60"
              }`}
            >
              <div>
                <span className="text-10 font-mono uppercase tracking-wider text-tertiary">{steps[2].id}</span>
                <h3 className="font-sans font-600 text-18 leading-tight text-primary mt-2">
                  {steps[2].title}
                </h3>
                <p className="text-13 leading-relaxed text-secondary mt-4 font-sans font-350">
                  {steps[2].description}
                </p>
              </div>
              {steps[2].visual}
            </motion.div>
          </div>

          {/* Card 04 - Right side */}
          <div className="absolute left-[calc(50%+80px)] right-0 top-[840px] h-[280px] flex flex-col justify-center items-start text-left pl-20">
            <motion.div
              className={`w-full max-w-[400px] bg-white rounded-24 border border-black/8 shadow-sm p-24 flex flex-col gap-12 transition-all duration-300 text-left ${
                activeIndex === 3 ? "scale-[1.02] shadow-md border-black/15" : "opacity-60"
              }`}
            >
              <div>
                <span className="text-10 font-mono uppercase tracking-wider text-tertiary">{steps[3].id}</span>
                <h3 className="font-sans font-600 text-18 leading-tight text-primary mt-2">
                  {steps[3].title}
                </h3>
                <p className="text-13 leading-relaxed text-secondary mt-4 font-sans font-350">
                  {steps[3].description}
                </p>
              </div>
              {steps[3].visual}
            </motion.div>
          </div>

        </div>

        {/* Mobile Layout (< 800px) */}
        <div className="800:hidden flex flex-col gap-40 relative pl-32 mt-40">
          {/* Simple straight vertical line on mobile */}
          <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-black/5" />
          <motion.div 
            style={{ height: mobileLineHeight }}
            className="absolute left-[11px] top-6 w-[2px] bg-black origin-top"
          />
          
          {steps.map((step, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={step.id} className="relative flex flex-col gap-10 text-left">
                <div className={`absolute left-[-26px] top-4 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-11 font-bold shadow-sm transition-colors duration-300 ${
                  isActive ? "bg-black text-true-white border-black" : "bg-slate-100 text-quaternary"
                }`}>
                  {idx + 1}
                </div>
                
                <div className="pl-10">
                  <span className="text-10 font-mono uppercase tracking-wider text-tertiary">{step.id}</span>
                  <h3 className="font-sans font-600 text-18 leading-tight text-primary mt-2">
                    {step.title}
                  </h3>
                  <p className="text-14 leading-relaxed text-secondary mt-4 font-sans font-350">
                    {step.description}
                  </p>
                  {step.visual}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement Signoff */}
        <div className="mt-80 border-t border-black/5 pt-40 max-w-600 mx-auto text-center">
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
            <span>Every student starts somewhere.</span>
            <span className="text-15 font-sans font-350 text-secondary not-italic mt-4">
              Homi helps them move forward with confidence, one step at a time.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
