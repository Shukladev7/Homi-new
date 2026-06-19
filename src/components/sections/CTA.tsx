"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="cta" className="pt-100 pb-80 800:py-100 800:pt-150 max-w-760 mx-auto flex flex-col justify-center items-center px-20 800:px-0 section-header">
      
      {/* Main Headline */}
      <h2 className="text-center font-serif leading-none flex flex-col gap-12 items-center">
        <span className="block text-35 800:text-48 text-black font-700 tracking-tight">
          Your Child's Best Study Session
        </span>
        <motion.span 
          initial={{ backgroundPosition: "100% 0" }}
          whileInView={{ backgroundPosition: "0% 0" }}
          whileHover={{ 
            backgroundPosition: "50% 0",
            transition: { duration: 0.6, ease: "easeOut" }
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-flex pb-1 pr-2 -mr-2 chroma-text select-none cursor-pointer text-48 800:text-64 font-800 leading-tight"
        >
          Starts Tonight.
        </motion.span>
      </h2>

      {/* Subheadline */}
      <p className="text-16 leading-relaxed text-secondary max-w-[54ch] mt-24 text-center font-sans font-350">
        Give your child a learning companion that explains concepts, answers questions, builds confidence, and grows with them every day.
      </p>

      {/* Primary CTA Button */}
      <div className="relative z-2 mt-40">
        <button 
          className="h-56 px-28 flex items-center justify-center gap-14 font-sans font-500 text-18 800:text-20 rounded-14 bg-black text-true-white button--cta min-w-170 w-max shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]" 
          title="Start Free With Homi" 
          type="button"
        >
          <span>Start Free With Homi</span>
        </button>
      </div>

    </section>
  );
}
