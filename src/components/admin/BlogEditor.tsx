"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, Eye, Settings, Image as ImageIcon, Link as LinkIcon, 
  List, Bold, Italic, Code, Quote, RefreshCw, CheckCircle, 
  HelpCircle, ArrowLeft, Loader, Trash2, Heading1, Heading2, Loader2
} from "lucide-react";
import Link from "next/link";

interface BlogEditorProps {
  postId?: string;
}

export default function BlogEditor({ postId }: BlogEditorProps) {
  const router = useRouter();
  
  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Students");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [author, setAuthor] = useState("HomiLearn Team");

  // Editor States
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "settings">("write");
  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isDirty, setIsDirty] = useState(false);
  const [readingTime, setReadingTime] = useState("1 min read");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const categories = ["Students", "Parents", "Teachers", "Exam Preparation", "Adaptive Learning", "Study Tips", "AI Learning"];

  // 1. Fetch Post Data if Editing
  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setExcerpt(data.excerpt || "");
          setContent(data.content || "");
          setCoverImage(data.coverImage || "");
          setCategory(data.category || "Students");
          setTags(data.tags || []);
          setSeoTitle(data.seoTitle || "");
          setSeoDescription(data.seoDescription || "");
          setFeatured(!!data.featured);
          setPublished(!!data.published);
          setAuthor(data.author || "HomiLearn Team");
        } else {
          alert("Blog post not found.");
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, router]);

  // 2. Generate slug automatically from title (if not already dirty or overridden)
  useEffect(() => {
    if (postId) return; // Don't auto-generate for existing posts
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_]+/g, "-") // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, ""); // Remove trailing hyphens
    setSlug(generated);
  }, [title, postId]);

  // 3. Calculate Reading Time
  useEffect(() => {
    const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    setReadingTime(`${minutes} min read`);
  }, [content]);

  // 4. Auto Save Draft locally and periodically to cloud
  useEffect(() => {
    if (!isDirty || saving) return;
    const timer = setTimeout(() => {
      handleAutoSave();
    }, 15000); // Auto save to Cloud D1 every 15 seconds if dirty
    return () => clearTimeout(timer);
  }, [title, slug, excerpt, content, category, tags, seoTitle, seoDescription, featured, published, isDirty, saving]);

  const handleAutoSave = async () => {
    if (!title || !postId) return; // Only auto-save existing posts to cloud
    setSaveStatus("saving");
    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags,
        seoTitle,
        seoDescription,
        featured,
        published,
        author,
        readingTime,
      };

      await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      setSaveStatus("saved");
      setIsDirty(false);
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Auto-save error:", error);
      setSaveStatus("error");
    }
  };

  // 5. Image Compression & Upload to R2
  const compressAndUploadImage = async (file: File) => {
    setUploading(true);
    setUploadProgress(10);

    try {
      // Client-side image compression using HTML5 Canvas
      const compressedBlob = await new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Scale to 1200px max width
            const MAX_WIDTH = 1200;
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Canvas compression failed"));
              },
              "image/jpeg",
              0.82 // 82% quality compression
            );
          };
        };
        reader.onerror = (err) => reject(err);
      });

      setUploadProgress(50);

      // Upload to Cloudflare R2 using Server API
      const formData = new FormData();
      formData.append("file", compressedBlob, file.name);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "R2 upload failed");
      }

      const data = await response.json();
      setUploadProgress(100);
      setCoverImage(data.url);
      setIsDirty(true);
    } catch (err: any) {
      console.error("R2 Upload error:", err);
      alert(err.message || "Image upload failed. Check R2 credentials in environment.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      compressAndUploadImage(e.target.files[0]);
    }
  };

  // 6. Markdown Toolbar Helpers
  const insertMarkdown = (syntax: string, placeholder = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || placeholder;

    let replacement = "";
    if (syntax === "bold") replacement = `**${selected}**`;
    else if (syntax === "italic") replacement = `*${selected}*`;
    else if (syntax === "h1") replacement = `# ${selected}`;
    else if (syntax === "h2") replacement = `## ${selected}`;
    else if (syntax === "link") replacement = `[${selected}](url)`;
    else if (syntax === "image") replacement = `![${selected}](img-url)`;
    else if (syntax === "quote") replacement = `> ${selected}`;
    else if (syntax === "list") replacement = `\n- ${selected}`;
    else if (syntax === "code") replacement = `\`\`\`\n${selected}\n\`\`\``;

    setContent(text.substring(0, start) + replacement + text.substring(end));
    setIsDirty(true);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 10);
  };

  // 7. Tags Handlers
  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const cleanTag = tagInput.trim().toLowerCase();
      if (!tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
        setIsDirty(true);
      }
      setTagInput("");
    }
  };

  const handleTagRemove = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
    setIsDirty(true);
  };

  // 8. Custom Markdown Parser for HomiLearn
  const parseMarkdown = (md: string): string => {
    if (!md) return "";
    let html = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h4 class="font-serif font-700 text-16 text-black mt-16">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="font-serif font-700 text-20 text-black mt-24 mb-12">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="font-serif font-700 text-24 text-black mt-28 mb-16">$1</h2>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-purple-500 pl-16 py-8 italic text-black/70 my-16 bg-black/[0.02] rounded-r-8">$1</blockquote>');

    // Bold / Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-purple-600 hover:underline font-medium">$1</a>');

    // Images
    html = html.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-16 max-h-[380px] w-full object-cover my-24 border border-black/5" />');

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

  // 9. Form Submission to D1 API
  const handleSavePost = async () => {
    if (!title.trim() || !slug.trim()) {
      alert("Please fill in the title and slug fields.");
      return;
    }

    setSaving(true);
    try {
      const postData = {
        id: postId || `post-${Math.random().toString(36).substring(2, 11)}`,
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
        featured,
        published,
        author,
        readingTime,
      };

      const url = postId ? `/api/admin/posts/${postId}` : "/api/admin/posts";
      const method = postId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save post");
      }

      alert(postId ? "Blog post updated successfully!" : "New blog post created successfully!");
      setIsDirty(false);
      router.push("/admin/posts");
    } catch (err: any) {
      console.error("Save error:", err);
      alert("Failed to save post: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-60 text-center flex flex-col items-center justify-center gap-12 bg-white rounded-24 border border-black/5">
        <div className="w-32 h-32 rounded-full border-2 border-black/5 border-t-black animate-spin" />
        <span className="text-13 text-secondary">Loading post draft workspace...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-24">
      {/* Editor Header Banner */}
      <div className="flex flex-col 600:flex-row justify-between items-start 600:items-center gap-16">
        <div className="flex items-center gap-14">
          <Link href="/admin/posts" className="w-40 h-40 border border-black/8 rounded-12 flex items-center justify-center hover:bg-black/5 transition-colors">
            <ArrowLeft className="w-18 h-18 text-black" />
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-serif font-700 text-24 text-black tracking-tight leading-tight">
              {postId ? "Edit Article" : "Write New Article"}
            </h1>
            <div className="flex items-center gap-8 text-11 text-secondary font-mono">
              <span>{readingTime}</span>
              <span>•</span>
              <span className="flex items-center gap-4">
                {saveStatus === "saving" && <RefreshCw className="w-10 h-10 animate-spin" />}
                {saveStatus === "saved" && <CheckCircle className="w-10 h-10 text-emerald-600" />}
                {saveStatus === "saving" ? "Auto-saving..." : saveStatus === "saved" ? "Saved to cloud" : "Workspace active"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Submit Action */}
          <button
            onClick={handleSavePost}
            disabled={saving}
            className="h-44 bg-black hover:bg-black/90 text-white rounded-12 font-sans font-500 text-13 px-20 flex items-center gap-8 shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-16 h-16 animate-spin" />
            ) : (
              <Save className="w-16 h-16" />
            )}
            {postId ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      {/* Editor Tabs Navigation */}
      <div className="flex border-b border-black/5 pb-2">
        <button
          onClick={() => setActiveTab("write")}
          className={`h-40 px-20 text-13 font-medium border-b-2 transition-all flex items-center gap-8 cursor-pointer ${
            activeTab === "write"
              ? "border-black text-black"
              : "border-transparent text-secondary hover:text-black"
          }`}
        >
          <Bold className="w-14 h-14" />
          Write Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`h-40 px-20 text-13 font-medium border-b-2 transition-all flex items-center gap-8 cursor-pointer ${
            activeTab === "preview"
              ? "border-black text-black"
              : "border-transparent text-secondary hover:text-black"
          }`}
        >
          <Eye className="w-14 h-14" />
          Live Preview
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`h-40 px-20 text-13 font-medium border-b-2 transition-all flex items-center gap-8 cursor-pointer ${
            activeTab === "settings"
              ? "border-black text-black"
              : "border-transparent text-secondary hover:text-black"
          }`}
        >
          <Settings className="w-14 h-14" />
          SEO & Settings
        </button>
      </div>

      {/* Main Workspace split panel */}
      <div className="grid grid-cols-1 1000:grid-cols-12 gap-24 items-start">
        
        {/* Left main editor canvas */}
        <div className="1000:col-span-8 flex flex-col gap-24">
          
          {activeTab === "write" && (
            <div className="bg-white border border-black/5 rounded-24 shadow-sm p-24 flex flex-col gap-20">
              
              {/* Title Input */}
              <div className="flex flex-col gap-8">
                <input
                  type="text"
                  placeholder="Enter a compelling article title..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full text-24 font-serif font-700 text-black border-none outline-none placeholder-black/25"
                />
              </div>

              {/* Slug Input */}
              <div className="flex items-center gap-8 border-b border-black/5 pb-16">
                <span className="text-11 font-mono uppercase tracking-wider text-black/35 font-bold">Slug URL:</span>
                <span className="text-12 font-mono text-black/45">/blog/</span>
                <input
                  type="text"
                  placeholder="post-slug-url"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setIsDirty(true);
                  }}
                  className="flex-1 font-mono text-12 text-purple-600 border-none outline-none bg-transparent"
                />
              </div>

              {/* Markdown Toolbar */}
              <div className="flex flex-wrap gap-8 p-6 bg-black/[0.02] border border-black/5 rounded-12">
                <button type="button" onClick={() => insertMarkdown("bold", "bold text")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Bold"><Bold className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("italic", "italic text")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Italic"><Italic className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("h1", "Heading 1")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Heading 1"><Heading1 className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("h2", "Heading 2")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Heading 2"><Heading2 className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("quote", "blockquote")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Quote"><Quote className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("list", "list item")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Unordered List"><List className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("code", "code block")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Code Block"><Code className="w-14 h-14" /></button>
                <button type="button" onClick={() => insertMarkdown("link", "Link text")} className="w-32 h-32 rounded-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer" title="Link"><LinkIcon className="w-14 h-14" /></button>
              </div>

              {/* Content Textarea */}
              <div className="flex flex-col">
                <textarea
                  ref={textareaRef}
                  placeholder="Start writing in markdown (Press Enter twice for paragraph spacing)..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full min-h-[480px] font-sans text-15 leading-[1.8] text-black/85 outline-none border-none resize-y placeholder-black/25 focus:ring-0"
                />
              </div>

            </div>
          )}

          {activeTab === "preview" && (
            <div className="bg-white border border-black/5 rounded-24 shadow-sm p-32 flex flex-col gap-24 max-h-[800px] overflow-y-auto">
              {coverImage && (
                <img 
                  src={coverImage} 
                  alt={title || "Cover Preview"} 
                  className="w-full h-[320px] object-cover rounded-16 border border-black/5 shadow-sm"
                />
              )}
              <div className="flex items-center gap-12">
                <span className="text-10 font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50">
                  {category}
                </span>
                <span className="text-11 font-mono text-black/40">{readingTime}</span>
                <span className="text-11 font-mono text-black/40">By {author}</span>
              </div>
              <h1 className="font-serif font-700 text-28 800:text-36 text-black tracking-tight leading-tight">
                {title || "Untitled Article"}
              </h1>
              <p className="text-16 italic text-secondary leading-relaxed font-sans font-350 pl-16 border-l-2 border-black/10">
                {excerpt || "Provide an excerpt in the settings tab to summarize the article..."}
              </p>
              
              {/* Custom HTML renderer */}
              <div 
                className="blog-content-body prose max-w-none flex flex-col gap-12"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white border border-black/5 rounded-24 shadow-sm p-32 flex flex-col gap-24">
              
              <h2 className="font-serif font-700 text-18 text-black border-b border-black/5 pb-12">
                SEO Configurations
              </h2>

              <div className="flex flex-col gap-8">
                <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                  Meta/SEO Title
                </label>
                <input
                  type="text"
                  placeholder="Defaults to post title if blank..."
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full h-44 px-16 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black focus:bg-white focus:border-purple-600 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-8">
                <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                  Meta/SEO Description
                </label>
                <textarea
                  placeholder="Defaults to article summary if blank..."
                  value={seoDescription}
                  onChange={(e) => {
                    setSeoDescription(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full h-80 px-16 py-12 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black resize-none focus:bg-white focus:border-purple-600 focus:outline-none transition-all"
                />
              </div>

              <h2 className="font-serif font-700 text-18 text-black border-b border-black/5 pb-12 mt-12">
                General Meta Parameters
              </h2>

              <div className="flex flex-col gap-8">
                <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full h-44 px-16 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black focus:bg-white focus:border-purple-600 focus:outline-none transition-all"
                />
              </div>

            </div>
          )}

        </div>

        {/* Right side settings column */}
        <div className="1000:col-span-4 flex flex-col gap-24">
          
          {/* Post settings panel */}
          <div className="bg-white border border-black/5 rounded-24 shadow-sm p-24 flex flex-col gap-20">
            <h3 className="font-serif font-700 text-16 text-black border-b border-black/5 pb-12">
              Post Settings
            </h3>

            {/* Category Select */}
            <div className="flex flex-col gap-8">
              <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full h-44 px-12 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black/75 cursor-pointer outline-none focus:bg-white focus:border-purple-600"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Excerpt Textarea */}
            <div className="flex flex-col gap-8">
              <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                Excerpt (Summary)
              </label>
              <textarea
                placeholder="Write a brief excerpt to hook readers on list views..."
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full h-100 px-16 py-12 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black resize-none focus:bg-white focus:border-purple-600 focus:outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Tags list */}
            <div className="flex flex-col gap-8">
              <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                Tags (Press Enter)
              </label>
              <input
                type="text"
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                className="w-full h-44 px-16 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-13 text-black focus:bg-white focus:border-purple-600 focus:outline-none transition-all"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-8 mt-8">
                  {tags.map((tag, idx) => (
                    <span 
                      key={tag} 
                      className="px-10 py-4 bg-black/[0.04] border border-black/5 text-11 rounded-8 text-black/75 flex items-center gap-6"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleTagRemove(idx)} 
                        className="text-rose-600 font-bold hover:text-rose-900 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cover Image Upload */}
            <div className="flex flex-col gap-8">
              <label className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                Cover Image
              </label>
              
              {coverImage ? (
                <div className="relative rounded-12 border border-black/8 overflow-hidden group">
                  <img src={coverImage} alt="Cover" className="w-full h-[140px] object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-12">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-32 px-12 rounded-8 bg-white text-11 font-medium text-black flex items-center gap-6 hover:bg-black/5 transition-all cursor-pointer"
                    >
                      Change
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setCoverImage("");
                        setIsDirty(true);
                      }}
                      className="w-32 h-32 rounded-8 bg-white text-rose-600 hover:text-rose-950 hover:bg-rose-50 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Trash2 className="w-14 h-14" />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-[120px] rounded-12 border-2 border-dashed border-black/15 bg-black/[0.01] hover:bg-black/[0.03] transition-all flex flex-col items-center justify-center gap-8 cursor-pointer text-center px-16"
                >
                  {uploading ? (
                    <div className="flex flex-col items-center gap-6">
                      <Loader className="w-20 h-20 animate-spin text-purple-600" />
                      <span className="text-12 font-medium text-black">{uploadProgress}% Uploading</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-24 h-24 text-black/30" />
                      <div className="flex flex-col gap-2">
                        <span className="text-12 font-medium text-black">Upload Cover Image</span>
                        <span className="text-10 text-secondary">Click to browse (Autocompressed)</span>
                      </div>
                    </>
                  )}
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-14 border-t border-black/5 pt-16">
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-13 font-medium text-black">Publish Post</span>
                  <span className="text-11 text-secondary">Make it visible on the public listing.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPublished(!published);
                    setIsDirty(true);
                  }}
                  className={`w-44 h-24 rounded-full p-2 transition-colors cursor-pointer relative ${
                    published ? "bg-purple-600" : "bg-black/15"
                  }`}
                >
                  <div className={`w-20 h-20 bg-white rounded-full transition-all shadow-sm ${
                    published ? "translate-x-20" : "translate-x-0"
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-13 font-medium text-black">Featured Post</span>
                  <span className="text-11 text-secondary">Display in hero showcase on blog main.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFeatured(!featured);
                    setIsDirty(true);
                  }}
                  className={`w-44 h-24 rounded-full p-2 transition-colors cursor-pointer relative ${
                    featured ? "bg-purple-600" : "bg-black/15"
                  }`}
                >
                  <div className={`w-20 h-20 bg-white rounded-full transition-all shadow-sm ${
                    featured ? "translate-x-20" : "translate-x-0"
                  }`} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
