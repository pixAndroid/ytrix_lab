'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogForm from '@/components/admin/forms/BlogForm';

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBlog(data.data);
      setLoading(false);
    }
    if (id) fetchBlog();
  }, [id]);

  return (
    <AdminLayout title="Edit Blog Post">
      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading...</div>
      ) : blog ? (
        <BlogForm mode="edit" initialData={blog} />
      ) : (
        <div className="p-12 text-center text-red-400">Blog post not found</div>
      )}
    </AdminLayout>
  );
}
