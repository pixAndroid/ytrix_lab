import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await connectDB();
    const items = await Portfolio.find({ status: 'active' }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('GET /api/portfolio error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
