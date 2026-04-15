import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const blog = await Blog.findOneAndUpdate(
      { slug: params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('GET /api/blogs/[slug] error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
