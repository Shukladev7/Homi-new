"use client";

import { useEffect } from "react";
import { recordDbPostView, trackArticleRead } from "@/lib/analytics";

interface TrackPostViewProps {
  postId: string;
  postSlug: string;
  postTitle: string;
}

export default function TrackPostView({ postId, postSlug, postTitle }: TrackPostViewProps) {
  useEffect(() => {
    // 1. Record database view in Firestore (increment counter)
    recordDbPostView(postId);
    
    // 2. Track Google Analytics read event
    trackArticleRead(postSlug, postTitle);
  }, [postId, postSlug, postTitle]);

  return null; // Component does not render any visual elements
}
