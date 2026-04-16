'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Smartphone, Apple, Globe, Palette, Settings, Rocket } from 'lucide-react';

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon?: string;
  features: string[];
  order: number;
}

const CARD_GRADIENTS = [
  'from-green-500 to-emerald-600',
  'from-blue-500 to-sky-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-teal-600',
  'from-indigo-500 to-blue-600',
  'from-sky-500 to-cyan-600',
  'from-gray-600 to-slate-700',
];

const FEATURE_COLORS = [
  'text-emerald-600',
  'text-blue-600',
  'text-violet-600',
  'text-amber-600',
  'text-pink-600',
  'text-cyan-600',
  'text-indigo-600',
  'text-sky-600',
  'text-gray-700',
];

const STATIC_SERVICES = [
  {
    id: 'android',
    title: 'Android App Development',
    description: 'Launch fast, modern Android apps with clean performance and scalable architecture.',
    Icon: Smartphone,
    gradient: CARD_GRADIENTS[0],
    features: ['Kotlin & Java', 'Material Design 3', 'Offline Support', 'Play Store Ready'],
  },
  {
    id: 'ios',
    title: 'iOS App Development',
    description: 'Premium iPhone and iPad apps designed for performance and user retention.',
    Icon: Apple,
    gradient: CARD_GRADIENTS[1],
    features: ['Swift & SwiftUI', 'App Store Optimized', 'Push Notifications', 'In-App Purchases'],
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern business websites, admin dashboards, portals, and SaaS platforms.',
    Icon: Globe,
    gradient: CARD_GRADIENTS[2],
    features: ['React / Next.js', 'SEO-Ready', 'Mobile First', 'Admin Dashboards'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Interfaces users love. Beautiful, conversion-focused design systems.',
    Icon: Palette,
    gradient: CARD_GRADIENTS[3],
    features: ['Figma Prototypes', 'User Research', 'Design Systems', 'Conversion-Focused'],
  },
  {
    id: 'custom',
    title: 'Custom Software Solutions',
    description: 'Internal tools, automation systems, CRMs, booking platforms, and more.',
    Icon: Settings,
    gradient: CARD_GRADIENTS[4],
    features: ['CRM & ERP', 'Automation', 'Booking Systems', 'API Integrations'],
  },
  {
    id: 'mvp',
    title: 'MVP for Startups',
    description: 'Turn your startup idea into a launch-ready product quickly.',
    Icon: Rocket,
    gradient: CARD_GRADIENTS[5],
    features: ['Rapid Prototyping', 'Lean Development', 'Investor-Ready', 'Scalable Stack'],
  },
];

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(d => { if (d.success) setServices(d.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Build</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Services Built to <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            From idea to launch — we build reliable digital products that create real business results.
          </p>
        </motion.div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              const featureColor = FEATURE_COLORS[i % FEATURE_COLORS.length];
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 h-full"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 overflow-hidden`}>
                      {service.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                      ) : (
                        <span className="text-white text-xl font-bold">{service.title.charAt(0)}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.shortDescription}</p>
                    {service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 4).map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className={`w-4 h-4 shrink-0 ${featureColor}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATIC_SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5`}>
                  <service.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${FEATURE_COLORS[i % FEATURE_COLORS.length]}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
          >
            Discuss Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

