'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, HelpCircle, X, Check } from 'lucide-react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  status: 'active' | 'inactive';
}

const emptyForm: {
  question: string;
  answer: string;
  order: number;
  status: 'active' | 'inactive';
} = {
  question: '',
  answer: '',
  order: 0,
  status: 'active',
};

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchFAQs = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/faqs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setFaqs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFAQs(); }, [fetchFAQs]);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (faq: FAQ) => {
    setEditId(faq._id);
    setForm({ question: faq.question, answer: faq.answer, order: faq.order, status: faq.status });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const url = editId ? `/api/admin/faqs/${editId}` : '/api/admin/faqs';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        fetchFAQs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) fetchFAQs();
  };

  return (
    <AdminLayout title="FAQ Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">FAQs</h2>
            <p className="text-sm text-gray-400">{faqs.length} questions</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="w-4 h-4" /> New FAQ
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">{editId ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Question</label>
              <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Answer</label>
              <textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save FAQ'}
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
          ) : faqs.length === 0 ? (
            <div className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No FAQs found</p>
              <button onClick={openAdd} className="mt-4 inline-block text-blue-400 hover:underline text-sm">
                Add your first FAQ
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {faqs.map((faq) => (
                <div key={faq._id} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">{faq.question}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{faq.answer}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                    faq.status === 'active' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {faq.status}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(faq)}
                      className="p-1.5 text-gray-500 hover:text-violet-400 hover:bg-violet-900/30 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(faq._id)}
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
