"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Teachers() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      id: "lesson-plan",
      num: "01",
      title: "AI Lesson Plan Generator",
      description: "Generate standards-aligned lesson plans for any grade, subject, or curriculum using the advanced AI lesson plan generator.",
      accentColor: "#F59E0B" // Amber
    },
    {
      id: "worksheet",
      num: "02",
      title: "AI Worksheet Generator",
      description: "Create classroom-ready worksheets instantly with our flexible AI worksheet generator.",
      accentColor: "#3B82F6" // Blue
    },
    {
      id: "quiz",
      num: "03",
      title: "AI Quiz & Assessment Generator",
      description: "Build quizzes, tests, and formative assessments in seconds using our intuitive AI quiz generator.",
      accentColor: "#10B981" // Emerald
    },
    {
      id: "rubric",
      num: "04",
      title: "AI Rubric Generator",
      description: "Generate clear grading criteria and assessment rubrics instantly with the AI rubric generator.",
      accentColor: "#8B5CF6" // Violet
    },
    {
      id: "gap",
      num: "05",
      title: "Learning Gap Analysis",
      description: "Identify concepts students are struggling with before exams to target reviews effectively.",
      accentColor: "#F43F5E" // Rose
    }
  ];

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
      case 0: // AI Lesson Plan Generator
        return (
          <motion.div
            key="lesson-plan-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">AI LESSON PLAN GENERATOR</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Grade 8 Science</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-amber-500/10 text-amber-700 font-semibold border border-amber-500/15">
                NCERT Aligned
              </span>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75">
              <div>
                <span className="font-semibold text-black/85 block">Topic: Photosynthesis</span>
                <span className="text-[9px] text-black/40 block font-mono">Duration: 45 Minutes</span>
              </div>

              <div className="bg-amber-500/3 border border-amber-500/10 rounded-8 p-8 flex flex-col gap-4">
                <span className="font-semibold text-amber-900 text-[10px] uppercase font-mono">Objectives</span>
                <ul className="list-disc pl-12 flex flex-col gap-1 text-black/70">
                  <li>Define photosynthesis and the light chemical reactions.</li>
                  <li>Explain the role of chlorophyll, water, and CO2.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4 bg-white border border-black/5 rounded-8 p-8 shadow-sm">
                <span className="font-semibold text-black/80 text-[10px] uppercase font-mono">Classroom Activities</span>
                <p className="text-[10px] text-black/60 leading-normal">
                  Group Lab: Chromatography of spinach leaf pigments (20 mins).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-black/2 border border-black/5 rounded-6 p-6">
                  <span className="text-[9px] font-mono text-black/45 block uppercase">Assessment</span>
                  <span className="text-10 font-semibold text-black/75">5-Question Exit Ticket</span>
                </div>
                <div className="bg-black/2 border border-black/5 rounded-6 p-6">
                  <span className="text-[9px] font-mono text-black/45 block uppercase">Homework</span>
                  <span className="text-10 font-semibold text-black/75">Stomatal diagram sheet</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 1: // AI Worksheet Generator
        return (
          <motion.div
            key="worksheet-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">AI WORKSHEET GENERATOR</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Generate Worksheet</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-blue-500/10 text-blue-700 font-semibold border border-blue-500/15">
                Ready to Print
              </span>
            </div>

            <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75 justify-center">
              <div className="bg-blue-500/3 border border-blue-500/10 rounded-12 p-16 flex flex-col gap-12">
                <div className="flex justify-between items-center">
                  <span className="text-12 font-bold text-black/85">Class 7 Mathematics</span>
                  <span className="text-10 font-mono text-blue-700 bg-blue-500/10 px-8 py-2 rounded font-bold">Difficulty: Medium</span>
                </div>
                
                <div className="flex items-center gap-10 bg-white border border-black/5 p-12 rounded-8 shadow-sm">
                  <span className="text-20">📄</span>
                  <div>
                    <span className="font-bold text-black/85 block leading-none">Linear Equations Practice</span>
                    <span className="text-[9px] text-black/40 mt-3 block font-mono">15 Questions Ready</span>
                  </div>
                </div>

                <button className="w-full bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white py-10 rounded-8 font-sans font-500 text-11 text-center transition-colors cursor-pointer">
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 2: // AI Quiz & Assessment Generator
        return (
          <motion.div
            key="quiz-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">AI QUIZ GENERATOR</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Quiz Created</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-emerald-500/10 text-emerald-700 font-semibold border border-emerald-500/15">
                Auto-Graded
              </span>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75 justify-center">
              <div className="bg-emerald-500/3 border border-emerald-500/10 rounded-12 p-16 flex flex-col gap-12 text-center items-center">
                <div className="w-40 h-40 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-18 font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-black/85 block text-14 leading-none mb-4">Assessment Ready</span>
                  <span className="text-[10px] text-black/50 block">20 Questions • Auto-Graded</span>
                </div>

                <div className="flex gap-8 w-full">
                  <button className="flex-1 bg-white border border-black/10 hover:bg-black/3 py-8 rounded-6 text-black font-semibold text-10 transition-colors cursor-pointer">
                    Preview Quiz
                  </button>
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-8 rounded-6 font-semibold text-10 transition-colors cursor-pointer">
                    Ready To Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3: // AI Rubric Generator
        return (
          <motion.div
            key="rubric-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">AI RUBRIC GENERATOR</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Presentation Rubric</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-purple-500/10 text-purple-700 font-semibold border border-purple-500/15">
                Assessment Ready
              </span>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-4 text-11 text-black/75">
              <div className="flex flex-col gap-6 mt-4">
                <div className="border border-black/5 rounded-8 overflow-hidden bg-white shadow-sm text-[10px]">
                  <div className="grid grid-cols-4 bg-purple-500/5 font-bold border-b border-black/5 p-6 text-black/80 font-mono text-[9px]">
                    <span>CRITERIA</span>
                    <span>EXCELLENT (3)</span>
                    <span>GOOD (2)</span>
                    <span>POOR (1)</span>
                  </div>
                  
                  <div className="grid grid-cols-4 border-b border-black/5 p-6 text-black/70 leading-tight">
                    <span className="font-semibold text-black">Delivery</span>
                    <span>Clear voice, great eye contact.</span>
                    <span>Audible, moderate eye contact.</span>
                    <span>Hard to hear, no eye contact.</span>
                  </div>
                  
                  <div className="grid grid-cols-4 p-6 text-black/70 leading-tight">
                    <span className="font-semibold text-black">Content</span>
                    <span>Accurate, complete info.</span>
                    <span>Mostly accurate, minor gaps.</span>
                    <span>Incorrect or missing data.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4: // Learning Gap Analysis
        return (
          <motion.div
            key="learning-gap-mockup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12 font-sans h-full text-left"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <span className="text-[10px] uppercase font-mono text-black/40">LEARNING GAP DIAGNOSIS</span>
                <h4 className="text-14 font-bold text-black/85 leading-none">Class Performance</h4>
              </div>
              <span className="text-11 px-8 py-2 rounded bg-rose-500/10 text-rose-700 font-semibold border border-rose-500/15">
                Actionable Insights
              </span>
            </div>

            <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-4 text-11 leading-normal text-black/75">
              <div className="flex flex-col gap-6 bg-white border border-black/5 rounded-8 p-12 shadow-sm">
                <span className="font-semibold text-black/85 block border-b border-black/5 pb-4">Topic Mastery Scores</span>
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <span>Algebra</span>
                    <span className="font-mono font-bold text-rose-600">62%</span>
                  </div>
                  <div className="w-full bg-black/5 h-4 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: "62%" }} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Geometry</span>
                    <span className="font-mono font-bold text-emerald-600">88%</span>
                  </div>
                  <div className="w-full bg-black/5 h-4 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88%" }} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Fractions</span>
                    <span className="font-mono font-bold text-emerald-600">91%</span>
                  </div>
                  <div className="w-full bg-black/5 h-4 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "91%" }} />
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/3 border border-rose-500/10 p-8 rounded-8 flex flex-col gap-2">
                <span className="font-semibold text-rose-950 text-[9px] uppercase font-mono">Recommended Focus</span>
                <span className="font-bold text-rose-900 text-10">Algebra (Review G7 equations)</span>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="for-teachers" className="py-60 800:py-90 max-w-1440 mx-auto px-20 relative overflow-hidden bg-transparent">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            For Teachers
          </span>
          <h2 className="h2--exposure text-center max-w-[22ch] mx-auto text-black">
            Your AI Teaching Assistant
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            Generate lesson plans, worksheets, quizzes, rubrics, and classroom activities in minutes instead of hours.
          </p>
        </div>

        {/* Premium Split-Screen Showcase Layout */}
        <div className="w-full grid grid-cols-1 1000:grid-cols-12 gap-40 1200:gap-60 items-stretch max-w-[1200px]">
          
          {/* LEFT PANEL: Tool Categories */}
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
                    <span className={`font-mono text-11 font-semibold ${isActive ? "text-black/60" : "text-black/30"}`}>
                      {category.num}
                    </span>
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
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT PANEL: AI Teacher Workspace Mockup */}
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
                    {renderSidebarItem("Worksheet Gen", "📝", 1)}
                    {renderSidebarItem("Quiz Generator", "🎯", 2)}
                    {renderSidebarItem("Rubric Creator", "📋", 3)}
                    {renderSidebarItem("Gap Dashboard", "📊", 4)}
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

        {/* Bottom Benefits Metrics Grid */}
        <div className="grid grid-cols-1 800:grid-cols-3 gap-24 mt-60 max-w-[1000px] w-full px-20 justify-center items-stretch relative z-10">
          <div className="bg-white/40 border border-solid border-black/5 rounded-24 p-32 text-center shadow-[0_8px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm hover:bg-white/60 transition-all duration-300">
            <span className="block text-28 font-serif font-700 text-black mb-8 leading-none">Save Hours Every Week</span>
            <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">Effortless Prep</span>
          </div>
          <div className="bg-white/40 border border-solid border-black/5 rounded-24 p-32 text-center shadow-[0_8px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm hover:bg-white/60 transition-all duration-300">
            <span className="block text-28 font-serif font-700 text-black mb-8 leading-none">Classroom-Ready Content</span>
            <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">Instant Print & Share</span>
          </div>
          <div className="bg-white/40 border border-solid border-black/5 rounded-24 p-32 text-center shadow-[0_8px_30px_rgba(0,0,0,0.01)] backdrop-blur-sm hover:bg-white/60 transition-all duration-300">
            <span className="block text-28 font-serif font-700 text-black mb-8 leading-none">Better Student Insights</span>
            <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">Proactive Gap Diagnosis</span>
          </div>
        </div>

        {/* Bottom Statement Signoff Quote */}
        <div className="mt-60 border-t border-black/5 pt-40 max-w-[650px] mx-auto text-center pointer-events-none relative z-10">
          <p className="font-serif font-650 italic text-20 leading-relaxed text-black flex flex-col gap-4">
            <span>"Teaching should focus on students, not repetitive paperwork."</span>
            <span className="text-15 font-sans font-350 text-secondary not-italic mt-4 max-w-[500px] mx-auto leading-relaxed">
              Homi helps educators spend less time preparing and more time teaching.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
