import type { Metadata } from 'next';
import HeroSection from '@/components/website/HeroSection';
import TrustedBrands from '@/components/website/TrustedBrands';
import ServicesSection from '@/components/website/ServicesSection';
import WhyChooseUs from '@/components/website/WhyChooseUs';
import ProductsSection from '@/components/website/ProductsSection';
import BlogSection from '@/components/website/BlogSection';
import ToolsSection from '@/components/website/ToolsSection';
import TestimonialsSection from '@/components/website/TestimonialsSection';
import CTASection from '@/components/website/CTASection';

export const metadata: Metadata = {
  title: 'Yantrix Labs - Global Software Development Company',
  description:
    'Yantrix Labs builds enterprise-grade web, mobile, and SaaS solutions. Android, iOS, Web Development, UI/UX Design for global businesses.',
  keywords: [
    'software development company',
    'mobile app development',
    'android app developer',
    'iOS app developer',
    'web development agency',
    'SaaS development company',
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBrands />
      <ServicesSection />
      <WhyChooseUs />
      <ProductsSection />
      <BlogSection />
      <ToolsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
