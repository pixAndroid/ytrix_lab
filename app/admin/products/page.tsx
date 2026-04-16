'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Package, Search, Home } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  license: 'free' | 'paid' | 'freemium';
  status: string;
  downloads: number;
  category: string;
  showOnHome: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const params = new URLSearchParams({ limit: '50' });
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/products?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
        setTotal(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) fetchProducts();
  };

  const toggleShowOnHome = async (id: string, current: boolean) => {
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ showOnHome: !current }),
    });
    const data = await res.json();
    if (data.success) {
      setProducts(prev => prev.map(p => p._id === id ? { ...p, showOnHome: !current } : p));
    }
  };

  return (
    <AdminLayout title="Products Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Digital Products</h2>
            <p className="text-sm text-gray-400">{total} products</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="w-4 h-4" /> New Product
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Downloads</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Home</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white text-sm">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.slug}</div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-400">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">
                        {product.license === 'free' ? 'Free' : formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.license === 'free'
                            ? 'bg-emerald-900/40 text-emerald-400'
                            : product.license === 'paid'
                            ? 'bg-blue-900/40 text-blue-400'
                            : 'bg-violet-900/40 text-violet-400'
                        }`}>
                          {product.license}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-400">{product.downloads}</td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <button
                          type="button"
                          onClick={() => toggleShowOnHome(product._id, product.showOnHome)}
                          title={product.showOnHome ? 'Shown on home page' : 'Hidden from home page'}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                            product.showOnHome ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            product.showOnHome ? 'translate-x-[18px]' : 'translate-x-[2px]'
                          }`} />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/products/${product.slug}`} target="_blank" rel="noreferrer"
                            className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </a>
                          <Link href={`/admin/products/${product._id}/edit`}
                            className="p-1.5 text-gray-500 hover:text-violet-400 hover:bg-violet-900/30 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(product._id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
