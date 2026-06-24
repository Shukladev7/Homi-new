import fs from "fs";
import path from "path";

// DB Types
export interface D1Result<T = any> {
  results: T[];
  success: boolean;
  error?: string;
}

// Environment config
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
const API_TOKEN = process.env.CLOUDFLARE_D1_TOKEN;

// Local fallback DB JSON path
const LOCAL_DB_PATH = path.join(
  "/Users/gauravshukla/.gemini/antigravity/scratch/Homi",
  "scratch",
  "db.json"
);

// Helper to ensure local database JSON structure exists
function ensureLocalDb() {
  const dir = path.dirname(LOCAL_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(
      LOCAL_DB_PATH,
      JSON.stringify(
        {
          users: [],
          posts: [],
          categories: [
            { id: "cat1", name: "Students", slug: "students" },
            { id: "cat2", name: "Parents", slug: "parents" },
            { id: "cat3", name: "Teachers", slug: "teachers" },
            { id: "cat4", name: "Exam Preparation", slug: "exam-preparation" },
            { id: "cat5", name: "Adaptive Learning", slug: "adaptive-learning" },
            { id: "cat6", name: "Study Tips", slug: "study-tips" },
            { id: "cat7", name: "AI Learning", slug: "ai-learning" },
          ],
          tags: [],
          post_tags: [],
        },
        null,
        2
      )
    );
  }
}

