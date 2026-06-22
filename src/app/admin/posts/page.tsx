"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  FileText, CheckCircle, Edit3, Trash2, Plus, 
  ExternalLink, Search, Flame, EyeOff, LayoutGrid, ListFilter, AlertCircle, ArrowUpDown
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

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState<"createdAt" | "views" | "title">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
    if (!window.confirm("Delete this blog post permanently? This action cannot be undone.")) {
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

  const handleSort = (field: "createdAt" | "views" | "title") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Filtered & Sorted Posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || post.category === filterCategory;
      const matchesStatus = filterStatus === "All" || 
                            (filterStatus === "Published" && post.published) || 
                            (filterStatus === "Draft" && !post.published) || 
                            (filterStatus === "Featured" && post.featured);
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "createdAt") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        comparison = dateA - dateB;
      } else if (sortField === "views") {
        comparison = (a.views || 0) - (b.views || 0);
      } else if (sortField === "title") {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-12">
        <h1 className="font-serif font-700 text-28 text-black tracking-tight leading-tight">
          All Blog Posts
        </h1>
        <p className="text-13 font-sans font-350 text-secondary">
          Browse, edit, search, and filter through HomiLearn’s complete blog publishing history.
        </p>
      </div>

      <div className="bg-white border border-black/5 rounded-24 shadow-[0_12px_40px_rgba(0,0,0,0.015)] overflow-hidden">
        
        {/* Filters Header */}
        <div className="p-24 border-b border-black/5 flex flex-col 1000:flex-row justify-between items-stretch 1000:items-center gap-16 bg-white">
          <div className="relative flex-1">
            <Search className="absolute left-14 top-1/2 -translate-y-1/2 w-16 h-16 text-black/35" />
            <input
              type="text"
              placeholder="Search posts..."
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
              <span className="text-13 text-secondary">Loading posts...</span>
            </div>
          ) : filteredAndSortedPosts.length === 0 ? (
            <div className="p-60 text-center flex flex-col items-center justify-center gap-12">
              <AlertCircle className="w-28 h-28 text-black/35" />
              <div className="flex flex-col gap-4">
                <span className="text-15 font-serif font-600 text-black">No posts match filters</span>
                <span className="text-13 text-secondary max-w-[300px]">
                  Try adjusting filters or write a new post.
                </span>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse" aria-label="Blog posts administration table">
              <thead>
                <tr className="border-b border-black/5 bg-black/[0.01]">
                  <th 
                    onClick={() => handleSort("title")} 
                    className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold cursor-pointer hover:bg-black/5"
                  >
                    <div className="flex items-center gap-6">
                      Title
                      <ArrowUpDown className="w-12 h-12" />
                    </div>
                  </th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold">Category</th>
                  <th 
                    onClick={() => handleSort("createdAt")}
                    className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold cursor-pointer hover:bg-black/5"
                  >
                    <div className="flex items-center gap-6">
                      Date Created
                      <ArrowUpDown className="w-12 h-12" />
                    </div>
                  </th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-center">Status</th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-center">Featured</th>
                  <th 
                    onClick={() => handleSort("views")}
                    className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-center cursor-pointer hover:bg-black/5"
                  >
                    <div className="flex items-center gap-6 justify-center">
                      Views
                      <ArrowUpDown className="w-12 h-12" />
                    </div>
                  </th>
                  <th className="p-16 text-11 font-mono uppercase tracking-wider text-black/45 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredAndSortedPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-black/[0.005] transition-colors">
                    
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

                    <td className="p-16">
                      <span className="text-11 font-medium bg-black/[0.04] border border-black/5 px-8 py-4 rounded-8 text-black/70">
                        {post.category}
                      </span>
                    </td>

                    <td className="p-16 text-13 text-black/60 font-medium">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      }) : "..."}
                    </td>

                    <td className="p-16 text-center">
                      <button
                        onClick={() => handleTogglePublish(post.id, post.published)}
                        className={`inline-flex items-center gap-6 text-11 font-mono px-8 py-3 rounded-full border cursor-pointer transition-colors ${
                          post.published
                            ? "bg-emerald-50 border-emerald-200/50 text-emerald-700 hover:bg-rose-50 hover:border-rose-200/50 hover:text-rose-700"
                            : "bg-amber-50 border-amber-200/50 text-amber-700 hover:bg-emerald-50 hover:border-emerald-200/50 hover:text-emerald-700"
                        }`}
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

                    <td className="p-16 text-center">
                      <button
                        onClick={() => handleToggleFeatured(post.id, post.featured)}
                        className={`inline-flex items-center justify-center p-6 rounded-8 border cursor-pointer transition-colors ${
                          post.featured
                            ? "bg-purple-50 border-purple-100 text-purple-600 hover:bg-black/5 hover:border-black/8 hover:text-black/45"
                            : "bg-black/[0.02] border-black/5 text-black/30 hover:bg-purple-50 hover:border-purple-100 hover:text-purple-600"
                        }`}
                      >
                        <Flame className="w-14 h-14 fill-current" />
                      </button>
                    </td>

                    <td className="p-16 text-center text-13 font-mono font-medium text-black/60">
                      {post.views || 0}
                    </td>

                    <td className="p-16 text-right">
                      <div className="flex items-center justify-end gap-10">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="w-32 h-32 rounded-8 flex items-center justify-center border border-black/8 text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                          title="Preview"
                        >
                          <ExternalLink className="w-14 h-14" />
                        </Link>
                        
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="w-32 h-32 rounded-8 flex items-center justify-center border border-black/8 text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-14 h-14" />
                        </Link>

                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletingId === post.id}
                          className="w-32 h-32 rounded-8 flex items-center justify-center border border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Delete"
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
