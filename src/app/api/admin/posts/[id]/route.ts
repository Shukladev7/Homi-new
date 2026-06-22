import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPostById, updatePost, deletePost } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single post details for editor loading
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error: any) {
    console.error(`Error loading post ${id}:`, error);
    return NextResponse.json({ error: "Failed to load post data" }, { status: 500 });
  }
}

// PUT update post details
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const postData = await req.json();
    await updatePost(id, postData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error updating post ${id}:`, error);
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}

// DELETE a post
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deletePost(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error deleting post ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const postData = await req.json();
    await updatePost(id, postData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error patching post ${id}:`, error);
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}
