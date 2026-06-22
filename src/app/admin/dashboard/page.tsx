"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  FileText, CheckCircle, Edit3, Trash2, Plus, 
  ExternalLink, Search, Flame, Eye, EyeOff, LayoutGrid, ListFilter, AlertCircle, Loader, Sparkles
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  published: boolean;
  featured: boolean;
  createdAt: any;
  views?: number;
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      const { mockPosts } = await import("@/lib/mockData");
      
      await Promise.all(
        mockPosts.map(async (post) => {
          const postData = {
            id: (post as any).id || `post-${Math.random().toString(36).substring(2, 11)}`,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            category: post.category,
            tags: post.tags,
            seoTitle: post.seoTitle || post.title,
            seoDescription: post.seoDescription || post.excerpt,
            featured: post.featured,
            published: post.published,
            readingTime: post.readingTime,
          };
          const res = await fetch("/api/admin/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
          });
          if (!res.ok) {
            const errJson = await res.json();
            throw new Error(errJson.error || "Failed to seed post");
          }
        })
      );
      
      alert("Database seeded successfully with default articles!");
      await fetchPosts();
    } catch (error: any) {
      console.error("Error seeding database:", error);
      alert("Failed to seed database: " + error.message);
    } finally {
      setSeeding(false);
    }
  };

  const categories = ["Students", "Parents", "Teachers", "Exam Preparation", "Adaptive Learning", "Study Tips", "AI Learning"];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const postsData = await res.json();
        setPosts(postsData);
      } else {
        console.error("Failed to fetch posts:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          published: !currentPublished
        })
      });
      if (res.ok) {
        setPosts(posts.map(p => p.id === id ? { ...p, published: !currentPublished } : p));
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to update status");
      }
    } catch (error: any) {
      console.error("Error toggling publish status:", error);
      alert("Failed to update status: " + error.message);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featured: !currentFeatured
        })
      });
      if (res.ok) {
        setPosts(posts.map(p => p.id === id ? { ...p, featured: !currentFeatured } : p));
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to update featured status");
      }
    } catch (error: any) {
      console.error("Error toggling featured status:", error);
      alert("Failed to update featured status: " + error.message);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete post");
      }
    } catch (error: any) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Stats Calculations
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    drafts: posts.filter(p => !p.published).length,
    featured: posts.filter(p => p.featured).length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0)
  };

  // Filtered posts logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || post.category === filterCategory;
    const matchesStatus = filterStatus === "All" || 
                          (filterStatus === "Published" && post.published) || 
                          (filterStatus === "Draft" && !post.published) || 
                          (filterStatus === "Featured" && post.featured);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout>
      
      {/* Header and Quick Action */}
      <div className="flex flex-col 600:flex-row justify-between items-start 600:items-center gap-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-serif font-700 text-28 text-black tracking-tight leading-tight">
            Dashboard Overview
          </h1>
          <p className="text-13 font-sans font-350 text-secondary">
            Manage your educational posts, view analytics, and publish updates instantly.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="h-44 bg-black hover:bg-black/90 text-white rounded-12 font-sans font-500 text-13 px-20 flex items-center gap-8 shadow-sm transition-all cursor-pointer active:scale-98"
        >
          <Plus className="w-16 h-16" />
          Create New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 800:grid-cols-4 gap-16">
        
        <div className="bg-white border border-black/5 rounded-20 p-24 shadow-[0_8px_30px_rgba(0,0,0,0.005)]">
          <span className="text-11 font-mono uppercase tracking-wider text-black/45 font-semibold">Total Articles</span>
          <span className="block text-32 font-serif font-700 text-black mt-8 leading-none">
            {loading ? "..." : stats.total}
          </span>
        </div>

        <div className="bg-white border border-black/5 rounded-20 p-24 shadow-[0_8px_30px_rgba(0,0,0,0.005)]">
          <span className="text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-emerald-600 bg-emerald-50 px-8 py-2 rounded-full border border-emerald-100/50 inline-block mb-4">Published</span>
          <span className="block text-32 font-serif font-700 text-black mt-8 leading-none">
            {loading ? "..." : stats.published}
          </span>
        </div>

        <div className="bg-white border border-black/5 rounded-20 p-24 shadow-[0_8px_30px_rgba(0,0,0,0.005)]">
          <span className="text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-amber-600 bg-amber-50 px-8 py-2 rounded-full border border-amber-100/50 inline-block mb-4">Drafts</span>
          <span className="block text-32 font-serif font-700 text-black mt-8 leading-none">
            {loading ? "..." : stats.drafts}
          </span>
        </div>

        <div className="bg-white border border-black/5 rounded-20 p-24 shadow-[0_8px_30px_rgba(0,0,0,0.005)]">
          <span className="text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50 inline-block mb-4">Featured</span>
          <span className="block text-32 font-serif font-700 text-black mt-8 leading-none">
            {loading ? "..." : stats.featured}
          </span>
        </div>

      </div>

      {/* Filter and Content panel */}
      <div className="bg-white border border-black/5 rounded-24 shadow-[0_12px_40px_rgba(0,0,0,0.015)] overflow-hidden">
        
        {/* Filters Header */}
        <div className="p-24 border-b border-black/5 flex flex-col 1000:flex-row justify-between items-stretch 1000:items-center gap-16 bg-white">
          <div className="relative flex-1">
            <Search className="absolute left-14 top-1/2 -translate-y-1/2 w-16 h-16 text-black/35" />
            <input
              type="text"
              placeholder="Search posts by title or summary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-44 pl-40 pr-16 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black placeholder-black/30 focus:bg-white focus:border-black/20 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-12 items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-8 bg-black/[0.02] border border-black/8 rounded-12 h-44 px-12">
              <LayoutGrid className="w-14 h-14 text-black/40" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent text-12 font-sans font-medium text-black/70 border-none outline-none cursor-pointer pr-16"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-8 bg-black/[0.02] border border-black/8 rounded-12 h-44 px-12">
              <ListFilter className="w-14 h-14 text-black/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-12 font-sans font-medium text-black/70 border-none outline-none cursor-pointer pr-16"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published Only</option>
                <option value="Draft">Drafts Only</option>
                <option value="Featured">Featured Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-60 text-center flex flex-col items-center justify-center gap-12">
              <div className="w-32 h-32 rounded-full border-2 border-black/5 border-t-black animate-spin" />
              <span className="text-13 text-secondary">Loading your articles database...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="p-60 text-center flex flex-col items-center justify-center gap-16">
              <Sparkles className="w-32 h-32 text-purple-600 animate-pulse" />
              <div className="flex flex-col gap-6 max-w-[400px]">
                <span className="text-16 font-serif font-700 text-black">Database is empty</span>
                <span className="text-13 text-secondary leading-relaxed">
                  Would you like to seed the HomiLearn database with the 8 default educational articles? This will set up sample posts for CBSE, ICSE, viva prep, and teacher saving time.
                </span>
              </div>
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="h-40 px-20 bg-purple-600 hover:bg-purple-750 text-white rounded-12 font-sans font-500 text-12 flex items-center gap-8 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {seeding ? (
                  <>
                    <Loader className="w-14 h-14 animate-spin" />
                    Seeding database...
                  </>
                ) : (
                  "Seed Default Articles"
                )}
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-60 text-center flex flex-col items-center justify-center gap-12">
              <AlertCircle className="w-28 h-28 text-black/35" />
              <div className="flex flex-col gap-4">
                <span className="text-15 font-serif font-600 text-black">No posts found</span>
                <span className="text-13 text-secondary max-w-[300px]">
                  Try refining your search terms or filters, or write a new educational article.
                </span>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse" aria-label="Recent blog posts list">
              <thead>
                <tr className="border-b border-black/5 bg-black/[0.01]">
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold">Title</th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold">Category</th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-center">Status</th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-center">Featured</th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-center">Views</th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-black/[0.005] transition-colors">
                    
                    {/* Title */}
                    <td className="p-16 max-w-[280px]">
                      <div className="flex flex-col gap-4">
                        <span className="font-serif font-600 text-14 text-black line-clamp-1">
                          {post.title}
                        </span>
                        <span className="text-11 font-mono text-black/35 font-light">
                          /{post.slug}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-16">
                      <span className="text-11 font-medium bg-black/[0.04] border border-black/5 px-8 py-4 rounded-8 text-black/70">
                        {post.category}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="p-16 text-center">
                      <button
                        onClick={() => handleTogglePublish(post.id, post.published)}
                        className={`inline-flex items-center gap-6 text-11 font-mono px-8 py-3 rounded-full border cursor-pointer transition-colors ${
                          post.published
                            ? "bg-emerald-50 border-emerald-200/50 text-emerald-700 hover:bg-rose-50 hover:border-rose-200/50 hover:text-rose-700"
                            : "bg-amber-50 border-amber-200/50 text-amber-700 hover:bg-emerald-50 hover:border-emerald-200/50 hover:text-emerald-700"
                        }`}
                        title={post.published ? "Click to Unpublish" : "Click to Publish"}
                      >
                        {post.published ? (
                          <>
                            <CheckCircle className="w-10 h-10" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-10 h-10" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="p-16 text-center">
                      <button
                        onClick={() => handleToggleFeatured(post.id, post.featured)}
                        className={`inline-flex items-center justify-center p-6 rounded-8 border cursor-pointer transition-colors ${
                          post.featured
                            ? "bg-purple-50 border-purple-100 text-purple-600 hover:bg-black/5 hover:border-black/8 hover:text-black/45"
                            : "bg-black/[0.02] border-black/5 text-black/30 hover:bg-purple-50 hover:border-purple-100 hover:text-purple-600"
                        }`}
                        title={post.featured ? "Remove from Featured" : "Make Featured"}
                      >
                        <Flame className="w-14 h-14 fill-current" />
                      </button>
                    </td>

                    {/* Views */}
                    <td className="p-16 text-center text-13 font-mono font-medium text-black/60">
                      {post.views || 0}
                    </td>

                    {/* Actions */}
                    <td className="p-16 text-right">
                      <div className="flex items-center justify-end gap-10">
                        {/* Preview */}
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="w-32 h-32 rounded-8 flex items-center justify-center border border-black/8 text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                          title="Preview Post"
                        >
                          <ExternalLink className="w-14 h-14" />
                        </Link>
                        
                        {/* Edit */}
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="w-32 h-32 rounded-8 flex items-center justify-center border border-black/8 text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                          title="Edit Post"
                        >
                          <Edit3 className="w-14 h-14" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletingId === post.id}
                          className="w-32 h-32 rounded-8 flex items-center justify-center border border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-14 h-14" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </AdminLayout>
  );
}
