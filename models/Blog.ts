import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogDoc extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlogDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String, required: true, default: 'Yantrix Labs' },
    tags: [{ type: String }],
    category: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

BlogSchema.index({ status: 1, createdAt: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ category: 1 });

export default mongoose.models.Blog || mongoose.model<IBlogDoc>('Blog', BlogSchema);
