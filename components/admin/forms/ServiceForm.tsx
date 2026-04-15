'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';

interface ServiceFormData {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string;
  technologies: string;
  status: 'active' | 'inactive';
  order: number;
  seoTitle: string;
  seoDescription: string;
}

interface ServiceFormProps {
  initialData?: Partial<ServiceFormData> & { _id?: string };
  mode: 'create' | 'edit';
}

export default function ServiceForm({ initialData, mode }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState<ServiceFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    icon: initialData?.icon || '',
    features: Array.isArray(initialData?.features) ? (initialData.features as string[]).join('\n') : '',
    technologies: Array.isArray(initialData?.technologies) ? (initialData.technologies as string[]).join(', ') : '',
    status: initialData?.status || 'active',
    order: initialData?.order || 0,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value }));
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
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      const url = mode === 'create' ? '/api/admin/services' : `/api/admin/services/${initialData?._id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(mode === 'create' ? 'Service created!' : 'Service updated!');
        setTimeout(() => router.push('/admin/services'), 1500);
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => router.push('/admin/services')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm">
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {mode === 'create' ? 'Create Service' : 'Update Service'}
        </button>
      </div>

      {error && <div className="p-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">{error}</div>}
      {success && <div className="p-3 bg-emerald-900/30 border border-emerald-800 rounded-xl text-emerald-400 text-sm">{success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Service title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                  placeholder="service-slug" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
              <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Brief tagline for the service" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={8}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm"
                placeholder="Detailed service description..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
              <textarea name="features" value={form.features} onChange={handleChange} rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm font-mono"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">SEO Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
              <input name="seoTitle" value={form.seoTitle} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="SEO title (50-60 chars)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
              <textarea name="seoDescription" value={form.seoDescription} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                placeholder="Meta description (150-160 chars)" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon Name</label>
              <input name="icon" value={form.icon} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Globe, Smartphone, Brain..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
              <input name="technologies" value={form.technologies} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="React, Node.js, MongoDB" />
              <p className="text-xs text-gray-600 mt-1">Comma-separated</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
