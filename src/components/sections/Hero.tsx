"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const yNetwork = useTransform(scrollY, [0, 600], [0, -50]);

  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<{
    c1: { x: number; y: number } | null;
    c2: { x: number; y: number } | null;
    c3: { x: number; y: number } | null;
    c4: { x: number; y: number } | null;
  }>({ c1: null, c2: null, c3: null, c4: null });

  useEffect(() => {
    const updateCoords = () => {
      if (
        containerRef.current &&
        card1Ref.current &&
        card2Ref.current &&
        card3Ref.current &&
        card4Ref.current
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const getCardCenter = (cardEl: HTMLDivElement) => {
          const rect = cardEl.getBoundingClientRect();
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        };

        setCoords({
          c1: getCardCenter(card1Ref.current),
          c2: getCardCenter(card2Ref.current),
          c3: getCardCenter(card3Ref.current),
          c4: getCardCenter(card4Ref.current),
        });
      }
    };

    updateCoords();
    // Run layout measurements at multiple key intervals to ensure correctness as page layout shifts
    const timers = [
      setTimeout(updateCoords, 100),
      setTimeout(updateCoords, 500),
      setTimeout(updateCoords, 1000),
      setTimeout(updateCoords, 2000),
    ];

    window.addEventListener("resize", updateCoords);
    return () => {
      window.removeEventListener("resize", updateCoords);
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="hero"
      className="min-h-[100svh] 800:h-full-screen relative overflow-hidden bg-white isolate [contain:layout_paint]"
      style={{ "--hero-color": "#4A90E2" } as React.CSSProperties}
    >
      
      {/* ========================================================
          BACKGROUND LAYERED PASTEL LIGHT SOURCES - STRONGER COLOR (Z-Index 1 to 5)
         ======================================================== */}
      <div aria-hidden="true" className="hidden 800:block absolute inset-0 overflow-hidden pointer-events-none z-1">
        
        {/* Blob 1: Vibrant Pastel Blue / Cyan (Top Left) - Saturated & Strong */}
        <motion.div 
          animate={{ 
            x: ["-8%", "8%", "-4%", "-8%"],
            y: ["-4%", "4%", "0%", "-4%"],
            scale: [1, 1.15, 0.95, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute left-[-10%] top-[-10%] rounded-full blur-[180px] 800:blur-[280px] opacity-95 mix-blend-screen"
          style={{
            width: "95vw",
            height: "95vw",
            backgroundImage: "radial-gradient(circle, rgba(54, 175, 255, 0.85) 0%, rgba(121, 243, 255, 0.45) 50%, transparent 75%)",
          }}
        />

        {/* Blob 2: Dreamy Pastel Pink / Magenta (Top Right) - Saturated & Strong */}
        <motion.div 
          animate={{ 
            x: ["8%", "-8%", "4%", "8%"],
            y: ["4%", "-4%", "0%", "4%"],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ 
            duration: 24, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute right-[-10%] top-[-10%] rounded-full blur-[180px] 800:blur-[280px] opacity-90 mix-blend-screen"
          style={{
            width: "95vw",
            height: "95vw",
            backgroundImage: "radial-gradient(circle, rgba(255, 100, 195, 0.8) 0%, rgba(255, 180, 210, 0.45) 50%, transparent 75%)",
          }}
        />

        {/* Blob 3: Magical Lavender / Purple (Center Top) - Saturated & Strong */}
        <motion.div 
          animate={{ 
            x: ["-4%", "4%", "-4%"],
            y: ["-8%", "8%", "-8%"],
            scale: [0.95, 1.08, 0.95]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute left-[10%] top-[-25%] rounded-full blur-[200px] 800:blur-[300px] opacity-90 mix-blend-screen"
          style={{
            width: "105vw",
            height: "85vw",
            backgroundImage: "radial-gradient(circle, rgba(186, 110, 255, 0.75) 0%, rgba(220, 180, 255, 0.4) 50%, transparent 75%)",
          }}
        />

        {/* Blob 4: Soft Pastel Peach (Middle Left) - Saturated & Strong */}
        <motion.div 
          animate={{ 
            x: ["-10%", "8%", "-10%"],
            y: ["8%", "-8%", "8%"],
            scale: [1.1, 0.9, 1.1]
          }}
          transition={{ 
            duration: 26, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute left-[-20%] top-[20%] rounded-full blur-[170px] 800:blur-[250px] opacity-85 mix-blend-screen"
          style={{
            width: "85vw",
            height: "85vw",
            backgroundImage: "radial-gradient(circle, rgba(255, 175, 110, 0.7) 0%, rgba(255, 230, 150, 0.35) 60%, transparent 75%)",
          }}
        />

        {/* Blob 5: Center Core Atmospheric Light */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-[5%] rounded-full blur-[140px] opacity-80 pointer-events-none"
          style={{
            width: "75vw",
            height: "50vw",
            backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%)",
          }}
        />

      </div>

      {/* Mobile static high-performance background (visible on mobile, hidden on desktop) */}
      <div 
        aria-hidden="true" 
        className="block 800:hidden absolute inset-0 bg-white pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 30%, rgba(54, 175, 255, 0.15) 0%, rgba(255, 100, 195, 0.1) 40%, rgba(255, 255, 255, 0) 70%)"
        }}
      />

      {/* ========================================================
          WHITE HORIZON ARC WITH VIBRANT LIGHT REFLECTIONS (Z-Index 10)
         ======================================================== */}
      <div aria-hidden="true" className="absolute left-0 right-0 bottom-0 z-10" style={{ top: "22svh" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.012, 1],
            y: [0, -3, 0]
          }}
          transition={{ 
            opacity: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="will-change-transform relative w-full h-full"
          style={{ transformOrigin: "center" }}
        >
          {/* Light scattering left side blue glow reflection */}
          <div 
            className="absolute left-[10%] w-[65vw] h-[35vw] rounded-full blur-[45px] opacity-85 pointer-events-none -z-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(54, 175, 255, 0.6) 0%, transparent 70%)",
              top: "-20px"
            }}
          />

          {/* Light scattering right side pink glow reflection */}
          <div 
            className="absolute right-[10%] w-[65vw] h-[35vw] rounded-full blur-[45px] opacity-80 pointer-events-none -z-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255, 100, 195, 0.55) 0%, transparent 70%)",
              top: "-20px"
            }}
          />

          {/* Light scattering bottom peach reflection glow */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full blur-[50px] opacity-65 pointer-events-none -z-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255, 175, 110, 0.5) 0%, transparent 70%)",
              top: "-20px"
            }}
          />

          {/* White Horizon Arc itself */}
          <div 
            className="aspect-square relative left-1/2 -translate-x-1/2 bg-white rounded-full [clip-path:inset(0_0_33.33%_0)]" 
            style={{ 
              width: "220vw",
              boxShadow: "inset 0px 4px 20px rgba(54, 175, 255, 0.18), 0px -4px 30px rgba(255, 100, 195, 0.18)"
            }} 
          />
        </motion.div>
      </div>

      {/* ========================================================
          HERO CONTENT AND HEADLINE GLOWS (Z-Index 20)
         ======================================================== */}
      <div className="relative 800:absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-black leading-[1.05] -tracking-4 px-16 pt-[240px] 600:pt-[280px] pb-[80px] 800:pt-[15vh] 800:pb-0 section-header min-h-[100svh] 800:min-h-0">
        
        {/* Headline Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col items-center text-48 600:text-80 800:text-110 1000:text-140 pointer-events-none select-none"
        >
          {/* Hero Brand Anchor Logo1 */}
          <div className="mb-24 800:mb-32 flex justify-center pointer-events-auto select-none">
            <img 
              src="/logo1.png" 
              alt="HomiLearn Brand Logo" 
              className="h-88 800:h-120 w-auto object-contain drop-shadow-[0_8px_32px_rgba(54,175,255,0.12)]"
            />
          </div>

          <h1 className="font-sans font-300 -tracking-4 text-black flex flex-col items-center gap-10">
            <span className="block">Learning that</span>
            <span className="block">knows</span>
            
            {/* Centerpiece "you" word with soft pulsing Apple bloom */}
            <span className="relative inline-block font-serif font-650 italic text-[1.15em] leading-[0.9] -tracking-3 text-black px-10">
              <motion.span
                animate={{ 
                  opacity: [0.35, 0.6, 0.35],
                  scale: [1, 1.08, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-[#54AFFF]/65 via-[#FF64C3]/55 to-[#FFAF6E]/60 blur-[24px] rounded-full pointer-events-none -z-10"
              />
              you
            </span>
          </h1>
        </motion.div>

        {/* Subtitle, Board Badges & Download Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col items-center gap-24 mt-30 800:mt-40"
        >
          <p className="font-sans font-350 tracking-tight text-16 600:text-18 800:text-20 text-black/65 max-w-280 800:max-w-450 leading-[1.5] text-pretty">
            Meet Homi — your AI learning companion for Classes VI–XII. Personalized explanations, instant doubt solving, viva preparation, and parent insights in one platform.
          </p>

          {/* Board Strip Badges Removed */}
          
          <div className="flex flex-col 600:flex-row items-center gap-16 pointer-events-auto mt-10">
            {/* Primary CTA */}
            <button 
              onClick={() => handleScroll("cta")}
              className="inline-flex rounded-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue group relative cursor-pointer" 
              title="Start Free With Homi" 
              type="button"
            >
              <span className="relative inline-flex items-center justify-center">
                {/* Glow Behind Button */}
                <span 
                  aria-hidden="true" 
                  className="absolute -inset-x-32 -inset-y-16 rounded-full blur-[32px] opacity-40 pointer-events-none transition-all duration-300 group-hover:opacity-60" 
                  style={{ backgroundColor: "rgba(121, 201, 255, 0.8)" }}
                />
                <span 
                  className="relative flex items-center justify-center rounded-14 text-true-white font-sans font-500 text-16 800:text-18 h-52 px-32 transition-all duration-300 bg-[#0A0A0A] hover:bg-[#1A1A1A]"
                  style={{ 
                    boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.15)"
                  }}
                >
                  Start Free With Homi
                </span>
              </span>
            </button>

            {/* Secondary CTA */}
            <button 
              onClick={() => handleScroll("how-it-works")}
              className="inline-flex items-center justify-center rounded-14 text-black bg-[#EBEBEB]/70 border border-black/5 hover:bg-black/10 px-32 text-16 800:text-18 h-52 transition-all duration-200 ease-in-out font-sans font-500 gap-10 cursor-pointer"
              title="See Homi In Action" 
              type="button"
            >
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/70">
                <path d="M1.24658 12.4229C0.978027 12.4229 0.763184 12.3252 0.602051 12.1299C0.445801 11.9395 0.367676 11.6855 0.367676 11.3682V1.07031C0.367676 0.75293 0.445801 0.499023 0.602051 0.308594C0.763184 0.118164 0.978027 0.0229492 1.24658 0.0229492C1.39307 0.0229492 1.53223 0.0498047 1.66406 0.103516C1.7959 0.152344 1.93506 0.218262 2.08154 0.30127L10.6216 5.24512C10.9292 5.4209 11.1416 5.57959 11.2588 5.72119C11.3809 5.85791 11.4419 6.02393 11.4419 6.21924C11.4419 6.41455 11.3809 6.58301 11.2588 6.72461C11.1416 6.86133 10.9292 7.02002 10.6216 7.20068L2.08154 12.1372C1.93506 12.2251 1.7959 12.2935 1.66406 12.3423C1.53223 12.396 1.39307 12.4229 1.24658 12.4229Z" fill="currentColor"></path>
              </svg>
              See Homi In Action
            </button>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          HOMILEARN FLOATING EDUCATIONAL CARDS (Z-Index 30)
         ======================================================== */}
      <motion.div 
        ref={containerRef}
        style={{ y: yNetwork }}
        className="hidden 1000:block absolute inset-0 pointer-events-none z-30"
      >
        {/* SVG Connections Layer */}
        {coords.c1 && coords.c2 && coords.c3 && coords.c4 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
            <defs>
              {/* Linear Gradients following the flow */}
              <linearGradient id="flow-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#36AFFF" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="flow-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#36AFFF" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="flow-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#9D5CFF" stopOpacity="0.75" />
              </linearGradient>

              {/* Glowing SVG filter */}
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Path 1: Card 1 (Identify) -> Card 2 (Trace) */}
            {/* Curves upwards over the Homi Logo centerpiece */}
            <motion.path
              d={`M ${coords.c1.x} ${coords.c1.y} C ${(coords.c1.x + coords.c2.x) / 2} ${Math.min(coords.c1.y, coords.c2.y) - 120}, ${(coords.c1.x + coords.c2.x) / 2} ${Math.min(coords.c1.y, coords.c2.y) - 120}, ${coords.c2.x} ${coords.c2.y}`}
              fill="none"
              stroke="url(#flow-grad-1)"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              filter="url(#glow-filter)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Path 2: Card 2 (Trace) -> Card 3 (Rebuild) */}
            {/* Curves outwards along the right edge */}
            <motion.path
              d={`M ${coords.c2.x} ${coords.c2.y} C ${coords.c2.x + 80} ${(coords.c2.y + coords.c3.y) / 2}, ${coords.c3.x + 80} ${(coords.c2.y + coords.c3.y) / 2}, ${coords.c3.x} ${coords.c3.y}`}
              fill="none"
              stroke="url(#flow-grad-2)"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              filter="url(#glow-filter)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 1.4 }}
            />

            {/* Path 3: Card 3 (Rebuild) -> Card 4 (Solve) */}
            {/* Curves downwards under the primary/secondary CTA buttons */}
            <motion.path
              d={`M ${coords.c3.x} ${coords.c3.y} C ${(coords.c3.x + coords.c4.x) / 2} ${Math.max(coords.c3.y, coords.c4.y) + 120}, ${(coords.c3.x + coords.c4.x) / 2} ${Math.max(coords.c3.y, coords.c4.y) + 120}, ${coords.c4.x} ${coords.c4.y}`}
              fill="none"
              stroke="url(#flow-grad-3)"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              filter="url(#glow-filter)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 2.2 }}
            />
          </svg>
        )}

        {/* CARD 1 (Top Left) - Learning Gap Detected */}
        <div 
          ref={card1Ref} 
          className="absolute left-[6%] top-[18%] pointer-events-auto"
        >
          <motion.div 
            animate={{ y: [0, -8, 0], rotate: [0, 0.4, -0.4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[160px] bg-white/80 backdrop-blur-md border border-amber-200/50 rounded-16 p-12 shadow-[0px_8px_32px_rgba(245,158,11,0.06)] text-left flex flex-col gap-8 font-sans relative overflow-hidden"
          >
            {/* Subtle amber radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_85%)] pointer-events-none -z-10" />
            
            <div className="flex items-center justify-between border-b border-black/5 pb-6">
              <span className="text-11 uppercase font-mono tracking-wider text-amber-600 font-semibold flex items-center gap-4">
                <span className="w-5 h-5 rounded-full bg-amber-500 animate-pulse" />
                01 / IDENTIFY
              </span>
              <span className="text-12">🔍</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-11 uppercase tracking-wider font-mono text-black/40">Grade 10</span>
              <span className="text-15 font-bold text-black/85 leading-tight">Quadratic Equations</span>
            </div>
            
            <div className="h-24 rounded-12 px-8 leading-24 bg-amber-500/10 border border-amber-500/15 text-amber-700 font-semibold text-11 w-max select-none shadow-sm flex items-center gap-3 mt-2">
              <span>⚠️</span> Gap Detected
            </div>
          </motion.div>
        </div>

        {/* CARD 2 (Top Right) - Tracing Knowledge Path */}
        <div 
          ref={card2Ref} 
          className="absolute right-[6%] top-[16%] pointer-events-auto"
        >
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, -0.5, 0.5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-[160px] bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-16 p-12 shadow-[0px_8px_32px_rgba(54,175,255,0.06)] text-left flex flex-col gap-8 font-sans relative overflow-hidden"
          >
            {/* Subtle blue radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,175,255,0.08)_0%,transparent_85%)] pointer-events-none -z-10" />
            
            <div className="flex items-center justify-between border-b border-black/5 pb-6">
              <span className="text-11 uppercase font-mono tracking-wider text-blue-600 font-semibold flex items-center gap-4">
                <span className="w-5 h-5 rounded-full bg-blue-500 animate-pulse" />
                02 / TRACE
              </span>
              <span className="text-12">🕸️</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-11 font-semibold text-black/50 leading-none">Tracing Knowledge Path...</span>
              
              <div className="flex flex-col gap-2 bg-blue-500/5 border border-blue-500/10 rounded-8 p-6 text-11">
                <div className="flex justify-between font-mono text-[9px] text-black/40">
                  <span>ROOT CAUSE FOUND</span>
                  <span>G8</span>
                </div>
                <span className="font-bold text-blue-900 leading-tight">Factorization</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CARD 3 (Bottom Right) - Foundation Strengthened */}
        <div 
          ref={card3Ref} 
          className="absolute right-[5%] bottom-[16%] pointer-events-auto"
        >
          <motion.div 
            animate={{ y: [0, -7, 0], rotate: [0, -0.4, 0.4, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="w-[160px] bg-white/80 backdrop-blur-md border border-emerald-200/50 rounded-16 p-12 shadow-[0px_8px_32px_rgba(16,185,129,0.06)] text-left flex flex-col gap-8 font-sans relative overflow-hidden"
          >
            {/* Subtle green radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_85%)] pointer-events-none -z-10" />
            
            <div className="flex items-center justify-between border-b border-black/5 pb-6">
              <span className="text-11 uppercase font-mono tracking-wider text-emerald-600 font-semibold flex items-center gap-4">
                <span className="w-5 h-5 rounded-full bg-emerald-500 animate-pulse" />
                03 / REBUILD
              </span>
              <span className="text-12">🛠️</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-wider font-mono text-black/40">FOUNDATION REBUILT</span>
                <span className="text-15 font-bold text-black/85 leading-tight">3 Concepts Recovered</span>
              </div>
              
              {/* Mini checklist */}
              <div className="flex flex-col gap-2 font-mono text-[9px] text-emerald-800 bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-8">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-600 font-bold">✓</span> Expansion
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-600 font-bold">✓</span> Factoring
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CARD 4 (Bottom Left) - Quadratic Equations Unlocked */}
        <div 
          ref={card4Ref} 
          className="absolute left-[5%] bottom-[18%] pointer-events-auto"
        >
          <motion.div 
            animate={{ y: [0, -9, 0], rotate: [0, 0.5, -0.5, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-[160px] bg-gradient-to-b from-white to-[#F9F0FF] border-2 border-solid border-purple-300/60 rounded-16 p-12 shadow-[0px_12px_36px_rgba(157,92,255,0.12)] text-left flex flex-col gap-8 font-sans relative overflow-hidden"
            style={{
              boxShadow: "inset 0 1px 3px rgba(255,255,255,0.8), 0 16px 36px rgba(157,92,255,0.08)"
            }}
          >
            {/* Subtle purple radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,92,255,0.1)_0%,transparent_85%)] pointer-events-none -z-10" />
            
            <div className="flex items-center justify-between border-b border-purple-100 pb-6">
              <span className="text-11 uppercase font-mono tracking-wider text-purple-600 font-bold flex items-center gap-4">
                <span className="w-5 h-5 rounded-full bg-purple-500 animate-pulse" />
                04 / SOLVE
              </span>
              <span className="text-12">🚀</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-11 uppercase tracking-wider font-mono text-purple-600/70 font-semibold">Grade 10</span>
              <span className="text-15 font-bold text-purple-950 leading-tight">Quadratic Equations</span>
            </div>
            
            <div className="h-24 rounded-12 px-10 leading-24 bg-purple-600 text-true-white font-bold text-11 w-max select-none shadow-md flex items-center gap-3 mt-2 animate-bounce">
              Unlocked 🚀
            </div>
          </motion.div>
        </div>
      </motion.div>



    </section>
  );
}
