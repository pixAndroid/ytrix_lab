import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, unauthorized } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const media = await Media.findByIdAndDelete(params.id);
    if (!media) {
      return NextResponse.json({ success: false, error: 'Media not found' }, { status: 404 });
    }

    // Try to delete the file from disk
    try {
      const filePath = path.join(process.cwd(), 'public', media.url);
      await unlink(filePath);
    } catch {
      // File may not exist on disk, ignore error
    }

    return NextResponse.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
