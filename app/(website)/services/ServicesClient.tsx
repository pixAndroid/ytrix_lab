'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, Cpu,
} from 'lucide-react';

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon?: string;
  features: string[];
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

const process = [
  { step: '01', title: 'Discovery', desc: 'Understanding your goals, requirements, and challenges.' },
  { step: '02', title: 'Planning', desc: 'Architecture design, tech stack selection, and project roadmap.' },
  { step: '03', title: 'Development', desc: 'Agile sprints with regular demos and feedback loops.' },
  { step: '04', title: 'Launch', desc: 'Testing, deployment, and post-launch support.' },
];

export default function ServicesPageClient() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(d => { if (d.success) setServices(d.data); })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Our Services
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6">
            End-to-End{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Software Solutions
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto">
            From mobile apps to enterprise platforms — we build software that drives real business growth.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Link href={`/services/${service.slug}`}
                    className="group block bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 h-full">
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
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How We Work</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Our Process</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {process.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Technologies We Work With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Kotlin', 'Swift', 'Flutter',
              'MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Figma'].map(tech => (
              <span key={tech} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-xl text-blue-100 mb-8">Let&apos;s discuss your requirements and build something great together.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all">
            Get Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
