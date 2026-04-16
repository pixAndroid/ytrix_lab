'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, Settings } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
}

const defaultStats: Stat[] = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '10+', label: 'Industries Served' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '6+', label: 'Years Experience' },
];

export default function AdminHomeSettingsPage() {
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/home-settings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data?.stats?.length) {
        setStats(data.data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/home-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ stats }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (i: number, field: 'value' | 'label', val: string) => {
    const arr = [...stats];
    arr[i] = { ...arr[i], [field]: val };
    setStats(arr);
  };

  return (
    <AdminLayout title="Home Settings">
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Home Settings</h2>
            <p className="text-sm text-gray-400">Edit hero section stats</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity text-sm"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Hero Stats</h3>
              <p className="text-xs text-gray-500">These appear in the hero section of the homepage</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-4 space-y-3">
                  <div className="text-xs text-gray-500 font-medium">Stat {i + 1}</div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Value</label>
                    <input
                      value={stat.value}
                      onChange={e => updateStat(i, 'value', e.target.value)}
                      placeholder="50+"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Label</label>
                    <input
                      value={stat.label}
                      onChange={e => updateStat(i, 'label', e.target.value)}
                      placeholder="Projects Delivered"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
