"use client";

import { motion } from "framer-motion";

export default function ParentsLoop() {
  return (
    <section id="for-parents" className="py-80 800:py-120 max-w-1440 mx-auto px-20 overflow-x-clip">
      <div className="w-full grid grid-cols-12 gap-40 800:gap-80 items-center">
        
        {/* Left Side: Headline and Supporting Copy (5 columns) */}
        <div className="col-span-12 800:col-span-5 flex flex-col gap-20 text-left section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            For Parents
          </span>
          <h2 className="h2--exposure text-black leading-tight">
            Parents Stay In The Loop
          </h2>
          <p className="text-16 leading-relaxed text-secondary font-sans font-350">
            Know what your child is learning, where they're improving, and where they need support—without constantly checking on them.
          </p>
          <div className="border-t border-black/5 pt-20 flex flex-col gap-12 text-14 leading-relaxed text-secondary font-sans font-350">
            <p>
              Homi transforms study activity into clear, actionable insights for parents.
            </p>
            <p>
              Instead of waiting for exam results, parents can see progress as it happens.
            </p>
          </div>
        </div>

        {/* Right Side: Dashboard Reveal (7 columns) */}
        <div className="col-span-12 800:col-span-7 relative flex items-center justify-center py-40 px-10 800:px-40 overflow-visible">
          
          {/* Main Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[480px] bg-[#FAFAFA] rounded-20 border border-black/8 shadow-[0px_20px_50px_rgba(0,0,0,0.06)] p-20 flex flex-col gap-12 relative overflow-hidden font-sans text-left z-10"
          >
            {/* Dashboard Header */}
            <div className="flex justify-between items-center border-b border-black/5 pb-10">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-11">👪</div>
                <div>
                  <span className="text-11 font-bold text-black block leading-none">Parent Hub</span>
                  <span className="text-[9px] text-black/40 mt-2 block">Student: Arnav • Class IX</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="w-5 h-5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-9 text-green-700 font-medium">Synced Live</span>
              </div>
            </div>

            {/* Dashboard Grid Content */}
            <div className="grid grid-cols-12 gap-10">
              {/* Left Column: Streak and Strengths (5 cols) */}
              <div className="col-span-5 flex flex-col gap-10">
                {/* Streak */}
                <div className="bg-white border border-black/5 p-8 rounded-12 shadow-sm flex items-center gap-8">
                  <span className="text-16">🔥</span>
                  <div>
                    <span className="text-11 font-bold text-orange-600 block leading-tight">12 Days</span>
                    <span className="text-[9px] text-black/40 block leading-none mt-2">Study Streak</span>
                  </div>
                </div>

                {/* Subject Performance */}
                <div className="bg-white border border-black/5 p-8 rounded-12 shadow-sm flex flex-col gap-6">
                  <span className="text-[9px] font-mono text-black/45 uppercase">Performance</span>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between text-[9px] font-medium mb-1 text-black">
                        <span>Mathematics</span>
                        <span className="font-bold">90%</span>
                      </div>
                      <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "90%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[9px] font-medium mb-1 text-black">
                        <span>Science</span>
                        <span className="font-bold">85%</span>
                      </div>
                      <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "85%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Weekly Progress Graph & Attention (7 cols) */}
              <div className="col-span-7 flex flex-col gap-10">
                {/* Weekly Progress Graph Mockup */}
                <div className="bg-white border border-black/5 p-8 rounded-12 shadow-sm flex flex-col gap-6">
                  <span className="text-[9px] font-mono text-black/45 uppercase">Weekly Study Progress (hrs)</span>
                  
                  {/* Simple CSS graph bars */}
                  <div className="flex items-end justify-between h-42 pt-4 px-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 bg-black/5 rounded-t-4 h-12" />
                      <span className="text-[8px] text-black/40">M</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 bg-black/5 rounded-t-4 h-24" />
                      <span className="text-[8px] text-black/40">T</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 bg-blue-500/80 rounded-t-4 h-32" />
                      <span className="text-[8px] text-black/40">W</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 bg-blue-500/80 rounded-t-4 h-20" />
                      <span className="text-[8px] text-black/40">T</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 bg-blue-500 rounded-t-4 h-38 animate-pulse" />
                      <span className="text-[8px] text-black/40">F</span>
                    </div>
                  </div>
                </div>

                {/* Attention / Next Steps */}
                <div className="bg-[#FFF8EE] border border-orange-500/10 p-8 rounded-12 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-10">⚠️</span>
                    <span className="text-10 font-bold text-orange-950">Algebra: Linear variables</span>
                  </div>
                  <p className="text-[9px] text-orange-900/60 leading-tight">
                    Struggled during quiz today. Recommended a 15-minute practice session.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progressive Reveal Glassmorphic Callouts (Desktop-only absolute placement) */}
          {/* Insight 01: Weekly Progress (Top-Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="hidden 1000:flex absolute left-[-10px] top-[12%] w-[190px] bg-white/80 backdrop-blur-md border border-black/8 rounded-16 p-12 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] flex-col gap-4 text-left z-20"
          >
            <span className="text-11 font-bold text-black flex items-center gap-4">📈 Weekly Progress</span>
            <p className="text-9 leading-relaxed text-black/50">Track improvement across subjects and chapters.</p>
          </motion.div>

          {/* Insight 02: Strengths & Challenges (Top-Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="hidden 1000:flex absolute right-[-10px] top-[18%] w-[190px] bg-white/80 backdrop-blur-md border border-black/8 rounded-16 p-12 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] flex-col gap-4 text-left z-20"
          >
            <span className="text-11 font-bold text-black flex items-center gap-4">🎯 Strengths & Gaps</span>
            <p className="text-9 leading-relaxed text-black/50">See what your child understands well and where they need help.</p>
          </motion.div>

          {/* Insight 03: Study Consistency (Bottom-Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            className="hidden 1000:flex absolute left-[-20px] bottom-[18%] w-[190px] bg-white/80 backdrop-blur-md border border-black/8 rounded-16 p-12 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] flex-col gap-4 text-left z-20"
          >
            <span className="text-11 font-bold text-black flex items-center gap-4">⏱ Study Consistency</span>
            <p className="text-9 leading-relaxed text-black/50">Monitor learning habits and study patterns over time.</p>
          </motion.div>

          {/* Insight 04: Learning Recommendations (Bottom-Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
            className="hidden 1000:flex absolute right-[-20px] bottom-[12%] w-[190px] bg-white/80 backdrop-blur-md border border-black/8 rounded-16 p-12 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] flex-col gap-4 text-left z-20"
          >
            <span className="text-11 font-bold text-black flex items-center gap-4">📚 Recommendations</span>
            <p className="text-9 leading-relaxed text-black/50">Receive personalized suggestions based on progress and performance.</p>
          </motion.div>

        </div>

        {/* Mobile-only static listing of the 4 insights below dashboard (< 1000px) */}
        <div className="col-span-12 1000:hidden grid grid-cols-1 800:grid-cols-2 gap-16 mt-20">
          <div className="border border-black/5 p-16 rounded-16 bg-white shadow-sm text-left">
            <span className="text-13 font-bold text-black">📈 Weekly Progress</span>
            <p className="text-11 text-black/50 mt-4 leading-relaxed">Track improvement across subjects and chapters.</p>
          </div>
          <div className="border border-black/5 p-16 rounded-16 bg-white shadow-sm text-left">
            <span className="text-13 font-bold text-black">🎯 Strengths & Challenges</span>
            <p className="text-11 text-black/50 mt-4 leading-relaxed">See what your child understands well and where they need help.</p>
          </div>
          <div className="border border-black/5 p-16 rounded-16 bg-white shadow-sm text-left">
            <span className="text-13 font-bold text-black">⏱ Study Consistency</span>
            <p className="text-11 text-black/50 mt-4 leading-relaxed">Monitor learning habits and study patterns over time.</p>
          </div>
          <div className="border border-black/5 p-16 rounded-16 bg-white shadow-sm text-left">
            <span className="text-13 font-bold text-black">📚 Learning Recommendations</span>
            <p className="text-11 text-black/50 mt-4 leading-relaxed">Receive personalized suggestions based on progress and performance.</p>
          </div>
        </div>

      </div>

      {/* Bottom Statement */}
      <div className="mt-80 border-t border-black/5 pt-40 max-w-600 mx-auto text-center">
        <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
          <span>Less guessing. More understanding.</span>
          <span className="text-15 font-sans font-350 text-secondary not-italic mt-4">
            A clearer picture of your child's learning journey.
          </span>
        </p>
      </div>
    </section>
  );
}
