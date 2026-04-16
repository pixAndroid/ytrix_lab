import mongoose, { Schema, Document } from 'mongoose';

export interface IFAQDoc extends Document {
  question: string;
  answer: string;
  order: number;
  status: 'active' | 'inactive';
}

const FAQSchema = new Schema<IFAQDoc>({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

FAQSchema.index({ status: 1, order: 1 });

export default mongoose.models.FAQ || mongoose.model<IFAQDoc>('FAQ', FAQSchema);
