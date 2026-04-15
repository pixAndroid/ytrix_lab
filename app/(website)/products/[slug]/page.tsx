import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${SITE_URL}/api/products/${slug}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      const product = data.data;
      return {
        title: product.seoTitle || `${product.name} | Yantrix Labs`,
        description: product.seoDescription || product.shortDescription,
        alternates: { canonical: `${SITE_URL}/products/${slug}` },
        openGraph: {
          title: product.seoTitle || product.name,
          description: product.seoDescription || product.shortDescription,
          images: product.coverImage ? [{ url: product.coverImage, width: 1200, height: 630 }] : undefined,
          url: `${SITE_URL}/products/${slug}`,
        },
      };
    }
  } catch {
    // fallback
  }
  return { title: 'Product | Yantrix Labs' };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
