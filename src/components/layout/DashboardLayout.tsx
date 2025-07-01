'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <div className="flex">
        <Sidebar menuItems={menuItems[user.role as keyof typeof menuItems]} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 