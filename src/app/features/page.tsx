import type { Metadata } from "next";
import InternalLayout from "@/components/interior/InternalLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features – AI Tutor, Adaptive Learning, Doubt Solving & More",
  description:
    "Explore HomiLearn's features: AI doubt solving, adaptive learning engine, personalized study plans, AI viva preparation, learning gap detection, and parent insights for CBSE, ICSE & NCERT students.",
  alternates: {
    canonical: "https://www.homilearn.com/features",
  },
  openGraph: {
    title: "HomiLearn Features – AI Tutor, Adaptive Learning & More",
    description:
      "AI doubt solving, adaptive learning, viva preparation, learning gap detection, and parent insights — all in one platform for Indian students.",
    url: "https://www.homilearn.com/features",
  },
};

const features = [
  {
    category: "For Students",
    items: [
      {
        title: "AI Doubt Solving",
        description:
          "Ask any question and get step-by-step explanations adapted to your level. Homi explains concepts in multiple ways until they click.",
      },
      {
        title: "Adaptive Learning Engine",
        description:
          "The AI continuously adjusts difficulty, examples, and pace based on your performance. No two learning paths are the same.",
      },
      {
        title: "Smart Study Plans",
        description:
          "Personalized study schedules built around your syllabus, strengths, and exam dates. NCERT-aligned for all supported boards.",
      },
      {
        title: "AI Viva Preparation",
        description:
          "Practice oral exams with AI-powered speech analysis. Get feedback on confidence, clarity, pace, and content accuracy.",
      },
      {
        title: "Learning Gap Detection",
        description:
          "Homi identifies weak foundations and traces them back to root causes, then builds targeted recovery paths.",
      },
      {
        title: "AI Exam Preparation",
        description:
          "Board-specific exam practice with chapter-wise questions, timed tests, and performance analytics aligned to CBSE, ICSE, and state boards.",
      },
    ],
  },
  {
    category: "For Parents",
    items: [
      {
        title: "Parent Insights Dashboard",
        description:
          "See your child's progress, study time, strong subjects, and areas needing attention — without constantly checking on them.",
      },
      {
        title: "Weekly Progress Reports",
        description:
          "Automated reports on what topics were mastered, practice completed, and learning patterns observed.",
      },
      {
        title: "Personalized Alerts",
        description:
          "Get notified when your child struggles with a concept or when they achieve a learning milestone.",
      },
    ],
  },
  {
    category: "For Teachers",
    items: [
      {
        title: "AI Lesson Plan Generator",
        description:
          "Create standards-aligned lesson plans for any grade, subject, or curriculum in minutes. Save hours of preparation time.",
      },
      {
        title: "AI Worksheet Generator",
        description:
          "Generate classroom-ready, differentiated worksheets instantly. Set difficulty, question types, and topic focus.",
      },
      {
        title: "AI Quiz & Assessment Generator",
        description:
          "Build auto-graded quizzes and formative assessments in seconds. Export or share with students directly.",
      },
      {
        title: "AI Rubric Generator",
        description:
          "Create clear, standards-aligned grading criteria for any assignment type with customizable performance levels.",
      },
      {
        title: "Classroom Gap Analysis",
        description:
          "Identify which concepts students struggle with most and target your review sessions effectively.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <InternalLayout>
      {/* Hero */}
      <section className="pt-60 800:pt-90 pb-40 800:pb-60 px-24 800:px-40 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col gap-16 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            Platform Features
          </span>
          <h1 className="font-serif font-700 text-32 800:text-48 tracking-tight text-black leading-tight">
            Everything Students, Parents & Teachers Need
          </h1>
          <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
            From AI doubt solving and adaptive learning to viva preparation and teacher tools — HomiLearn covers every aspect of personalized education.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      {features.map((group) => (
        <section
          key={group.category}
          className="py-40 800:py-60 px-24 800:px-40"
          aria-labelledby={`features-${group.category.toLowerCase().replace(/\s/g, "-")}`}
        >
          <div className="max-w-[1100px] mx-auto">
            <h2
              id={`features-${group.category.toLowerCase().replace(/\s/g, "-")}`}
              className="font-serif font-650 text-24 800:text-32 tracking-tight text-black mb-32 800:mb-40"
            >
              {group.category}
            </h2>
            <div className="grid grid-cols-1 800:grid-cols-2 1000:grid-cols-3 gap-24">
              {group.items.map((feature) => (
                <article
                  key={feature.title}
                  className="bg-white/60 border border-black/5 rounded-24 p-28 800:p-32 flex flex-col gap-12 hover:bg-white/80 transition-colors duration-200"
                >
                  <h3 className="font-serif font-600 text-18 text-black tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-13 800:text-14 leading-relaxed text-secondary font-sans font-350">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Boards supported */}
      <section className="py-40 px-24 800:px-40 bg-white" aria-labelledby="boards-heading">
        <div className="max-w-[900px] mx-auto text-center flex flex-col gap-20 items-center">
          <h2 id="boards-heading" className="font-serif font-650 text-24 800:text-28 tracking-tight text-black">
            Supports 10+ Indian Education Boards
          </h2>
          <p className="text-14 800:text-16 text-secondary font-sans font-350 max-w-[55ch]">
            CBSE, ICSE, NCERT, GSEB, RBSE, Maharashtra Board, UP Board, Karnataka Board, Tamil Nadu Board, Kerala Board, MP Board, and more.
          </p>
          <div className="flex flex-wrap gap-10 justify-center mt-10">
            {["CBSE", "ICSE", "NCERT", "GSEB", "RBSE", "Maharashtra", "UP Board", "Karnataka", "Tamil Nadu", "Kerala", "MP Board"].map(
              (board) => (
                <span
                  key={board}
                  className="px-14 py-6 rounded-full border border-black/8 text-12 font-sans font-500 text-black/70 bg-white"
                >
                  {board}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-60 800:py-80 px-24 800:px-40 text-center">
        <div className="max-w-[600px] mx-auto flex flex-col gap-20 items-center">
          <h2 className="font-serif font-700 text-24 800:text-32 tracking-tight text-black">
            Start Learning Smarter Today
          </h2>
          <div className="flex flex-col 600:flex-row gap-16 items-center">
            <Link
              href="/#cta"
              className="h-48 rounded-14 bg-black text-white hover:bg-black/85 font-sans font-500 text-16 px-32 flex items-center justify-center shadow-sm transition-all duration-200"
            >
              Start Free
            </Link>
            <Link
              href="/pricing"
              className="h-48 rounded-14 bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5 font-sans font-500 text-16 px-32 flex items-center justify-center transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </InternalLayout>
  );
}
