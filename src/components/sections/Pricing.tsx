"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaStyle: "minimal" | "primary" | "secondary";
  featured?: boolean;
}

export default function Pricing() {
  const [isComparing, setIsComparing] = useState(false);

  const handleScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const plans: PricingPlan[] = [
    {
      id: "free",
      name: "Free Starter",
      price: "₹0",
      description: "Get started with AI-powered learning support.",
      features: [
        "20 Homi conversations per month",
        "NCERT support",
        "Limited adaptive learning",
        "3 AI Viva sessions per month",
        "Basic parent dashboard",
        "Chatbot support",
      ],
      ctaText: "Start Free",
      ctaStyle: "minimal",
    },
    {
      id: "plus",
      name: "HomiLearn Plus",
      badge: "Most Popular",
      price: "₹299",
      period: "/ month",
      description: "Everything students and parents need for personalized learning.",
      features: [
        "Unlimited Homi conversations",
        "Full adaptive learning",
        "NCERT + Gujarat Board + ICSE",
        "Unlimited AI Viva sessions",
        "Full parent dashboard",
        "Personalized alerts",
        "Offline mode",
        "Priority email support",
      ],
      ctaText: "Start Learning",
      ctaStyle: "primary",
      featured: true,
    },
    {
      id: "school",
      name: "School / Institution",
      price: "Custom",
      description: "Designed for classrooms, schools, and coaching institutes.",
      features: [
        "Unlimited student access",
        "Full adaptive learning",
        "All supported boards",
        "Unlimited AI Viva sessions",
        "Teacher portal",
        "Institution analytics",
        "Full dashboards",
        "Dedicated account support",
      ],
      ctaText: "Contact Sales",
      ctaStyle: "secondary",
    },
  ];

  const comparisonCategories = [
    {
      title: "Homi Assistant & Learning",
      features: [
        { name: "Monthly AI Conversations", free: "20 sessions", plus: "Unlimited", school: "Unlimited" },
        { name: "Adaptive Learning", free: "Limited Support", plus: "Full Personalized", school: "Full Personalized" },
        { name: "AI Viva Practice", free: "3 sessions / mo", plus: "Unlimited", school: "Unlimited" },
        { name: "Offline Learning Mode", free: "✕", plus: "✓", school: "✓" },
      ],
    },
    {
      title: "Syllabus & Boards",
      features: [
        { name: "NCERT Curriculum", free: "✓", plus: "✓", school: "✓" },
        { name: "State Boards & ICSE", free: "✕", plus: "Gujarat Board + ICSE", school: "All Supported Boards" },
        { name: "Custom Institution Content", free: "✕", plus: "✕", school: "✓" },
      ],
    },
    {
      title: "Analytics & Support",
      features: [
        { name: "Parent Dashboard", free: "Basic Insights", plus: "Full Suite", school: "Full Suite" },
        { name: "Personalized Alerts & Progress", free: "✕", plus: "✓", school: "✓" },
        { name: "Teacher Portal & Classroom Analytics", free: "✕", plus: "✕", school: "✓" },
        { name: "Support Channels", free: "Standard Chatbot", plus: "Priority Email", school: "Dedicated Account Support" },
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="pricing"
      className="relative py-40 800:py-60 overflow-hidden font-sans bg-gradient-to-b from-[#FFFDF9] to-[#F6F0FF] text-black"
    >
      {/* Decorative ambient gradients inspired by Dia & Apple landing pages */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#E6D5FF]/20 to-[#FFF0D9]/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute -bottom-100 left-[10%] w-[400px] h-[400px] bg-[#EAF2FF]/40 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="relative max-w-1200 mx-auto px-24 z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-640 mb-40 800:mb-50 flex flex-col items-center gap-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-12 font-mono uppercase tracking-wider text-purple-600/70 bg-purple-50 px-12 py-4 rounded-full border border-purple-100/50"
          >
            Simple Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-36 800:text-48 font-700 tracking-tight text-black leading-tight"
          >
            Choose The Right Learning Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-16 800:text-18 text-black/60 font-sans font-350 leading-relaxed max-w-500"
          >
            Start free, unlock personalized learning, or bring Homi to your entire school.
          </motion.p>
        </div>

        {/* Pricing Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 800:grid-cols-3 gap-32 w-full items-stretch justify-center max-w-1100 mb-50"
        >
          {plans.map((plan) => {
            const isPlus = plan.featured;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
                }}
                className={`relative flex flex-col justify-between rounded-32 p-32 800:p-40 transition-all duration-300 ${
                  isPlus
                    ? "bg-white/80 border-0 shadow-[0_20px_50px_rgba(157,92,255,0.08)] backdrop-blur-xl scale-[1.03] z-10"
                    : "bg-white/40 border border-solid border-black/5 hover:border-black/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                }`}
              >
                {/* Subtle Ambient Glow behind Featured Plan */}
                {isPlus && (
                  <div className="absolute inset-0 -z-10 rounded-32 bg-gradient-to-b from-[#FAF5FF] to-[#FFF9F6] opacity-100 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[180px] h-[180px] bg-purple-400/20 rounded-full blur-[40px] animate-pulse" />
                  </div>
                )}

                {/* Plan Header */}
                <div>
                  <div className="flex justify-between items-start mb-16">
                    <h3 className="font-serif text-20 800:text-22 font-650 text-black">
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span className="text-10 font-sans font-600 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full uppercase tracking-wider shadow-sm">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-4 mb-20">
                    <span className="text-38 800:text-46 font-serif font-700 tracking-tight text-black">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-13 font-sans font-400 text-black/50">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-14 font-sans font-350 text-black/60 leading-relaxed mb-32 border-b border-black/5 pb-24">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="flex flex-col gap-12 mb-40">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-10 text-13 text-black/85 leading-relaxed">
                        <span className="text-purple-500 font-bold flex-shrink-0 mt-[2px]">✓</span>
                        <span className="font-sans font-350">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-16">
                  {plan.ctaStyle === "primary" ? (
                    <button 
                      onClick={() => handleScroll("cta")}
                      className="w-full h-48 rounded-16 bg-black text-white hover:bg-black/85 active:scale-[0.98] font-sans font-500 text-14 flex items-center justify-center shadow-md shadow-black/5 transition-all duration-200 cursor-pointer"
                    >
                      {plan.ctaText}
                    </button>
                  ) : plan.ctaStyle === "secondary" ? (
                    <button 
                      onClick={() => handleScroll("cta")}
                      className="w-full h-48 rounded-16 bg-white/70 hover:bg-white text-black border border-solid border-black/10 active:scale-[0.98] font-sans font-500 text-14 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      {plan.ctaText}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleScroll("cta")}
                      className="w-full h-48 rounded-16 bg-[#EBEBEB]/70 hover:bg-black/5 text-black border border-solid border-black/5 active:scale-[0.98] font-sans font-500 text-14 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      {plan.ctaText}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-11 800:text-12 font-sans text-black/70 flex flex-wrap items-center justify-center gap-x-20 gap-y-6 text-center tracking-tight mb-60 max-w-[90%]"
        >
          <span>No hidden fees.</span>
          <span className="hidden 800:inline">•</span>
          <span>Cancel anytime.</span>
          <span className="hidden 800:inline">•</span>
          <span>Built for students, trusted by parents.</span>
        </motion.p>

        {/* Optional Expandable Comparison Panel */}
        <div className="w-full max-w-900 flex flex-col items-center">
          <button
            onClick={() => setIsComparing(!isComparing)}
            className="flex items-center gap-8 px-24 py-12 rounded-full bg-white/40 border border-solid border-black/5 hover:border-black/10 text-13 font-sans font-555 text-black shadow-sm transition-all duration-200 cursor-pointer hover:bg-white/60 active:scale-[0.98] select-none"
          >
            <span>Compare Plans</span>
            <motion.span
              animate={{ rotate: isComparing ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-10 text-black/50"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {isComparing && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden"
              >
                <div className="bg-white/60 backdrop-blur-xl border border-solid border-black/5 rounded-24 p-24 800:p-36 shadow-lg">
                  {/* Desktop view for comparisons */}
                  <div className="hidden 800:block">
                    <div className="grid grid-cols-4 border-b border-black/5 pb-16 mb-20 text-12 font-mono uppercase tracking-wider text-black/45">
                      <div>Features</div>
                      <div className="text-center">Free Starter</div>
                      <div className="text-center font-bold text-purple-600">HomiLearn Plus</div>
                      <div className="text-center">School / Inst.</div>
                    </div>

                    <div className="flex flex-col gap-24">
                      {comparisonCategories.map((category, index) => (
                        <div key={index} className="flex flex-col gap-10">
                          <h4 className="font-serif text-14 font-600 text-black/80 mb-4">
                            {category.title}
                          </h4>
                          <div className="flex flex-col gap-12">
                            {category.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="grid grid-cols-4 py-8 border-b border-black/[0.03] text-13 font-sans font-350 text-black/80 items-center"
                              >
                                <div className="text-black/70 pr-10">{feature.name}</div>
                                <div className="text-center text-black/60 font-sans">{feature.free}</div>
                                <div className="text-center font-semibold text-purple-700 bg-purple-500/5 py-4 rounded-8">{feature.plus}</div>
                                <div className="text-center text-black/60 font-sans">{feature.school}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile view for comparisons (Accordions or list) */}
                  <div className="800:hidden flex flex-col gap-24">
                    {comparisonCategories.map((category, index) => (
                      <div key={index} className="flex flex-col gap-12">
                        <h4 className="font-serif text-13 font-600 text-purple-900 border-b border-purple-500/10 pb-6">
                          {category.title}
                        </h4>
                        <div className="flex flex-col gap-14">
                          {category.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex flex-col gap-6 text-12 pb-10 border-b border-black/[0.03]">
                              <span className="font-sans font-600 text-black/80">{feature.name}</span>
                              <div className="grid grid-cols-3 gap-6 text-11 text-black/60 font-sans font-350">
                                <div>
                                  <span className="text-[10px] uppercase font-mono block text-black/35">Free</span>
                                  {feature.free}
                                </div>
                                <div className="font-semibold text-purple-700">
                                  <span className="text-[10px] uppercase font-mono block text-purple-600/40">Plus</span>
                                  {feature.plus}
                                </div>
                                <div>
                                  <span className="text-[10px] uppercase font-mono block text-black/35">School</span>
                                  {feature.school}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
