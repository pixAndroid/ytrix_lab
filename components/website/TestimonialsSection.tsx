'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Founder',
    company: 'FoodFleet India',
    content:
      'Yantrix Labs delivered our restaurant ordering app faster than expected and it looks world-class. Our orders went up 40% within a month.',
    rating: 5,
    avatar: 'AM',
  },
  {
    name: 'Priya Nair',
    role: 'Operations Head',
    company: 'StaffSync',
    content:
      'Excellent communication, modern design, and reliable development support. They built our employee attendance platform exactly as we envisioned.',
    rating: 5,
    avatar: 'PN',
  },
  {
    name: 'Rohan Kapoor',
    role: 'CEO',
    company: 'LaunchPad Startup',
    content:
      'They helped us launch our app idea professionally and on budget. The UI is premium and our investors were genuinely impressed.',
    rating: 5,
    avatar: 'RK',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Client Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            What Clients{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results from real businesses. Here&apos;s what our clients have experienced.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role} @ {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
