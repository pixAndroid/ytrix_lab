'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/forms/ServiceForm';

export default function EditServicePage() {
  const params = useParams();
  const id = params?.id as string;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setService(data.data);
      setLoading(false);
    }
    if (id) fetchService();
  }, [id]);

  return (
    <AdminLayout title="Edit Service">
      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading...</div>
      ) : service ? (
        <ServiceForm mode="edit" initialData={service} />
      ) : (
        <div className="p-12 text-center text-red-400">Service not found</div>
      )}
    </AdminLayout>
  );
}
