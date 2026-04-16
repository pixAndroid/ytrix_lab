'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

const portfolio = [
  {
    title: 'Restaurant Ordering App',
    category: 'Android App',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    title: 'Employee Attendance Platform',
    category: 'Web Dashboard',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'E-commerce Website',
    category: 'Web Development',
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    title: 'Coupon Management App',
    category: 'Android & iOS',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Service Booking Dashboard',
    category: 'Custom Software',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Startup MVP Platform',
    category: 'MVP Development',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            <span className="gradient-text">Selected Work</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Real solutions built for real businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                <span className="text-white text-5xl font-bold opacity-20">YL</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
          >
            View Portfolio <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
