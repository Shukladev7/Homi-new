"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Problems() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progression of the parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll progress to update active index
  // 0 -> 0.25 = Step 1
  // 0.25 -> 0.5 = Step 2
  // 0.5 -> 0.75 = Step 3
  // 0.75 -> 1.0 = Step 4
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

  const cards = [
    {
      id: "01",
      title: "Afraid to Ask",
      quote: "My child won't ask questions in class because they're scared of being wrong.",
      desc: "Many students stay silent when they're confused. Over time, small doubts become bigger learning gaps.",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(255, 100, 100, 0.08) 0%, transparent 60%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500/80">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19L3 21L5 19.1414C7.00699 20.9332 9.62479 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 10.5C9.5 9 10.5 8 12 8C13.5 8 14.5 9 14.5 10.5C14.5 12 13 12.5 12 13.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="17.5" r="0.75" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Expensive Tuitions",
      quote: "We spend money on tuition, but concepts still don't click.",
      desc: "More classes don't always mean better understanding. Every child learns differently and needs personal space to digest.",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(186, 110, 255, 0.08) 0%, transparent 60%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500/80">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 12H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "03",
      title: "No Visibility",
      quote: "I don't know what my child actually studied today—or if they're improving.",
      desc: "Parents often discover learning hurdles only after exam results arrive, when it is too late to fix the foundation.",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(255, 175, 110, 0.08) 0%, transparent 60%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500/80">
          <path d="M2.06226 12C2.79373 7.91907 6.43577 5 12.0001 5C17.5644 5 21.2065 7.91907 21.9379 12C21.2065 16.0809 17.5644 19 12.0001 19C6.43577 19 2.79373 16.0809 2.06226 12Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Meet Homi",
      quote: "HomiLearn was built to solve exactly these problems.",
      desc: "Homi is always available, never judgmental, adapts to every student's learning pace, and keeps parents informed every step of the way.",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(54, 175, 255, 0.08) 0%, transparent 60%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500/80">
          <path d="M12 3V21M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 8.5L8.5 5L12 8.5M12 15.5L15.5 19L19 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
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
    <section ref={containerRef} className="relative w-full h-auto 800:h-[400vh] bg-transparent">
      {/* Mobile Layout (< 800px) */}
      <div className="800:hidden px-24 py-80 flex flex-col gap-60">
        <div className="text-center mb-20 flex flex-col gap-10 section-header">
          <h2 className="h2--exposure text-black">Sound familiar?</h2>
          <p className="text-16 font-semibold text-secondary leading-normal">
            Learning shouldn't feel frustrating—for students, parents, or teachers.
          </p>
          <p className="text-14 text-tertiary max-w-[45ch] mx-auto leading-relaxed mt-6">
            Millions of students struggle silently. Parents worry without visibility. Teachers spend hours on tasks that don't improve learning.
          </p>
        </div>
        
        <div className="flex flex-col gap-30">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-24 border border-black/8 shadow-md p-30 flex flex-col gap-20 relative overflow-hidden" style={{ backgroundImage: card.bgGlow }}>
              <div className="flex justify-between items-start">
                <span className="font-mono text-12 font-semibold text-tertiary">{card.id}</span>
                {card.icon}
              </div>
              <div>
                <h3 className="font-serif font-650 text-22 leading-28 -tracking-4 mb-10 text-primary">
                  {card.title}
                </h3>
                <p className="font-serif font-650 italic text-18 leading-relaxed text-black/85 mb-14">
                  "{card.quote}"
                </p>
                <p className="text-14 leading-[1.6] text-secondary">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (>= 800px) - Sticky Viewport Container */}
      <div className="hidden 800:block sticky top-0 h-screen w-full overflow-hidden">
        <div className="h-full w-full max-w-1440 mx-auto px-40 flex items-center justify-center">
          
          <div className="w-full grid grid-cols-12 gap-x-80 items-center">
            
            {/* Left Panel: Sticky problem awareness copy (4 columns) */}
            <div className="col-span-5 flex flex-col gap-30 text-left">
              <div className="flex flex-col gap-14 section-header">
                <h2 className="h2--exposure text-black tracking-tight leading-tight">
                  Sound familiar?
                </h2>
                <p className="text-18 font-semibold text-secondary leading-snug max-w-[32ch]">
                  Learning shouldn't feel frustrating—for students, parents, or teachers.
                </p>
                <p className="text-14 leading-relaxed text-tertiary max-w-[38ch]">
                  Millions of students struggle silently. Parents worry without visibility. Teachers spend hours on tasks that don't improve learning.
                </p>
              </div>

              {/* Vertical Step Progress Line */}
              <nav className="flex flex-col gap-10 mt-10" aria-label="Problems summary">
                {cards.map((card, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={card.id}
                      className="relative text-left pl-24 py-6 transition-all duration-300"
                    >
                      {/* Spring-animated indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="problems-indicator-bar-desktop"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-black rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <span className={`block font-mono text-11 leading-none mb-4 transition-colors duration-300 font-semibold ${
                        isActive ? "text-tertiary" : "text-quaternary"
                      }`}>
                        {card.id}
                      </span>
                      
                      <span className={`block font-sans font-600 text-16 leading-none transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-tertiary"
                      }`}>
                        {card.title}
                      </span>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Right Panel: Sticky card transition display (7 columns) */}
            <div className="col-span-7 relative aspect-[1.4] w-full">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  style={{ opacity: opacities[idx], scale: scales[idx] }}
                  className="absolute inset-0 w-full h-full bg-white rounded-24 border border-black/8 shadow-[0px_12px_40px_rgba(0,0,0,0.06)] p-40 flex flex-col justify-between overflow-hidden"
                >
                  {/* Soft atmospheric background glow */}
                  <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: card.bgGlow }} />
                  
                  {/* Top Header of Card */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-14 font-semibold text-tertiary">{card.id} / 04</span>
                    {card.icon}
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col gap-16 mt-20">
                    <span className="text-11 uppercase font-mono tracking-wider text-black/40">PROBLEM SCENARIO</span>
                    <p className="font-serif font-650 italic text-24 leading-relaxed text-black/85">
                      "{card.quote}"
                    </p>
                  </div>

                  {/* Footer Description */}
                  <div className="border-t border-black/5 pt-20 mt-20 text-left">
                    <h3 className="font-sans font-700 text-16 text-primary mb-6">{card.title}</h3>
                    <p className="text-14 leading-[1.6] text-secondary max-w-[50ch]">
                      {card.desc}
                    </p>
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
