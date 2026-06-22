"use client";

import { useState } from "react";
import Link from "next/link";
import { SerializedBlogPost } from "@/lib/db";
import { Search, Calendar, Clock, ChevronLeft, ChevronRight, AlertCircle, Sparkles } from "lucide-react";

interface BlogClientProps {
  initialPosts: SerializedBlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    "All",
    "Students",
    "Parents",
    "Teachers",
    "Exam Preparation",
    "Adaptive Learning",
    "Study Tips",
    "AI Learning",
  ];

  // 1. Filter Posts
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchesTag = !selectedTag || post.tags.includes(selectedTag.toLowerCase());

    return matchesSearch && matchesCategory && matchesTag;
  });

  // 2. Identify Featured Post (First featured post, or the latest post if none marked featured)
  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];

  // 3. Grid Posts (excluding the featured post if it's shown in the hero)
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  // 4. Pagination
  const totalPages = Math.ceil(gridPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedGridPosts = gridPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedTag(null); // Reset tag filter on category change
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to grid top smoothly
      document.getElementById("articles-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full flex flex-col gap-32">
      
      {/* Category Filter and Search Section */}
      <section className="w-full max-w-[1100px] mx-auto px-24 flex flex-col md:flex-row justify-between items-center gap-16">
        {/* Categories Scroller */}
        <div className="flex flex-wrap gap-8 justify-center md:justify-start w-full md:w-auto" aria-label="Blog categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-14 py-6 rounded-full border text-12 font-sans font-500 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black border-black text-white"
                  : "bg-white border-black/8 text-black/60 hover:bg-black/5 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Client-side Search Input */}
        <div className="relative w-full md:w-[320px]">
          <Search className="absolute left-14 top-1/2 -translate-y-1/2 w-16 h-16 text-black/35" />
          <input
            type="text"
            placeholder="Search articles or tags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-40 pl-40 pr-16 bg-white border border-black/8 rounded-12 font-sans text-13 text-black placeholder-black/35 focus:border-black/30 focus:outline-none transition-all"
          />
        </div>
      </section>

      {/* Hero Featured Article */}
      {featuredPost && currentPage === 1 && (
        <section className="px-24 max-w-[1100px] mx-auto w-full">
          <article className="bg-white/60 border border-black/5 rounded-24 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 800:grid-cols-12 gap-0">
            
            {/* Cover image */}
            <div className="800:col-span-6 relative h-[240px] 600:h-[320px] 800:h-full min-h-[280px]">
              {featuredPost.coverImage ? (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center">
                  <Sparkles className="w-48 h-48 text-purple-400" />
                </div>
              )}
            </div>

            {/* Meta details */}
            <div className="800:col-span-6 p-32 1000:p-40 flex flex-col justify-center gap-16">
              <div className="flex items-center gap-12">
                <span className="text-10 font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50">
                  {featuredPost.category}
                </span>
                <span className="text-11 font-mono text-black/45 flex items-center gap-4">
                  <Clock className="w-12 h-12" />
                  {featuredPost.readingTime}
                </span>
              </div>
              
              <h2 className="font-serif font-700 text-22 800:text-28 text-black tracking-tight leading-tight">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-black/75 transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>
              
              <p className="text-14 leading-relaxed text-secondary font-sans font-350 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-black/5 pt-16 mt-8">
                <div className="flex flex-col">
                  <span className="text-11 font-mono text-black/40">Published on</span>
                  <span className="text-12 font-sans font-500 text-black/70">
                    {new Date(featuredPost.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="h-36 px-16 rounded-10 bg-black hover:bg-black/85 text-white font-sans font-500 text-12 flex items-center justify-center shadow-sm transition-all duration-200"
                >
                  Read Article
                </Link>
              </div>

            </div>

          </article>
        </section>
      )}

      {/* Articles Grid */}
      <section id="articles-grid" className="py-20 px-24 max-w-[1100px] mx-auto w-full">
        {filteredPosts.length === 0 ? (
          <div className="py-80 bg-white/40 border border-black/5 rounded-24 flex flex-col items-center justify-center text-center p-32">
            <AlertCircle className="w-32 h-32 text-black/35 mb-12 animate-pulse" />
            <h3 className="font-serif font-700 text-18 text-black">No articles found</h3>
            <p className="text-14 font-sans font-350 text-secondary mt-8 max-w-[340px]">
              We couldn’t find any posts matching your search query. Try switching filters or categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 600:grid-cols-2 1000:grid-cols-3 gap-24">
            {paginatedGridPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/60 border border-black/5 rounded-24 overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300"
              >
                {/* Card Cover Image */}
                <Link href={`/blog/${post.slug}`} className="block relative h-[180px] overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-50/50 flex items-center justify-center">
                      <Sparkles className="w-32 h-32 text-purple-300" />
                    </div>
                  )}
                </Link>

                {/* Card Content details */}
                <div className="p-24 flex flex-col flex-1 gap-12">
                  <div className="flex items-center gap-10">
                    <span className="text-9 font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50">
                      {post.category}
                    </span>
                    <span className="text-10 font-mono text-black/45 flex items-center gap-4">
                      <Clock className="w-10 h-10" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-600 text-15 800:text-17 text-black tracking-tight leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-black/70 transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-13 leading-relaxed text-secondary font-sans font-350 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto border-t border-black/5 pt-14 flex items-center justify-between">
                    <span className="text-11 font-sans text-black/40">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-12 font-sans font-500 text-black/75 hover:text-black flex items-center gap-4 transition-colors"
                    >
                      Read full &rarr;
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <section className="px-24 pb-40 max-w-[1100px] mx-auto w-full flex items-center justify-center gap-16">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-40 h-40 border border-black/8 rounded-12 flex items-center justify-center bg-white hover:bg-black/5 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-18 h-18 text-black" />
          </button>
          
          <span className="text-13 font-mono font-medium text-black/75">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-40 h-40 border border-black/8 rounded-12 flex items-center justify-center bg-white hover:bg-black/5 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-18 h-18 text-black" />
          </button>
        </section>
      )}

    </div>
  );
}
