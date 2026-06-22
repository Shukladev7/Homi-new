import { NextRequest, NextResponse } from "next/server";
import { recordDbPostView } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    await recordDbPostView(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in blog views API for ${id}:`, error);
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
  }
}
