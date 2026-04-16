import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

const MAX_FILE_SIZE = parseInt(process.env.UPLOAD_MAX_FILE_SIZE ?? '', 10) || 10 * 1024 * 1024; // default 10 MB

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'application/pdf': '.pdf',
};

// ── Cloudinary (used in production when env vars are present) ──────────────
function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

async function getCloudinary() {
  const { v2: cloudinary } = await import('cloudinary');
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

async function saveFileCloudinary(file: File): Promise<{ filename: string; url: string }> {
  const cloudinary = await getCloudinary();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'ytrix_lab', resource_type: 'auto' },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Cloudinary upload failed'));
        resolve(result as { public_id: string; secure_url: string });
      }
    );
    uploadStream.end(buffer);
  });

  return { filename: result.public_id, url: result.secure_url };
}

async function deleteFileCloudinary(filename: string): Promise<void> {
  const cloudinary = await getCloudinary();
  // Use 'auto' resource type to handle images, PDFs, and other file types correctly
  await cloudinary.uploader.destroy(filename, { resource_type: 'auto' }).catch(() => {
    // Ignore deletion errors (file may already be gone)
  });
}

// ── Local filesystem (dev / self-hosted) ──────────────────────────────────
function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

function isSafeFilename(filename: string): boolean {
  // Must not contain path separators or null bytes, and must be a non-empty basename only
  return (
    filename.length > 0 &&
    !filename.includes('/') &&
    !filename.includes('\\') &&
    !filename.includes('\0') &&
    filename === path.basename(filename)
  );
}

async function saveFileLocal(file: File): Promise<{ filename: string; url: string }> {
  ensureUploadsDir();

  const ext = MIME_TO_EXT[file.type];
  const filename = `${crypto.randomUUID()}${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);

  const bytes = await file.arrayBuffer();
  await fs.promises.writeFile(filepath, Buffer.from(bytes));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? '';
  return { filename, url: `${appUrl}/uploads/${filename}` };
}

async function deleteFileLocal(filename: string): Promise<void> {
  if (!isSafeFilename(filename)) {
    throw new Error('Invalid filename.');
  }

  const filepath = path.join(UPLOADS_DIR, filename);
  try {
    await fs.promises.unlink(filepath);
  } catch {
    // File may not exist, ignore error
  }
}

// ── Public API ─────────────────────────────────────────────────────────────
export async function saveFile(file: File): Promise<{ filename: string; url: string }> {
  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    throw new Error(`File type '${file.type}' is not allowed.`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024} MB.`);
  }

  if (isCloudinaryConfigured()) {
    return saveFileCloudinary(file);
  }
  return saveFileLocal(file);
}

export async function deleteFile(filename: string): Promise<void> {
  if (isCloudinaryConfigured()) {
    return deleteFileCloudinary(filename);
  }
  return deleteFileLocal(filename);
}
