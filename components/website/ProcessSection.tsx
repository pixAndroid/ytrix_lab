'use client';

import { motion } from 'framer-motion';
import { Search, Layers, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Strategy',
    desc: 'We understand your goals, users, and business model. No guesswork — just a clear plan.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Design & Build',
    desc: 'We craft clean, intuitive interfaces and power them with scalable backend systems.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Grow',
    desc: 'We deploy, optimize, and support long-term growth — with you every step of the way.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Simple Process.{' '}
            <span className="gradient-text">Serious Results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-violet-200 -translate-y-1/2" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 mb-5 mx-auto">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2">
                Step {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
