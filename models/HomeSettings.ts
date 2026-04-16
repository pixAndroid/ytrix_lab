import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeStat {
  value: string;
  label: string;
}

export interface IHomeSettingsDoc extends Document {
  stats: IHomeStat[];
}

const HomeSettingsSchema = new Schema<IHomeSettingsDoc>({
  stats: [{
    value: { type: String, required: true },
    label: { type: String, required: true },
  }],
}, { timestamps: true });

export default mongoose.models.HomeSettings || mongoose.model<IHomeSettingsDoc>('HomeSettings', HomeSettingsSchema);
