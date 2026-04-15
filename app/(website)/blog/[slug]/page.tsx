import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import BlogDetailClient from './BlogDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${SITE_URL}/api/blogs/${slug}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      const blog = data.data;
      return {
        title: blog.seoTitle || `${blog.title} | Yantrix Labs Blog`,
        description: blog.seoDescription || blog.excerpt,
        keywords: blog.tags,
        alternates: { canonical: `${SITE_URL}/blog/${slug}` },
        openGraph: {
          title: blog.seoTitle || blog.title,
          description: blog.seoDescription || blog.excerpt,
          type: 'article',
          publishedTime: blog.createdAt,
          authors: [blog.author],
          tags: blog.tags,
          images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630 }] : undefined,
          url: `${SITE_URL}/blog/${slug}`,
        },
      };
    }
  } catch {
    // fallback
  }
  return { title: 'Blog Post | Yantrix Labs' };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
