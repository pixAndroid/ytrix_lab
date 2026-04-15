import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ToolsPageClient from './ToolsClient';

export const metadata: Metadata = {
  title: 'Free Online Tools - EMI Calculator, QR Generator & More | Yantrix Labs',
  description: 'Free online developer and business tools: EMI Calculator, QR Code Generator, JSON Formatter, Color Picker, GST Calculator, and more.',
  alternates: { canonical: `${SITE_URL}/tools` },
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
