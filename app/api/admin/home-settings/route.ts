import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomeSettings from '@/models/HomeSettings';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const settings = await HomeSettings.findOne();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('GET /api/admin/home-settings error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const body = await req.json();
    const settings = await HomeSettings.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('PUT /api/admin/home-settings error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
