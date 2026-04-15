'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import BlogForm from '@/components/admin/forms/BlogForm';

export default function NewBlogPage() {
  return (
    <AdminLayout title="New Blog Post">
      <BlogForm mode="create" />
    </AdminLayout>
  );
}
