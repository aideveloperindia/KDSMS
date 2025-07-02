'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from './Header';
import Sidebar from './Sidebar';

interface User {
  name: string;
  role: string;
  zone?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if authenticated
    const token = document.cookie.includes('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      router.push('/auth/login');
    }
  }, [router]);

  if (!user) {
    return null;
  }

  // Get background image based on user role
  const getBackgroundImage = (role: string) => {
    const roleMap: { [key: string]: string } = {
      Agent: '/kdsms agent.png',
      Executive: '/kdsms executive.png',
      ZM: '/kdsms zm.png',
      AGM: '/kdsms agm.png',
      Management: '/kdsms management.png'
    };
    return roleMap[role] || '';
  };

  const menuItems = {
    agent: [
      { label: 'Daily Sales', href: '/sales/daily' },
      { label: 'Sales History', href: '/sales/history' },
      { label: 'My Profile', href: '/profile' },
    ],
    executive: [
      { label: 'Agent Management', href: '/agents' },
      { label: 'Sales Reports', href: '/reports/sales' },
      { label: 'Performance', href: '/reports/performance' },
    ],
    zonal_manager: [
      { label: 'Zone Overview', href: '/zone' },
      { label: 'Executive Management', href: '/executives' },
      { label: 'Zone Reports', href: '/reports/zone' },
    ],
    agm: [
      { label: 'Zone Management', href: '/zones' },
      { label: 'Manager Reports', href: '/reports/managers' },
      { label: 'Overall Analytics', href: '/analytics' },
    ],
    management: [
      { label: 'Company Overview', href: '/overview' },
      { label: 'All Reports', href: '/reports' },
      { label: 'User Management', href: '/users' },
      { label: 'Settings', href: '/settings' },
    ],
  };

  const roleKey = user.role.toLowerCase().replace('_', '');
  const currentMenuItems = menuItems[roleKey as keyof typeof menuItems] || [];

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={getBackgroundImage(user.role)}
          alt="Dashboard Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Subtle overlay for better content visibility */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Sidebar menuItems={currentMenuItems} />
          <main className="flex-1 p-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 