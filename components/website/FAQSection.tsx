'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a website take?',
    a: 'Most business websites are live within 7–14 days. Larger or more complex projects may take 3–6 weeks.',
  },
  {
    q: 'Do you build mobile apps?',
    a: 'Yes — we build native Android and iOS apps as well as cross-platform solutions for startups and businesses of all sizes.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Absolutely. We offer ongoing maintenance, upgrade plans, and dedicated support packages so your product keeps performing.',
  },
  {
    q: 'Can you redesign old websites?',
    a: 'Yes. We modernize outdated websites with fresh design and optimized code, improving performance, SEO, and conversions.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Startups are our specialty. We help founders move from idea to MVP quickly and affordably, with a foundation that scales.',
  },
  {
    q: 'What is your development process?',
    a: 'Discovery → Design → Development → Testing → Launch → Support. We keep you informed and involved at every stage.',
  },
];

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
}

export default function FAQSection({ faqs: propFaqs }: { faqs?: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const activeFaqs = propFaqs && propFaqs.length > 0
    ? propFaqs.map(f => ({ q: f.question, a: f.answer }))
    : faqs;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-500">
            Everything you need to know before we start building.
          </p>
        </motion.div>

        <div className="space-y-3">
          {activeFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-500 shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
