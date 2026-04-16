'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Star, ArrowRight, Package } from 'lucide-react';

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  coverImage?: string;
  price: number;
  discountPrice?: number;
  techStack: string[];
  license: 'free' | 'paid' | 'freemium';
  downloads: number;
  rating: number;
}

interface ProductsSectionProps {
  products: ProductItem[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Ready-to-Use <span className="gradient-text">Software</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Download and deploy production-ready tools, templates, and libraries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.slice(0, 4).map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                {product.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.coverImage} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <div className="text-right">
                  {product.license === 'free' ? (
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                  ) : (
                    <div>
                      {product.discountPrice ? (
                        <>
                          <span className="text-gray-400 line-through text-sm">₹{product.price}</span>
                          <span className="text-2xl font-bold text-gray-900 ml-2">₹{product.discountPrice}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{product.shortDescription}</p>
              {product.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.techStack.slice(0, 4).map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {product.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  )}
                  {product.downloads > 0 && (
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {product.downloads.toLocaleString()}
                    </span>
                  )}
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
          >
            Browse All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
