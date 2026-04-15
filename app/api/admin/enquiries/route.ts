import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: enquiries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
