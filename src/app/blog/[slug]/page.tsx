import type { Metadata } from "next";
import LandingLayout from "@/components/landing/LandingLayout";
import Link from "next/link";
import { getPostBySlug, getPublishedPosts } from "@/lib/db";
import { Clock, Calendar, ArrowLeft, ChevronLeft, ChevronRight, User } from "lucide-react";
import TrackPostView from "@/components/sections/TrackPostView";
import ShareButtons from "@/components/sections/ShareButtons";

// Revalidate page data every 60 seconds
export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically from Firestore
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title: `${title} | HomiLearn Blog`,
    description,
    alternates: {
      canonical: `https://www.homilearn.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.homilearn.com/blog/${post.slug}`,
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author],
      tags: [post.category, ...post.tags],
      images: [
        {
          url: post.coverImage || "/og-image.png",
          alt: title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage || "/og-image.png"],
    },
  };
}

// Generate static params for all published slugs at build time
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Helper to slugify heading text for anchors
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Markdown parser with anchor IDs support for Table of Contents
const renderMarkdown = (md: string) => {
  if (!md) return "";
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  // Headers with automatic anchor IDs
  html = html.replace(/^### (.*$)/gim, (match, p1) => {
    const id = slugify(p1);
    return `<h4 id="${id}" class="font-serif font-700 text-16 text-black mt-20 scroll-mt-80">${p1}</h4>`;
  });
  html = html.replace(/^## (.*$)/gim, (match, p1) => {
    const id = slugify(p1);
    return `<h3 id="${id}" class="font-serif font-700 text-20 text-black mt-28 mb-12 scroll-mt-80">${p1}</h3>`;
  });
  html = html.replace(/^# (.*$)/gim, (match, p1) => {
    const id = slugify(p1);
    return `<h2 id="${id}" class="font-serif font-700 text-24 text-black mt-32 mb-16 scroll-mt-80">${p1}</h2>`;
  });

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-purple-500 pl-16 py-8 italic text-black/70 my-16 bg-black/[0.02] rounded-r-8">$1</blockquote>');

  // Bold / Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-purple-600 hover:underline font-medium">$1</a>');

  // Images
  html = html.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-16 max-h-[420px] w-full object-cover my-24 border border-black/5" />');

  // Code Blocks
  html = html.replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre class="bg-black/[0.03] border border-black/5 rounded-12 p-16 font-mono text-12 text-black/80 overflow-x-auto my-16">$1</pre>');
  html = html.replace(/\`(.*?)\`/g, '<code class="bg-black/[0.03] border border-black/5 rounded-6 px-6 py-2 font-mono text-12 text-black/80">$1</code>');

  // Lists
  html = html.replace(/^\s*\-\s+(.*$)/gim, '<li class="ml-20 list-disc font-sans text-15 leading-relaxed text-black/80 my-4">$1</li>');
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-20 list-decimal font-sans text-15 leading-relaxed text-black/80 my-4">$1</li>');

  // Paragraphs
  const lines = html.split(/\n\n+/);
  const formatted = lines.map(line => {
    if (line.trim().startsWith('<h') || line.trim().startsWith('<block') || line.trim().startsWith('<pre') || line.trim().startsWith('<li')) {
      return line;
    }
    return `<p class="font-sans text-15 800:text-16 leading-[1.8] text-black/85 font-350 my-12">${line.replace(/\n/g, '<br />')}</p>`;
  });

  return formatted.join("\n");
};

// Extracts headers from Markdown body to populate Table of Contents
const extractHeadings = (md: string) => {
  if (!md) return [];
  const headingRegex = /^(##|###) (.*$)/gim;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(md)) !== null) {
    const depth = match[1] === "##" ? 2 : 3;
    const text = match[2];
    headings.push({
      depth,
      text,
      id: slugify(text)
    });
  }
  return headings;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <LandingLayout>
        <section className="py-90 px-24 text-center">
          <h1 className="font-serif font-700 text-32 text-black">Article Not Found</h1>
          <p className="mt-16 text-secondary">
            The article you&apos;re looking for doesn&apos;t exist or is not published yet.
          </p>
          <Link href="/blog" className="mt-24 inline-block text-black underline">
            Back to Blog
          </Link>
        </section>
      </LandingLayout>
    );
  }

  // Fetch adjacent posts and related posts
  const allPosts = await getPublishedPosts();
  
  // Previous & Next posts logic
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Related posts (same category, max 3, excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  const headings = extractHeadings(post.content);

  // Structured schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || "https://www.homilearn.com/og-image.png",
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.publishedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "HomiLearn",
      logo: {
        "@type": "ImageObject",
        url: "https://www.homilearn.com/logo1.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.homilearn.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.homilearn.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.homilearn.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.homilearn.com/blog/${post.slug}`,
      },
    ],
  };

  const shareText = encodeURIComponent(`Check out this article on HomiLearn: ${post.title}`);
  const shareUrl = encodeURIComponent(`https://www.homilearn.com/blog/${post.slug}`);

  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <TrackPostView postId={post.id} postSlug={post.slug} postTitle={post.title} />

      <article className="pt-40 800:pt-60 pb-80 px-24 800:px-40">
        <div className="max-w-[1100px] mx-auto">
          
          {/* Back Navigation */}
          <div className="mb-24 flex justify-start">
            <Link
              href="/blog"
              className="text-13 font-sans font-500 text-black/70 hover:text-black transition-colors inline-flex items-center gap-6"
            >
              <ArrowLeft className="w-14 h-14" />
              Back to Blog
            </Link>
          </div>

          {/* Banner Cover Image */}
          {post.coverImage && (
            <div className="w-full h-[240px] 600:h-[380px] 800:h-[460px] rounded-24 overflow-hidden border border-black/5 shadow-sm mb-32">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header block */}
          <header className="max-w-[760px] mx-auto mb-40 flex flex-col gap-16 items-start">
            <div className="flex flex-wrap items-center gap-12 text-11 font-mono text-black/45">
              <span className="text-10 font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50 font-semibold">
                {post.category}
              </span>
              <span className="flex items-center gap-4">
                <Clock className="w-12 h-12" />
                {post.readingTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-4">
                <Calendar className="w-12 h-12" />
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-4">
                <User className="w-12 h-12" />
                By {post.author}
              </span>
            </div>

            <h1 className="font-serif font-700 text-28 600:text-36 800:text-44 tracking-tight text-black leading-tight">
              {post.title}
            </h1>
            
            <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 border-l-2 border-black/10 pl-16 py-2">
              {post.excerpt}
            </p>
          </header>

          {/* Split Content Column Grid */}
          <div className="grid grid-cols-1 1000:grid-cols-12 gap-40 items-start mt-20">
            
            {/* Sidebar Columns (TOC and Social Shares) */}
            <aside className="1000:col-span-3 sticky top-[100px] flex flex-col gap-24 order-2 1000:order-1">
              
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="hidden 1000:flex flex-col gap-12 bg-white/40 border border-black/5 rounded-20 p-20">
                  <h3 className="font-mono text-10 uppercase tracking-wider text-black/50 font-semibold">
                    Table of Contents
                  </h3>
                  <nav aria-label="Table of contents">
                    <ul className="flex flex-col gap-8">
                      {headings.map((h) => (
                        <li 
                          key={h.id} 
                          style={{ paddingLeft: `${(h.depth - 2) * 12}px` }}
                        >
                          <a
                            href={`#${h.id}`}
                            className="text-12 font-sans font-medium text-black/60 hover:text-black transition-colors block leading-tight py-2"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Social Shares */}
              <ShareButtons shareUrl={shareUrl} shareText={shareText} />

            </aside>

            {/* Main Content Column */}
            <div className="1000:col-span-9 order-1 1000:order-2 flex flex-col gap-32">
              <div 
                className="blog-content-body flex flex-col gap-12 prose max-w-[700px] border-b border-black/5 pb-40"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />

              {/* Tags Section */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-8 items-center py-8">
                  <span className="text-11 font-mono text-black/45">Tags:</span>
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-10 py-4 bg-black/[0.03] border border-black/5 text-11 rounded-8 text-black/60 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Next/Prev Navigation */}
              <div className="flex flex-col 600:flex-row justify-between items-stretch gap-16 pt-24 border-t border-black/5">
                {prevPost ? (
                  <Link 
                    href={`/blog/${prevPost.slug}`}
                    className="flex-1 bg-white/40 border border-black/5 rounded-20 p-20 flex flex-col gap-8 hover:bg-white/80 hover:shadow-sm transition-all text-left"
                  >
                    <span className="text-10 font-mono uppercase tracking-wider text-black/35 flex items-center gap-4">
                      <ChevronLeft className="w-10 h-10" />
                      Previous Article
                    </span>
                    <span className="font-serif font-600 text-13 text-black leading-tight line-clamp-1">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {nextPost ? (
                  <Link 
                    href={`/blog/${nextPost.slug}`}
                    className="flex-1 bg-white/40 border border-black/5 rounded-20 p-20 flex flex-col gap-8 hover:bg-white/80 hover:shadow-sm transition-all text-right items-end"
                  >
                    <span className="text-10 font-mono uppercase tracking-wider text-black/35 flex items-center gap-4">
                      Next Article
                      <ChevronRight className="w-10 h-10" />
                    </span>
                    <span className="font-serif font-600 text-13 text-black leading-tight line-clamp-1">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

            </div>

          </div>

          {/* Related Articles Showcase */}
          {relatedPosts.length > 0 && (
            <section className="mt-60 pt-48 border-t border-black/5 flex flex-col gap-24">
              <h2 className="font-serif font-700 text-20 text-black">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                {relatedPosts.map(rel => (
                  <article key={rel.id} className="bg-white/40 border border-black/5 rounded-20 p-20 flex flex-col gap-10 hover:bg-white/70 hover:shadow-sm transition-all duration-300">
                    <span className="text-9 font-mono text-purple-600 font-medium uppercase">{rel.category}</span>
                    <h4 className="font-serif font-600 text-14 text-black leading-snug">
                      <Link href={`/blog/${rel.slug}`} className="hover:underline">{rel.title}</Link>
                    </h4>
                    <p className="text-12 text-secondary font-sans font-350 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                    <Link href={`/blog/${rel.slug}`} className="mt-auto text-11 font-sans font-500 text-black/75 hover:text-black flex items-center gap-4">
                      Read &rarr;
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* HomiLearn Free Trial callout */}
          <div className="mt-60 bg-gradient-to-tr from-purple-50 via-indigo-50 to-blue-50 border border-purple-100 rounded-24 p-32 text-center flex flex-col items-center gap-16">
            <span className="text-11 font-mono uppercase tracking-wider text-purple-600 font-semibold bg-purple-100/50 px-8 py-3 rounded-full">
              Adaptive AI Tutoring
            </span>
            <h3 className="font-serif font-700 text-20 800:text-24 text-black max-w-[400px] leading-tight">
              Ready to fix your child&apos;s learning gaps?
            </h3>
            <p className="text-14 font-sans font-350 text-secondary max-w-[480px]">
              Try HomiLearn Plus to get customized study maps, doubt resolution, viva practice, and real-time parent tracking dashboard.
            </p>
            <Link
              href="/#cta"
              className="h-44 bg-black hover:bg-black/90 text-white rounded-12 font-sans font-500 text-13 px-24 flex items-center justify-center shadow-md transition-all active:scale-98"
            >
              Start Free Trial Now
            </Link>
          </div>

        </div>
      </article>
    </LandingLayout>
  );
}
