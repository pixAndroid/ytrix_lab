'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, Package, Mail, BarChart3, Image, X, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
  { icon: Briefcase, label: 'Services', href: '/admin/services' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Mail, label: 'Enquiries', href: '/admin/enquiries', badge: true },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Image, label: 'Media', href: '/admin/media' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [newEnquiries, setNewEnquiries] = useState(0);

  useEffect(() => {
    const fetchNewEnquiries = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) return;
        const res = await fetch('/api/admin/enquiries?status=new&limit=1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setNewEnquiries(data.pagination?.total ?? 0);
      } catch {
        // silently ignore network errors
      }
    };

    fetchNewEnquiries();
    const interval = setInterval(fetchNewEnquiries, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-30 transition-transform duration-300 lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Yantrix Admin</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href, badge }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            const showBadge = badge && newEnquiries > 0;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="flex-1">{label}</span>
                {showBadge && (
                  <span className="min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {newEnquiries > 99 ? '99+' : newEnquiries}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
