import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, company, subject, message, serviceInterest, budget } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const source = req.headers.get('referer') || 'direct';

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
      serviceInterest,
      budget,
      ipAddress,
      source,
    });

    return NextResponse.json({ success: true, data: enquiry, message: 'Enquiry submitted successfully' }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('POST /api/enquiry error:', message);
    const isDev = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      { success: false, error: isDev ? message : 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
