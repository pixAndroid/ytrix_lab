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
import Pricing, { IPricingDoc } from '@/models/Pricing';
import FAQ, { IFAQDoc } from '@/models/FAQ';
import Portfolio, { IPortfolioDoc } from '@/models/Portfolio';
import HomeSettings, { IHomeStat } from '@/models/HomeSettings';

export const revalidate = 60;

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
  let pricingDocs: IPricingDoc[] = [];
  let faqDocs: IFAQDoc[] = [];
  let portfolioDocs: IPortfolioDoc[] = [];
  let homeSettingsRaw: { stats?: IHomeStat[] } | null = null;

  try {
    await connectDB();
    const [p, f, po, hs] = await Promise.all([
      Pricing.find({ status: 'active' }).sort({ order: 1 }).lean<IPricingDoc[]>().catch(() => []),
      FAQ.find({ status: 'active' }).sort({ order: 1 }).lean<IFAQDoc[]>().catch(() => []),
      Portfolio.find({ status: 'active' }).sort({ order: 1 }).lean<IPortfolioDoc[]>().catch(() => []),
      HomeSettings.findOne().lean<{ stats?: IHomeStat[] }>().catch(() => null),
    ]);
    pricingDocs = p;
    faqDocs = f;
    portfolioDocs = po;
    homeSettingsRaw = hs;
  } catch {
    // DB unavailable during build — all sections fall back to static data
  }

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

  const heroStats: IHomeStat[] = homeSettingsRaw?.stats ?? [];

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
