import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllPostsForAdmin, createPost } from "@/lib/db";

// GET all posts for dashboard list
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await getAllPostsForAdmin();
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Error loading admin posts:", error);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

// POST create a new post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const postData = await req.json();
    if (!postData.id || !postData.title || !postData.slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    await createPost(postData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: error.message || "Failed to create post" }, { status: 500 });
  }
}
