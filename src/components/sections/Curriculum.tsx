"use client";

import { motion } from "framer-motion";

interface BoardNode {
  id: string;
  label: string;
  colorClass: string;
  x: number; // percentage width in 1000px container
  y: number; // percentage height in 600px container
  glowColor: string;
}

interface MobileBoardNode {
  id: string;
  label: string;
  colorClass: string;
  y: number; // pixel height (0-1050)
}

export default function Curriculum() {
  const nodes: BoardNode[] = [
    { id: "cbse", label: "CBSE", colorClass: "bg-blue-50/90 border-blue-200/60 text-blue-900", x: 50, y: 12, glowColor: "rgba(54, 175, 255, 0.15)" },
    { id: "icse", label: "ICSE", colorClass: "bg-purple-50/90 border-purple-200/60 text-purple-900", x: 32, y: 18, glowColor: "rgba(186, 110, 255, 0.15)" },
    { id: "ncert", label: "NCERT", colorClass: "bg-emerald-50/90 border-emerald-200/60 text-emerald-900", x: 68, y: 18, glowColor: "rgba(34, 197, 94, 0.15)" },
    { id: "gseb", label: "GSEB", colorClass: "bg-amber-50/90 border-amber-200/60 text-amber-900", x: 15, y: 28, glowColor: "rgba(245, 158, 11, 0.15)" },
    { id: "rbse", label: "RBSE", colorClass: "bg-pink-50/90 border-pink-200/60 text-pink-900", x: 85, y: 28, glowColor: "rgba(244, 63, 94, 0.15)" },
    { id: "maharashtra", label: "Maharashtra Board", colorClass: "bg-orange-50/90 border-orange-200/60 text-orange-900", x: 18, y: 46, glowColor: "rgba(249, 115, 22, 0.15)" },
    { id: "up", label: "UP Board", colorClass: "bg-teal-50/90 border-teal-200/60 text-teal-900", x: 82, y: 46, glowColor: "rgba(20, 184, 166, 0.15)" },
    { id: "karnataka", label: "Karnataka Board", colorClass: "bg-indigo-50/90 border-indigo-200/60 text-indigo-900", x: 30, y: 78, glowColor: "rgba(99, 102, 241, 0.15)" },
    { id: "tamilnadu", label: "Tamil Nadu Board", colorClass: "bg-rose-50/90 border-rose-200/60 text-rose-900", x: 70, y: 78, glowColor: "rgba(236, 72, 153, 0.15)" },
    { id: "kerala", label: "Kerala Board", colorClass: "bg-emerald-50/90 border-emerald-200/60 text-emerald-900", x: 12, y: 66, glowColor: "rgba(16, 185, 129, 0.15)" },
    { id: "mp", label: "MP Board", colorClass: "bg-sky-50/90 border-sky-200/60 text-sky-900", x: 88, y: 66, glowColor: "rgba(14, 165, 233, 0.15)" },
    { id: "andhra", label: "Andhra Pradesh Board", colorClass: "bg-purple-50/90 border-purple-200/60 text-purple-900", x: 20, y: 88, glowColor: "rgba(139, 92, 246, 0.15)" },
    { id: "telangana", label: "Telangana Board", colorClass: "bg-amber-50/90 border-amber-200/60 text-amber-900", x: 50, y: 90, glowColor: "rgba(217, 119, 6, 0.15)" },
    { id: "punjab", label: "Punjab Board", colorClass: "bg-orange-50/90 border-orange-200/60 text-orange-900", x: 80, y: 88, glowColor: "rgba(249, 115, 22, 0.15)" },
    { id: "more", label: "+ More", colorClass: "bg-slate-50/90 border-slate-200/60 text-slate-900", x: 50, y: 70, glowColor: "rgba(100, 116, 139, 0.15)" }
  ];

  // Desktop Center coordinates on a 1000 x 600 canvas coordinate mapping
  const startX = 500;
  const startY = 300;

  // Mobile nodes array for vertical connected journey (height: 950px)
  const mobileNodes: MobileBoardNode[] = [
    { id: "cbse", label: "CBSE", colorClass: "bg-blue-50/90 border-blue-200/60 text-blue-900", y: 110 },
    { id: "icse", label: "ICSE", colorClass: "bg-purple-50/90 border-purple-200/60 text-purple-900", y: 200 },
    { id: "ncert", label: "NCERT", colorClass: "bg-emerald-50/90 border-emerald-200/60 text-emerald-900", y: 290 },
    { id: "gseb", label: "GSEB", colorClass: "bg-amber-50/90 border-amber-200/60 text-amber-900", y: 380 },
    { id: "maharashtra", label: "Maharashtra", colorClass: "bg-orange-50/90 border-orange-200/60 text-orange-900", y: 470 },
    { id: "karnataka", label: "Karnataka", colorClass: "bg-indigo-50/90 border-indigo-200/60 text-indigo-900", y: 560 },
    { id: "tamilnadu", label: "Tamil Nadu", colorClass: "bg-rose-50/90 border-rose-200/60 text-rose-900", y: 650 },
    { id: "kerala", label: "Kerala", colorClass: "bg-emerald-50/90 border-emerald-200/60 text-emerald-900", y: 740 },
    { id: "mp", label: "MP Board", colorClass: "bg-sky-50/90 border-sky-200/60 text-sky-900", y: 830 },
    { id: "more", label: "+ More", colorClass: "bg-slate-50/90 border-slate-200/60 text-slate-900", y: 920 }
  ];

  const startXMobile = 50;
  const startYMobile = 20; // Homi logo center y
  
  let mobilePathD = `M ${startXMobile} ${startYMobile}`;
  mobileNodes.forEach((node, idx) => {
    const y1 = idx === 0 ? startYMobile : mobileNodes[idx - 1].y;
    const y2 = node.y;
    const dy = y2 - y1;
    // Alternate direction of the curve
    const direction = idx % 2 === 0 ? 1 : -1;
    const offset = 12 * direction;
    
    const cp1X = startXMobile + offset;
    const cp1Y = y1 + dy * 0.25;
    const cp2X = startXMobile + offset;
    const cp2Y = y2 - dy * 0.25;
    
    mobilePathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${startXMobile} ${y2}`;
  });

  // Generates curved organic connection lines (Desktop)
  const getCurvePath = (x: number, y: number) => {
    const xPix = x * 10;
    const yPix = y * 6;

    if (x === 50) {
      return `M ${startX} ${startY} Q ${startX + (y < 50 ? 25 : -25)} ${(startY + yPix) / 2}, ${xPix} ${yPix}`;
    }

    const cp1X = startX + (xPix - startX) * 0.2;
    const cp1Y = startY + (yPix - startY) * 0.8;
    
    const cp2X = startX + (xPix - startX) * 0.85;
    const cp2Y = startY + (yPix - startY) * 0.15;
    
    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${xPix} ${yPix}`;
  };

  return (
    <section 
      id="curriculum" 
      className="py-0 overflow-hidden bg-transparent text-black"
    >
      <div className="max-w-1440 mx-auto px-24 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center max-w-680 mb-24 800:mb-32 flex flex-col items-center gap-16 800:gap-20 section-header">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-12 font-mono uppercase tracking-wider text-blue-600/70 bg-blue-50 px-12 py-4 rounded-full border border-blue-100/50"
          >
            Built For Indian Classrooms
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="h2--exposure text-black leading-tight text-center px-4"
          >
            Your Board. Your Syllabus. Fully Covered.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-16 800:text-18 text-black/60 font-sans font-350 leading-relaxed max-w-[480px] 800:max-w-[560px] mt-4 text-center mx-auto"
          >
            Whether your child studies under CBSE, ICSE, State Boards, or NCERT-aligned curricula, Homi adapts to the syllabus they actually follow.
          </motion.p>
        </div>

        {/* 1. DESKTOP VIEWPORT (>= 800px) */}
        <div className="hidden 800:flex w-full overflow-x-auto scrollbar-none pb-20 mask-gradient-horizontal justify-center">
          
          <div className="relative w-[1000px] h-[600px] flex-shrink-0 select-none overflow-visible">
            
            {/* SVG Learning Network Connections */}
            <svg 
              width="100%"
              height="100%"
              className="absolute inset-0 pointer-events-none z-0" 
              viewBox="0 0 1000 600" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="glow-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#36AFFF" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#FF64C3" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9D5CFF" stopOpacity="0.45" />
                </linearGradient>
                <filter id="svg-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Draw curved lines to each node */}
              {nodes.map((node, idx) => (
                <g key={`path-${node.id}`}>
                  {/* Subtle Background Glow Line */}
                  <motion.path 
                    d={getCurvePath(node.x, node.y)}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.6, delay: idx * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    stroke={node.glowColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#svg-subtle-glow)"
                  />
                  {/* Foreground Main Line */}
                  <motion.path 
                    d={getCurvePath(node.x, node.y)}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.4, delay: idx * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    stroke="url(#glow-line-grad)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ))}
            </svg>

            {/* Central Homi Logo */}
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 flex items-center justify-center">
              
              {/* Outer Pulsing Glow rings */}
              <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-[#36AFFF]/12 via-[#FF64C3]/10 to-[#9D5CFF]/12 blur-xl pointer-events-none -z-10 animate-pulse" />
              
              {/* Premium elevated glassmorphic circular badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="w-100 h-100 rounded-full bg-white border border-solid border-white flex items-center justify-center shadow-[0_16px_40px_rgba(54,175,255,0.12)] p-12 relative"
                style={{
                  boxShadow: "inset 0 1px 3px rgba(255,255,255,0.8), 0 20px 48px rgba(0,0,0,0.04)"
                }}
              >
                <img 
                  src="/logo1.png" 
                  alt="Homi AI Engine Logo" 
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>
            </div>

            {/* Floating Board Nodes */}
            {nodes.map((node, idx) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 + 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                className={`absolute z-10 px-18 py-8 rounded-full border border-solid font-sans font-500 text-13 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 pointer-events-auto select-none ${node.colorClass}`}
              >
                {node.label}
              </motion.div>
            ))}

          </div>

        </div>

        {/* 2. MOBILE VIEWPORT (< 800px) */}
        <div className="block 800:hidden w-full relative h-[950px] max-w-[450px] overflow-visible mx-auto">
          
          {/* Mobile SVG Learning Network Connections */}
          <svg 
            width="100%"
            height="100%"
            className="absolute inset-0 pointer-events-none z-0" 
            viewBox="0 0 100 950" 
            preserveAspectRatio="none"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="mobile-glow-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#36AFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FF64C3" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#9D5CFF" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Subtle Outer Glow Line */}
            <motion.path 
              d={mobilePathD}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
              stroke="url(#mobile-glow-line-grad)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Subtle Inner Glow Line */}
            <motion.path 
              d={mobilePathD}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.35 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              stroke="url(#mobile-glow-line-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Foreground Main Line */}
            <motion.path 
              d={mobilePathD}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              stroke="url(#mobile-glow-line-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Central Homi Logo centerpiece at the top */}
          <div className="absolute left-[50%] top-[20px] -translate-x-[50%] -translate-y-[50%] z-20 flex items-center justify-center">
            
            {/* Outer Pulsing Glow rings */}
            <div className="absolute w-[130px] h-[130px] rounded-full bg-gradient-to-tr from-[#36AFFF]/12 via-[#FF64C3]/10 to-[#9D5CFF]/12 blur-xl pointer-events-none -z-10 animate-pulse" />
            
            {/* Premium elevated glassmorphic circular badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-80 h-80 rounded-full bg-white border border-solid border-white flex items-center justify-center shadow-[0_12px_32px_rgba(54,175,255,0.1)] p-10 relative"
              style={{
                boxShadow: "inset 0 1px 3px rgba(255,255,255,0.8), 0 15px 36px rgba(0,0,0,0.03)"
              }}
            >
              <img 
                src="/logo1.png" 
                alt="Homi AI Engine Logo" 
                className="w-full h-full object-contain select-none"
              />
            </motion.div>
          </div>

          {/* Mobile Board Nodes */}
          {mobileNodes.map((node, idx) => (
            <div
              key={`mobile-${node.id}`}
              className="absolute z-10"
              style={{
                left: `50%`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -4, 0]
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  opacity: { duration: 0.5, delay: idx * 0.04 + 0.3, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.5, delay: idx * 0.04 + 0.3, ease: [0.16, 1, 0.3, 1] },
                  y: {
                    duration: 4 + (idx % 3) * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.04 + 0.8
                  }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-14 py-6 rounded-full border border-solid font-sans font-500 text-11 text-center w-[140px] max-w-[140px] leading-tight shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-300 pointer-events-auto select-none ${node.colorClass}`}
              >
                {node.label}
              </motion.div>
            </div>
          ))}

        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 800:grid-cols-3 gap-24 mt-24 800:mt-32 max-w-1000 w-full px-24 justify-center items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/40 border border-solid border-black/5 rounded-24 p-32 text-center shadow-[0_8px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm hover:bg-white/60 transition-all"
          >
            <span className="block text-32 800:text-40 font-serif font-700 text-black mb-8 leading-none">10+</span>
            <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">Boards Supported</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/40 border border-solid border-black/5 rounded-24 p-32 text-center shadow-[0_8px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm hover:bg-white/60 transition-all"
          >
            <span className="block text-32 800:text-40 font-serif font-700 text-black mb-8 leading-none">Classes VI–XII</span>
            <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">Comprehensive Scope</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/40 border border-solid border-black/5 rounded-24 p-32 text-center shadow-[0_8px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm hover:bg-white/60 transition-all"
          >
            <span className="block text-32 800:text-40 font-serif font-700 text-black mb-8 leading-none">Chapter-wise</span>
            <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">Coverage</span>
          </motion.div>

        </div>

        {/* Bottom Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 800:mt-32 text-center"
        >
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black/80 flex flex-col gap-4">
            <span>One platform. Every major board.</span>
            <span className="text-15 font-sans font-350 text-secondary not-italic mt-4">
              Every learning journey.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
