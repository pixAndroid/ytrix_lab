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
import connectDB from '@/lib/mongodb';
import Pricing from '@/models/Pricing';
import FAQ from '@/models/FAQ';
import Portfolio from '@/models/Portfolio';
import HomeSettings from '@/models/HomeSettings';
import type { IHomeSettingsDoc } from '@/models/HomeSettings';

export const dynamic = 'force-dynamic';

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

export default async function HomePage() {
  await connectDB();

  const [pricingDocs, faqDocs, portfolioDocs, homeSettingsDoc] = await Promise.all([
    Pricing.find({ status: 'active' }).sort({ order: 1 }).lean().catch((err) => {
      console.error('Failed to fetch pricing:', err);
      return [];
    }),
    FAQ.find({ status: 'active' }).sort({ order: 1 }).lean().catch((err) => {
      console.error('Failed to fetch FAQs:', err);
      return [];
    }),
    Portfolio.find({ status: 'active' }).sort({ order: 1 }).lean().catch((err) => {
      console.error('Failed to fetch portfolio:', err);
      return [];
    }),
    HomeSettings.findOne().lean().catch((err) => {
      console.error('Failed to fetch home settings:', err);
      return null;
    }),
  ]);

  const pricingPlans = pricingDocs.map(p => ({
    _id: String(p._id),
    title: p.title,
    price: p.price,
    label: p.label,
    gradient: p.gradient,
    features: p.features,
    cta: p.cta,
    highlighted: p.highlighted,
  }));

  const faqs = faqDocs.map(f => ({
    _id: String(f._id),
    question: f.question,
    answer: f.answer,
  }));

  const portfolioItems = portfolioDocs.map(p => ({
    _id: String(p._id),
    title: p.title,
    category: p.category,
    gradient: p.gradient,
  }));

  const heroStats = (homeSettingsDoc as Pick<IHomeSettingsDoc, 'stats'> | null)?.stats ?? [];

  return (
    <>
      <HeroSection stats={heroStats} />
      <TrustedBrands />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <PortfolioPreview items={portfolioItems} />
      <PricingSection plans={pricingPlans} />
      <TestimonialsSection />
      <FAQSection faqs={faqs} />
      <CTASection />
      <HomepageContactSection />
      <BlogSection />
    </>
  );
}
