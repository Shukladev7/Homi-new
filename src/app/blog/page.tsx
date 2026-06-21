import type { Metadata } from "next";
import InteriorLayout from "@/components/interior/InteriorLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog – AI Learning Tips, Exam Prep & Education Insights",
  description:
    "Expert articles on AI tutoring, adaptive learning, exam preparation strategies, and teaching tools for CBSE, ICSE & NCERT students, parents, and teachers.",
  alternates: {
    canonical: "https://www.homilearn.com/blog",
  },
  openGraph: {
    title: "HomiLearn Blog – AI Learning Tips & Education Insights",
    description:
      "Expert articles on AI tutoring, adaptive learning, exam preparation, and teaching tools for Indian students and educators.",
    url: "https://www.homilearn.com/blog",
  },
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const posts: BlogPost[] = [
  {
    slug: "best-ai-tutor-for-cbse-students",
    title: "Best AI Tutor for CBSE Students in 2026",
    excerpt:
      "Discover how AI-powered tutoring is transforming CBSE education with personalized learning paths, adaptive difficulty, and instant doubt solving for Classes VI–XII.",
    category: "Students",
    readTime: "7 min read",
    date: "2026-06-15",
  },
  {
    slug: "how-adaptive-learning-improves-exam-scores",
    title: "How Adaptive Learning Improves Exam Scores",
    excerpt:
      "Research shows adaptive learning engines improve exam performance by 20-40%. Learn how AI adapts to each student's pace and fills knowledge gaps before they widen.",
    category: "Adaptive Learning",
    readTime: "6 min read",
    date: "2026-06-10",
  },
  {
    slug: "ai-study-companion-vs-traditional-tuition",
    title: "AI Study Companion vs Traditional Tuition: A Complete Comparison",
    excerpt:
      "Compare AI-powered learning companions with traditional tuition across cost, accessibility, personalization, and effectiveness for Indian students.",
    category: "Parents",
    readTime: "8 min read",
    date: "2026-06-05",
  },
  {
    slug: "how-ai-helps-students-prepare-for-viva",
    title: "How AI Helps Students Prepare for Viva Exams",
    excerpt:
      "Oral exams require different skills than written tests. Learn how AI viva preparation builds confidence, improves delivery, and reduces exam anxiety.",
    category: "Exam Preparation",
    readTime: "5 min read",
    date: "2026-05-28",
  },
  {
    slug: "benefits-of-learning-gap-detection",
    title: "Benefits of Learning Gap Detection for Academic Success",
    excerpt:
      "Undetected learning gaps compound over years. Discover how AI identifies foundational weaknesses early and creates targeted recovery paths.",
    category: "Adaptive Learning",
    readTime: "6 min read",
    date: "2026-05-20",
  },
  {
    slug: "how-teachers-save-time-using-ai",
    title: "How Teachers Can Save 5+ Hours Every Week Using AI",
    excerpt:
      "From lesson planning to worksheet creation, learn how AI teaching assistants help educators spend less time on paperwork and more time with students.",
    category: "Teachers",
    readTime: "7 min read",
    date: "2026-05-15",
  },
  {
    slug: "best-ai-lesson-plan-generator-for-teachers",
    title: "Best AI Lesson Plan Generator for Teachers in 2026",
    excerpt:
      "A detailed guide to using AI lesson plan generators for creating standards-aligned, engaging lesson plans for any grade and subject in minutes.",
    category: "Teachers",
    readTime: "8 min read",
    date: "2026-05-10",
  },
  {
    slug: "using-ai-for-worksheet-creation",
    title: "Using AI for Worksheet Creation: A Teacher's Guide",
    excerpt:
      "Learn how AI worksheet generators create differentiated, print-ready materials with customizable difficulty, topics, and question formats.",
    category: "Teachers",
    readTime: "6 min read",
    date: "2026-05-05",
  },
];

const categories = ["All", "Students", "Parents", "Teachers", "Exam Preparation", "Adaptive Learning"];

export default function BlogPage() {
  return (
    <InteriorLayout>
      {/* Hero */}
      <section className="pt-60 800:pt-90 pb-40 800:pb-60 px-24 800:px-40 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col gap-16 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            Blog
          </span>
          <h1 className="font-serif font-700 text-32 800:text-48 tracking-tight text-black leading-tight">
            Learning Insights & Resources
          </h1>
          <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
            Expert articles on AI tutoring, adaptive learning, exam strategies, and teaching tools for students, parents, and educators.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-24 800:px-40 pb-20" aria-label="Blog categories">
        <div className="max-w-[900px] mx-auto flex flex-wrap gap-10 justify-center">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-14 py-6 rounded-full border border-black/8 text-12 font-sans font-500 text-black/70 bg-white hover:bg-black/5 cursor-pointer transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-40 800:py-60 px-24 800:px-40" aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="sr-only">Articles</h2>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 800:grid-cols-2 1000:grid-cols-3 gap-24">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white/60 border border-black/5 rounded-24 p-28 flex flex-col gap-14 hover:bg-white/80 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-10">
                <span className="text-10 font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50">
                  {post.category}
                </span>
                <span className="text-10 font-mono text-black/40">{post.readTime}</span>
              </div>
              <h3 className="font-serif font-600 text-16 800:text-18 text-black tracking-tight leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-black/70 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-13 leading-relaxed text-secondary font-sans font-350 line-clamp-3">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto text-13 font-sans font-500 text-black/70 hover:text-black transition-colors inline-flex items-center gap-6"
                aria-label={`Read full article: ${post.title}`}
              >
                Read more
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </InteriorLayout>
  );
}
