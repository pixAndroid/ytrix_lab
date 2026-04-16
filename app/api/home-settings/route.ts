import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomeSettings from '@/models/HomeSettings';

export async function GET() {
  try {
    await connectDB();
    const settings = await HomeSettings.findOne();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('GET /api/home-settings error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
