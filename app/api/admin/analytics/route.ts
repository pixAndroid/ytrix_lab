import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';
import Blog from '@/models/Blog';
import Enquiry from '@/models/Enquiry';
import Product from '@/models/Product';
import { authenticateAdmin, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [totalPageViews, uniqueVisitors, topPages, recentEnquiries, totalBlogs, totalProducts] =
      await Promise.all([
        Analytics.countDocuments({ createdAt: { $gte: since } }),
        Analytics.distinct('sessionId', { createdAt: { $gte: since }, sessionId: { $ne: null } }),
        Analytics.aggregate([
          { $match: { createdAt: { $gte: since } } },
          { $group: { _id: '$page', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),
        Enquiry.countDocuments({ createdAt: { $gte: since } }),
        Blog.countDocuments({ status: 'published' }),
        Product.countDocuments({ status: 'active' }),
      ]);

    const dailyViews = await Analytics.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalPageViews,
        uniqueVisitors: uniqueVisitors.length,
        topPages,
        recentEnquiries,
        totalBlogs,
        totalProducts,
        dailyViews,
      },
    });
  } catch (error) {
    console.error('GET /api/admin/analytics error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
