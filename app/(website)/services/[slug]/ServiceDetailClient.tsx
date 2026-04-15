'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { IService } from '@/types';

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setService(data.data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
        <p className="text-gray-500 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Services
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <div className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6">
              {service.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 leading-relaxed mb-8">
              {service.shortDescription}
            </motion.p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {service.description}
              </div>
            </div>

            <div className="space-y-6">
              {service.features && service.features.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.technologies && service.technologies.length > 0 && (
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white border border-blue-100 rounded-full text-xs font-medium text-blue-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Ready to Start?</h3>
                <p className="text-blue-100 text-sm mb-5">Get a free consultation and project estimate.</p>
                <Link href="/contact"
                  className="block text-center py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all text-sm">
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Services</h2>
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
