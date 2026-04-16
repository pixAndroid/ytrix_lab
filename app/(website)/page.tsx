import type { Metadata } from 'next';
import HeroSection from '@/components/website/HeroSection';
import TrustedBrands from '@/components/website/TrustedBrands';
import ServicesSection from '@/components/website/ServicesSection';
import WhyChooseUs from '@/components/website/WhyChooseUs';
import ProcessSection from '@/components/website/ProcessSection';
import PortfolioPreview from '@/components/website/PortfolioPreview';
import PricingSection from '@/components/website/PricingSection';
import BlogSection from '@/components/website/BlogSection';
import TestimonialsSection from '@/components/website/TestimonialsSection';
import FAQSection from '@/components/website/FAQSection';
import CTASection from '@/components/website/CTASection';
import HomepageContactSection from '@/components/website/HomepageContactSection';

export const metadata: Metadata = {
  title: 'Yantrix Labs — Mobile App & Web Development Company',
  description:
    'Yantrix Labs builds Android apps, iOS apps, websites, and custom software for startups and businesses. Fast delivery, premium UI, and ongoing support.',
  keywords: [
    'software development company',
    'android app development',
    'iOS app development',
    'web development company',
    'mobile app development',
    'custom software solutions',
    'UI UX design agency',
    'startup MVP development',
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBrands />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <PortfolioPreview />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <HomepageContactSection />
      <BlogSection />
    </>
  );
}
