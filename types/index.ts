export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
  views: number;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  coverImage?: string;
  features: string[];
  technologies: string[];
  pricing?: {
    basic?: { price: number; features: string[] };
    pro?: { price: number; features: string[] };
    enterprise?: { price: number; features: string[] };
  };
  status: 'active' | 'inactive';
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage?: string;
  images: string[];
  category: string;
  price: number;
  discountPrice?: number;
  downloadUrl?: string;
  demoUrl?: string;
  features: string[];
  techStack: string[];
  version: string;
  license: 'free' | 'paid' | 'freemium';
  status: 'active' | 'inactive' | 'coming-soon';
  downloads: number;
  rating: number;
  reviewCount: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEnquiry {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  budget?: string;
  status: 'new' | 'contacted' | 'in-progress' | 'resolved' | 'closed';
  source?: string;
  ipAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnalytics {
  _id?: string;
  page: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
  event?: string;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
}

export interface IMedia {
  _id?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  folder?: string;
  createdAt?: Date;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface JWTPayload {
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}
