"use client";

import { use } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import BlogEditor from "@/components/admin/BlogEditor";

interface EditPostProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostProps) {
  const unwrappedParams = use(params);
  
  return (
    <AdminLayout>
      <BlogEditor postId={unwrappedParams.id} />
    </AdminLayout>
  );
}
