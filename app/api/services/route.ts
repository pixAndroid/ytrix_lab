import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ status: 'active' }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('GET /api/services error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
