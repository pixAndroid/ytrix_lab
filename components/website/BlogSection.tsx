'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const blogs = [
  {
    title: 'Building Scalable APIs with Next.js 14',
    slug: 'building-scalable-apis-nextjs-14',
    excerpt: 'Learn how to build production-ready APIs using Next.js 14 App Router with proper error handling and authentication.',
    category: 'Web Development',
    readTime: 8,
    createdAt: new Date('2024-03-15'),
    coverImage: null,
  },
  {
    title: 'The Future of AI in Software Development',
    slug: 'future-of-ai-software-development',
    excerpt: 'How AI is transforming the way we build, test, and deploy software in 2024 and beyond.',
    category: 'AI & Machine Learning',
    readTime: 6,
    createdAt: new Date('2024-03-10'),
    coverImage: null,
  },
  {
    title: 'Mastering TypeScript for Large Scale Apps',
    slug: 'mastering-typescript-large-scale-apps',
    excerpt: 'Advanced TypeScript patterns and best practices for building maintainable enterprise applications.',
    category: 'Web Development',
    readTime: 10,
    createdAt: new Date('2024-03-05'),
    coverImage: null,
  },
];

const categoryColors: Record<string, string> = {
  'Web Development': 'bg-blue-100 text-blue-700',
  'AI & Machine Learning': 'bg-violet-100 text-violet-700',
  'Mobile Development': 'bg-emerald-100 text-emerald-700',
  default: 'bg-gray-100 text-gray-700',
};

export default function BlogSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Latest Insights</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            From Our <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Technical articles, tutorials, and insights from our engineering team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-20">YL</span>
              </div>
              <div className="p-6">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[blog.category] || categoryColors.default}`}>
                  {blog.category}
                </span>
                <h3 className="font-bold text-gray-900 text-lg mt-3 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(blog.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {blog.readTime} min read
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
          >
            Read All Articles <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
