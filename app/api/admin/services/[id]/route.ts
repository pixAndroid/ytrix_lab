import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();
  try {
    await connectDB();
    const service = await Service.findById(params.id);
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: service });
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
    const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: service });
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
    const service = await Service.findByIdAndDelete(params.id);
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
