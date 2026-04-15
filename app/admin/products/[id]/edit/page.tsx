'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/forms/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setProduct(data.data);
      setLoading(false);
    }
    if (id) fetchProduct();
  }, [id]);

  return (
    <AdminLayout title="Edit Product">
      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading...</div>
      ) : product ? (
        <ProductForm mode="edit" initialData={product} />
      ) : (
        <div className="p-12 text-center text-red-400">Product not found</div>
      )}
    </AdminLayout>
  );
}
