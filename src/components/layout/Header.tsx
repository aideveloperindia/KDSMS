'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthPage = pathname?.startsWith('/auth/');
  const isHomePage = pathname === '/';

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  // Get dashboard URL based on user role
  const getDashboardUrl = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'Agent': '/agents',
      'Executive': '/executives',
      'ZM': '/zm',
      'AGM': '/agm',
      'Management': '/management'
    };
    return roleMap[role] || '/dashboard';
  };

  // Determine background style based on page type
  const getNavStyle = () => {
    if (isHomePage || isAuthPage) {
      return "bg-white/[0.01] backdrop-blur-sm";
    }
    return "bg-white/95 backdrop-blur-md shadow-md";
  };

  // Determine text color based on page type
  const getTextColorClass = () => {
    if (isHomePage || isAuthPage) {
      return "text-white [text-shadow:_1px_1px_1px_rgb(0_0_0_/_70%)]";
    }
    return "text-gray-900";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${getNavStyle()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="KDSMS Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className={`ml-2 text-lg font-semibold ${getTextColorClass()}`}>
                KDSMS
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthPage && (
              status === 'authenticated' ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href={getDashboardUrl(session?.user?.role || '')}
                    className={`text-sm ${getTextColorClass()}`}
                  >
                    Dashboard
                  </Link>
                  <span className={`text-sm ${getTextColorClass()}`}>
                    Welcome, {session?.user?.name}
                    {session?.user?.zone && ` (${session.user.zone})`}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : status === 'unauthenticated' && !isHomePage ? (
                <Link
                  href="/auth/login"
                  className={`text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors`}
                >
                  Login
                </Link>
              ) : null
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}