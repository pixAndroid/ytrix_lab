'use client';

import { motion } from 'framer-motion';
import { TrendingUp, MessageCircle, Sparkles, Search, LifeBuoy, BadgeDollarSign } from 'lucide-react';

const reasons = [
  {
    icon: TrendingUp,
    title: 'Business-Focused Development',
    desc: 'We build for outcomes, not just code. Every feature is tied to a real business goal.',
  },
  {
    icon: MessageCircle,
    title: 'Fast & Transparent Workflow',
    desc: 'Clear timelines, regular updates, and open communication — no surprises, ever.',
  },
  {
    icon: Sparkles,
    title: 'Premium UI That Builds Trust',
    desc: 'World-class design that makes your brand look credible from the first click.',
  },
  {
    icon: Search,
    title: 'SEO-Ready From Day One',
    desc: 'Websites built with performance and discoverability baked in for long-term growth.',
  },
  {
    icon: LifeBuoy,
    title: 'Long-Term Support After Launch',
    desc: 'We stay with you after go-live — maintenance, upgrades, and ongoing improvements.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Affordable Pricing, Serious Quality',
    desc: 'Premium-grade output at pricing that makes sense for startups and growing businesses.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Yantrix Labs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Why Businesses Choose{' '}
            <span className="gradient-text">Yantrix Labs</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We don&apos;t just write code — we build digital products that drive measurable growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <reason.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
