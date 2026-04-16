import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pricing from '@/models/Pricing';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  const { id } = await params;
  try {
    await connectDB();
    const pricing = await Pricing.findById(id);
    if (!pricing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: pricing });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const pricing = await Pricing.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!pricing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: pricing });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  const { id } = await params;
  try {
    await connectDB();
    const pricing = await Pricing.findByIdAndDelete(id);
    if (!pricing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Pricing plan deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
