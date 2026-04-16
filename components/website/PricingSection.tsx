'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const plans = [
  {
    title: 'Starter Website',
    price: '₹9,999',
    label: 'Starting from',
    gradient: 'from-blue-500 to-sky-600',
    features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    title: 'Business Website',
    price: '₹19,999',
    label: 'Starting from',
    gradient: 'from-violet-500 to-purple-600',
    features: ['Up to 15 pages', 'Blog / CMS', 'WhatsApp integration', 'Advanced SEO', 'Analytics setup'],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    title: 'Android App',
    price: '₹29,999',
    label: 'Starting from',
    gradient: 'from-emerald-500 to-teal-600',
    features: ['Native Android', 'User auth', 'Admin panel', 'Play Store publish', '3 months support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    title: 'Custom Software',
    price: 'Custom Quote',
    label: 'Tailored to your goals',
    gradient: 'from-amber-500 to-orange-600',
    features: ['CRM / ERP / SaaS', 'Full-stack development', 'Dedicated team', 'Ongoing support', 'Enterprise-grade'],
    cta: 'Request Quote',
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Every project is tailored to your goals. These are starting points — not limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-7 border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-blue-500 shadow-xl shadow-blue-100 ring-2 ring-blue-500/20'
                  : 'border-gray-100 hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-5`}>
                <span className="text-white font-bold text-lg">{plan.title.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.title}</h3>
              <p className="text-xs text-gray-400 mb-2">{plan.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
          >
            Get Exact Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
