'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { BarChart3, Eye, Globe, Monitor, Smartphone, Tablet } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

interface AnalyticsData {
  total: number;
  today: number;
  week: number;
  month: number;
  topPages: { page: string; count: number }[];
  daily: { date: string; count: number }[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/analytics?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setData(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const deviceData = [
    { name: 'Mobile', value: 58 },
    { name: 'Desktop', value: 32 },
    { name: 'Tablet', value: 10 },
  ];

  const countryData = [
    { country: 'India', visitors: 1240 },
    { country: 'USA', visitors: 680 },
    { country: 'UK', visitors: 345 },
    { country: 'Canada', visitors: 210 },
    { country: 'Australia', visitors: 180 },
  ];

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Traffic Analytics</h2>
            <p className="text-sm text-gray-400">Website performance overview</p>
          </div>
          <div className="flex items-center gap-2">
            {(['week', 'month'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  period === p ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}>
                {p === 'week' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Views', value: data?.total || 0, icon: Eye, color: 'blue' },
            { label: 'Today', value: data?.today || 0, icon: BarChart3, color: 'violet' },
            { label: 'This Week', value: data?.week || 0, icon: BarChart3, color: 'emerald' },
            { label: 'This Month', value: data?.month || 0, icon: Globe, color: 'amber' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                color === 'violet' ? 'bg-violet-500/20 text-violet-400' :
                color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                'bg-amber-500/20 text-amber-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-white">
                {loading ? <span className="inline-block w-12 h-6 bg-gray-800 rounded animate-pulse" /> : value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Traffic Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-6">
            {period === 'week' ? 'Daily Traffic (Last 7 Days)' : 'Daily Traffic (Last 30 Days)'}
          </h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center text-gray-500">Loading chart...</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data?.daily || []}>
                <defs>
                  <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }} />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#analyticsGrad)" strokeWidth={2} name="Page Views" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Pages */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Top Pages</h3>
            {loading ? (
              <div className="space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-8 bg-gray-800 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data?.topPages?.slice(0, 6) || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="page" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4,4,0,0]} name="Views" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Devices */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Device Types</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                  {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend formatter={(v) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{v}</span>} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {[
                { label: 'Mobile', icon: Smartphone, pct: '58%' },
                { label: 'Desktop', icon: Monitor, pct: '32%' },
                { label: 'Tablet', icon: Tablet, pct: '10%' },
              ].map(({ label, icon: Icon, pct }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Icon className="w-4 h-4" /> {label}
                  </div>
                  <span className="text-gray-300 font-medium">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country Stats */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Top Countries</h3>
          <div className="space-y-3">
            {countryData.map(({ country, visitors }) => (
              <div key={country} className="flex items-center gap-4">
                <span className="text-sm text-gray-300 w-24">{country}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                    style={{ width: `${(visitors / 1240) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{visitors}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
