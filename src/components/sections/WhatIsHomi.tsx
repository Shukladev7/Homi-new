"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "doubt" | "chapter" | "viva" | "progress" | "path";

interface ShowcaseCard {
  id: TabKey;
  tabLabel: string;
  tabIcon: string;
  title: string;
  gradient: string;
  bgGlow: string;
  content: React.ReactNode;
}

export default function WhatIsHomi() {
  const [activeTab, setActiveTab] = useState<TabKey>("doubt");

  const cards: ShowcaseCard[] = [
    {
      id: "doubt",
      tabLabel: "Doubt Solving",
      tabIcon: "💬",
      title: "💬 Doubt Solving",
      gradient: "from-[#FFF9F2] to-[#FFF0E0]",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(255, 175, 110, 0.15) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-16 font-sans">
          <div className="flex flex-col gap-8 items-end">
            <span className="text-[10px] text-black/35 font-mono">STUDENT DOUBT</span>
            <div className="bg-[#EBEBEB] text-black/95 px-16 py-10 rounded-20 rounded-tr-4 text-14 max-w-[85%] shadow-sm">
              "Why does Photosynthesis happen?"
            </div>
          </div>
          <div className="flex flex-col gap-8 items-start">
            <span className="text-[10px] text-black/35 font-mono">HOMI'S EXPLANATION</span>
            <div className="bg-[#0A0A0A] text-true-white px-16 py-12 rounded-20 rounded-tl-4 text-14 max-w-[90%] shadow-md leading-relaxed">
              Think of leaves as tiny kitchens! They capture sunlight, mix it with water from the soil and carbon dioxide from the air, and "cook" food for the tree. In return, they release fresh oxygen for us to breathe! 🌿
            </div>
          </div>
        </div>
      )
    },
    {
      id: "chapter",
      tabLabel: "Chapter Learning",
      tabIcon: "📖",
      title: "📖 Chapter Learning",
      gradient: "from-[#F2FCFC] to-[#E6F8F8]",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(54, 175, 255, 0.15) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-16 font-sans text-left">
          <div className="flex justify-between items-center border-b border-black/5 pb-8">
            <span className="text-11 font-semibold text-black/80">PHYSICS / Newton's 1st Law</span>
            <span className="text-10 bg-blue-500/10 text-blue-700 px-8 py-2 rounded-full font-medium">Class IX</span>
          </div>
          <p className="text-14 text-black/85 leading-relaxed bg-white/50 border border-black/5 rounded-12 p-12 shadow-sm">
            Imagine sliding a hockey puck on smooth ice. It keeps gliding because there is no friction to stop it. Newton's First Law says an object stays in motion unless an external force acts on it! 🏒
          </p>
          {/* Simple simulated rolling puck visualization */}
          <div className="h-40 bg-black/5 rounded-8 relative flex items-center px-12 overflow-hidden border border-black/5">
            <motion.div 
              animate={{ x: ["0%", "85%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="h-20 w-20 rounded-full bg-black/80 flex items-center justify-center text-[10px] text-white font-bold"
            >
              ➔
            </motion.div>
            <span className="absolute right-12 text-[10px] text-black/35 font-mono">Simulating Inertia</span>
          </div>
        </div>
      )
    },
    {
      id: "viva",
      tabLabel: "Viva Practice",
      tabIcon: "🎤",
      title: "🎤 Viva Practice",
      gradient: "from-[#FDF2FD] to-[#FCE6FC]",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(220, 150, 255, 0.15) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-16 font-sans">
          <div className="flex flex-col gap-6 items-start">
            <span className="text-[10px] text-black/35 font-mono">HOMI'S ORAL QUESTION</span>
            <div className="bg-[#0A0A0A] text-true-white px-16 py-10 rounded-20 rounded-tl-4 text-14 max-w-[85%] shadow-md">
              "Can you explain why light bends when it enters water?"
            </div>
          </div>
          
          {/* Mic active feedback */}
          <div className="flex items-center gap-12 bg-white/70 border border-purple-500/20 rounded-16 p-10 shadow-sm">
            <div className="flex items-center justify-center h-28 w-28 rounded-full bg-purple-500/10 text-purple-600 text-12 animate-pulse">
              🎤
            </div>
            <div className="flex-1 flex gap-3 items-center h-14">
              <span className="h-6 w-3 bg-purple-500/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <span className="h-10 w-3 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              <span className="h-14 w-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="h-8 w-3 bg-purple-500/70 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-11 text-black/50 italic pr-6">"Because refraction..."</span>
          </div>

          <div className="flex flex-col gap-6 items-start">
            <span className="text-[10px] text-black/35 font-mono">HOMI'S FEEDBACK</span>
            <div className="bg-purple-500/10 border border-purple-500/15 text-purple-950 px-16 py-10 rounded-20 rounded-tl-4 text-13 max-w-[90%] leading-relaxed shadow-sm">
              "Spot on! Refraction occurs because the speed of light changes as it moves from air into denser water. Brilliant explanation! 🌟"
            </div>
          </div>
        </div>
      )
    },
    {
      id: "progress",
      tabLabel: "Progress Tracking",
      tabIcon: "📊",
      title: "📊 Progress Tracking",
      gradient: "from-[#F9FCF2] to-[#EEFCDB]",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(200, 240, 100, 0.25) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-14 font-sans text-left">
          <div className="flex justify-between items-center border-b border-black/5 pb-8">
            <span className="text-[10px] uppercase font-mono text-black/40 tracking-wider">DAILY PARENT UPDATE</span>
            <span className="text-10 bg-green-500/15 text-green-700 font-semibold px-8 py-2 rounded-full">New Mastery</span>
          </div>
          
          <div className="bg-white/80 border border-black/5 rounded-12 p-12 shadow-sm flex flex-col gap-6">
            <span className="text-11 text-black/40 font-mono">TODAY'S HIGHLIGHT</span>
            <span className="text-14 font-serif font-650 text-black leading-tight">Aarav mastered 'Fractions' today.</span>
            <p className="text-12 text-black/60 leading-relaxed mt-4">
              "He solved 15 consecutive exercises with zero hints. Parent Tip: Ask him to help you slice the pizza tonight to show off his new fractions skill! 🍕"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white/60 p-8 rounded border border-black/5">
              <div className="text-18 font-bold text-black">100%</div>
              <div className="text-9 text-black/45">Fractions Accuracy</div>
            </div>
            <div className="bg-white/60 p-8 rounded border border-black/5">
              <div className="text-18 font-bold text-black">45 min</div>
              <div className="text-9 text-black/45">Deep Learning Time</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "path",
      tabLabel: "Learning Path",
      tabIcon: "✨",
      title: "✨ Personal Learning Path",
      gradient: "from-[#F2F3FC] to-[#E6E8FC]",
      bgGlow: "radial-gradient(circle at 70% 30%, rgba(100, 120, 255, 0.15) 0%, transparent 60%)",
      content: (
        <div className="flex flex-col gap-14 font-sans text-left">
          <div className="flex justify-between items-center border-b border-black/5 pb-8 mb-4">
            <span className="text-11 font-semibold text-black/80">ADAPTIVE LEARNING ROUTE</span>
            <span className="text-10 bg-indigo-500/10 text-indigo-700 px-8 py-2 rounded-full font-medium">Automatic Adjustment</span>
          </div>

          <p className="text-13 text-black/70 leading-relaxed">
            "Since you solved the Electric Currents quiz easily, Homi is skipping basic definitions and moving you directly to Electromagnetic Fields to keep you challenged!"
          </p>

          {/* Simple path node graph */}
          <div className="flex justify-between items-center px-20 py-10 bg-white/50 border border-black/5 rounded-12 shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">✓</div>
              <span className="text-[9px] text-black/60 font-semibold font-mono">Currents</span>
            </div>
            <div className="h-[2px] flex-1 bg-black/15 mx-10 relative">
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-[8px] bg-indigo-500/15 text-indigo-600 px-4 py-2 rounded font-semibold whitespace-nowrap">Skipped Basic</span>
            </div>
            <div className="flex flex-col items-center gap-4 opacity-50">
              <div className="h-20 w-20 rounded-full bg-black/25 flex items-center justify-center text-[10px] text-white">✕</div>
              <span className="text-[9px] text-black/45 font-mono">Definitions</span>
            </div>
            <div className="h-[2px] flex-1 bg-black/15 mx-10" />
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white animate-pulse">❖</div>
              <span className="text-[9px] text-indigo-600 font-bold font-mono">Magnetism</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const activeCard = cards.find(c => c.id === activeTab) || cards[0];

  return (
    <section className="py-80 800:py-120 max-w-1440 mx-auto px-20 site-grid">
      <div className="col-span-12 grid grid-cols-12 gap-y-40 800:gap-x-80 items-center w-full">
        
        {/* Left Side: Copy and Title (5 columns) */}
        <div className="col-span-12 800:col-span-5 flex flex-col gap-24 text-left section-header">
          <div className="flex flex-col gap-10">
            <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
              What Is Homi?
            </span>
            <h2 className="h2--exposure text-black leading-tight">
              A learning companion that grows with your child.
            </h2>
          </div>

          <div className="text-16 leading-relaxed text-secondary flex flex-col gap-14 font-sans font-350">
            <p>
              Homi is HomiLearn's AI learning companion—a smart, friendly, always-available study partner for students in Classes VI–XII.
            </p>

            {/* Custom styled "what Homi is not" list for Dia-style premium aesthetic */}
            <div className="flex flex-col gap-8 border-l border-black/8 pl-20 my-10 text-tertiary">
              <p className="flex items-center gap-10">
                <span className="text-black/35 font-serif">✕</span> It is not a search engine.
              </p>
              <p className="flex items-center gap-10">
                <span className="text-black/35 font-serif">✕</span> It is not a video library.
              </p>
              <p className="flex items-center gap-10">
                <span className="text-black/35 font-serif">✕</span> It is not a generic chatbot.
              </p>
            </div>

            <p>
              Homi understands where a student is struggling, adapts explanations to their level, helps them practice with confidence, and celebrates progress along the way.
            </p>
            <p>
              Whether it's a difficult Maths problem, a Science concept, viva preparation, homework guidance, or exam revision, Homi is always ready to help.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive animated card stack showcase (7 columns) */}
        <div className="col-span-12 800:col-span-7 flex flex-col gap-20">
          
          {/* Horizontal Tab Switcher Row */}
          <div className="flex flex-wrap gap-10 justify-center 800:justify-start">
            {cards.map((card) => {
              const isActive = activeTab === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => setActiveTab(card.id)}
                  className={`h-35 rounded-20 px-16 font-sans text-12 font-semibold flex items-center gap-6 cursor-pointer border border-solid transition-all duration-200 select-none shadow-sm ${
                    isActive 
                      ? "bg-black border-black text-true-white" 
                      : "bg-[#EBEBEB]/70 border-black/5 hover:bg-black/5 text-secondary"
                  }`}
                  type="button"
                >
                  <span>{card.tabIcon}</span>
                  <span>{card.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Viewport card displaying Homi interactions */}
          <div className="relative w-full h-[330px] 600:h-[360px] 800:h-auto 800:aspect-[1.4] bg-white rounded-24 border border-black/8 shadow-[0px_12px_40px_rgba(0,0,0,0.06)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 p-20 800:p-40 flex flex-col justify-between"
              >
                {/* Background soft glow gradient */}
                <div 
                  className="absolute inset-0 pointer-events-none -z-10" 
                  style={{ backgroundImage: activeCard.bgGlow }} 
                />

                {/* Card Title Header */}
                <div className="text-14 font-serif font-650 text-black border-b border-black/5 pb-10 text-left">
                  {activeCard.title}
                </div>

                {/* Main Card Content */}
                <div className="my-auto py-10">
                  {activeCard.content}
                </div>

                {/* Footer Takeaway Quote */}
                <div className="text-11 uppercase font-mono text-tertiary text-left">
                  HomiLearn Patient Tutor Interaction
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
