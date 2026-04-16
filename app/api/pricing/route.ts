import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pricing from '@/models/Pricing';

export async function GET() {
  try {
    await connectDB();
    const pricing = await Pricing.find({ status: 'active' }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: pricing });
  } catch (error) {
    console.error('GET /api/pricing error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
