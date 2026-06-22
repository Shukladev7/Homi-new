import type { Metadata } from "next";
import InternalLayout from "@/components/interior/InternalLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Parents – Track Progress, Stay Informed, Support Learning",
  description:
    "HomiLearn gives parents real-time visibility into their child's learning journey — progress tracking, learning insights, personalized alerts, and detailed reports without interrupting study sessions.",
  alternates: {
    canonical: "https://www.homilearn.com/parents",
  },
  openGraph: {
    title: "HomiLearn for Parents – Stay in the Loop on Your Child's Learning",
    description:
      "Real-time insights into your child's progress, strengths, and areas needing support. No more guessing about their academic performance.",
    url: "https://www.homilearn.com/parents",
  },
};

const benefits = [
  {
    title: "Weekly Progress Reports",
    description:
      "Receive automated summaries of topics mastered, study time invested, and learning milestones achieved. Know exactly where your child stands without asking.",
  },
  {
    title: "Learning Gap Alerts",
    description:
      "Get notified when the AI detects a foundational gap or when your child struggles with a concept — so you can offer support at the right moment.",
  },
  {
    title: "Subject Strength Mapping",
    description:
      "Visual breakdowns showing which subjects your child excels in and which need more focused attention, updated in real-time.",
  },
  {
    title: "Study Habit Insights",
    description:
      "Understand when your child studies best, how long they stay focused, and whether their learning pace is healthy and consistent.",
  },
  {
    title: "Safe Learning Environment",
    description:
      "HomiLearn is designed with child safety in mind. No ads, no distractions, and complete privacy. Your child's data stays secure.",
  },
  {
    title: "No Constant Monitoring Needed",
    description:
      "HomiLearn keeps you informed passively. You see results and patterns without needing to hover over your child's shoulder during study time.",
  },
];

export default function ParentsPage() {
  return (
    <InternalLayout>
      {/* Hero */}
      <section className="pt-60 800:pt-90 pb-40 800:pb-60 px-24 800:px-40 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col gap-16 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            For Parents
          </span>
          <h1 className="font-serif font-700 text-32 800:text-48 tracking-tight text-black leading-tight">
            Stay Informed Without Hovering
          </h1>
          <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
            HomiLearn gives you complete visibility into your child&apos;s learning journey — progress, strengths, challenges, and study habits — without interrupting their flow.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-40 800:py-60 px-24 800:px-40" aria-labelledby="parent-benefits-heading">
        <h2 id="parent-benefits-heading" className="sr-only">Parent Dashboard Benefits</h2>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 800:grid-cols-2 gap-24">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="bg-white/60 border border-black/5 rounded-24 p-28 800:p-32 flex flex-col gap-12 hover:bg-white/80 transition-colors duration-200"
            >
              <h3 className="font-serif font-600 text-18 800:text-20 text-black tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-13 800:text-14 leading-relaxed text-secondary font-sans font-350">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How Parent Dashboard Works */}
      <section className="py-40 800:py-60 px-24 800:px-40 bg-white" aria-labelledby="how-dashboard-works">
        <div className="max-w-[800px] mx-auto text-center flex flex-col gap-24 items-center">
          <h2 id="how-dashboard-works" className="font-serif font-650 text-24 800:text-32 tracking-tight text-black">
            How the Parent Dashboard Works
          </h2>
          <div className="grid grid-cols-1 800:grid-cols-3 gap-20 w-full text-left">
            <div className="flex flex-col gap-8 p-24 bg-[#F8F8F8] rounded-20">
              <span className="font-mono text-32 font-700 text-black/10">01</span>
              <h3 className="font-sans font-600 text-16 text-black">Your Child Studies</h3>
              <p className="text-13 text-secondary font-sans font-350">
                They interact with Homi naturally, asking doubts and practicing concepts.
              </p>
            </div>
            <div className="flex flex-col gap-8 p-24 bg-[#F8F8F8] rounded-20">
              <span className="font-mono text-32 font-700 text-black/10">02</span>
              <h3 className="font-sans font-600 text-16 text-black">AI Tracks Progress</h3>
              <p className="text-13 text-secondary font-sans font-350">
                The adaptive engine maps strengths, weaknesses, and learning velocity in real-time.
              </p>
            </div>
            <div className="flex flex-col gap-8 p-24 bg-[#F8F8F8] rounded-20">
              <span className="font-mono text-32 font-700 text-black/10">03</span>
              <h3 className="font-sans font-600 text-16 text-black">You Get Insights</h3>
              <p className="text-13 text-secondary font-sans font-350">
                Weekly reports and smart alerts come to your dashboard automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-60 800:py-80 px-24 800:px-40 text-center">
        <div className="max-w-[600px] mx-auto flex flex-col gap-20 items-center">
          <h2 className="font-serif font-700 text-24 800:text-32 tracking-tight text-black">
            See How Your Child Is Really Doing
          </h2>
          <p className="text-14 800:text-16 text-secondary font-sans font-350">
            Start free and explore the Parent Insights Dashboard today.
          </p>
          <div className="flex flex-col 600:flex-row gap-16 items-center">
            <Link
              href="/#cta"
              className="h-48 rounded-14 bg-black text-white hover:bg-black/85 font-sans font-500 text-16 px-32 flex items-center justify-center shadow-sm transition-all duration-200"
            >
              Start Free
            </Link>
            <Link
              href="/how-it-works"
              className="h-48 rounded-14 bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5 font-sans font-500 text-16 px-32 flex items-center justify-center transition-all duration-200"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </InternalLayout>
  );
}
