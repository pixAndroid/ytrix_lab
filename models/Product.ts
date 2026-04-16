import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDoc extends Document {
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
  showOnHome: boolean;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String },
    images: [{ type: String }],
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number },
    downloadUrl: { type: String },
    demoUrl: { type: String },
    features: [{ type: String }],
    techStack: [{ type: String }],
    version: { type: String, default: '1.0.0' },
    license: { type: String, enum: ['free', 'paid', 'freemium'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive', 'coming-soon'], default: 'active' },
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
    showOnHome: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ status: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ license: 1 });

export default mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema);
