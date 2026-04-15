import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ProductsPageClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Digital Products - Templates, UI Kits & More | Yantrix Labs',
  description: 'Explore Yantrix Labs digital products including React admin templates, Flutter UI kits, source code bundles, and free resources for developers.',
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: 'Digital Products | Yantrix Labs',
    description: 'Premium and free digital products for developers and designers.',
    url: `${SITE_URL}/products`,
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
