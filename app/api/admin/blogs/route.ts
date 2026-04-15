import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { authenticateAdmin, unauthorized } from '@/lib/auth';
import { generateSlug, calculateReadTime } from '@/lib/utils';

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

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content');

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET /api/admin/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const body = await req.json();
    const { title, excerpt, content, coverImage, author, tags, category, status, seoTitle, seoDescription } = body;

    if (!title || !excerpt || !content || !category) {
      return NextResponse.json({ success: false, error: 'Title, excerpt, content, and category are required' }, { status: 400 });
    }

    const slug = generateSlug(title);
    const readTime = calculateReadTime(content);

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author: author || 'Yantrix Labs',
      tags: tags || [],
      category,
      status: status || 'draft',
      readTime,
      seoTitle,
      seoDescription,
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/blogs error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
