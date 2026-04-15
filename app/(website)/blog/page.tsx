import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import BlogPageClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog - Software Development Insights | Yantrix Labs',
  description: 'Read expert articles on web development, mobile apps, AI/ML, cloud infrastructure, and software business growth from the Yantrix Labs team.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Yantrix Labs Blog',
    description: 'Software development insights, tutorials and industry trends.',
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
