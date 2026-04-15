import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaDoc extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  folder?: string;
  createdAt: Date;
}

const MediaSchema = new Schema<IMediaDoc>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    alt: { type: String },
    folder: { type: String, default: 'general' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

MediaSchema.index({ folder: 1, createdAt: -1 });

export default mongoose.models.Media || mongoose.model<IMediaDoc>('Media', MediaSchema);
