"use client";

import { motion } from "framer-motion";

export default function PracticePrep() {
  return (
    <section id="features" className="py-40 800:py-60 max-w-1600 mx-auto px-20">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            Practice & Preparation
          </span>
          <h2 className="h2--exposure text-center max-w-[22ch] mx-auto text-black">
            Practice, Viva & Exam Prep
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            From homework and revision to viva practice and final exams, Homi helps students prepare with confidence.
          </p>
        </div>

        {/* Outer Grid Wrapper */}
        <div className="mt-60 800:mt-80 flex flex-col gap-10 800:gap-20">
          
          {/* Row 1: Smart Quiz Practice (7 cols) & Viva Practice Mode (5 cols) */}
          <div className="grid grid-cols-12 gap-10 800:gap-20">
            
            {/* CARD 1: Smart Quiz Practice (7 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[#F4F4F4] col-span-12 800:col-span-7 rounded-24 border border-solid border-black/5 overflow-hidden flex flex-col min-h-480 hover:shadow-md transition-all duration-300"
            >
              <div className="p-30 flex flex-col gap-16 800:p-24 800:gap-10 1000:p-30 1000:gap-14 flex-shrink-0 text-left">
                <div className="h-35 bg-true-white px-16 font-sans font-500 text-13 leading-33 border border-solid border-black/8 rounded-20 text-secondary w-fit shadow-sm">
                  Quizzes
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Smart Quiz Practice
                </h3>
                <p className="text-14 leading-[1.6] text-secondary max-w-[55ch]">
                  Turn any chapter into an interactive quiz and instantly discover which concepts need more attention.
                </p>
              </div>
              
              {/* Visual: Quiz interface */}
              <div className="flex-1 flex items-end justify-center px-30 pb-24 800:px-40 overflow-hidden">
                <div className="w-full max-w-440 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-10 text-left mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8">
                    <span className="text-[10px] font-mono text-black/35 uppercase">Chapter: Algebra</span>
                    <span className="text-[10px] bg-green-500/10 text-green-700 px-6 py-2 rounded font-semibold">Question 7 of 15</span>
                  </div>

                  <div className="flex flex-col gap-8 bg-slate-50 border border-black/5 p-12 rounded-12 relative overflow-hidden">
                    <span className="text-[10px] text-black/35 font-mono">QUESTION</span>
                    <p className="text-13 font-bold text-black/90 leading-relaxed">
                      "If 2x + 5 = 15, what is the value of x?"
                    </p>
                    
                    <div className="flex justify-between items-center mt-6 bg-green-500/5 border border-green-500/15 p-6 rounded-8 shadow-sm">
                      <span className="text-11 text-green-800 font-semibold">✓ Correct Answer: x = 5</span>
                      <span className="text-10 text-green-700 font-bold bg-green-500/10 px-6 py-1 rounded">Pass</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-black/5 pt-8 mt-2">
                    <span className="text-11 text-black/50 font-medium">Running Performance</span>
                    <span className="text-16 font-bold text-green-600">86% Score</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Viva Practice Mode (5 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[#F4F4F4] col-span-12 800:col-span-5 rounded-24 border border-solid border-black/5 overflow-hidden flex flex-col min-h-480 hover:shadow-md transition-all duration-300"
            >
              <div className="p-30 flex flex-col gap-16 800:p-24 800:gap-10 1000:p-30 1000:gap-14 flex-shrink-0 text-left">
                <div className="h-35 bg-true-white px-16 font-sans font-500 text-13 leading-33 border border-solid border-black/8 rounded-20 text-secondary w-fit shadow-sm">
                  Speaking
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Viva Practice Mode
                </h3>
                <p className="text-14 leading-[1.6] text-secondary">
                  Practice speaking answers out loud and receive instant feedback on confidence, clarity, and delivery.
                </p>
              </div>

              {/* Visual: Viva Practice metrics */}
              <div className="flex-1 flex items-end justify-center px-20 pb-24 overflow-hidden">
                <div className="w-full max-w-320 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-10 text-left mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8">
                    <span className="text-[10px] font-mono text-black/35 uppercase">🎤 Viva practice</span>
                    <span className="text-9 bg-purple-500/10 text-purple-700 px-6 py-2 rounded font-semibold animate-pulse">Analysis Active</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-purple-500/5 border border-purple-500/15 p-8 rounded-10 text-center">
                      <div className="text-16 font-bold text-purple-700">84%</div>
                      <div className="text-[9px] uppercase tracking-wider text-black/40 font-mono mt-2">Confidence</div>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/15 p-8 rounded-10 text-center">
                      <div className="text-16 font-bold text-purple-700">90%</div>
                      <div className="text-[9px] uppercase tracking-wider text-black/40 font-mono mt-2">Clarity</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/5 border border-purple-500/15 rounded-12 p-10 flex flex-col gap-4">
                    <h4 className="text-10 font-bold text-purple-950 leading-none">💡 Suggestions:</h4>
                    <ul className="text-10 text-purple-900/80 leading-relaxed list-disc list-inside flex flex-col gap-2">
                      <li>Speak slower in definitions</li>
                      <li>Add more examples</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Exam Revision Made Simple (5 cols) & Homework Help Without The Stress (7 cols) */}
          <div className="grid grid-cols-12 gap-10 800:gap-20">
            
            {/* CARD 3: Exam Revision Made Simple (5 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[#F4F4F4] col-span-12 800:col-span-5 rounded-24 border border-solid border-black/5 overflow-hidden flex flex-col min-h-480 hover:shadow-md transition-all duration-300"
            >
              <div className="p-30 flex flex-col gap-16 800:p-24 800:gap-10 1000:p-30 1000:gap-14 flex-shrink-0 text-left">
                <div className="h-35 bg-true-white px-16 font-sans font-500 text-13 leading-33 border border-solid border-black/8 rounded-20 text-secondary w-fit shadow-sm">
                  Revision
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Exam Revision Made Simple
                </h3>
                <p className="text-14 leading-[1.6] text-secondary">
                  Generate chapter summaries, quick revision notes, flashcards, and last-minute exam preparation material.
                </p>
              </div>

              {/* Visual: Revision tools checklist */}
              <div className="flex-1 flex items-end justify-center px-20 pb-24 overflow-hidden">
                <div className="w-full max-w-320 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-10 text-left mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8">
                    <span className="text-[10px] font-mono text-black/35 uppercase">📖 Quick Revision</span>
                    <span className="text-9 bg-blue-500/10 text-blue-700 px-6 py-2 rounded font-semibold">Active</span>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-8 bg-blue-500/5 border border-blue-500/15 p-8 rounded-10 shadow-sm">
                      <span className="text-12">📄</span>
                      <span className="text-11 font-semibold text-blue-950">Chapter Summary</span>
                    </div>
                    
                    <div className="flex items-center gap-8 bg-blue-500/5 border border-blue-500/15 p-8 rounded-10 shadow-sm">
                      <span className="text-12">🧮</span>
                      <span className="text-11 font-semibold text-blue-950">Key Formulas</span>
                    </div>

                    <div className="flex items-center gap-8 bg-blue-500/5 border border-blue-500/15 p-8 rounded-10 shadow-sm">
                      <span className="text-12">❓</span>
                      <span className="text-11 font-semibold text-blue-950">Important Questions</span>
                    </div>

                    <div className="flex items-center gap-8 bg-green-500/5 border border-green-500/15 p-8 rounded-10 shadow-sm">
                      <span className="text-12">🎴</span>
                      <span className="text-11 font-semibold text-green-950">Flashcards Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: Homework Help Without The Stress (7 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[#F4F4F4] col-span-12 800:col-span-7 rounded-24 border border-solid border-black/5 overflow-hidden flex flex-col min-h-480 hover:shadow-md transition-all duration-300"
            >
              <div className="p-30 flex flex-col gap-16 800:p-24 800:gap-10 1000:p-30 1000:gap-14 flex-shrink-0 text-left">
                <div className="h-35 bg-true-white px-16 font-sans font-500 text-13 leading-33 border border-solid border-black/8 rounded-20 text-secondary w-fit shadow-sm">
                  Homework
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Homework Help Without The Stress
                </h3>
                <p className="text-14 leading-[1.6] text-secondary max-w-[55ch]">
                  Get step-by-step guidance instead of just answers, helping students understand the process behind every solution.
                </p>
              </div>

              {/* Visual: Homework Step-by-Step path */}
              <div className="flex-1 flex items-end justify-center px-30 pb-24 800:px-40 overflow-hidden">
                <div className="w-full max-w-440 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-8 text-left mb-6 relative">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8 mb-2">
                    <span className="text-[10px] font-mono text-black/35 uppercase">Question: Solve 2x + 5 = 15</span>
                    <span className="text-9 bg-green-500/10 text-green-700 px-6 py-2 rounded font-semibold">Guidance</span>
                  </div>

                  <div className="flex flex-col gap-8 relative">
                    {/* Dashed Connecting Line */}
                    <div className="absolute left-18 top-16 bottom-16 w-0.5 border-l border-dashed border-black/15 z-0" />

                    <div className="flex items-center justify-between bg-slate-50 border border-black/5 p-8 rounded-10 z-10 relative shadow-sm">
                      <div className="flex items-center gap-10">
                        <span className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-11 font-semibold text-blue-700">1</span>
                        <div>
                          <div className="text-11 font-semibold text-black">Subtract 5 from both sides</div>
                          <div className="text-9 text-black/50">2x = 15 - 5  ➔  2x = 10</div>
                        </div>
                      </div>
                      <span className="text-11 text-green-600 font-bold">✓</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border border-black/5 p-8 rounded-10 z-10 relative shadow-sm">
                      <div className="flex items-center gap-10">
                        <span className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-11 font-semibold text-blue-700">2</span>
                        <div>
                          <div className="text-11 font-semibold text-black">Divide by 2</div>
                          <div className="text-9 text-black/50">x = 10 / 2</div>
                        </div>
                      </div>
                      <span className="text-11 text-green-600 font-bold">✓</span>
                    </div>

                    <div className="flex items-center justify-between bg-green-500/5 border border-green-500/15 p-8 rounded-10 z-10 relative shadow-sm">
                      <div className="flex items-center gap-10">
                        <span className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-11 font-bold text-green-600">✓</span>
                        <div>
                          <div className="text-11 font-bold text-green-950">Final Answer</div>
                          <div className="text-10 font-bold text-green-900">x = 5</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-green-500/15 text-green-700 px-6 py-1 rounded font-bold">Solved</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Statement Signoff */}
        <div className="mt-80 border-t border-black/5 pt-40 max-w-600 mx-auto text-center">
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
            <span>Learn. Practice. Speak. Succeed.</span>
            <span className="text-15 font-sans font-350 text-secondary not-italic mt-4">
              Everything needed to prepare with confidence.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
