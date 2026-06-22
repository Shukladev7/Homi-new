"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewPostPage() {
  return (
    <AdminLayout>
      <BlogEditor />
    </AdminLayout>
  );
}
