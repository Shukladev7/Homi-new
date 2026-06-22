import type { Metadata } from "next";
import InternalLayout from "@/components/interior/InternalLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Teachers – AI Lesson Plan, Worksheet, Quiz & Rubric Generator",
  description:
    "Save hours every week with HomiLearn's free AI tools for teachers. Generate standards-aligned lesson plans, worksheets, quizzes, rubrics, and classroom activities instantly.",
  alternates: {
    canonical: "https://www.homilearn.com/teachers",
  },
  openGraph: {
    title: "HomiLearn for Teachers – AI-Powered Teaching Assistant",
    description:
      "Generate lesson plans, worksheets, quizzes, and rubrics in minutes. Free AI tools designed for Indian educators.",
    url: "https://www.homilearn.com/teachers",
  },
};

const tools = [
  {
    title: "AI Lesson Plan Generator",
    description:
      "Generate complete, standards-aligned lesson plans for any grade, subject, or board curriculum. Include objectives, activities, assessments, and homework — ready in minutes instead of hours.",
    keywords: "AI lesson plan generator, standards-aligned lesson plans AI, save time lesson planning",
  },
  {
    title: "AI Worksheet Generator",
    description:
      "Create differentiated, classroom-ready worksheets instantly. Choose topic, difficulty level, and question types. Export as printable PDF or share digitally with students.",
    keywords: "AI worksheet generator, free AI tools for teachers",
  },
  {
    title: "AI Quiz & Assessment Generator",
    description:
      "Build auto-graded quizzes, formative assessments, and unit tests in seconds. Supports MCQs, short answers, true/false, and open-ended questions aligned to your curriculum.",
    keywords: "AI quiz generator, AI teaching assistant",
  },
  {
    title: "AI Rubric Generator",
    description:
      "Create clear, fair grading criteria for any assignment. Customize performance levels, point scales, and assessment dimensions to match your teaching standards.",
    keywords: "AI rubric generator, differentiated instruction AI",
  },
  {
    title: "Learning Gap Analysis Dashboard",
    description:
      "Identify which concepts your class struggles with before exams. See topic mastery scores, weak areas, and recommended focus areas to target your review sessions effectively.",
    keywords: "Learning gap detection, differentiated instruction AI",
  },
];

const benefits = [
  { metric: "Save 5+ Hours", label: "Every Week on Prep" },
  { metric: "Classroom-Ready", label: "Content in Minutes" },
  { metric: "Standards-Aligned", label: "For All Boards" },
];

export default function TeachersPage() {
  return (
    <InternalLayout>
      {/* Hero */}
      <section className="pt-60 800:pt-90 pb-40 800:pb-60 px-24 800:px-40 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col gap-16 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            For Teachers
          </span>
          <h1 className="font-serif font-700 text-32 800:text-48 tracking-tight text-black leading-tight">
            Your AI Teaching Assistant
          </h1>
          <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
            Generate lesson plans, worksheets, quizzes, rubrics, and classroom activities in minutes instead of hours. Free AI tools designed for Indian educators.
          </p>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-20 px-24 800:px-40" aria-label="Key benefits for teachers">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 800:grid-cols-3 gap-20">
          {benefits.map((item) => (
            <div
              key={item.metric}
              className="bg-white/60 border border-black/5 rounded-20 p-24 text-center"
            >
              <span className="block font-serif font-700 text-22 text-black mb-4">
                {item.metric}
              </span>
              <span className="text-12 font-mono uppercase tracking-wider text-black/45 font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Detail */}
      <section className="py-40 800:py-60 px-24 800:px-40" aria-labelledby="teacher-tools-heading">
        <h2 id="teacher-tools-heading" className="sr-only">AI Tools for Teachers</h2>
        <div className="max-w-[900px] mx-auto flex flex-col gap-32">
          {tools.map((tool, index) => (
            <article
              key={tool.title}
              className="bg-white/60 border border-black/5 rounded-24 p-32 800:p-40 flex flex-col gap-14 hover:bg-white/80 transition-colors duration-200"
            >
              <div className="flex items-start gap-16">
                <span className="font-mono text-14 font-semibold text-black/30 leading-none mt-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-10">
                  <h3 className="font-serif font-650 text-20 800:text-24 text-black tracking-tight">
                    {tool.title}
                  </h3>
                  <p className="text-14 800:text-16 leading-relaxed text-secondary font-sans font-350 max-w-[60ch]">
                    {tool.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="py-40 px-24 800:px-40 bg-white text-center">
        <blockquote className="max-w-[600px] mx-auto">
          <p className="font-serif font-650 italic text-20 800:text-24 text-black leading-relaxed">
            &ldquo;Teaching should focus on students, not repetitive paperwork.&rdquo;
          </p>
          <footer className="mt-16 text-14 text-secondary font-sans font-350">
            — HomiLearn helps educators spend less time preparing and more time teaching.
          </footer>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="py-60 800:py-80 px-24 800:px-40 text-center">
        <div className="max-w-[600px] mx-auto flex flex-col gap-20 items-center">
          <h2 className="font-serif font-700 text-24 800:text-32 tracking-tight text-black">
            Start Creating With AI Today
          </h2>
          <p className="text-14 800:text-16 text-secondary font-sans font-350">
            Free to start. No credit card required. Generate your first lesson plan in under 2 minutes.
          </p>
          <div className="flex flex-col 600:flex-row gap-16 items-center">
            <Link
              href="/#cta"
              className="h-48 rounded-14 bg-black text-white hover:bg-black/85 font-sans font-500 text-16 px-32 flex items-center justify-center shadow-sm transition-all duration-200"
            >
              Try Free AI Tools
            </Link>
            <Link
              href="/pricing"
              className="h-48 rounded-14 bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5 font-sans font-500 text-16 px-32 flex items-center justify-center transition-all duration-200"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </InternalLayout>
  );
}
