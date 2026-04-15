import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsDoc extends Document {
  page: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
  event?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalyticsDoc>(
  {
    page: { type: String, required: true },
    referrer: { type: String },
    userAgent: { type: String },
    ipAddress: { type: String },
    sessionId: { type: String },
    event: { type: String, default: 'pageview' },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AnalyticsSchema.index({ page: 1, createdAt: -1 });
AnalyticsSchema.index({ createdAt: -1 });
AnalyticsSchema.index({ sessionId: 1 });

export default mongoose.models.Analytics || mongoose.model<IAnalyticsDoc>('Analytics', AnalyticsSchema);
