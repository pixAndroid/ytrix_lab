'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, Smartphone, Brain, Cloud, Palette, Settings, ArrowRight } from 'lucide-react';

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Scalable web apps with Next.js, React, and Node.js', href: '/services/web-development', color: 'blue' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Native and cross-platform iOS & Android apps', href: '/services/mobile-app-development', color: 'violet' },
  { icon: Brain, title: 'AI/ML Solutions', desc: 'Intelligent automation powered by machine learning', href: '/services/ai-ml-solutions', color: 'emerald' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Scalable cloud architecture on AWS, GCP & Azure', href: '/services/cloud-infrastructure', color: 'sky' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Beautiful, accessible interfaces users love', href: '/services/ui-ux-design', color: 'pink' },
  { icon: Settings, title: 'DevOps & Automation', desc: 'CI/CD pipelines and infrastructure automation', href: '/services/devops-automation', color: 'amber' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  violet: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white',
  emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  sky: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
  pink: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white',
  amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            End-to-end software solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className="group block p-8 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${colorMap[service.color]}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
          >
            View All Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
