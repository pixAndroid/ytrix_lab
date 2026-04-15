'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Briefcase } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  status: 'active' | 'inactive';
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/services?limit=50', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setServices(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) fetchServices();
  };

  return (
    <AdminLayout title="Services Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Services</h2>
            <p className="text-sm text-gray-400">{services.length} services</p>
          </div>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <Plus className="w-4 h-4" /> New Service
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : services.length === 0 ? (
            <div className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No services found</p>
              <Link href="/admin/services/new" className="mt-4 inline-block text-blue-400 hover:underline text-sm">
                Add your first service
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {services.map((service) => (
                <div key={service._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white">{service.title}</div>
                    <div className="text-sm text-gray-500 truncate">{service.shortDescription}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    service.status === 'active' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {service.status}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`/services/${service.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <Link
                      href={`/admin/services/${service._id}/edit`}
                      className="p-1.5 text-gray-500 hover:text-violet-400 hover:bg-violet-900/30 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                    >
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
