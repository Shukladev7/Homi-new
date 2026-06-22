import type { Metadata } from "next";
import LandingLayout from "@/components/landing/LandingLayout";
import BlogClient from "@/components/sections/BlogClient";
import { getPublishedPosts } from "@/lib/db";

// Next.js ISR: Revalidate page data every 60 seconds
export const revalidate = 60;

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

export default async function BlogPage() {
  // Fetch dynamic published posts from Firestore database
  const publishedPosts = await getPublishedPosts();

  return (
    <LandingLayout>
      {/* Hero */}
      <section className="pt-60 800:pt-90 pb-20 px-24 800:px-40 text-center">
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

      {/* Interactive Blog Listing Component */}
      <BlogClient initialPosts={publishedPosts} />
    </LandingLayout>
  );
}
