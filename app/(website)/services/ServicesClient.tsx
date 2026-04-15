'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Globe, Smartphone, Brain, Cloud, Palette, Settings,
  ArrowRight, CheckCircle, Layers, Cpu, ShoppingCart,
} from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Android App Development',
    slug: 'android-app-development',
    desc: 'Native Android apps built with Kotlin and Jetpack Compose for performance and user delight.',
    features: ['Native Android (Kotlin)', 'Material Design 3', 'Push Notifications', 'Offline Support', 'Play Store Publishing'],
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    icon: Smartphone,
    title: 'iOS App Development',
    slug: 'ios-app-development',
    desc: 'Beautiful iOS apps with Swift and SwiftUI following Apple Human Interface Guidelines.',
    features: ['Native iOS (Swift)', 'SwiftUI Interface', 'App Store Publishing', 'Apple Pay', 'Face ID Integration'],
    color: 'from-blue-500 to-sky-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
  {
    icon: Globe,
    title: 'Web Development',
    slug: 'web-development',
    desc: 'Scalable web applications using Next.js, React, Node.js, and modern tech stacks.',
    features: ['Next.js / React', 'Node.js Backend', 'REST/GraphQL APIs', 'SEO Optimized', 'Performance Focused'],
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
  },
  {
    icon: Layers,
    title: 'SaaS Development',
    slug: 'saas-development',
    desc: 'Build scalable Software-as-a-Service products with multi-tenancy, billing, and analytics.',
    features: ['Multi-tenant Architecture', 'Subscription Billing', 'Analytics Dashboard', 'API Integrations', 'White-label Options'],
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    desc: 'Design-first approach creating stunning interfaces with exceptional user experience.',
    features: ['Figma Design', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility (WCAG)'],
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    slug: 'ecommerce-solutions',
    desc: 'Complete e-commerce platforms with payment integration, inventory, and analytics.',
    features: ['Custom E-Commerce', 'Payment Gateway', 'Inventory Management', 'Order Tracking', 'Multi-currency'],
    color: 'from-cyan-500 to-teal-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
  },
  {
    icon: Brain,
    title: 'AI/ML Solutions',
    slug: 'ai-ml-solutions',
    desc: 'Leverage the power of artificial intelligence and machine learning for your business.',
    features: ['Custom ML Models', 'ChatBots', 'Computer Vision', 'NLP', 'AI Integration'],
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    desc: 'Robust cloud architecture on AWS, GCP, and Azure with DevOps best practices.',
    features: ['AWS/GCP/Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Auto Scaling', 'Security Hardening'],
    color: 'from-sky-500 to-cyan-600',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
  },
  {
    icon: Settings,
    title: 'Custom Business Software',
    slug: 'custom-software',
    desc: 'Bespoke enterprise software solutions tailored precisely to your workflow and business needs.',
    features: ['Process Automation', 'ERP Integration', 'Custom Dashboards', 'Reporting Tools', 'Legacy Migration'],
    color: 'from-gray-600 to-slate-700',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
  },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'Understanding your goals, requirements, and challenges.' },
  { step: '02', title: 'Planning', desc: 'Architecture design, tech stack selection, and project roadmap.' },
  { step: '03', title: 'Development', desc: 'Agile sprints with regular demos and feedback loops.' },
  { step: '04', title: 'Launch', desc: 'Testing, deployment, and post-launch support.' },
];

export default function ServicesPageClient() {
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
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                <Link href={`/services/${service.slug}`}
                  className="group block bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${service.text}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
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
