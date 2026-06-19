"use client";

import { motion } from "framer-motion";

export default function Curriculum() {
  const boards = [
    {
      id: "ncert",
      badge: "📘 NCERT (CBSE)",
      classes: "Classes VI–XII",
      subjects: ["Mathematics", "Science", "Social Science", "English", "Commerce"],
      tag: "Complete chapter-wise support",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(54, 175, 255, 0.06) 0%, transparent 60%)",
      color: "text-[#36AFFF]"
    },
    {
      id: "gseb",
      badge: "📗 Gujarat State Board",
      classes: "Classes VI–XII",
      subjects: ["Maths", "Science", "English", "Social Science", "Commerce"],
      tag: "Aligned with Gujarat curriculum",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.06) 0%, transparent 60%)",
      color: "text-[#22C55E]"
    },
    {
      id: "icse",
      badge: "📙 ICSE",
      classes: "Classes VI–XII",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
      tag: "Designed for ICSE learning",
      bgGlow: "radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.06) 0%, transparent 60%)",
      color: "text-[#F97316]"
    }
  ];

  return (
    <section className="py-80 800:py-120 max-w-1440 mx-auto px-20 site-grid">
      
      {/* Header Info */}
      <div className="col-span-12 flex flex-col gap-12 text-center 800:text-left section-header">
        <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
          Built for Indian Classrooms
        </span>
        <h2 className="h2--exposure text-black leading-tight">
          Your Board. Your Syllabus. Fully Covered.
        </h2>
        <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350">
          Whether your child studies NCERT, Gujarat Board, or ICSE, Homi covers every chapter, every subject, and every important concept from Classes VI–XII.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="col-span-12 grid grid-cols-1 800:grid-cols-3 gap-24 mt-40 w-full">
        {boards.map((board, idx) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-24 border border-black/8 shadow-sm p-30 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group min-h-[380px] cursor-pointer"
          >
            {/* Ambient Background Gradient Glow */}
            <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: board.bgGlow }} />

            {/* Header Content */}
            <div className="flex flex-col text-left">
              <span className="text-18 font-serif font-650 text-black leading-none">{board.badge}</span>
              <span className="text-11 font-mono text-tertiary mt-6">{board.classes}</span>
              <div className="border-b border-black/5 my-16 w-full" />
              
              {/* Subjects List */}
              <ul className="flex flex-col gap-10 text-14 text-secondary">
                {board.subjects.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-10">
                    <span className="h-5 w-5 rounded-full bg-black/25 flex-shrink-0" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Tag */}
            <div className="mt-30">
              <div className="h-32 rounded-16 px-12 leading-32 bg-[#EBEBEB]/70 border border-black/5 font-sans font-500 text-11 text-secondary text-center w-full select-none shadow-sm transition-all duration-300 group-hover:bg-[#0A0A0A] group-hover:text-true-white">
                {board.tag}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Statement Signoff */}
      <div className="col-span-12 border-t border-black/5 mt-60 pt-40 flex flex-col 600:flex-row items-center justify-between gap-30 w-full">
        <div className="text-left font-serif font-650 italic text-24 800:text-28 leading-[1.1] -tracking-3 text-black flex flex-col gap-6">
          <span>Every chapter.</span>
          <span>Every subject.</span>
          <span>Every board.</span>
        </div>
        <div className="text-center 600:text-right text-16 800:text-18 font-sans font-350 text-secondary max-w-[25ch] leading-relaxed">
          All in one place, ready when your child is.
        </div>
      </div>

    </section>
  );
}
