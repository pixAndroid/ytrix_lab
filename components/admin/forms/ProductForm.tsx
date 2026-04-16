'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import ImagePickerModal from '@/components/admin/ImagePickerModal';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

interface ProductFormData {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  category: string;
  price: number;
  discountPrice: number;
  downloadUrl: string;
  demoUrl: string;
  features: string;
  techStack: string;
  version: string;
  license: 'free' | 'paid' | 'freemium';
  status: 'active' | 'inactive' | 'coming-soon';
  showOnHome: boolean;
  seoTitle: string;
  seoDescription: string;
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData> & { _id?: string };
  mode: 'create' | 'edit';
}

const PRODUCT_CATEGORIES = ['Templates', 'Libraries', 'UI Kits', 'Tools', 'eBooks', 'Source Code', 'Plugins', 'Other'];

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [coverPickerOpen, setCoverPickerOpen] = useState(false);
  const [form, setForm] = useState<ProductFormData>({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    coverImage: initialData?.coverImage || '',
    category: initialData?.category || '',
    price: initialData?.price || 0,
    discountPrice: initialData?.discountPrice || 0,
    downloadUrl: initialData?.downloadUrl || '',
    demoUrl: initialData?.demoUrl || '',
    features: Array.isArray(initialData?.features) ? (initialData.features as string[]).join('\n') : '',
    techStack: Array.isArray(initialData?.techStack) ? (initialData.techStack as string[]).join(', ') : '',
    version: initialData?.version || '1.0.0',
    license: initialData?.license || 'free',
    status: initialData?.status || 'active',
    showOnHome: initialData?.showOnHome ?? false,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: (name === 'price' || name === 'discountPrice') ? parseFloat(value) || 0 : value,
    }));
    if (name === 'name' && mode === 'create') {
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
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${initialData?._id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(mode === 'create' ? 'Product created!' : 'Product updated!');
        setTimeout(() => { router.refresh(); router.push('/admin/products'); }, 1500);
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
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => router.push('/admin/products')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm">
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {mode === 'create' ? 'Create Product' : 'Update Product'}
        </button>
      </div>

      {error && <div className="p-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">{error}</div>}
      {success && <div className="p-3 bg-emerald-900/30 border border-emerald-800 rounded-xl text-emerald-400 text-sm">{success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                  placeholder="product-slug" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
              <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="One-line description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Description *</label>
              <RichTextEditor
                value={form.description}
                onChange={val => setForm(prev => ({ ...prev, description: val }))}
                placeholder="Detailed product description..."
                minHeight={280}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
              <textarea name="features" value={form.features} onChange={handleChange} rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm font-mono"
                placeholder="Feature 1&#10;Feature 2" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">SEO Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
              <input name="seoTitle" value={form.seoTitle} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="SEO title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
              <textarea name="seoDescription" value={form.seoDescription} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                placeholder="Meta description" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Cover Image */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Cover Image</h3>
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
              {form.coverImage ? 'Change Cover Image' : 'Pick Cover Image'}
            </button>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Pricing & Type</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">License Type</label>
              <select name="license" value={form.license} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="freemium">Freemium</option>
              </select>
            </div>
            {form.license !== 'free' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Discount Price (₹)</label>
                  <input type="number" name="discountPrice" value={form.discountPrice} onChange={handleChange} min="0" step="0.01"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange} required
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option value="">Select category</option>
                {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-gray-300">Show on Home Page</p>
                <p className="text-xs text-gray-500 mt-0.5">Display this product in the homepage products section</p>
              </div>
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, showOnHome: !p.showOnHome }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  form.showOnHome ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.showOnHome ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Version</label>
              <input name="version" value={form.version} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="1.0.0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tech Stack</label>
              <input name="techStack" value={form.techStack} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="React, TypeScript, ..." />
              <p className="text-xs text-gray-600 mt-1">Comma-separated</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Download URL</label>
              <input name="downloadUrl" value={form.downloadUrl} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
              <input name="demoUrl" value={form.demoUrl} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="https://..." />
            </div>
          </div>
        </div>
      </div>
    </form>

    <ImagePickerModal open={coverPickerOpen} onClose={() => setCoverPickerOpen(false)}
      onSelect={url => setForm(p => ({ ...p, coverImage: url }))} title="Pick Cover Image" />
  </>
  );
}
