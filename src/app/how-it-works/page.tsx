import type { Metadata } from "next";
import InteriorLayout from "@/components/interior/InteriorLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How HomiLearn Works – AI-Powered Personalized Learning for Indian Students",
  description:
    "Discover how HomiLearn's AI tutor adapts to each student's learning style, identifies gaps, and builds personalized study paths for CBSE, ICSE, and NCERT curricula.",
  alternates: {
    canonical: "https://www.homilearn.com/how-it-works",
  },
  openGraph: {
    title: "How HomiLearn Works – AI-Powered Personalized Learning",
    description:
      "Discover how HomiLearn's adaptive AI engine identifies knowledge gaps, personalizes explanations, and builds custom study paths for every student.",
    url: "https://www.homilearn.com/how-it-works",
  },
};

const steps = [
  {
    num: "01",
    title: "Ask Homi Anything",
    description:
      "Students interact naturally with Homi — asking doubts, requesting explanations, or seeking help with homework. The AI tutor understands context, adapts language, and responds at the student's level.",
    keywords: "AI doubt solver, AI homework help, AI study companion",
  },
  {
    num: "02",
    title: "Adaptive Learning Engine Analyzes",
    description:
      "Behind every conversation, HomiLearn's adaptive learning engine maps the student's knowledge graph — identifying strengths, weaknesses, and foundational gaps that need attention.",
    keywords: "Adaptive learning engine, learning gap detection, personalized learning app",
  },
  {
    num: "03",
    title: "Personalized Study Path Created",
    description:
      "Based on the analysis, Homi builds a smart study plan tailored to the student's board (CBSE, ICSE, NCERT), class level, and individual learning patterns.",
    keywords: "Smart study plan, NCERT-aligned AI tutor, AI exam preparation",
  },
  {
    num: "04",
    title: "Practice, Prepare, and Master",
    description:
      "Students practice with adaptive difficulty, prepare for viva and oral exams with AI-powered speech feedback, and steadily master concepts through spaced repetition.",
    keywords: "AI viva preparation, AI tutor for CBSE students, AI tutor for ICSE students",
  },
  {
    num: "05",
    title: "Parents Stay Informed",
    description:
      "Parents receive regular insights on progress, strengths, and areas that need support — without needing to constantly check on their child or interrupt study sessions.",
    keywords: "Parent dashboard education, progress tracking, learning insights",
  },
];

export default function HowItWorksPage() {
  return (
    <InteriorLayout>
      {/* Hero Section */}
      <section className="pt-60 800:pt-90 pb-40 800:pb-60 px-24 800:px-40 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col gap-16 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            How It Works
          </span>
          <h1 className="font-serif font-700 text-32 800:text-48 tracking-tight text-black leading-tight">
            Learning That Adapts to Every Student
          </h1>
          <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
            HomiLearn&apos;s AI tutor doesn&apos;t just answer questions — it understands how your child learns, identifies gaps, and builds a personalized path to mastery.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-40 800:py-60 px-24 800:px-40" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="sr-only">How the AI learning process works</h2>
        <div className="max-w-[900px] mx-auto flex flex-col gap-40 800:gap-60">
          {steps.map((step) => (
            <article
              key={step.num}
              className="grid grid-cols-1 800:grid-cols-12 gap-20 800:gap-40 items-start"
            >
              <div className="800:col-span-2 flex items-start">
                <span className="font-mono text-48 800:text-64 font-700 text-black/8 leading-none select-none">
                  {step.num}
                </span>
              </div>
              <div className="800:col-span-10 flex flex-col gap-10">
                <h3 className="font-serif font-650 text-22 800:text-28 text-black tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-14 800:text-16 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-60 800:py-90 px-24 800:px-40 text-center bg-white">
        <div className="max-w-[600px] mx-auto flex flex-col gap-20 items-center">
          <h2 className="font-serif font-700 text-24 800:text-32 tracking-tight text-black">
            Ready to Experience Personalized Learning?
          </h2>
          <p className="text-14 800:text-16 text-secondary font-sans font-350">
            Start free and see how HomiLearn adapts to your child&apos;s unique learning needs.
          </p>
          <div className="flex flex-col 600:flex-row gap-16 items-center">
            <Link
              href="/#cta"
              className="h-48 rounded-14 bg-black text-white hover:bg-black/85 font-sans font-500 text-16 px-32 flex items-center justify-center shadow-sm transition-all duration-200"
            >
              Start Free With Homi
            </Link>
            <Link
              href="/features"
              className="h-48 rounded-14 bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5 font-sans font-500 text-16 px-32 flex items-center justify-center transition-all duration-200"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </InteriorLayout>
  );
}
