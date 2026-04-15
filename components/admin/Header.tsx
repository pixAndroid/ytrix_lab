'use client';

import { useRouter } from 'next/navigation';
import { Menu, LogOut, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuClick, title }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        {title && <h1 className="text-lg font-semibold text-white">{title}</h1>}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
