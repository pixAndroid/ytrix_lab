import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const license = searchParams.get('license');
    const query: Record<string, unknown> = { status: 'active' };
    if (category) query.category = category;
    if (license) query.license = license;
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
