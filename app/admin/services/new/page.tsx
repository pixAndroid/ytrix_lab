'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/forms/ServiceForm';

export default function NewServicePage() {
  return (
    <AdminLayout title="New Service">
      <ServiceForm mode="create" />
    </AdminLayout>
  );
}
