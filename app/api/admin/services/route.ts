import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { authenticateAdmin, unauthorized } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const total = await Service.countDocuments();
    const services = await Service.find().sort({ order: 1 }).skip((page - 1) * limit).limit(limit);
    return NextResponse.json({
      success: true,
      data: services,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET /api/admin/services error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const body = await req.json();
    if (!body.slug && body.title) body.slug = generateSlug(body.title);
    const service = await Service.create(body);
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/services error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
