'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Target, Eye, Heart, Users, Globe, Zap, Trophy, Code,
  ArrowRight, CheckCircle,
} from 'lucide-react';

const values = [
  { icon: Target, title: 'Mission-Driven', desc: 'We solve real problems with technology that makes a genuine impact on businesses and lives.' },
  { icon: Eye, title: 'Transparent', desc: 'Open communication, honest timelines, and complete visibility throughout every project.' },
  { icon: Heart, title: 'Client-First', desc: 'Your success is our success. We go above and beyond to deliver exceptional results.' },
  { icon: Zap, title: 'Innovation', desc: 'Staying at the forefront of technology to deliver modern, scalable solutions.' },
];

const stats = [
  { value: '200+', label: 'Projects Delivered', icon: Trophy },
  { value: '50+', label: 'Expert Team', icon: Users },
  { value: '15+', label: 'Countries Served', icon: Globe },
  { value: '5+', label: 'Years Experience', icon: Code },
];

const team = [
  { name: 'Arjun Sharma', role: 'CEO & Founder', image: 'https://ui-avatars.com/api/?name=Arjun+Sharma&background=3b82f6&color=fff&size=200' },
  { name: 'Priya Nair', role: 'CTO', image: 'https://ui-avatars.com/api/?name=Priya+Nair&background=8b5cf6&color=fff&size=200' },
  { name: 'Rahul Verma', role: 'Lead Designer', image: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=10b981&color=fff&size=200' },
  { name: 'Sneha Patel', role: 'Head of Engineering', image: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=f59e0b&color=fff&size=200' },
];

export default function AboutClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Building Software That{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Matters
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Yantrix Labs is a global software company passionate about building products that solve real problems.
            From startups to enterprise, we craft technology that scales with your ambition.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                From a Small Team to a <span className="gradient-text">Global Company</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2019, Yantrix Labs started with a simple belief: great software changes lives.
                What began as a small team of passionate developers has grown into a global software company
                serving clients across 15+ countries.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We specialize in Android app development, iOS app development, web development, SaaS solutions,
                and UI/UX design. Every project we take on is an opportunity to make something extraordinary.
              </p>
              <div className="space-y-3">
                {[
                  'Enterprise-grade software architecture',
                  'Modern, scalable technology stack',
                  'Agile development methodology',
                  'Post-launch support & maintenance',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Android Apps Built', value: '85+', color: 'bg-blue-50' },
                { label: 'iOS Apps Launched', value: '60+', color: 'bg-violet-50' },
                { label: 'Web Projects', value: '120+', color: 'bg-emerald-50' },
                { label: 'SaaS Products', value: '30+', color: 'bg-amber-50' },
              ].map(({ label, value, color }) => (
                <div key={label} className={`${color} rounded-2xl p-6 text-center`}>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Meet the Builders</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, image }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={name} className="w-24 h-24 rounded-2xl mx-auto mb-4 group-hover:scale-105 transition-transform" />
                <h3 className="font-bold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-blue-100 mb-8">Let&apos;s build something amazing for your business.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Start a Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
