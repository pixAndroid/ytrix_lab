import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { page, event, sessionId, metadata } = body;

    if (!page) {
      return NextResponse.json({ success: false, error: 'Page is required' }, { status: 400 });
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || '';
    const referrer = req.headers.get('referer') || '';

    await Analytics.create({ page, event: event || 'pageview', sessionId, metadata, ipAddress, userAgent, referrer });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/track error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
