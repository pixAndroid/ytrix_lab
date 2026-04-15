'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Download, ShoppingCart, ArrowRight, Package, Search } from 'lucide-react';
import { IProduct } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function ProductsPageClient() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: '12' });
        if (filter !== 'all') params.set('license', filter);
        if (search) params.set('search', search);
        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
          setTotal(data.pagination?.total || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filter, page, search]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-28 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6">
            Digital <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Products</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Premium templates, UI kits, source code, and free resources to accelerate your development.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-gray-100 bg-white sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3">
            {([['all', 'All Products'], ['free', 'Free'], ['paid', 'Paid']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setFilter(val); setPage(1); }}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === val ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-500">{total} products</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, i) => (
                  <motion.div
                    key={String(product._id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.05 }}
                  >
                    <Link href={`/products/${product.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300">
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-violet-500 overflow-hidden">
                        {product.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.coverImage} alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            product.license === 'free' ? 'bg-emerald-500 text-white' :
                            product.license === 'paid' ? 'bg-white text-gray-900' :
                            'bg-amber-500 text-white'
                          }`}>
                            {product.license === 'free' ? 'FREE' :
                             product.license === 'paid' ? formatCurrency(product.price) : 'FREEMIUM'}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.shortDescription}</p>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-gray-700 font-medium">{product.rating.toFixed(1)}</span>
                            <span>({product.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{product.downloads.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {product.techStack?.slice(0, 3).map(tech => (
                            <span key={tech} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {total > 12 && (
                <div className="flex justify-center gap-3 mt-10">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                    className="px-5 py-2.5 border-2 border-gray-300 text-gray-600 rounded-xl hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 transition-colors font-medium">
                    Previous
                  </button>
                  <button onClick={() => setPage(p => p+1)} disabled={page*12 >= total}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors font-medium">
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-blue-100 mb-8">We build custom software tailored to your specific needs.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all">
            Talk to Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
