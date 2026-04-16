'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, DollarSign, X, Check } from 'lucide-react';

interface PricingPlan {
  _id: string;
  title: string;
  price: string;
  label: string;
  gradient: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  order: number;
  status: 'active' | 'inactive';
}

const emptyForm: {
  title: string;
  price: string;
  label: string;
  gradient: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  order: number;
  status: 'active' | 'inactive';
} = {
  title: '',
  price: '',
  label: 'Starting from',
  gradient: 'from-blue-500 to-sky-600',
  features: [''],
  cta: 'Get Started',
  highlighted: false,
  order: 0,
  status: 'active',
};

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/pricing', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPlans(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (plan: PricingPlan) => {
    setEditId(plan._id);
    setForm({
      title: plan.title,
      price: plan.price,
      label: plan.label,
      gradient: plan.gradient,
      features: plan.features.length ? plan.features : [''],
      cta: plan.cta,
      highlighted: plan.highlighted,
      order: plan.order,
      status: plan.status,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const body = { ...form, features: form.features.filter(f => f.trim()) };
      const url = editId ? `/api/admin/pricing/${editId}` : '/api/admin/pricing';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        fetchPlans();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this pricing plan?')) return;
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/pricing/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) fetchPlans();
  };

  const updateFeature = (i: number, val: string) => {
    const arr = [...form.features];
    arr[i] = val;
    setForm({ ...form, features: arr });
  };

  const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
  const removeFeature = (i: number) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

  return (
    <AdminLayout title="Pricing Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Pricing Plans</h2>
            <p className="text-sm text-gray-400">{plans.length} plans</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="w-4 h-4" /> New Plan
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">{editId ? 'Edit Plan' : 'Add Plan'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Price</label>
                <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="₹9,999"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Label</label>
                <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Gradient (Tailwind)</label>
                <input value={form.gradient} onChange={e => setForm({ ...form, gradient: e.target.value })}
                  placeholder="from-blue-500 to-sky-600"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">CTA Button Text</label>
                <input value={form.cta} onChange={e => setForm({ ...form, cta: e.target.value })}
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
              <div className="flex items-center gap-2 pt-4">
                <input type="checkbox" id="highlighted" checked={form.highlighted}
                  onChange={e => setForm({ ...form, highlighted: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500" />
                <label htmlFor="highlighted" className="text-sm text-gray-300">Highlighted (Most Popular)</label>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Features</label>
              <div className="space-y-2">
                {form.features.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={f} onChange={e => updateFeature(i, e.target.value)}
                      placeholder={`Feature ${i + 1}`}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={() => removeFeature(i)} className="text-gray-500 hover:text-red-400 px-2">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addFeature} className="mt-2 text-sm text-blue-400 hover:text-blue-300">+ Add Feature</button>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Plan'}
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
          ) : plans.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No pricing plans found</p>
              <button onClick={openAdd} className="mt-4 inline-block text-blue-400 hover:underline text-sm">
                Add your first plan
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {plans.map((plan) => (
                <div key={plan._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm">{plan.title.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{plan.title}</span>
                      {plan.highlighted && (
                        <span className="px-2 py-0.5 bg-blue-900/40 text-blue-400 text-xs rounded-full">Popular</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{plan.price} · {plan.features.length} features</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    plan.status === 'active' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {plan.status}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(plan)}
                      className="p-1.5 text-gray-500 hover:text-violet-400 hover:bg-violet-900/30 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(plan._id)}
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
