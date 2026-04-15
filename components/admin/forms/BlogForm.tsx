'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/constants';
import dynamic from 'next/dynamic';
import ImagePickerModal from '@/components/admin/ImagePickerModal';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  category: string;
  status: 'draft' | 'published';
  seoTitle: string;
  seoDescription: string;
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData> & { _id?: string };
  mode: 'create' | 'edit';
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [coverPickerOpen, setCoverPickerOpen] = useState(false);
  const [form, setForm] = useState<BlogFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    author: initialData?.author || 'Yantrix Labs',
    tags: Array.isArray(initialData?.tags) ? (initialData.tags as string[]).join(', ') : (initialData?.tags || ''),
    category: initialData?.category || '',
    status: initialData?.status || 'draft',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'title' && mode === 'create') {
      const slug = value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
      setForm(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const token = localStorage.getItem('admin_token');
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      const url = mode === 'create' ? '/api/admin/blogs' : `/api/admin/blogs/${initialData?._id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(mode === 'create' ? 'Blog post created successfully!' : 'Blog post updated successfully!');
        setTimeout(() => router.push('/admin/blogs'), 1500);
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push('/admin/blogs')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </button>
        <div className="flex items-center gap-3">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
          >
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {mode === 'create' ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>

      {error && <div className="p-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">{error}</div>}
      {success && <div className="p-3 bg-emerald-900/30 border border-emerald-800 rounded-xl text-emerald-400 text-sm">{success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                placeholder="Enter blog post title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                placeholder="url-friendly-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                placeholder="Brief description of the post..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
              <RichTextEditor
                value={form.content}
                onChange={val => setForm(prev => ({ ...prev, content: val }))}
                placeholder="Write your blog content here..."
                minHeight={400}
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">SEO Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
              <input
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="SEO optimized title (50-60 chars)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
              <textarea
                name="seoDescription"
                value={form.seoDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                placeholder="Meta description (150-160 chars)"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Post Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select category</option>
                {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-xs text-gray-600 mt-1">Comma-separated tags</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Featured Image
            </h3>
            {form.coverImage ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.coverImage} alt="Cover" className="w-full h-36 rounded-xl object-cover border border-gray-700" />
                <button type="button" onClick={() => setForm(p => ({ ...p, coverImage: '' }))}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-full h-36 bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-600" />
              </div>
            )}
            <button type="button" onClick={() => setCoverPickerOpen(true)}
              className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-xl transition-colors">
              {form.coverImage ? 'Change Featured Image' : 'Pick Featured Image'}
            </button>
          </div>
        </div>
      </div>
    </form>

    <ImagePickerModal open={coverPickerOpen} onClose={() => setCoverPickerOpen(false)}
      onSelect={url => setForm(p => ({ ...p, coverImage: url }))} title="Pick Featured Image" />
  </>
  );
}
