import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pricing from '@/models/Pricing';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const pricing = await Pricing.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: pricing });
  } catch (error) {
    console.error('GET /api/admin/pricing error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const body = await req.json();
    const pricing = await Pricing.create(body);
    return NextResponse.json({ success: true, data: pricing }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/pricing error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
