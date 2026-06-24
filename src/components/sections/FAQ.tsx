"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is an AI tutor?",
    answer:
      "An AI tutor is an intelligent learning companion that uses artificial intelligence to provide personalized explanations, adapt to your learning pace, identify knowledge gaps, and help you master concepts through interactive conversations. HomiLearn's AI tutor is specifically designed for Indian students in Classes VI–XII across CBSE, ICSE, and NCERT curricula.",
  },
  {
    question: "How does adaptive learning work?",
    answer:
      "Adaptive learning uses AI to analyze your strengths, weaknesses, and learning patterns. HomiLearn's adaptive engine continuously adjusts difficulty levels, explanation styles, and practice recommendations based on your performance, ensuring you focus on areas that need the most attention.",
  },
  {
    question: "Can HomiLearn identify learning gaps?",
    answer:
      "Yes. HomiLearn's AI analyzes your responses and study patterns to detect weak foundations and missing concepts. It traces knowledge gaps back to their root cause and creates targeted practice paths to rebuild understanding before gaps become bigger academic struggles.",
  },
  {
    question: "Is HomiLearn suitable for CBSE students?",
    answer:
      "Absolutely. HomiLearn is fully aligned with the CBSE curriculum for Classes VI–XII. It covers all subjects chapter-wise, follows NCERT guidelines, and provides exam-oriented practice tailored to CBSE board examination patterns.",
  },
  {
    question: "Does HomiLearn support ICSE students?",
    answer:
      "Yes. HomiLearn supports the ICSE curriculum with subject-specific content, chapter-wise coverage, and adaptive learning aligned to ICSE board standards for students in Classes VI–XII.",
  },
  {
    question: "Can HomiLearn help with NCERT concepts?",
    answer:
      "Yes. HomiLearn is built with deep NCERT alignment. It covers every chapter from NCERT textbooks, provides detailed explanations of concepts, and offers practice questions that follow NCERT patterns for all supported classes.",
  },
  {
    question: "How does AI viva preparation work?",
    answer:
      "HomiLearn's AI viva prep simulates real oral exam scenarios. Students practice answering questions verbally, and the AI provides real-time feedback on confidence, clarity, pace, filler word usage, and content accuracy — helping students speak with authority, not just write well.",
  },
  {
    question: "Can teachers create lesson plans with AI?",
    answer:
      "Yes. HomiLearn provides a powerful AI lesson plan generator that creates standards-aligned, classroom-ready lesson plans for any grade, subject, or curriculum in minutes. Teachers can customize objectives, activities, assessments, and homework assignments.",
  },
  {
    question: "Can teachers generate quizzes and worksheets?",
    answer:
      "Yes. HomiLearn includes AI-powered worksheet and quiz generators that create differentiated, print-ready materials instantly. Teachers can set difficulty levels, question types, and topics — saving hours of manual preparation every week.",
  },
  {
    question: "What boards does HomiLearn support?",
    answer:
      "HomiLearn supports 10+ Indian education boards including CBSE, ICSE, NCERT, GSEB (Gujarat Board), RBSE (Rajasthan Board), Maharashtra Board, UP Board, Karnataka Board, Tamil Nadu Board, Kerala Board, MP Board, Andhra Pradesh Board, Telangana Board, and Punjab Board.",
  },
];

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/5 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-20 800:py-24 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 rounded-8"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="font-serif font-600 text-16 800:text-18 text-black/85 pr-20 leading-snug">
          {item.question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-24 h-24 flex items-center justify-center text-black/40"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-24 text-14 800:text-16 leading-relaxed text-secondary font-sans font-350 max-w-[70ch]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-40 800:py-60 max-w-1440 mx-auto px-24 800:px-40"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-40 800:mb-60 flex flex-col gap-12 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            Frequently Asked Questions
          </span>
          <h2
            id="faq-heading"
            className="h2--exposure text-center max-w-[22ch] mx-auto text-black"
          >
            Everything you need to know about HomiLearn
          </h2>
          <p className="text-14 800:text-16 leading-relaxed text-secondary max-w-[55ch] mt-4 font-sans font-350 text-center">
            Find answers about our AI tutor, adaptive learning, board support, and tools for teachers and parents.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="bg-white/40 border border-black/5 rounded-24 px-24 800:px-40 backdrop-blur-sm">
          {faqs.map((item, index) => (
            <FAQItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
