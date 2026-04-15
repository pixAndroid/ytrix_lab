'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calculator, Code, Palette, ArrowRight } from 'lucide-react';

const tools = [
  {
    icon: Calculator,
    title: 'Project Cost Calculator',
    desc: 'Estimate your software project cost based on features and complexity.',
    href: '/tools',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Code,
    title: 'Tech Stack Advisor',
    desc: 'Get personalized technology recommendations for your project.',
    href: '/tools',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Palette,
    title: 'Color Palette Generator',
    desc: 'Generate beautiful, accessible color palettes for your brand.',
    href: '/tools',
    color: 'bg-emerald-50 text-emerald-600',
  },
];

export default function ToolsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Free Tools</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Useful <span className="gradient-text">Dev Tools</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Free tools to help you plan, estimate, and build better software
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={tool.href}
                className="group block p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${tool.color}`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{tool.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Try Now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
          >
            View All Tools <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
