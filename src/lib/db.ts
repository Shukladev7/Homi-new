import { queryD1 } from "./d1";

export interface SerializedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  published: boolean;
  readingTime: string;
  author: string; // "HomiLearn Team" or dynamically retrieved
  createdAt: string;
  publishedAt: string | null;
  views: number;
}

// Helper to convert DB post record to SerializedBlogPost
async function mapDbRecordToPost(record: any): Promise<SerializedBlogPost> {
  // Query tags for this post from relational post_tags table
  const tagsResult = await queryD1<{ name: string }>(
    "SELECT t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?",
    [record.id]
  );
  const tags = tagsResult.map(row => row.name);

  return {
    id: record.id,
    title: record.title || "",
    slug: record.slug || "",
    excerpt: record.excerpt || "",
    content: record.content || "",
    coverImage: record.cover_image || "",
    category: record.category || "Students",
    tags,
    seoTitle: record.seo_title || "",
    seoDescription: record.seo_description || "",
    featured: record.featured === 1,
    published: record.published === 1,
    readingTime: record.reading_time || "1 min read",
    author: "HomiLearn Team", // Maps to author_id lookup or default
    createdAt: record.created_at || new Date().toISOString(),
    publishedAt: record.published_at || null,
    views: record.views || 0,
  };
}

// Fetch all published posts
export async function getPublishedPosts(): Promise<SerializedBlogPost[]> {
  try {
    const records = await queryD1<any>(
      "SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC"
    );
    const posts: SerializedBlogPost[] = [];
    for (const record of records) {
      posts.push(await mapDbRecordToPost(record));
    }
    return posts;
  } catch (error) {
    console.error("Error fetching published posts from database:", error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<SerializedBlogPost | null> {
  try {
    const records = await queryD1<any>(
      "SELECT * FROM posts WHERE slug = ? AND published = 1 LIMIT 1",
      [slug]
    );
    if (records.length === 0) return null;
    return await mapDbRecordToPost(records[0]);
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    return null;
  }
}

// Fetch single post by ID (for admin/editing)
export async function getPostById(id: string): Promise<SerializedBlogPost | null> {
  try {
    const records = await queryD1<any>(
      "SELECT * FROM posts WHERE id = ? LIMIT 1",
      [id]
    );
    if (records.length === 0) return null;
    return await mapDbRecordToPost(records[0]);
  } catch (error) {
    console.error(`Error fetching post by id ${id}:`, error);
    return null;
  }
}

// Fetch all posts (for admin dashboard)
export async function getAllPostsForAdmin(): Promise<SerializedBlogPost[]> {
  try {
    const records = await queryD1<any>(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    const posts: SerializedBlogPost[] = [];
    for (const record of records) {
      posts.push(await mapDbRecordToPost(record));
    }
    return posts;
  } catch (error) {
    console.error("Error fetching admin posts from database:", error);
    return [];
  }
}

// Create a new post
export async function createPost(post: Omit<SerializedBlogPost, "author" | "views">): Promise<void> {
  const authorId = "admin";
  const createdAt = new Date().toISOString();
  
  // 1. Insert post record
  await queryD1(
    "INSERT INTO posts (id, title, slug, excerpt, content, cover_image, seo_title, seo_description, published, featured, reading_time, author_id, created_at, updated_at, published_at, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      post.id,
      post.title,
      post.slug,
      post.excerpt,
      post.content,
      post.coverImage,
      post.seoTitle,
      post.seoDescription,
      post.published ? 1 : 0,
      post.featured ? 1 : 0,
      post.readingTime,
      authorId,
      createdAt,
      createdAt,
      post.published ? createdAt : null,
      post.category
    ]
  );

  // 2. Manage tags relations
  await updatePostTagsRelation(post.id, post.tags);
}

// Update a post
export async function updatePost(id: string, post: Partial<SerializedBlogPost>): Promise<void> {
  const updatedAt = new Date().toISOString();
  const currentPost = await getPostById(id);
  if (!currentPost) throw new Error(`Post with id ${id} not found`);

  const updatedTitle = post.title !== undefined ? post.title : currentPost.title;
  const updatedSlug = post.slug !== undefined ? post.slug : currentPost.slug;
  const updatedExcerpt = post.excerpt !== undefined ? post.excerpt : currentPost.excerpt;
  const updatedContent = post.content !== undefined ? post.content : currentPost.content;
  const updatedCoverImage = post.coverImage !== undefined ? post.coverImage : currentPost.coverImage;
  const updatedCategory = post.category !== undefined ? post.category : currentPost.category;
  const updatedSeoTitle = post.seoTitle !== undefined ? post.seoTitle : currentPost.seoTitle;
  const updatedSeoDescription = post.seoDescription !== undefined ? post.seoDescription : currentPost.seoDescription;
  const updatedPublished = post.published !== undefined ? post.published : currentPost.published;
  const updatedFeatured = post.featured !== undefined ? post.featured : currentPost.featured;
  const updatedReadingTime = post.readingTime !== undefined ? post.readingTime : currentPost.readingTime;

  let publishedAt = currentPost.publishedAt;
  if (post.published !== undefined) {
    publishedAt = post.published ? (currentPost.publishedAt || new Date().toISOString()) : null;
  }

  // 1. Update post details
  await queryD1(
    "UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, seo_title = ?, seo_description = ?, published = ?, featured = ?, reading_time = ?, updated_at = ?, published_at = ?, category = ? WHERE id = ?",
    [
      updatedTitle,
      updatedSlug,
      updatedExcerpt,
      updatedContent,
      updatedCoverImage,
      updatedSeoTitle,
      updatedSeoDescription,
      updatedPublished ? 1 : 0,
      updatedFeatured ? 1 : 0,
      updatedReadingTime,
      updatedAt,
      publishedAt,
      updatedCategory,
      id
    ]
  );

  // 2. Manage tags relations if tags were supplied
  if (post.tags !== undefined) {
    await updatePostTagsRelation(id, post.tags);
  }
}

// Delete a post
export async function deletePost(id: string): Promise<void> {
  await queryD1("DELETE FROM posts WHERE id = ?", [id]);
  await queryD1("DELETE FROM post_tags WHERE post_id = ?", [id]);
}

// Record dynamic post view
export async function recordDbPostView(id: string): Promise<void> {
  try {
    await queryD1("UPDATE posts SET views = views + 1 WHERE id = ?", [id]);
  } catch (error) {
    console.error(`Error incrementing views for post ${id}:`, error);
  }
}

// Helper to update relational tag tables
async function updatePostTagsRelation(postId: string, tagNames: string[]): Promise<void> {
  // Clear existing tags
  await queryD1("DELETE FROM post_tags WHERE post_id = ?", [postId]);

  for (const name of tagNames) {
    const cleanTagName = name.trim().toLowerCase();
    if (!cleanTagName) continue;

    // Check if tag exists in lookup, if not insert it
    let tagId = "";
    const existingTags = await queryD1<any>(
      "SELECT * FROM tags WHERE name = ? LIMIT 1",
      [cleanTagName]
    );

    if (existingTags.length > 0) {
      tagId = existingTags[0].id;
    } else {
      tagId = `tag-${Math.random().toString(36).substring(2, 11)}`;
      const tagSlug = cleanTagName.replace(/[\s_]+/g, "-");
      await queryD1(
        "INSERT OR IGNORE INTO tags (id, name, slug) VALUES (?, ?, ?)",
        [tagId, cleanTagName, tagSlug]
      );
    }

    // Link tag to post
    await queryD1(
      "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
      [postId, tagId]
    );
  }
}
