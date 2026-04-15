import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

  console.log('\n✅ Database seeded successfully!');
  await mongoose.disconnect();
}

main().catch(console.error);
