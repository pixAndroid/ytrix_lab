import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingDoc extends Document {
  title: string;
  price: string;
  label: string;
  gradient: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  order: number;
  status: 'active' | 'inactive';
}

const PricingSchema = new Schema<IPricingDoc>({
  title: { type: String, required: true, trim: true },
  price: { type: String, required: true },
  label: { type: String, required: true },
  gradient: { type: String, required: true },
  features: [{ type: String }],
  cta: { type: String, required: true, default: 'Get Started' },
  highlighted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

PricingSchema.index({ status: 1, order: 1 });

export default mongoose.models.Pricing || mongoose.model<IPricingDoc>('Pricing', PricingSchema);
