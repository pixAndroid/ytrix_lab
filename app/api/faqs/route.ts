import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ status: 'active' }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error('GET /api/faqs error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
