"use client";

import { motion } from "framer-motion";

export default function Roles() {
  const cards = [
    {
      id: "students",
      role: "👨‍🎓 Students",
      headline: "Learn With Confidence",
      description: "Get explanations, practice questions, viva preparation, and personalized guidance whenever you need help.",
      benefits: [
        "Ask questions without fear",
        "Learn at your own pace",
        "Practice with confidence"
      ],
      isFeatured: false,
      bgStyle: "bg-white border-black/8",
      visual: (
        <div className="w-full max-w-[280px] bg-slate-50 border border-black/5 rounded-12 p-12 shadow-sm font-sans text-left flex flex-col gap-8">
          <div className="flex justify-between items-center text-[8px] text-black/40 border-b border-black/5 pb-4">
            <span>Student Dashboard</span>
            <span>Class IX</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-6 rounded-8 border border-black/5 flex flex-col gap-2">
              <span className="text-[9px] text-orange-500 font-semibold">❓ Active Doubt Thread</span>
              <p className="text-[10px] text-black/80 leading-tight">"Homi, how does gravity work?"</p>
              <p className="text-[9px] text-black/50 leading-relaxed bg-[#EBEBEB]/30 p-4 rounded mt-2 border-l-2 border-orange-500">
                It's Arnav! Gravity is Arnav pulling down on the Earth, and the Earth pulling down on Arnav! 🌍
              </p>
            </div>
            <div className="bg-white p-6 rounded-8 border border-black/5 flex items-center justify-between">
              <span className="text-[9px] font-medium text-black">Practice Session Progress</span>
              <span className="text-[9px] text-green-600 font-bold bg-green-500/10 px-6 py-1 rounded">100% Done</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "parents",
      role: "👨‍👩‍👧 Parents",
      headline: "Stay Informed Without Micromanaging",
      description: "Understand progress, strengths, and challenges through clear insights and personalized recommendations.",
      benefits: [
        "Weekly progress updates",
        "Learning insights",
        "Early identification of weak areas"
      ],
      isFeatured: true,
      bgStyle: "bg-gradient-to-b from-[#FFFDF9] to-[#FFF5E5] border-orange-500/20 shadow-[0px_16px_36px_rgba(249,115,22,0.06)] ring-1 ring-orange-500/10",
      visual: (
        <div className="w-full max-w-[280px] bg-white border border-orange-500/5 rounded-12 p-12 shadow-sm font-sans text-left flex flex-col gap-8 relative overflow-hidden">
          {/* Ambient amber backdrop glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-orange-500/5 pointer-events-none" />
          
          <div className="flex justify-between items-center text-[8px] text-black/40 border-b border-black/5 pb-4">
            <span>Weekly Progress Overview</span>
            <span className="text-[8px] text-orange-600 font-bold bg-orange-500/10 px-4 py-1 rounded">Synced</span>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center text-9 font-medium text-black">
              <span>Mathematics Performance</span>
              <span className="font-bold text-blue-600">90%</span>
            </div>
            <div className="h-4 w-full bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: "90%" }} />
            </div>
            
            <div className="flex justify-between items-center text-9 font-medium text-black mt-2">
              <span>Science Performance</span>
              <span className="font-bold text-green-600">85%</span>
            </div>
            <div className="h-4 w-full bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "85%" }} />
            </div>
            
            <div className="bg-orange-500/5 border border-orange-500/15 p-6 rounded-8 flex items-center justify-between mt-2">
              <span className="text-[9px] font-semibold text-orange-950 flex items-center gap-4">🔥 12-Day Streak</span>
              <span className="text-[8px] text-orange-700">Consistent</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "teachers",
      role: "👩‍🏫 Teachers",
      headline: "Spend Less Time Repeating",
      description: "Help students learn independently while reducing repetitive explanation and revision work.",
      benefits: [
        "Better prepared students",
        "Faster revision support",
        "More time for meaningful teaching"
      ],
      isFeatured: false,
      bgStyle: "bg-white border-black/8",
      visual: (
        <div className="w-full max-w-[280px] bg-slate-50 border border-black/5 rounded-12 p-12 shadow-sm font-sans text-left flex flex-col gap-8">
          <div className="flex justify-between items-center text-[8px] text-black/40 border-b border-black/5 pb-4">
            <span>Teacher Insights Panel</span>
            <span>Class IX-A</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-6 rounded-8 border border-black/5 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-semibold text-black block leading-none">Weekly Time Saved</span>
                <span className="text-[8px] text-black/45 mt-2 block">Automatic revision support</span>
              </div>
              <span className="text-[14px] font-bold text-indigo-600">8.5 hrs</span>
            </div>
            <div className="bg-white p-6 rounded-8 border border-black/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-semibold text-orange-600 block leading-none">⚠️ Classroom Alert</span>
                <span className="text-[8px] text-black/50 mt-2 block">Linear equations gap resolved</span>
              </div>
              <span className="text-[9px] text-orange-600 font-bold bg-orange-500/10 px-4 py-1 rounded">Solved</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-80 800:py-120 max-w-1440 mx-auto px-20">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            One Platform. Three Perspectives.
          </span>
          <h2 className="h2--exposure text-center max-w-[22ch] mx-auto text-black">
            Built For Students, Parents & Teachers
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            Whether you're learning, guiding, or teaching, Homi helps everyone stay connected and move forward together.
          </p>
        </div>

        {/* 3 side-by-side cards grid */}
        <div className="grid grid-cols-1 1000:grid-cols-3 gap-30 items-stretch mt-60 800:mt-80">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`rounded-24 border border-solid p-30 flex flex-col justify-between relative overflow-hidden transition-all duration-300 min-h-[520px] ${
                card.bgStyle
              } ${card.isFeatured ? "1000:scale-105 z-10 shadow-lg" : "z-0 shadow-sm"}`}
            >
              {/* Main Card Info Body */}
              <div className="flex flex-col gap-16 text-left">
                <span className="text-13 font-bold text-tertiary tracking-wide">{card.role}</span>
                <h3 className="font-sans font-600 text-20 leading-26 text-primary mt-4">
                  {card.headline}
                </h3>
                <p className="text-13 leading-relaxed text-secondary font-sans font-350">
                  {card.description}
                </p>

                {/* Benefits checklist */}
                <ul className="flex flex-col gap-8 mt-10" aria-label={`Benefits for ${card.role}`}>
                  {card.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-8 text-12 font-medium text-black/75">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Mockup inside card */}
              <div className="mt-30 flex justify-center py-10">
                {card.visual}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement Signoff */}
        <div className="mt-80 border-t border-black/5 pt-40 max-w-600 mx-auto text-center">
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
            <span>Students learn better. Parents worry less.</span>
            <span>Teachers gain more time.</span>
            <span className="text-15 font-sans font-350 text-secondary not-italic mt-4">
              Everyone moves forward together.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
