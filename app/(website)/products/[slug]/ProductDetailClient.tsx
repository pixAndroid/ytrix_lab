'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, CheckCircle, ExternalLink, ShoppingCart, Package } from 'lucide-react';
import { IProduct } from '@/types';
import { formatCurrency } from '@/lib/utils';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) setProduct(data.data);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  const handlePurchase = async () => {
    if (!product) return;
    setPurchasing(true);
    try {
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: product.discountPrice || product.price, productId: product._id }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) {
        alert('Failed to create order. Please try again.');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: 'INR',
        name: 'Yantrix Labs',
        description: product.name,
        order_id: orderData.data.id,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, productId: product._id }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            window.location.href = `/api/download/${product._id}?token=${verifyData.data.downloadToken}`;
          }
        },
        theme: { color: '#2563eb' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment initialization failed.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleFreeDownload = async () => {
    if (!product) return;
    try {
      const res = await fetch(`/api/download/${product._id}`);
      const data = await res.json();
      if (data.success && data.data?.url) {
        window.open(data.data.url, '_blank');
        setDownloaded(true);
      }
    } catch {
      alert('Download failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/products" className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
          <ArrowLeft className="w-4 h-4" /> All Products
        </Link>
      </div>
    );
  }

  const price = product.discountPrice || product.price;

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> All Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full mb-4">
                <span className="text-blue-300 text-sm font-medium">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">{product.shortDescription}</p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                  ))}
                  <span className="text-gray-300 ml-2">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Download className="w-4 h-4" />
                  <span>{product.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  {product.license === 'free' ? (
                    <span className="text-3xl font-bold text-emerald-400">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{formatCurrency(price)}</span>
                      {product.discountPrice && product.price !== product.discountPrice && (
                        <span className="text-lg text-gray-500 line-through">{formatCurrency(product.price)}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {product.license === 'free' ? (
                  <button onClick={handleFreeDownload}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                    {downloaded ? <CheckCircle className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                    {downloaded ? 'Downloaded!' : 'Free Download'}
                  </button>
                ) : (
                  <button onClick={handlePurchase} disabled={purchasing}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60">
                    {purchasing ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                    Buy Now — {formatCurrency(price)}
                  </button>
                )}
                {product.demoUrl && (
                  <a href={product.demoUrl} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              {product.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.coverImage} alt={product.name}
                  className="w-full rounded-2xl shadow-2xl border border-white/10" />
              ) : (
                <div className="w-full aspect-video bg-white/10 rounded-2xl flex items-center justify-center">
                  <Package className="w-24 h-24 text-white/30" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Product</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {product.techStack && product.techStack.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Product Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Version</span><span className="font-medium">{product.version}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">License</span><span className="font-medium capitalize">{product.license}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-medium">{product.category}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Downloads</span><span className="font-medium">{product.downloads.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
