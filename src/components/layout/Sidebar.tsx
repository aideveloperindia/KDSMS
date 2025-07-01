'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-800">
      <nav className="mt-8">
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