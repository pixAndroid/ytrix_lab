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
    const period = searchParams.get('period') || 'month';
    const days = period === 'week' ? 7 : period === 'month' ? 30 : parseInt(searchParams.get('days') || '30');
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const todaySince = new Date();
    todaySince.setHours(0, 0, 0, 0);
    const weekSince = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const monthSince = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [total, today, week, month, uniqueVisitors, topPagesRaw, recentEnquiries, totalBlogs, totalProducts] =
      await Promise.all([
        Analytics.countDocuments(),
        Analytics.countDocuments({ createdAt: { $gte: todaySince } }),
        Analytics.countDocuments({ createdAt: { $gte: weekSince } }),
        Analytics.countDocuments({ createdAt: { $gte: monthSince } }),
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

    const dailyRaw = await Analytics.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%m/%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topPages = topPagesRaw.map((p: { _id: string; count: number }) => ({ page: p._id, count: p.count }));
    const daily = dailyRaw.map((d: { _id: string; count: number }) => ({ date: d._id, count: d.count }));

    return NextResponse.json({
      success: true,
      data: {
        total,
        today,
        week,
        month,
        uniqueVisitors: uniqueVisitors.length,
        topPages,
        daily,
        recentEnquiries,
        totalBlogs,
        totalProducts,
      },
    });
  } catch (error) {
    console.error('GET /api/admin/analytics error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
