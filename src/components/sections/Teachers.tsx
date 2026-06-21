"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Teachers() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      id: "plan",
      title: "Plan Smarter",
      description: "Generate complete teaching plans, activity logs, and homework schedules in seconds.",
      features: ["Lesson Planning", "Activity Planning", "Homework Planning"],
      accentColor: "#F59E0B" // Amber
    },
    {
      id: "create",
      title: "Create Instantly",
      description: "Create classroom-ready question papers, worksheets, and interactive quizzes without manual typing.",
      features: ["Question Papers", "Worksheets", "Quizzes"],
      accentColor: "#3B82F6" // Blue
    },
    {
      id: "assess",
      title: "Assess Better",
      description: "Evaluate learning consistently and efficiently with custom rubrics and criteria builders.",
      features: ["Assessment Support", "Rubric Generation"],
      accentColor: "#10B981" // Emerald
    },
    {
      id: "understand",
      title: "Understand Every Student",
      description: "Identify concepts where students struggle and get suggested classroom discussion prompts.",
      features: ["Learning Gaps Analysis", "Discussion Topics"],
      accentColor: "#8B5CF6" // Violet
    }
  ];

  // Renders the mini sidebar documents inside the mockup
  const renderSidebarItem = (title: string, icon: string, index: number) => {
    const isActive = activeTab === index;
    return (
      <button
        key={title}
        onClick={() => setActiveTab(index)}
        className={`w-full flex items-center gap-10 px-12 py-10 rounded-8 font-sans text-left transition-all duration-200 text-11 ${
          isActive 
            ? "bg-black/5 font-semibold text-black" 
            : "text-black/50 hover:bg-black/3 hover:text-black/80"
        }`}
      >
        <span className="text-13">{icon}</span>
        <span className="truncate">{title}</span>
        {isActive && (
          <span className="w-5 h-5 rounded-full ml-auto bg-black/60" />
        )}
      </button>
    );
  };

  const renderMockupContent = () => {
    switch (activeTab) {
      case 0: // Plan Smarter
        return (
          <motion.div
            key="plan-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">GENERATE LESSON PLAN</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Class IX • Biology</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-amber-500/10 text-amber-700 font-semibold border border-amber-500/15">
                Draft Saved
              </span>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75">
              <div>
                <span className="font-semibold text-black/85 block">Topic: Photosynthesis</span>
                <span className="text-[9px] text-black/40 block font-mono">Duration: 45 Minutes</span>
              </div>

              <div className="bg-amber-500/3 border border-amber-500/10 rounded-8 p-8 flex flex-col gap-4">
                <span className="font-semibold text-amber-900 text-[10px] uppercase font-mono">Objectives</span>
                <ul className="list-disc pl-12 flex flex-col gap-2 text-black/70">
                  <li>Understand light-dependent and light-independent reaction phases.</li>
                  <li>Identify the structure of chloroplasts and their functional roles.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-semibold text-black/80 text-[10px] uppercase font-mono">Recommended Activity</span>
                <div className="bg-white border border-black/5 rounded-6 p-8 shadow-sm">
                  <div className="flex justify-between font-semibold text-black/80 mb-2">
                    <span>🧪 Spinach Leaf Chromatography</span>
                    <span className="text-[9px] text-black/40">20 Mins</span>
                  </div>
                  <p className="text-[10px] text-black/60 leading-normal">
                    Students crush spinach leaves, use rubbing alcohol, and filter paper to observe chlorophyll separation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 1: // Create Instantly
        return (
          <motion.div
            key="create-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">WORKSHEET CREATOR</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Class IX • Algebra Quiz</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-blue-500/10 text-blue-700 font-semibold border border-blue-500/15">
                Ready to Print
              </span>
            </div>

            <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75">
              <span className="font-semibold text-black/85 block">Topic: Linear Equations in Two Variables</span>

              <div className="flex flex-col gap-4 border border-black/5 p-8 rounded-8 bg-white shadow-sm">
                <span className="font-mono text-[9px] text-blue-600 font-semibold">QUESTION 1 (MCQ)</span>
                <p className="font-semibold text-black/85 text-11">Solve for y in the equation 3x - 2y = 8, given x = 4.</p>
                <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-black/60 mt-2">
                  <span>A) y = 2</span>
                  <span className="text-blue-600 font-bold">B) y = 2 (Correct)</span>
                  <span>C) y = -2</span>
                  <span>D) y = 4</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 border border-black/5 p-8 rounded-8 bg-white shadow-sm">
                <span className="font-mono text-[9px] text-blue-600 font-semibold">QUESTION 2 (SHORT ANSWER)</span>
                <p className="font-semibold text-black/85 text-11">Determine the Y-intercept coordinates of the linear equation 2x + y = 6.</p>
                <span className="text-[9px] text-black/40 italic mt-2">Suggested Answer space provided below.</span>
              </div>
            </div>
          </motion.div>
        );

      case 2: // Assess Better
        return (
          <motion.div
            key="assess-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">GRADING RUBRIC CREATOR</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Biology Lab Report Rubric</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-emerald-500/10 text-emerald-700 font-semibold border border-emerald-500/15">
                Active Rubric
              </span>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-4 text-11 text-black/75">
              <span className="font-semibold text-black/85 block">Evaluation Standards (Class IX)</span>

              <div className="flex flex-col gap-6 mt-4">
                {/* Rubric Table */}
                <div className="border border-black/5 rounded-8 overflow-hidden bg-white shadow-sm text-[10px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 bg-emerald-500/5 font-bold border-b border-black/5 p-6 text-black/80 font-mono text-[9px]">
                    <span>CRITERIA</span>
                    <span>EXCELLENT (3)</span>
                    <span>GOOD (2)</span>
                    <span>POOR (1)</span>
                  </div>
                  
                  {/* Row 1 */}
                  <div className="grid grid-cols-4 border-b border-black/5 p-6 text-black/70 leading-tight">
                    <span className="font-semibold text-black">Hypothesis</span>
                    <span>Clear, testable, and science-grounded.</span>
                    <span>Testable, but lacks scientific depth.</span>
                    <span>Unclear or untestable statement.</span>
                  </div>
                  
                  {/* Row 2 */}
                  <div className="grid grid-cols-4 p-6 text-black/70 leading-tight">
                    <span className="font-semibold text-black">Data Collection</span>
                    <span>Organized table with accurate units.</span>
                    <span>Organized table, minor unit errors.</span>
                    <span>Incomplete data or chaotic notes.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3: // Understand Every Student
        return (
          <motion.div
            key="understand-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">LEARNING GAP DIAGNOSIS</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Class IX-A • Concept Mastery</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-purple-500/10 text-purple-700 font-semibold border border-purple-500/15 animate-pulse">
                Live Insights
              </span>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75">
              <span className="font-semibold text-black/85 block">Top Identified Learning Gaps</span>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white border border-black/5 p-8 rounded-8 shadow-sm">
                  <div className="flex items-center gap-8">
                    <span className="text-16">⚠️</span>
                    <div>
                      <span className="font-semibold text-black/85 block leading-none">Arnav</span>
                      <span className="text-[9px] text-black/40 mt-2 block">Linear Equations in Two Variables</span>
                    </div>
                  </div>
                  <div className="text-right text-[9px] text-purple-700 bg-purple-500/10 px-6 py-2 rounded font-semibold font-mono">
                    Fix: G7 Linear Expressions
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white border border-black/5 p-8 rounded-8 shadow-sm">
                  <div className="flex items-center gap-8">
                    <span className="text-16">⚠️</span>
                    <div>
                      <span className="font-semibold text-black/85 block leading-none">Riya</span>
                      <span className="text-[9px] text-black/40 mt-2 block">Distributive Property (Factoring)</span>
                    </div>
                  </div>
                  <div className="text-right text-[9px] text-purple-700 bg-purple-500/10 px-6 py-2 rounded font-semibold font-mono">
                    Fix: G6 Variable Grouping
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/3 border border-purple-500/10 p-8 rounded-8 mt-2 flex flex-col gap-2">
                <span className="font-semibold text-purple-950 text-[10px] uppercase font-mono">Suggested Class Discussion Prompt</span>
                <p className="text-[10px] italic text-purple-900 leading-normal">
                  "Use area models to visually demonstrate why multiplying (a + b) by itself results in the three separate terms of a² + 2ab + b²."
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="for-teachers-workspace" className="py-60 800:py-90 max-w-1440 mx-auto px-20 relative overflow-hidden">
      
      {/* Background Soft Glows (Z-Index 1) */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            For Teachers
          </span>
          <h2 className="h2--exposure text-center max-w-[22ch] mx-auto text-black">
            Less Time Preparing.<br />More Time Teaching.
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            From lesson planning to assessments, Homi helps teachers automate repetitive work and focus on meaningful learning experiences.
          </p>
        </div>

        {/* Premium Split-Screen Showcase Layout */}
        <div className="w-full grid grid-cols-1 1000:grid-cols-12 gap-40 1200:gap-60 items-stretch max-w-[1200px]">
          
          {/* LEFT PANEL: Category & Feature Selector (Grid Span 5) */}
          <div className="1000:col-span-5 flex flex-col gap-16 justify-center">
            {categories.map((category, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group w-full border border-solid p-20 rounded-20 text-left cursor-pointer transition-all duration-300 pointer-events-auto focus:outline-none flex flex-col gap-10 ${
                    isActive
                      ? "bg-white border-black/8 shadow-md"
                      : "bg-white/30 border-black/3 hover:bg-white/60 hover:border-black/5"
                  }`}
                  style={{
                    borderLeftWidth: isActive ? "4px" : "1px",
                    borderLeftColor: isActive ? category.accentColor : undefined
                  }}
                >
                  <div className="flex items-center gap-10">
                    <h3 className={`font-sans font-600 text-16 transition-colors duration-200 ${
                      isActive ? "text-black" : "text-black/60 group-hover:text-black/80"
                    }`}>
                      {category.title}
                    </h3>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-12"
                    >
                      <p className="text-13 leading-relaxed text-secondary font-sans font-350">
                        {category.description}
                      </p>
                      {/* Feature Chips */}
                      <div className="flex flex-wrap gap-6 mt-4">
                        {category.features.map((feat) => (
                          <span 
                            key={feat}
                            className="text-10 font-mono font-semibold px-8 py-3 rounded-12 bg-black/5 text-black/60 border border-black/5 whitespace-nowrap"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT PANEL: AI Teacher Workspace Mockup (Grid Span 7) */}
          <div className="1000:col-span-7 flex items-center justify-center">
            <div 
              className="w-full aspect-[1.3] min-h-[380px] bg-white/50 border border-solid border-white/60 rounded-24 shadow-lg backdrop-blur-md overflow-hidden flex font-sans relative"
              style={{
                boxShadow: "inset 0 1px 3px rgba(255,255,255,0.7), 0 16px 36px rgba(0,0,0,0.03)"
              }}
            >
              {/* Internal Mockup Ambient Light Blooms */}
              <div 
                className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-[80px] pointer-events-none transition-all duration-700" 
                style={{ 
                  backgroundColor: `${categories[activeTab].accentColor}06`,
                  transform: "scale(1.2)"
                }} 
              />
              
              {/* Mini Workspace Sidebar */}
              <div className="w-[140px] 600:w-[170px] border-r border-black/5 bg-black/2 flex-shrink-0 flex flex-col p-12 gap-16 relative z-10 select-none">
                <div className="flex items-center gap-6 border-b border-black/5 pb-10">
                  <span className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white text-[7px] font-bold">H</span>
                  <span className="text-11 font-bold text-black/75 tracking-tight font-sans">Workspace</span>
                </div>
                
                <div className="flex flex-col gap-6 flex-1">
                  <span className="text-[9px] uppercase font-semibold text-black/35 font-mono px-6">Tools</span>
                  <div className="flex flex-col gap-3">
                    {renderSidebarItem("Lesson Planner", "📚", 0)}
                    {renderSidebarItem("Material Gen", "📝", 1)}
                    {renderSidebarItem("Rubric Creator", "📋", 2)}
                    {renderSidebarItem("Gap Dashboard", "📊", 3)}
                  </div>
                </div>
                
                <div className="text-[9px] text-black/40 border-t border-black/5 pt-8 font-sans">
                  Homi Teach AI v1.2
                </div>
              </div>

              {/* Main Mockup Document Editor Viewer */}
              <div className="flex-1 p-16 600:p-24 relative z-10 flex flex-col justify-between overflow-hidden bg-white/30 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {renderMockupContent()}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Statement Signoff Quote */}
        <div className="mt-80 border-t border-black/5 pt-40 max-w-[650px] mx-auto text-center pointer-events-none">
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
            <span>"Teaching should focus on students, not paperwork."</span>
            <span className="text-15 font-sans font-350 text-secondary not-italic mt-4 max-w-[500px] mx-auto leading-relaxed">
              Homi helps educators spend less time preparing and more time doing what they do best: teaching and inspiring.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
