"use client";

import { motion } from "framer-motion";

export default function BentoGrid() {
  return (
    <section className="my-80 800:my-120 max-w-1600 mx-auto px-20">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            Meet Homi
          </span>
          <h2 className="h2--exposure text-center max-w-[20ch] mx-auto text-black">
            What Is Homi?
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            More than an AI chatbot. More than a study app.
            <br />
            A learning companion that understands how every student learns differently.
          </p>
        </div>

        {/* Outer Grid Wrapper */}
        <div className="mt-60 800:mt-80 flex flex-col gap-10 800:gap-20">
          
          {/* Row 1: Always Ready To Explain (7 cols) & Learns How You Learn (5 cols) */}
          <div className="grid grid-cols-12 gap-10 800:gap-20">
            
            {/* CARD 1: Always Ready To Explain (7 columns) */}
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
                  Explain
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Always Ready To Explain
                </h3>
                <p className="text-14 leading-[1.6] text-secondary max-w-[55ch]">
                  Ask a question anytime and get clear, age-appropriate explanations tailored to your learning level. Whether it's Maths, Science, English, or Social Science, Homi is always available to help.
                </p>
              </div>
              
              {/* Visual: Chat Conversation Screen */}
              <div className="flex-1 flex items-end justify-center px-30 pb-24 800:px-40 overflow-hidden">
                <div className="w-full max-w-440 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-12 text-left mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8">
                    <span className="text-[10px] font-mono text-black/35 uppercase">Live Tutoring Session</span>
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-9 text-black/50">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 items-end">
                    <div className="bg-[#EBEBEB] text-black/90 px-12 py-6 rounded-16 rounded-tr-4 text-12 max-w-[85%] shadow-sm">
                      "Can you explain Photosynthesis again?"
                    </div>
                  </div>

                  <div className="flex flex-col gap-8 items-start">
                    <div className="bg-[#0A0A0A] text-true-white px-12 py-10 rounded-16 rounded-tl-4 text-12 max-w-[95%] shadow-md flex flex-col gap-6">
                      <div className="flex items-center gap-6">
                        <span className="text-orange-300">💡</span>
                        <span className="font-semibold text-white/95 text-11">Simple Explanation</span>
                      </div>
                      <p className="text-white/80 text-11 leading-relaxed pl-16">
                        Photosynthesis is how plants bake their food using sunlight, water, and air!
                      </p>
                      
                      <div className="border-t border-white/10 pt-6 flex items-center gap-6">
                        <span className="text-blue-300">🌱</span>
                        <span className="font-semibold text-white/95 text-11">Real-World Example</span>
                      </div>
                      <p className="text-white/80 text-11 leading-relaxed pl-16">
                        Think of leaves as tiny solar ovens baking sugar cookies for the plant.
                      </p>
                      
                      <div className="border-t border-white/10 pt-6 flex items-center gap-6">
                        <span className="text-green-300">📝</span>
                        <span className="font-semibold text-white/95 text-11">Quick Practice Question</span>
                      </div>
                      <p className="text-white/80 text-11 leading-relaxed pl-16">
                        Would you like to try a quick checkout question to test this concept?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Learns How You Learn (5 columns) */}
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
                  Learn
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Learns How You Learn
                </h3>
                <p className="text-14 leading-[1.6] text-secondary">
                  Every student struggles with different concepts. Homi adapts explanations, examples, and practice based on individual learning needs.
                </p>
              </div>

              {/* Visual: Personalized Learning Path */}
              <div className="flex-1 flex items-end justify-center px-20 pb-24 overflow-hidden">
                <div className="w-full max-w-320 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-10 text-left mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8">
                    <span className="text-[10px] font-mono text-black/35 uppercase">Personalized Path</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-700 px-6 py-2 rounded font-semibold">Active Profile</span>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between bg-green-500/5 border border-green-500/15 rounded-12 p-8">
                      <div className="flex items-center gap-8">
                        <span className="text-green-600 text-12 font-bold">✓</span>
                        <span className="text-12 font-medium text-green-950">Fractions</span>
                      </div>
                      <span className="text-10 text-green-700 bg-green-500/10 px-6 py-1 rounded">Mastered</span>
                    </div>

                    <div className="flex items-center justify-between bg-green-500/5 border border-green-500/15 rounded-12 p-8">
                      <div className="flex items-center gap-8">
                        <span className="text-green-600 text-12 font-bold">✓</span>
                        <span className="text-12 font-medium text-green-950">Decimals</span>
                      </div>
                      <span className="text-10 text-green-700 bg-green-500/10 px-6 py-1 rounded">Mastered</span>
                    </div>

                    <div className="flex items-center justify-between bg-orange-500/5 border border-orange-500/20 rounded-12 p-8">
                      <div className="flex items-center gap-8">
                        <span className="text-orange-600 text-12">⚠️</span>
                        <span className="text-12 font-bold text-orange-950">Algebra Gap</span>
                      </div>
                      <span className="text-10 text-orange-700 bg-orange-500/10 px-6 py-1 rounded font-semibold">Needs Prep</span>
                    </div>
                  </div>

                  <div className="h-32 rounded-12 bg-indigo-500 text-true-white text-11 font-600 shadow-sm hover:bg-indigo-600 transition-colors w-full mt-4 flex items-center justify-center gap-4 cursor-pointer">
                    <span>➔</span> Start Recommended Practice
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Practice Beyond The Textbook (5 cols) & Supports Students, Parents & Teachers (7 cols) */}
          <div className="grid grid-cols-12 gap-10 800:gap-20">
            
            {/* CARD 3: Practice Beyond The Textbook (5 columns) */}
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
                  Practice
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Practice Beyond The Textbook
                </h3>
                <p className="text-14 leading-[1.6] text-secondary">
                  Prepare for exams, homework, oral tests, and viva sessions with guided practice and instant feedback.
                </p>
              </div>

              {/* Visual: Study Assistant Interface */}
              <div className="flex-1 flex items-end justify-center px-20 pb-24 overflow-hidden">
                <div className="w-full max-w-320 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-14 font-sans flex flex-col gap-10 text-left mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8">
                    <span className="text-[10px] font-mono text-black/35 uppercase">Practice Console</span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-700 px-6 py-2 rounded font-semibold">4 Modes</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="border border-black/5 p-8 rounded-12 bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-pointer flex flex-col gap-2">
                      <span className="text-14">🎙️</span>
                      <span className="text-11 font-semibold text-purple-950 leading-none">Viva Practice</span>
                      <span className="text-[9px] text-purple-900/60 leading-tight">Oral exam simulator</span>
                    </div>
                    
                    <div className="border border-black/5 p-8 rounded-12 bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer flex flex-col gap-2">
                      <span className="text-14">📝</span>
                      <span className="text-11 font-semibold text-blue-950 leading-none">Quiz Mode</span>
                      <span className="text-[9px] text-blue-900/60 leading-tight">Instant evaluations</span>
                    </div>

                    <div className="border border-black/5 p-8 rounded-12 bg-orange-500/5 hover:bg-orange-500/10 transition-colors cursor-pointer flex flex-col gap-2">
                      <span className="text-14">📖</span>
                      <span className="text-11 font-semibold text-orange-950 leading-none">Revision</span>
                      <span className="text-[9px] text-orange-900/60 leading-tight">Chapter flashcards</span>
                    </div>

                    <div className="border border-black/5 p-8 rounded-12 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-pointer flex flex-col gap-2">
                      <span className="text-14">🏆</span>
                      <span className="text-11 font-semibold text-green-950 leading-none">Exam Prep</span>
                      <span className="text-[9px] text-green-900/60 leading-tight">Timed practice tests</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: Supports Students, Parents & Teachers (7 columns) */}
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
                  Support
                </div>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-10">
                  Supports Students, Parents & Teachers
                </h3>
                <p className="text-14 leading-[1.6] text-secondary max-w-[55ch]">
                  Homi keeps everyone connected with progress tracking, insights, and personalized recommendations.
                </p>
              </div>

              {/* Visual: Connected Panels */}
              <div className="flex-1 flex items-end justify-center px-30 pb-24 800:px-40 overflow-hidden">
                <div className="w-full max-w-440 bg-white rounded-16 border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.03)] p-16 font-sans flex flex-col gap-8 text-left relative mb-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-8 mb-2">
                    <span className="text-[10px] font-mono text-black/35 uppercase">Homi Integrated Ecosystem</span>
                    <span className="text-[10px] bg-green-500/10 text-green-700 px-6 py-2 rounded font-semibold">Synced</span>
                  </div>

                  <div className="flex flex-col gap-8 relative">
                    {/* Dashed Connector Line */}
                    <div className="absolute left-18 top-16 bottom-16 w-0.5 border-l border-dashed border-black/15 z-0" />

                    <div className="flex items-center gap-12 bg-slate-50 border border-black/5 p-8 rounded-10 z-10 relative shadow-sm">
                      <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-11">🎓</div>
                      <div className="flex-1">
                        <div className="text-11 font-semibold text-black">Student</div>
                        <div className="text-9 text-black/50">Concept practice & viva scores dashboard</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 bg-[#FFF8EE] border border-black/5 p-8 rounded-10 z-10 relative shadow-sm">
                      <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-11">👪</div>
                      <div className="flex-1">
                        <div className="text-11 font-semibold text-black">Parent</div>
                        <div className="text-9 text-black/50">Weekly progress digests & weak area alerts</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 bg-green-500/5 border border-black/5 p-8 rounded-10 z-10 relative shadow-sm">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-11">🏫</div>
                      <div className="flex-1">
                        <div className="text-11 font-semibold text-black">Teacher</div>
                        <div className="text-9 text-black/50">Class learning gaps & classroom suggestions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
