import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import PricingModel from '../models/Pricing';
import FAQModel from '../models/FAQ';
import PortfolioModel from '../models/Portfolio';
import HomeSettingsModel from '../models/HomeSettings';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ytrix_lab';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const hash = await bcrypt.hash('Admin@123', 12);
  console.log('Admin password hash:', hash);
  console.log('Set ADMIN_PASSWORD_HASH=' + hash + ' in your .env file');

  // Seed Services
  const ServiceSchema = new mongoose.Schema({
    title: String, slug: String, shortDescription: String, description: String,
    icon: String, coverImage: String, features: [String], technologies: [String],
    status: String, order: Number, seoTitle: String, seoDescription: String,
  }, { timestamps: true });
  const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

  const services = [
    {
      title: 'Web Development',
      slug: 'web-development',
      shortDescription: 'Custom web applications built with modern technologies',
      description: 'We build scalable, performant web applications using Next.js, React, Node.js, and more.',
      icon: 'Globe',
      features: ['React/Next.js', 'Node.js Backend', 'REST/GraphQL APIs', 'Cloud Deployment', 'SEO Optimized'],
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
      status: 'active', order: 1,
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      shortDescription: 'Native and cross-platform mobile applications',
      description: 'Build powerful iOS and Android apps using React Native and Flutter.',
      icon: 'Smartphone',
      features: ['iOS & Android', 'React Native', 'Flutter', 'Push Notifications', 'Offline Support'],
      technologies: ['React Native', 'Flutter', 'Expo', 'Firebase'],
      status: 'active', order: 2,
    },
    {
      title: 'AI/ML Solutions',
      slug: 'ai-ml-solutions',
      shortDescription: 'Intelligent automation and machine learning',
      description: 'Leverage AI and ML to automate processes and gain insights from data.',
      icon: 'Brain',
      features: ['Custom ML Models', 'NLP', 'Computer Vision', 'Data Analytics', 'AI Integration'],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
      status: 'active', order: 3,
    },
    {
      title: 'Cloud Infrastructure',
      slug: 'cloud-infrastructure',
      shortDescription: 'Scalable cloud architecture and DevOps',
      description: 'Design and implement robust cloud infrastructure on AWS, GCP, and Azure.',
      icon: 'Cloud',
      features: ['AWS/GCP/Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Auto Scaling', 'Cost Optimization'],
      technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
      status: 'active', order: 4,
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'Beautiful and intuitive user experiences',
      description: 'Create stunning interfaces with exceptional user experience using Figma and modern design systems.',
      icon: 'Palette',
      features: ['Figma Design', 'Design Systems', 'Prototyping', 'User Research', 'Accessibility'],
      technologies: ['Figma', 'Adobe XD', 'Framer', 'Storybook'],
      status: 'active', order: 5,
    },
    {
      title: 'DevOps & Automation',
      slug: 'devops-automation',
      shortDescription: 'Streamline development and deployment',
      description: 'Implement DevOps practices and automation to accelerate your development workflow.',
      icon: 'Settings',
      features: ['CI/CD Setup', 'Infrastructure as Code', 'Monitoring', 'Security Scanning', 'Automated Testing'],
      technologies: ['GitHub Actions', 'Jenkins', 'Ansible', 'Prometheus', 'Grafana'],
      status: 'active', order: 6,
    },
  ];

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('✓ Services seeded');

  // Seed Products
  const ProductSchema = new mongoose.Schema({
    name: String, slug: String, shortDescription: String, description: String,
    coverImage: String, images: [String], category: String, price: Number,
    discountPrice: Number, downloadUrl: String, demoUrl: String,
    features: [String], techStack: [String], version: String,
    license: String, status: String, downloads: Number, rating: Number, reviewCount: Number,
  }, { timestamps: true });
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

  const products = [
    {
      name: 'NextJS Admin Dashboard',
      slug: 'nextjs-admin-dashboard',
      shortDescription: 'A production-ready admin dashboard built with Next.js 14',
      description: 'Full-featured admin dashboard with analytics, user management, and more.',
      category: 'Templates',
      price: 49,
      discountPrice: 29,
      features: ['Dark/Light Mode', 'Charts & Analytics', 'User Management', 'Responsive Design'],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
      version: '1.0.0', license: 'paid', status: 'active', downloads: 124, rating: 4.8, reviewCount: 32,
    },
    {
      name: 'React Component Library',
      slug: 'react-component-library',
      shortDescription: '50+ production-ready React components',
      description: 'A comprehensive collection of accessible React components.',
      category: 'Libraries',
      price: 0,
      features: ['50+ Components', 'TypeScript', 'Accessible', 'Customizable'],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
      version: '2.1.0', license: 'free', status: 'active', downloads: 1250, rating: 4.6, reviewCount: 89,
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✓ Products seeded');

  // Seed Blogs
  const BlogSchema = new mongoose.Schema({
    title: String, slug: String, excerpt: String, content: String,
    coverImage: String, author: String, tags: [String], category: String,
    status: String, views: Number, readTime: Number,
    seoTitle: String, seoDescription: String,
  }, { timestamps: true });
  const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

  const blogs = [
    {
      title: 'Building Scalable APIs with Next.js 14',
      slug: 'building-scalable-apis-nextjs-14',
      excerpt: 'Learn how to build production-ready APIs using Next.js 14 App Router.',
      content: `# Building Scalable APIs with Next.js 14\n\nNext.js 14 introduces powerful new features for building APIs with the App Router.\n\n## Getting Started\n\nThe new App Router in Next.js 14 makes it incredibly easy to create API routes...\n\n## Best Practices\n\n1. Use proper error handling\n2. Implement authentication\n3. Add rate limiting\n4. Use proper HTTP status codes`,
      author: 'Yantrix Labs',
      tags: ['Next.js', 'API', 'TypeScript'],
      category: 'Web Development',
      status: 'published', views: 245, readTime: 8,
    },
    {
      title: 'The Future of AI in Software Development',
      slug: 'future-of-ai-software-development',
      excerpt: 'How AI is transforming the way we build software in 2024 and beyond.',
      content: `# The Future of AI in Software Development\n\nArtificial Intelligence is revolutionizing how we write, test, and deploy software.\n\n## AI-Assisted Coding\n\nTools like GitHub Copilot and Claude are changing developer workflows...\n\n## What This Means for Developers\n\nDevelopers who embrace AI tools will be significantly more productive.`,
      author: 'Yantrix Labs',
      tags: ['AI', 'Machine Learning', 'Future'],
      category: 'AI & Machine Learning',
      status: 'published', views: 512, readTime: 6,
    },
  ];

  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
  console.log('✓ Blogs seeded');

  // Seed Pricing
  const Pricing = PricingModel;

  const pricingPlans = [
    {
      title: 'Starter Website', price: '₹9,999', label: 'Starting from',
      gradient: 'from-blue-500 to-sky-600',
      features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup'],
      cta: 'Get Started', highlighted: false, order: 1, status: 'active',
    },
    {
      title: 'Business Website', price: '₹19,999', label: 'Starting from',
      gradient: 'from-violet-500 to-purple-600',
      features: ['Up to 15 pages', 'Blog / CMS', 'WhatsApp integration', 'Advanced SEO', 'Analytics setup'],
      cta: 'Get Started', highlighted: true, order: 2, status: 'active',
    },
    {
      title: 'Android App', price: '₹29,999', label: 'Starting from',
      gradient: 'from-emerald-500 to-teal-600',
      features: ['Native Android', 'User auth', 'Admin panel', 'Play Store publish', '3 months support'],
      cta: 'Get Started', highlighted: false, order: 3, status: 'active',
    },
    {
      title: 'Custom Software', price: 'Custom Quote', label: 'Tailored to your goals',
      gradient: 'from-amber-500 to-orange-600',
      features: ['CRM / ERP / SaaS', 'Full-stack development', 'Dedicated team', 'Ongoing support', 'Enterprise-grade'],
      cta: 'Request Quote', highlighted: false, order: 4, status: 'active',
    },
  ];
  await Pricing.deleteMany({});
  await Pricing.insertMany(pricingPlans);
  console.log('✓ Pricing seeded');

  // Seed FAQs
  const FAQ = FAQModel;

  const faqData = [
    { question: 'How long does a website take?', answer: 'Most business websites are live within 7–14 days. Larger or more complex projects may take 3–6 weeks.', order: 1, status: 'active' },
    { question: 'Do you build mobile apps?', answer: 'Yes — we build native Android and iOS apps as well as cross-platform solutions for startups and businesses of all sizes.', order: 2, status: 'active' },
    { question: 'Do you provide support after launch?', answer: 'Absolutely. We offer ongoing maintenance, upgrade plans, and dedicated support packages so your product keeps performing.', order: 3, status: 'active' },
    { question: 'Can you redesign old websites?', answer: 'Yes. We modernize outdated websites with fresh design and optimized code, improving performance, SEO, and conversions.', order: 4, status: 'active' },
    { question: 'Do you work with startups?', answer: 'Startups are our specialty. We help founders move from idea to MVP quickly and affordably, with a foundation that scales.', order: 5, status: 'active' },
    { question: 'What is your development process?', answer: 'Discovery → Design → Development → Testing → Launch → Support. We keep you informed and involved at every stage.', order: 6, status: 'active' },
  ];
  await FAQ.deleteMany({});
  await FAQ.insertMany(faqData);
  console.log('✓ FAQs seeded');

  // Seed Portfolio
  const Portfolio = PortfolioModel;

  const portfolioData = [
    { title: 'Restaurant Ordering App', category: 'Android App', gradient: 'from-orange-400 to-red-500', order: 1, status: 'active' },
    { title: 'Employee Attendance Platform', category: 'Web Dashboard', gradient: 'from-blue-500 to-indigo-600', order: 2, status: 'active' },
    { title: 'E-commerce Website', category: 'Web Development', gradient: 'from-emerald-400 to-teal-600', order: 3, status: 'active' },
    { title: 'Coupon Management App', category: 'Android & iOS', gradient: 'from-violet-500 to-purple-600', order: 4, status: 'active' },
    { title: 'Service Booking Dashboard', category: 'Custom Software', gradient: 'from-pink-500 to-rose-600', order: 5, status: 'active' },
    { title: 'Startup MVP Platform', category: 'MVP Development', gradient: 'from-cyan-500 to-blue-600', order: 6, status: 'active' },
  ];
  await Portfolio.deleteMany({});
  await Portfolio.insertMany(portfolioData);
  console.log('✓ Portfolio seeded');

  // Seed HomeSettings
  const HomeSettings = HomeSettingsModel;

  await HomeSettings.deleteMany({});
  await HomeSettings.create({
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '10+', label: 'Industries Served' },
      { value: '99%', label: 'Client Satisfaction' },
      { value: '6+', label: 'Years Experience' },
    ],
  });
  console.log('✓ HomeSettings seeded');

  console.log('\n✅ Database seeded successfully!');
  await mongoose.disconnect();
}

main().catch(console.error);
