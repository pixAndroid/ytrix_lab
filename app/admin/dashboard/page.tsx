'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FileText, Briefcase, Package, Mail, Users, TrendingUp, Eye, Download,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

interface Stats {
  blogs: number;
  services: number;
  products: number;
  enquiries: number;
  totalViews: number;
  downloads: number;
}

interface TrafficData {
  name: string;
  views: number;
  unique: number;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

const defaultTrafficData: TrafficData[] = [
  { name: 'Mon', views: 120, unique: 85 },
  { name: 'Tue', views: 190, unique: 130 },
  { name: 'Wed', views: 145, unique: 100 },
  { name: 'Thu', views: 210, unique: 160 },
  { name: 'Fri', views: 280, unique: 195 },
  { name: 'Sat', views: 175, unique: 120 },
  { name: 'Sun', views: 140, unique: 95 },
];

const deviceData = [
  { name: 'Mobile', value: 58 },
  { name: 'Desktop', value: 32 },
  { name: 'Tablet', value: 10 },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    blogs: 0, services: 0, products: 0, enquiries: 0, totalViews: 0, downloads: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${token}` };

      const [blogsRes, servicesRes, productsRes, enquiriesRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/blogs?limit=1', { headers }),
        fetch('/api/admin/services?limit=1', { headers }),
        fetch('/api/admin/products?limit=1', { headers }),
        fetch('/api/admin/enquiries?limit=1', { headers }),
        fetch('/api/admin/analytics', { headers }),
      ]);

      const [blogs, services, products, enquiries, analytics] = await Promise.all([
        blogsRes.json(),
        servicesRes.json(),
        productsRes.json(),
        enquiriesRes.json(),
        analyticsRes.json(),
      ]);

      setStats({
        blogs: blogs.pagination?.total || 0,
        services: services.pagination?.total || 0,
        products: products.pagination?.total || 0,
        enquiries: enquiries.pagination?.total || 0,
        totalViews: analytics.data?.total || 0,
        downloads: 0,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Poll for updated stats every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchStats, 30_000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const statCards = [
    { icon: FileText, label: 'Blog Posts', value: stats.blogs, color: 'blue', href: '/admin/blogs' },
    { icon: Briefcase, label: 'Services', value: stats.services, color: 'violet', href: '/admin/services' },
    { icon: Package, label: 'Products', value: stats.products, color: 'emerald', href: '/admin/products' },
    { icon: Mail, label: 'Enquiries', value: stats.enquiries, color: 'amber', href: '/admin/enquiries' },
    { icon: Eye, label: 'Total Views', value: stats.totalViews, color: 'sky', href: '/admin/analytics' },
    { icon: Download, label: 'Downloads', value: stats.downloads, color: 'pink', href: '/admin/products' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 text-blue-400',
    violet: 'bg-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    sky: 'bg-sky-500/20 text-sky-400',
    pink: 'bg-pink-500/20 text-pink-400',
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 backdrop-blur-sm"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">
                {loading ? <span className="inline-block w-8 h-6 bg-gray-800 rounded animate-pulse" /> : value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Weekly Traffic</h3>
                <p className="text-sm text-gray-500">Page views & unique visitors</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" />Views</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-500" />Unique</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={defaultTrafficData}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="uniqueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }}
                />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="url(#viewsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="unique" stroke="#8b5cf6" fill="url(#uniqueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Device Breakdown */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-1">Device Types</h3>
            <p className="text-sm text-gray-500 mb-6">Traffic by device</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {deviceData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>}
                />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'New Blog Post', href: '/admin/blogs/new', color: 'from-blue-600 to-blue-700' },
            { label: 'Add Service', href: '/admin/services/new', color: 'from-violet-600 to-violet-700' },
            { label: 'Add Product', href: '/admin/products/new', color: 'from-emerald-600 to-emerald-700' },
            { label: 'View Enquiries', href: '/admin/enquiries', color: 'from-amber-600 to-amber-700' },
          ].map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              className={`bg-gradient-to-r ${color} text-white font-medium py-3 px-4 rounded-xl text-center text-sm hover:opacity-90 transition-opacity`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Summary Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Performance Overview</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Conversion Rate', value: '3.2%' },
              { label: 'Avg. Session', value: '4m 12s' },
              { label: 'Bounce Rate', value: '42%' },
              { label: 'New Users', value: '68%' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-violet-400" />
            <h3 className="font-semibold text-white">Top Pages</h3>
          </div>
          <div className="space-y-3">
            {[
              { page: '/ (Home)', views: 1240 },
              { page: '/services', views: 890 },
              { page: '/blog', views: 654 },
              { page: '/products', views: 432 },
              { page: '/contact', views: 321 },
            ].map(({ page, views }) => (
              <div key={page} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{page}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(views / 1240) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">{views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
