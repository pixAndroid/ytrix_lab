import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, unauthorized } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import cloudinary from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const media = await Media.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = authenticateAdmin(req);
  if (!admin) return unauthorized();

  try {
    await connectDB();
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;
    const allFiles = files.length > 0 ? files : singleFile ? [singleFile] : [];

    if (allFiles.length === 0) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const created = [];
    for (const file of allFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'ytrix_lab', resource_type: 'auto' },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error('Upload failed'));
            resolve(result);
          }
        ).end(buffer);
      });

      const media = await Media.create({
        filename: result.public_id, // stores Cloudinary public_id for later deletion
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: result.secure_url,
        folder: 'general',
      });
      created.push(media);
    }

    return NextResponse.json({ success: true, data: created.length === 1 ? created[0] : created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
