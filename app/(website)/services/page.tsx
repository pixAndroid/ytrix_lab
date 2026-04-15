import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ServicesPageClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services - Web, Mobile App & SaaS Development | Yantrix Labs',
  description: 'Yantrix Labs offers Android app development, iOS app development, web development, UI/UX design, SaaS solutions, and cloud infrastructure services globally.',
  keywords: ['software development services', 'android app development', 'iOS app development', 'web development', 'SaaS development', 'UI/UX design'],
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
