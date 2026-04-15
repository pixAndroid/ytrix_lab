import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Yantrix Labs - Global Software Company',
    template: '%s | Yantrix Labs',
  },
  description:
    'Yantrix Labs is a global software company delivering cutting-edge web, mobile, and AI solutions. We build products that scale.',
  keywords: ['software company', 'web development', 'mobile apps', 'AI solutions', 'Yantrix Labs'],
  authors: [{ name: 'Yantrix Labs', url: 'https://yantrixlab.com' }],
  creator: 'Yantrix Labs',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com',
    siteName: 'Yantrix Labs',
    title: 'Yantrix Labs - Global Software Company',
    description: 'Building cutting-edge software solutions for the modern world.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yantrix Labs - Global Software Company',
    description: 'Building cutting-edge software solutions for the modern world.',
    creator: '@yantrixlabs',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
