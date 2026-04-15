import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ServiceDetailClient from './ServiceDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${SITE_URL}/api/services/${slug}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      const service = data.data;
      return {
        title: service.seoTitle || `${service.title} | Yantrix Labs`,
        description: service.seoDescription || service.shortDescription,
        alternates: { canonical: `${SITE_URL}/services/${slug}` },
        openGraph: {
          title: service.seoTitle || service.title,
          description: service.seoDescription || service.shortDescription,
          url: `${SITE_URL}/services/${slug}`,
        },
      };
    }
  } catch {
    // fallback
  }
  return {
    title: 'Service | Yantrix Labs',
    description: 'Software development service by Yantrix Labs',
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
