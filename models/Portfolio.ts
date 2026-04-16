import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioDoc extends Document {
  title: string;
  category: string;
  gradient: string;
  imageUrl?: string;
  link?: string;
  order: number;
  status: 'active' | 'inactive';
}

const PortfolioSchema = new Schema<IPortfolioDoc>({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  gradient: { type: String, required: true },
  imageUrl: { type: String },
  link: { type: String },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

PortfolioSchema.index({ status: 1, order: 1 });

export default mongoose.models.Portfolio || mongoose.model<IPortfolioDoc>('Portfolio', PortfolioSchema);
