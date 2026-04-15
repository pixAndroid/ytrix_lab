'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/forms/ProductForm';

export default function NewProductPage() {
  return (
    <AdminLayout title="New Product">
      <ProductForm mode="create" />
    </AdminLayout>
  );
}
