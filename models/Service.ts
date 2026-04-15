import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceDoc extends Document {
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
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    coverImage: { type: String },
    features: [{ type: String }],
    technologies: [{ type: String }],
    pricing: {
      basic: { price: Number, features: [String] },
      pro: { price: Number, features: [String] },
      enterprise: { price: Number, features: [String] },
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ status: 1, order: 1 });

export default mongoose.models.Service || mongoose.model<IServiceDoc>('Service', ServiceSchema);
