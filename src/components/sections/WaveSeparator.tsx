"use client";

import { motion } from "framer-motion";

interface WaveSeparatorProps {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export default function WaveSeparator({ type }: WaveSeparatorProps) {
  // Hand-crafted bezier wave paths with 80-120px amplitude
  const pathA = "M0 80 C 360 140, 360 -20, 720 60 C 1080 140, 1080 -20, 1440 40";
  const pathB = "M0 40 C 480 130, 960 -30, 1440 80";
  const pathC = "M0 90 C 360 30, 720 110, 1080 30 C 1260 10, 1350 10, 1440 50";

  // Cycle paths so adjacent separators always feel organic and unique
  const getPath = (t: number) => {
    const cycle = t % 3;
    if (cycle === 1) return pathA;
    if (cycle === 2) return pathB;
    return pathC;
  };

  const pathD = getPath(type);

  // Set background colors based on section transitions
  let upperColor = "#FFFFFF";
  let lowerColor = "#FFFFFF";

  if (type === 1) {
    upperColor = "#FFFFFF";
    lowerColor = "#F4FAFF"; // Sky Blue Start
  } else if (type === 2) {
    upperColor = "#EAF5FF"; // Sky Blue End
    lowerColor = "#FFFFFF";
  } else if (type === 3) {
    upperColor = "#FFFFFF";
    lowerColor = "#F4FAFF"; // Sky Blue Start
  } else if (type === 4) {
    upperColor = "#EAF5FF"; // Sky Blue End
    lowerColor = "#FFFFFF";
  } else if (type === 5) {
    upperColor = "#FFFFFF";
    lowerColor = "#F5FFF8"; // Mint Start
  } else if (type === 6) {
    upperColor = "#E7FAEF"; // Mint End
    lowerColor = "#FFFFFF";
  } else if (type === 7) {
    upperColor = "#FFFFFF";
    lowerColor = "#FBF7FF"; // Lavender Start
  } else if (type === 8) {
    upperColor = "#F2E8FF"; // ParentsLoop Lavender End
    lowerColor = "#F2F6FF"; // Teachers Soft Blue Start
  } else if (type === 12) {
    upperColor = "#F5F2FF"; // Teachers Soft Lavender End
    lowerColor = "#FFFFFF"; // Roles White Start
  } else if (type === 9) {
    upperColor = "#FFFFFF";
    lowerColor = "#FFF9F2"; // Peach Start
  } else if (type === 10) {
    upperColor = "#FFEFD9"; // Peach End
    lowerColor = "#FFFDF9"; // Pricing Cream Start
  } else if (type === 11) {
    upperColor = "#F6F0FF"; // Pricing Lavender End
    lowerColor = "#FFFFFF"; // CTA White Start
  }

  return (
    <div className="w-full overflow-hidden leading-none select-none pointer-events-none relative z-10 bg-transparent">
      {/* Parent handles entry transition */}
      <motion.div
        initial={{ opacity: 0.85, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {/* Child SVG handles floating animation loop */}
        <motion.svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-60 800:h-90"
          preserveAspectRatio="none"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Upper background */}
          <rect width="1440" height="120" fill={upperColor} />
          
          {/* Handcrafted organic divider wave */}
          <path 
            d={`${pathD} L 1440 120 L 0 120 Z`} 
            fill={lowerColor} 
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
