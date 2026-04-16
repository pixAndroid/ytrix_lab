'use client';

import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

export default function HomepageContactSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Let&apos;s Talk</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Tell Us About{' '}
            <span className="gradient-text">Your Project</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Share the details — we&apos;ll come back with a clear plan and transparent quote within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
