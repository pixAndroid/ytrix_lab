import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, unauthorized } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import { deleteFile } from '@/lib/upload';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  const { id } = await params;
  try {
    await connectDB();
    const media = await Media.findByIdAndDelete(id);
    if (!media) {
      return NextResponse.json({ success: false, error: 'Media not found' }, { status: 404 });
    }

    // Delete the file from local storage
    await deleteFile(media.filename);

    return NextResponse.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
