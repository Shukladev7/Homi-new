"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progression of the parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll progress to update active index (4 steps: 0.25 increments)
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      let nextIndex = 0;
      if (latest < 0.25) {
        nextIndex = 0;
      } else if (latest < 0.5) {
        nextIndex = 1;
      } else if (latest < 0.75) {
        nextIndex = 2;
      } else {
        nextIndex = 3;
      }
      setActiveIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
    });
  }, [scrollYProgress]);

  const features = [
    {
      id: "01",
      title: "Explains Until Your Child Gets It",
      text: "Every student learns differently. Homi adapts explanations, examples, and difficulty levels until concepts finally click.",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(255, 175, 110, 0.08) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-16 font-sans text-left">
          <div className="flex flex-col gap-6 items-end">
            <span className="text-[10px] text-black/35 font-mono">STUDENT QUESTION</span>
            <div className="bg-[#EBEBEB] text-black/95 px-16 py-8 rounded-20 rounded-tr-4 text-13 max-w-[85%] shadow-sm">
              "Can you explain photosynthesis again?"
            </div>
          </div>
          
          <div className="flex flex-col gap-12 items-start">
            <span className="text-[10px] text-black/35 font-mono">HOMI'S EXPLANATION</span>
            <div className="bg-[#0A0A0A] text-true-white px-16 py-12 rounded-20 rounded-tl-4 text-13 max-w-[90%] shadow-md leading-relaxed flex flex-col gap-10">
              <div>
                <strong className="text-orange-300 font-semibold">💡 Simple Explanation:</strong>
                <p className="mt-2 text-white/90">Photosynthesis is how plants make their food using sunlight!</p>
              </div>
              <div className="border-t border-white/10 pt-8">
                <strong className="text-blue-300 font-semibold">🌱 Visual Example:</strong>
                <p className="mt-2 text-white/90 font-mono text-11 bg-white/5 p-6 rounded">
                  [☀️ Sunlight] + [💧 Water] + [🍃 Carbon Dioxide] ➔ [🍇 Sugar/Food] + [💨 Oxygen]
                </p>
              </div>
              <div className="border-t border-white/10 pt-8">
                <strong className="text-green-300 font-semibold">🍪 Real-World Analogy:</strong>
                <p className="mt-2 text-white/90">Think of the leaf as a tiny solar-powered cooker that bakes sugar cookies for the plant! ☀️🍪</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "02",
      title: "Catches What Your Child Missed",
      text: "Homi identifies weak foundations and fills learning gaps before they become bigger academic struggles.",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-16 font-sans text-left">
          <div className="flex justify-between items-center border-b border-black/5 pb-8 mb-4">
            <span className="text-11 font-semibold text-black/80">MATHEMATICS ROADMAP</span>
            <span className="text-10 bg-orange-500/10 text-orange-600 px-8 py-2 rounded-full font-semibold animate-pulse">Gap Detected</span>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-center bg-green-500/5 border border-green-500/15 rounded-12 p-10">
              <span className="text-13 font-semibold text-green-950">✓ Fractions Concept</span>
              <span className="text-11 bg-green-500/10 text-green-700 px-8 py-1 rounded font-semibold">Complete</span>
            </div>
            
            <div className="flex justify-between items-center bg-green-500/5 border border-green-500/15 rounded-12 p-10">
              <span className="text-13 font-semibold text-green-950">✓ Decimals Concept</span>
              <span className="text-11 bg-green-500/10 text-green-700 px-8 py-1 rounded font-semibold">Complete</span>
            </div>

            <div className="flex justify-between items-center bg-orange-500/5 border border-orange-500/20 rounded-12 p-10 shadow-sm">
              <div className="flex flex-col gap-2">
                <span className="text-13 font-bold text-orange-950">⚠️ Algebra Gap Detected</span>
                <span className="text-[10px] text-orange-800">Struggled with linear variables</span>
              </div>
              <span className="text-11 bg-orange-500/10 text-orange-700 px-8 py-1 rounded font-bold">Needs Prep</span>
            </div>
          </div>

          <div className="h-32 rounded-16 px-12 leading-32 bg-indigo-500 text-true-white font-sans font-600 text-11 text-center w-full select-none shadow-sm cursor-pointer hover:bg-indigo-600 transition-colors">
            ➔ Start Recommended Practice Path
          </div>
        </div>
      )
    },
    {
      id: "03",
      title: "Prepares Them To Speak, Not Just Write",
      text: "Practice oral exams, presentations, and viva sessions with real-time feedback on confidence, clarity, and communication.",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(220, 150, 255, 0.08) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-14 font-sans text-left">
          <div className="flex justify-between items-center border-b border-black/5 pb-8 mb-4">
            <span className="text-11 font-semibold text-black/80">VIVA PREP / ORAL FEEDBACK</span>
            <span className="text-10 bg-purple-500/10 text-purple-600 px-8 py-2 rounded-full font-semibold">Audio Active</span>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white/60 p-8 rounded border border-black/5 flex flex-col gap-2">
              <span className="text-16 font-bold text-purple-600">94%</span>
              <span className="text-[9px] uppercase tracking-wider text-black/45 font-mono">Confidence Score</span>
            </div>
            <div className="bg-white/60 p-8 rounded border border-black/5 flex flex-col gap-2">
              <span className="text-16 font-bold text-purple-600">2 times</span>
              <span className="text-[9px] uppercase tracking-wider text-black/45 font-mono">Filler Words ("like")</span>
            </div>
            <div className="bg-white/60 p-8 rounded border border-black/5 col-span-2 flex flex-col gap-2">
              <span className="text-13 font-bold text-black/85">Pace & Delivery: 130 wpm (Perfect)</span>
              <span className="text-[9px] uppercase tracking-wider text-black/45 font-mono">Speech Cadence</span>
            </div>
          </div>

          <div className="bg-purple-500/5 border border-purple-500/15 rounded-12 p-10 mt-6 shadow-sm">
            <h4 className="text-11 font-bold text-purple-950 mb-2">💡 Improvement Suggestion:</h4>
            <p className="text-11 text-purple-900 leading-relaxed">
              "Try speaking slightly slower during key scientific definitions to sound even more authoritative and confident!"
            </p>
          </div>
        </div>
      )
    },
    {
      id: "04",
      title: "Keeps You In The Loop",
      text: "Parents can see progress, strengths, challenges, and learning habits without constantly checking on their child.",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(54, 175, 255, 0.08) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-14 font-sans text-left">
          <div className="flex justify-between items-center border-b border-black/5 pb-8">
            <span className="text-11 font-semibold text-black/80">PARENT DASHBOARD INSIGHTS</span>
            <span className="text-10 bg-blue-500/10 text-blue-700 px-8 py-2 rounded-full font-semibold">Weekly Report</span>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white/60 p-8 rounded border border-black/5 flex flex-col gap-2">
              <span className="text-13 font-semibold text-black">Weekly Progress</span>
              <span className="text-11 text-black/50">✓ Mastered Fractions<br />✓ GSEB Decimals Quiz</span>
            </div>
            <div className="bg-white/60 p-8 rounded border border-black/5 flex flex-col gap-2">
              <span className="text-13 font-semibold text-black">Study Time</span>
              <span className="text-11 text-black/50">3.5 hours focused<br />Learning pace: Active</span>
            </div>
            <div className="bg-white/60 p-8 rounded border border-black/5 flex flex-col gap-2">
              <span className="text-13 font-semibold text-black">Strong Subjects</span>
              <span className="text-11 text-black/50">Mathematics & Chemistry</span>
            </div>
            <div className="bg-white/60 p-8 rounded border border-black/5 flex flex-col gap-2">
              <span className="text-13 font-semibold text-orange-600">Needs Attention</span>
              <span className="text-11 text-black/50">Linear Equations (Algebra)</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Map scroll progress to opacity and scale crossfades (0.96 -> 1)
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.25, 1], [1, 1, 0, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.2, 0.25, 1], [1, 1, 0.96, 0.96]);

  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.25, 0.45, 0.5, 1], [0, 0, 1, 1, 0, 0]);
  const scale2 = useTransform(scrollYProgress, [0, 0.2, 0.25, 0.45, 0.5, 1], [0.96, 0.96, 1, 1, 0.96, 0.96]);

  const opacity3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.7, 0.75, 1], [0, 0, 1, 1, 0, 0]);
  const scale3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.7, 0.75, 1], [0.96, 0.96, 1, 1, 0.96, 0.96]);

  const opacity4 = useTransform(scrollYProgress, [0, 0.7, 0.75, 1], [0, 0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0, 0.7, 0.75, 1], [0.96, 0.96, 1, 1]);

  const opacities = [opacity1, opacity2, opacity3, opacity4];
  const scales = [scale1, scale2, scale3, scale4];

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      {/* Mobile Layout (< 800px) */}
      <div className="800:hidden px-24 py-80 flex flex-col gap-60">
        <div className="text-center mb-20 flex flex-col gap-10 section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            Homi In Action
          </span>
          <h2 className="h2--exposure text-black">
            A learning companion that does more than answer questions.
          </h2>
          <p className="text-14 text-secondary leading-relaxed max-w-[45ch] mx-auto mt-6 font-sans font-350">
            Homi helps students understand concepts, close learning gaps, prepare confidently, and keeps parents informed along the way.
          </p>
        </div>
        
        <div className="flex flex-col gap-30">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-24">
              <div className="relative rounded-24 overflow-hidden border border-black/8 shadow-md bg-white p-30 min-h-[300px] flex flex-col justify-between" style={{ backgroundImage: feature.bgGlow }}>
                <span className="font-mono text-12 font-semibold text-tertiary text-left block mb-10">{feature.id}</span>
                <div className="my-auto">{feature.content}</div>
              </div>
              <div className="text-left">
                <span className="block font-mono text-11 text-tertiary mb-6 font-semibold">
                  {feature.id}
                </span>
                <h3 className="font-serif font-650 text-22 leading-28 -tracking-4 mb-10 text-primary">
                  {feature.title}
                </h3>
                <p className="text-14 leading-[1.6] text-secondary">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Message */}
        <div className="border-t border-black/5 pt-40 mt-20 text-center">
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
            <span>One companion.</span>
            <span>Every subject.</span>
            <span>Every study session.</span>
            <span>Every step forward.</span>
          </p>
        </div>
      </div>

      {/* Desktop Layout (>= 800px) - Sticky Viewport Container */}
      <div className="hidden 800:block sticky top-0 h-screen w-full overflow-hidden">
        <div className="h-full w-full max-w-1440 mx-auto px-40 flex items-center justify-center">
          
          <div className="w-full grid grid-cols-12 gap-x-80 items-center">
            
            {/* Left Panel: Sticky features summary info (5 columns) */}
            <div className="col-span-5 flex flex-col gap-24 text-left">
              <div className="flex flex-col gap-10 section-header">
                <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
                  Homi In Action
                </span>
                <h2 className="h2--exposure text-black tracking-tight leading-tight">
                  A learning companion that does more than answer questions.
                </h2>
                <p className="text-14 leading-relaxed text-secondary mt-10 font-sans font-350 max-w-[38ch]">
                  Homi helps students understand concepts, close learning gaps, prepare confidently, and keeps parents informed along the way.
                </p>
              </div>

              {/* Vertical Step Progress Lines */}
              <nav className="flex flex-col gap-10 mt-10" aria-label="Homi capabilities summary">
                {features.map((feature, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={feature.id}
                      className="relative text-left pl-24 py-6 transition-all duration-300"
                    >
                      {/* Spring-animated indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="features-indicator-bar-desktop"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-black rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <span className={`block font-mono text-11 leading-none mb-4 transition-colors duration-300 font-semibold ${
                        isActive ? "text-tertiary" : "text-quaternary"
                      }`}>
                        {feature.id}
                      </span>
                      
                      <span className={`block font-sans font-600 text-16 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-tertiary"
                      }`}>
                        {feature.title}
                      </span>
                    </div>
                  );
                })}
              </nav>

              {/* Bottom Message (fades in on final step) */}
              <AnimatePresence>
                {activeIndex === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-20 border-t border-black/5 pt-20"
                  >
                    <p className="font-serif font-650 italic text-18 800:text-20 leading-tight text-black flex flex-col gap-4">
                      <span>One companion.</span>
                      <span>Every subject.</span>
                      <span>Every study session.</span>
                      <span>Every step forward.</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel: Sticky showcase card transitions (7 columns) */}
            <div className="col-span-7 relative aspect-[1.4] w-full">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.id}
                  style={{ opacity: opacities[idx], scale: scales[idx] }}
                  className="absolute inset-0 w-full h-full bg-white rounded-24 border border-black/8 shadow-[0px_12px_40px_rgba(0,0,0,0.06)] p-40 flex flex-col justify-between overflow-hidden"
                >
                  {/* Soft atmospheric background glow */}
                  <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: feature.bgGlow }} />

                  {/* Card Header */}
                  <div className="flex justify-between items-start border-b border-black/5 pb-10 text-left">
                    <span className="font-serif font-650 text-14 text-black">{feature.title}</span>
                    <span className="font-mono text-14 font-semibold text-tertiary">{feature.id} / 04</span>
                  </div>

                  {/* Card Content body */}
                  <div className="my-auto py-10">
                    {feature.content}
                  </div>

                  {/* Card Footer */}
                  <div className="text-11 uppercase font-mono text-tertiary text-left">
                    HomiLearn Product Showcase Card
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
