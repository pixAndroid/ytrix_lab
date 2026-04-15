import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiryDoc extends Document {
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
}

const EnquirySchema = new Schema<IEnquiryDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    company: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    serviceInterest: { type: String },
    budget: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'resolved', 'closed'],
      default: 'new',
    },
    source: { type: String },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ email: 1 });

export default mongoose.models.Enquiry || mongoose.model<IEnquiryDoc>('Enquiry', EnquirySchema);
