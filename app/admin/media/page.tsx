'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Upload, Image as ImageIcon, FileText, Trash2, Copy, Check } from 'lucide-react';

interface Media {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  folder?: string;
  createdAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setMedia(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchMedia();
      } else {
        setUploadError(data.error || 'Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setUploadError('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/admin/media/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AdminLayout title="Media Library">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Media Library</h2>
            <p className="text-sm text-gray-400">{media.length} files</p>
          </div>
          <div>
            <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.zip" onChange={handleUpload} className="hidden" id="media-upload" />
            <label htmlFor="media-upload"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity cursor-pointer text-sm">
              {uploading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? 'Uploading...' : 'Upload Files'}
            </label>
          </div>
        </div>

        {/* Upload Error */}
        {uploadError && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            <span className="shrink-0" role="img" aria-label="Warning">⚠</span>
            <span>{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="ml-auto shrink-0 hover:text-red-300 transition-colors">✕</button>
          </div>
        )}

        {/* Upload Drop Zone */}
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors group"
        >
          <Upload className="w-10 h-10 text-gray-600 group-hover:text-blue-400 mx-auto mb-3 transition-colors" />
          <p className="text-gray-400 text-sm">Click to upload or drag & drop</p>
          <p className="text-gray-600 text-xs mt-1">Images, PDFs, ZIPs supported</p>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : media.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400">No files uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((item) => (
              <div key={item._id} className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {item.mimeType.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.alt || item.originalName}
                    className="w-full aspect-square object-cover" />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-gray-800">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(item.url)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                    {copied === item.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-400 truncate">{item.originalName}</p>
                  <p className="text-xs text-gray-600">{formatBytes(item.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
