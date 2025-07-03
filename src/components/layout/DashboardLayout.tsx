'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Header from './Header';
import Sidebar from './Sidebar';

interface User {
  name: string;
  role: 'agent' | 'executive' | 'zm' | 'agm' | 'management';
  zone?: number;
  area?: number;
  subArea?: number;
  employeeId: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    if (status === 'authenticated' && session.user) {
      setUser({
        name: session.user.name || '',
        role: session.user.role || 'agent',
        zone: session.user.zone,
        area: session.user.area,
        subArea: session.user.subArea,
        employeeId: session.user.employeeId || ''
      });
    }
  }, [status, session, router]);

  if (status === 'loading' || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Get background image based on user role
  const getBackgroundImage = (role: string) => {
    const roleMap: { [key: string]: string } = {
      agent: '/kdsms agent.png',
      executive: '/kdsms executive.png',
      zm: '/kdsms zm.png',
      agm: '/kdsms agm.png',
      management: '/kdsms management.png'
    };
    return roleMap[role] || '';
  };

  const menuItems = {
    agent: [
      { label: 'Daily Sales', href: '/sales/daily' },
      { label: 'Sales History', href: '/sales/history' },
      { label: 'Add Remarks', href: '/sales/remarks' }
    ],
    executive: [
      { label: 'My Agents', href: '/agents' },
      { label: 'Agent Sales', href: '/sales/history' },
      { label: 'Add Remarks', href: '/sales/remarks' }
    ],
    zm: [
      { label: 'Zone Overview', href: '/zones' },
      { label: 'Executives', href: '/executives' },
      { label: 'Zone Sales', href: '/sales/history' }
    ],
    agm: [
      { label: 'All Zones', href: '/zones' },
      { label: 'Zone Managers', href: '/zm' },
      { label: 'Company Sales', href: '/sales/history' }
    ],
    management: [
      { label: 'Company Overview', href: '/dashboard' },
      { label: 'User Management', href: '/management' },
      { label: 'Company Sales', href: '/sales/history' }
    ]
  };

  const currentMenuItems = menuItems[user.role] || [];

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
        <Header user={user} />
        <div className="flex-1 flex">
          <Sidebar menuItems={currentMenuItems} user={user} />
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