'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
}

interface User {
  name: string;
  role: 'agent' | 'executive' | 'zm' | 'agm' | 'management';
  zone?: number;
  area?: number;
  subArea?: number;
  employeeId: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  user: User;
}

export default function Sidebar({ menuItems, user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="text-gray-300 text-sm">
          <div>ID: {user.employeeId}</div>
          {user.zone && <div>Zone: {user.zone}</div>}
          {user.area && <div>Area: {user.area}</div>}
          {user.subArea && <div>Sub-Area: {user.subArea}</div>}
        </div>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                  pathname === item.href ? 'bg-gray-700 text-white' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 