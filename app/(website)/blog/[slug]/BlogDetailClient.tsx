'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Eye, Tag, Share2, User } from 'lucide-react';
import { IBlog } from '@/types';
import { formatDate } from '@/lib/utils';

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<IBlog[]>([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
          // Fetch related by category
          if (data.data?.category) {
            const relRes = await fetch(`/api/blogs?category=${encodeURIComponent(data.data.category)}&limit=3`);
            const relData = await relRes.json();
            if (relData.success) {
              setRelated(relData.data.filter((b: IBlog) => b.slug !== slug));
            }
          }
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link href="/blog" className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="mb-4">
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">{blog.category}</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </motion.h1>

          <p className="text-xl text-gray-500 leading-relaxed mb-8">{blog.excerpt}</p>

          <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-700">{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{blog.views?.toLocaleString()} views</span>
            </div>
            <span>{blog.createdAt ? formatDate(blog.createdAt) : ''}</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.coverImage} alt={blog.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg" />
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <article className="lg:col-span-3">
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {blog.content}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {blog.tags.map(tag => (
                      <Link key={tag} href={`/blog?tag=${tag}`}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 flex items-center gap-3">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Share this article:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://yantrixlab.com/blog/${blog.slug}`)}`}
                  target="_blank" rel="noreferrer"
                  className="px-4 py-2 bg-sky-100 text-sky-600 text-sm font-medium rounded-full hover:bg-sky-200 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://yantrixlab.com/blog/${blog.slug}`)}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank" rel="noreferrer"
                  className="px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">About Yantrix Labs</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  We build cutting-edge software solutions for businesses worldwide.
                </p>
                <Link href="/contact"
                  className="block text-center py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl text-sm hover:opacity-90 transition-opacity">
                  Start a Project
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.slice(0, 3).map(post => (
                <Link key={String(post._id)} href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                  <div className="text-xs text-blue-600 font-semibold mb-2">{post.category}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                    Read more <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
