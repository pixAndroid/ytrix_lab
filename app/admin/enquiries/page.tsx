'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, Mail, Clock, CheckCircle, XCircle, PhoneCall } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  budget?: string;
  status: 'new' | 'contacted' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
}

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-900/40 text-blue-400', icon: Mail },
  contacted: { label: 'Contacted', color: 'bg-violet-900/40 text-violet-400', icon: PhoneCall },
  'in-progress': { label: 'In Progress', color: 'bg-amber-900/40 text-amber-400', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-emerald-900/40 text-emerald-400', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-gray-800 text-gray-400', icon: XCircle },
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const params = new URLSearchParams({ page: String(page), limit: '15' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/admin/enquiries?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
        setTotal(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  // Poll for new enquiries every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchEnquiries, 30_000);
    return () => clearInterval(interval);
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      fetchEnquiries();
      if (selected?._id === id) setSelected({ ...selected, status: status as Enquiry['status'] });
    }
  };

  return (
    <AdminLayout title="Enquiries">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Enquiries</h2>
            <p className="text-sm text-gray-400">{total} total enquiries</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {Object.entries(statusConfig).map(([key, val]) => (
              <span key={key} className={`px-2 py-1 rounded-full ${val.color}`}>{val.label}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search by name, email..." value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="">All Status</option>
            {Object.entries(statusConfig).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : enquiries.length === 0 ? (
              <div className="p-12 text-center">
                <Mail className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-400">No enquiries found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {enquiries.map((enq) => {
                  const cfg = statusConfig[enq.status];
                  return (
                    <button key={enq._id} onClick={() => setSelected(enq)}
                      className={`w-full text-left px-6 py-4 hover:bg-gray-800/50 transition-colors ${selected?._id === enq._id ? 'bg-gray-800/50' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white text-sm">{enq.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${cfg.color}`}>{cfg.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{enq.email}</p>
                          <p className="text-sm text-gray-400 truncate mt-1">{enq.subject}</p>
                        </div>
                        <span className="text-xs text-gray-600 shrink-0">{formatDate(enq.createdAt)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {total > 15 && (
              <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                <p className="text-sm text-gray-500">{((page-1)*15)+1}–{Math.min(page*15,total)} of {total}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-700">Previous</button>
                  <button onClick={() => setPage(p => p+1)} disabled={page*15 >= total}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-700">Next</button>
                </div>
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-white">{selected.name}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs ${statusConfig[selected.status].color}`}>
                    {statusConfig[selected.status].label}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Email: </span><span className="text-gray-300">{selected.email}</span></div>
                  {selected.phone && <div><span className="text-gray-500">Phone: </span><span className="text-gray-300">{selected.phone}</span></div>}
                  {selected.company && <div><span className="text-gray-500">Company: </span><span className="text-gray-300">{selected.company}</span></div>}
                  {selected.serviceInterest && <div><span className="text-gray-500">Service: </span><span className="text-gray-300">{selected.serviceInterest}</span></div>}
                  {selected.budget && <div><span className="text-gray-500">Budget: </span><span className="text-gray-300">{selected.budget}</span></div>}
                  <div><span className="text-gray-500">Date: </span><span className="text-gray-300">{formatDate(selected.createdAt)}</span></div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Subject</p>
                  <p className="text-sm text-gray-300 font-medium">{selected.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Message</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{selected.message}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(statusConfig).map(([key, val]) => (
                      <button key={key} onClick={() => updateStatus(selected._id, key)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          selected.status === key ? val.color + ' ring-1 ring-current' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}>
                        {val.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <a href={`mailto:${selected.email}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    <Mail className="w-4 h-4" /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select an enquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
