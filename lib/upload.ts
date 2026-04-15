import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function saveFile(file: File): Promise<{ filename: string; url: string }> {
  ensureUploadsDir();

  const ext = path.extname(file.name) || '';
  const filename = `${crypto.randomUUID()}${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);

  const bytes = await file.arrayBuffer();
  await fs.promises.writeFile(filepath, Buffer.from(bytes));

  return { filename, url: `/uploads/${filename}` };
}

export async function deleteFile(filename: string): Promise<void> {
  const filepath = path.join(UPLOADS_DIR, filename);
  try {
    await fs.promises.unlink(filepath);
  } catch {
    // File may not exist, ignore error
  }
}
