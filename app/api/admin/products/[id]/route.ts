import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!product) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
