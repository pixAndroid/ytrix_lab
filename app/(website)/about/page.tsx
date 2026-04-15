import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us - Yantrix Labs',
  description: 'Learn about Yantrix Labs — a global software development company building cutting-edge web, mobile, and SaaS solutions for businesses worldwide.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About Yantrix Labs',
    description: 'Global software company specializing in web, mobile app, and SaaS development.',
    url: `${SITE_URL}/about`,
  },
};

import AboutClient from './AboutClient';
export default function AboutPage() {
  return <AboutClient />;
}
