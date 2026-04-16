'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, FolderOpen, X, Check } from 'lucide-react';

interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  gradient: string;
  imageUrl?: string;
  link?: string;
  order: number;
  status: 'active' | 'inactive';
}

const emptyForm: {
  title: string;
  category: string;
  gradient: string;
  imageUrl: string;
  link: string;
  order: number;
  status: 'active' | 'inactive';
} = {
  title: '',
  category: '',
  gradient: 'from-blue-500 to-indigo-600',
  imageUrl: '',
  link: '',
  order: 0,
  status: 'active',
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/portfolio', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      category: item.category,
      gradient: item.gradient,
      imageUrl: item.imageUrl || '',
      link: item.link || '',
      order: item.order,
      status: item.status,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const url = editId ? `/api/admin/portfolio/${editId}` : '/api/admin/portfolio';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return;
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/portfolio/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) fetchItems();
  };

  return (
    <AdminLayout title="Portfolio Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Portfolio</h2>
            <p className="text-sm text-gray-400">{items.length} items</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="w-4 h-4" /> New Item
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">{editId ? 'Edit Item' : 'Add Item'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Category</label>
                <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Android App"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Gradient (Tailwind)</label>
                <input value={form.gradient} onChange={e => setForm({ ...form, gradient: e.target.value })}
                  placeholder="from-blue-500 to-indigo-600"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Image URL (optional)</label>
                <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Link (optional)</label>
                <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Order</label>
                <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Item'}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center">
              <FolderOpen className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No portfolio items found</p>
              <button onClick={openAdd} className="mt-4 inline-block text-blue-400 hover:underline text-sm">
                Add your first item
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm">{item.title.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.status === 'active' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {item.status}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(item)}
                      className="p-1.5 text-gray-500 hover:text-violet-400 hover:bg-violet-900/30 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item._id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
