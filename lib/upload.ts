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

export async function saveFile(file: File): Promise<{ filename: string; url: string }> {
  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    throw new Error(`File type '${file.type}' is not allowed.`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024} MB.`);
  }

  ensureUploadsDir();

  const filename = `${crypto.randomUUID()}${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);

  const bytes = await file.arrayBuffer();
  await fs.promises.writeFile(filepath, Buffer.from(bytes));

  return { filename, url: `/uploads/${filename}` };
}

export async function deleteFile(filename: string): Promise<void> {
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
