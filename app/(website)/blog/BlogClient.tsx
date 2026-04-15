'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight, Search, FileText, Tag } from 'lucide-react';
import { IBlog } from '@/types';
import { formatDate } from '@/lib/utils';
import { BLOG_CATEGORIES } from '@/lib/constants';

export default function BlogPageClient() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: '9' });
        if (search) params.set('search', search);
        if (category) params.set('category', category);
        const res = await fetch(`/api/blogs?${params}`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
          setTotal(data.pagination?.total || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page, search, category]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-28 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Blog</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Insights on software development, tech trends, and building great products.
          </motion.p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-gray-100 bg-white sticky top-16 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 min-w-max">
            <button onClick={() => { setCategory(''); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${!category ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              All
            </button>
            {BLOG_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${category === cat ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try different search terms or categories</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, i) => (
                  <motion.article
                    key={String(blog._id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.05 }}
                  >
                    <Link href={`/blog/${blog.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300">
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-violet-100 overflow-hidden">
                        {blog.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={blog.coverImage} alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-16 h-16 text-blue-300" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 text-blue-600 text-xs font-semibold rounded-full">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{blog.readTime} min read</span>
                          </div>
                          <span>•</span>
                          <span>{blog.createdAt ? formatDate(blog.createdAt) : ''}</span>
                        </div>

                        <h2 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">{blog.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-1.5">
                            {blog.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                                <Tag className="w-3 h-3" />{tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {total > 9 && (
                <div className="flex justify-center gap-3 mt-10">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                    className="px-5 py-2.5 border-2 border-gray-300 text-gray-600 rounded-xl hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 transition-colors font-medium">
                    Previous
                  </button>
                  <span className="px-4 py-2.5 text-gray-500 text-sm">Page {page}</span>
                  <button onClick={() => setPage(p => p+1)} disabled={page*9 >= total}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors font-medium">
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
