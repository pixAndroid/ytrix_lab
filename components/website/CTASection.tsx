'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create a solution that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:border-white transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
