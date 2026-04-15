'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Users, Award, Clock, HeartHandshake } from 'lucide-react';

const reasons = [
  { icon: Zap, title: 'Lightning Fast Delivery', desc: 'We deliver on time, every time. Our agile process ensures rapid iteration and quick deployments.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Security-first approach with industry best practices, penetration testing, and compliance standards.' },
  { icon: Users, title: 'Dedicated Team', desc: 'Your dedicated project team stays with you from ideation to launch and beyond.' },
  { icon: Award, title: 'Proven Excellence', desc: '200+ successful projects with a 99% client satisfaction rate over 5+ years.' },
  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock support and monitoring to keep your applications running smoothly.' },
  { icon: HeartHandshake, title: 'Long-term Partnership', desc: 'We invest in your success. Most of our clients have been with us for 3+ years.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Yantrix Labs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            The <span className="gradient-text">Yantrix</span> Advantage
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We don&apos;t just write code — we craft digital solutions that deliver measurable business value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <reason.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
