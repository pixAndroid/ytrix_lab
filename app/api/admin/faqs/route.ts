import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const faqs = await FAQ.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error('GET /api/admin/faqs error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const body = await req.json();
    const faq = await FAQ.create(body);
    return NextResponse.json({ success: true, data: faq }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/faqs error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
