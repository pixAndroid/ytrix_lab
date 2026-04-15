'use client';

import { motion } from 'framer-motion';

const brands = [
  'TechFlow', 'StartupAI', 'GlobalFintech', 'CloudNine', 'DataPro', 'WebCraft', 'MobileFirst', 'AICore',
];

export default function TrustedBrands() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            Trusted by companies worldwide
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-gray-300 font-bold text-xl hover:text-gray-400 transition-colors"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
