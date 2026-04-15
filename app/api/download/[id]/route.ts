import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    if (product.license === 'paid') {
      const token = req.nextUrl.searchParams.get('token');
      if (!token) {
        return NextResponse.json({ success: false, error: 'Purchase required' }, { status: 403 });
      }
    }

    if (!product.downloadUrl) {
      return NextResponse.json({ success: false, error: 'Download not available' }, { status: 404 });
    }

    await Product.findByIdAndUpdate(params.id, { $inc: { downloads: 1 } });

    return NextResponse.redirect(product.downloadUrl);
  } catch (error) {
    console.error('GET /api/download/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
