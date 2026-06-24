"use client";

import { motion } from "framer-motion";

const CheckIcon = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="text-[#E78B39] shrink-0"
  >
    <path 
      d="M2.5 6L4.5 8L9.5 3.5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default function Testimonials() {
  const metrics = [
    { value: "95%", label: "Students Report Better Understanding" },
    { value: "3×", label: "More Consistent Practice Sessions" },
    { value: "24/7", label: "Learning Support Available" },
    { value: "Classes VI–XII", label: "Across Multiple Boards" }
  ];

  const smallerTestimonials = [
    {
      role: "👨‍🎓 Student",
      quote: "Whenever I get stuck, I ask Homi first. It feels like having a tutor available all the time.",
      bgStyle: "bg-white border-black/8 hover:border-black/15 shadow-[0px_4px_16px_rgba(0,0,0,0.01)]"
    },
    {
      role: "👨‍👩‍👧 Parent",
      quote: "For the first time, I can actually see how my child is progressing instead of waiting for report cards.",
      bgStyle: "bg-gradient-to-b from-white to-[#FFFBF5] border-orange-500/15 shadow-[0px_10px_25px_rgba(249,115,22,0.02)] hover:border-orange-500/30"
    },
    {
      role: "👩‍🏫 Teacher",
      quote: "My students come to class better prepared, allowing me to focus on teaching instead of repeating the basics.",
      bgStyle: "bg-white border-black/8 hover:border-black/15 shadow-[0px_4px_16px_rgba(0,0,0,0.01)]"
    }
  ];

  const trustItems = [
    "NCERT",
    "Gujarat Board",
    "ICSE",
    "Personalized Learning",
    "Viva Preparation",
    "Parent Insights",
    "Teacher Support"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <section className="py-40 800:py-60 max-w-1440 mx-auto px-20 overflow-x-clip select-none">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
            Trusted By Students, Parents & Teachers
          </span>
          <h2 className="h2--exposure text-center max-w-[22ch] mx-auto text-black">
            Learning That Builds Confidence
          </h2>
          <p className="text-16 leading-relaxed text-secondary max-w-[65ch] mt-4 font-sans font-350 text-center">
            From everyday homework help to exam preparation, Homi is helping students learn with confidence while keeping parents informed and teachers empowered.
          </p>
        </div>

        {/* TOP ROW: Horizontal Trust Metrics with soft separators */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 800:grid-cols-4 py-40 border-y border-solid border-black/5 items-stretch justify-center text-center bg-white/30 backdrop-blur-sm rounded-16 px-12"
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col justify-center gap-6 px-16 py-16 800:border-r border-solid border-black/5 last:border-r-0"
            >
              <span className="text-36 800:text-48 font-serif font-700 text-black tracking-tight leading-none">
                {metric.value}
              </span>
              <span className="text-10 font-mono uppercase tracking-wider text-tertiary mt-2 max-w-[20ch] mx-auto leading-relaxed">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* MIDDLE SECTION: Large Highlighted Featured Testimonial */}
        <div className="my-60">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-900 mx-auto bg-gradient-to-b from-white to-[#FFFCF7] border border-black/8 rounded-32 p-30 800:p-50 relative text-center shadow-[0px_12px_42px_rgba(0,0,0,0.015)] overflow-hidden"
          >
            <div className="absolute -right-40 -top-40 w-160 h-160 bg-[#F97316]/3 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-40 -bottom-40 w-160 h-160 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center flex justify-center mb-16">
              <span className="font-serif text-[80px] leading-none text-[#F97316]/10 select-none h-40 flex items-center">
                “
              </span>
            </div>

            <p className="font-serif italic text-20 800:text-24 leading-relaxed text-black max-w-[42ch] mx-auto relative z-10">
              "Homi explains concepts in a way that actually makes sense to me. I stopped memorizing answers and started understanding them."
            </p>

            <div className="mt-28 flex flex-col items-center gap-4 relative z-10">
              <div className="h-1 w-32 bg-black/10 rounded-full" />
              <span className="text-11 font-mono uppercase tracking-wider text-tertiary">
                Student
              </span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM ROW: Three Smaller Testimonial Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 800:grid-cols-3 gap-24 mt-40"
        >
          {smallerTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-24 border border-solid p-28 flex flex-col gap-12 text-left transition-all duration-300 ${
                testimonial.bgStyle
              }`}
            >
              <span className="text-12 font-mono uppercase tracking-wider text-tertiary">
                {testimonial.role}
              </span>
              <p className="text-14 leading-relaxed text-secondary italic font-sans font-350 mt-4 flex-1">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM TRUST STRIP: Editorial Badge Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-80 pt-40 border-t border-solid border-black/5 flex flex-col items-center gap-20 text-center"
        >
          <span className="text-11 font-mono uppercase tracking-wider text-tertiary">
            Supported Learning Boards &amp; Highlights
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-10 max-w-1000 mx-auto">
            {trustItems.map((item, idx) => (
              <span 
                key={idx} 
                className="text-12 font-medium text-black/75 flex items-center gap-6 bg-white px-16 py-8 rounded-full border border-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-black/15 transition-colors cursor-default"
              >
                <CheckIcon />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