// Cloudflare D1 REST API Client
async function executeCloudflareD1(sql: string, params: any[] = []): Promise<any[]> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sql,
      params,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudflare D1 REST API error: ${response.status} - ${errorText}`);
  }

  const json = await response.json() as any;
  if (!json.success) {
    throw new Error(`D1 Query failed: ${JSON.stringify(json.errors)}`);
  }

  // Cloudflare D1 query API returns results in result array (one per statement)
  return json.result[0]?.results || [];
}

// Local mock database engine (evaluates basic SQL statements on JSON file)
function executeLocalD1(sql: string, params: any[] = []): any[] {
  ensureLocalDb();
  const dbData = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
  const normalizedSql = sql.trim().replace(/\s+/g, " ");

  // 1. SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC
  if (normalizedSql.startsWith("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC")) {
    return dbData.posts
      .filter((p: any) => p.published === 1)
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // 2. SELECT * FROM posts ORDER BY created_at DESC
  if (normalizedSql.startsWith("SELECT * FROM posts ORDER BY created_at DESC")) {
    return dbData.posts
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // 3. SELECT * FROM posts WHERE slug = ? AND published = 1 LIMIT 1
  if (normalizedSql.startsWith("SELECT * FROM posts WHERE slug = ? AND published = 1 LIMIT 1")) {
    const slug = params[0];
    const post = dbData.posts.find((p: any) => p.slug === slug && p.published === 1);
    return post ? [post] : [];
  }

  // 4. SELECT * FROM posts WHERE id = ? LIMIT 1
  if (normalizedSql.startsWith("SELECT * FROM posts WHERE id = ? LIMIT 1")) {
    const id = params[0];
    const post = dbData.posts.find((p: any) => p.id === id);
    return post ? [post] : [];
  }

  // 5. SELECT * FROM categories
  if (normalizedSql.startsWith("SELECT * FROM categories")) {
    return dbData.categories;
  }

  // 6. SELECT * FROM tags
  if (normalizedSql.startsWith("SELECT * FROM tags")) {
    return dbData.tags;
  }

  // 7. SELECT t.* FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?
  if (normalizedSql.includes("FROM tags t JOIN post_tags pt")) {
    const postId = params[0];
    const tagIds = dbData.post_tags
      .filter((pt: any) => pt.post_id === postId)
      .map((pt: any) => pt.tag_id);
    return dbData.tags.filter((t: any) => tagIds.includes(t.id));
  }

  // 8. INSERT INTO posts
  if (normalizedSql.startsWith("INSERT INTO posts")) {
    const post = {
      id: params[0],
      title: params[1],
      slug: params[2],
      excerpt: params[3],
      content: params[4],
      cover_image: params[5],
      seo_title: params[6],
      seo_description: params[7],
      published: params[8],
      featured: params[9],
      reading_time: params[10],
      author_id: params[11],
      views: 0,
      created_at: params[12],
      updated_at: params[13],
      published_at: params[14],
      category: params[15],
    };
    // Ensure slug uniqueness locally
    dbData.posts = dbData.posts.filter((p: any) => p.id !== post.id && p.slug !== post.slug);
    dbData.posts.push(post);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    return [];
  }

  // 9. UPDATE posts
  if (normalizedSql.startsWith("UPDATE posts SET title = ?")) {
    const id = params[13];
    const postIdx = dbData.posts.findIndex((p: any) => p.id === id);
    if (postIdx !== -1) {
      dbData.posts[postIdx] = {
        ...dbData.posts[postIdx],
        title: params[0],
        slug: params[1],
        excerpt: params[2],
        content: params[3],
        cover_image: params[4],
        seo_title: params[5],
        seo_description: params[6],
        published: params[7],
        featured: params[8],
        reading_time: params[9],
        updated_at: params[10],
        published_at: params[11],
        category: params[12],
      };
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    }
    return [];
  }

  // 10. UPDATE posts SET views = views + 1
  if (normalizedSql.startsWith("UPDATE posts SET views = views + 1")) {
    const id = params[0];
    const postIdx = dbData.posts.findIndex((p: any) => p.id === id);
    if (postIdx !== -1) {
      dbData.posts[postIdx].views = (dbData.posts[postIdx].views || 0) + 1;
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    }
    return [];
  }

  // 11. DELETE FROM posts
  if (normalizedSql.startsWith("DELETE FROM posts")) {
    const id = params[0];
    dbData.posts = dbData.posts.filter((p: any) => p.id !== id);
    dbData.post_tags = dbData.post_tags.filter((pt: any) => pt.post_id !== id);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    return [];
  }

  // 12. DELETE FROM post_tags WHERE post_id = ?
  if (normalizedSql.startsWith("DELETE FROM post_tags WHERE post_id = ?")) {
    const postId = params[0];
    dbData.post_tags = dbData.post_tags.filter((pt: any) => pt.post_id !== postId);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    return [];
  }

  // 13. INSERT INTO post_tags
  if (normalizedSql.startsWith("INSERT INTO post_tags")) {
    const pt = {
      post_id: params[0],
      tag_id: params[1],
    };
    dbData.post_tags.push(pt);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    return [];
  }

  // 14. INSERT OR IGNORE INTO tags (id, name, slug)
  if (normalizedSql.startsWith("INSERT OR IGNORE INTO tags")) {
    const tag = {
      id: params[0],
      name: params[1],
      slug: params[2],
    };
    const exists = dbData.tags.find((t: any) => t.name.toLowerCase() === tag.name.toLowerCase());
    if (!exists) {
      dbData.tags.push(tag);
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(dbData, null, 2));
    }
    return [];
  }

  // 15. SELECT * FROM tags WHERE name = ? LIMIT 1
  if (normalizedSql.startsWith("SELECT * FROM tags WHERE name = ? LIMIT 1")) {
    const name = params[0];
    const tag = dbData.tags.find((t: any) => t.name.toLowerCase() === name.toLowerCase());
    return tag ? [tag] : [];
  }

  return [];
}

// Unified query runner (Production uses Cloudflare REST API; Dev uses Local JSON simulation)
export async function queryD1<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const isCloudflareActive = !!ACCOUNT_ID && !!DATABASE_ID && !!API_TOKEN;

  if (isCloudflareActive) {
    return executeCloudflareD1(sql, params) as Promise<T[]>;
  } else {
    return executeLocalD1(sql, params) as T[];
  }
}
