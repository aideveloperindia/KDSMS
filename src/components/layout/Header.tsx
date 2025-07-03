'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const getDashboardUrl = (role?: string) => {
  switch (role) {
    case 'management':
      return '/management';
    case 'agm':
      return '/agm';
    case 'zm':
      return '/zm';
    case 'executive':
      return '/executives';
    case 'agent':
      return '/agents';
    default:
      return '/dashboard';
  }
};

const getTextColorClass = () => {
  return 'text-gray-600 hover:text-gray-900';
};

export default function Header() {
  const { data: session, status } = useSession();

  // Don't show anything while loading
  if (status === 'loading') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="KDSMS Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">KDSMS</span>
            </Link>
          </div>

          {session?.user ? (
            <div className="flex items-center space-x-4">
              <Link
                href={getDashboardUrl(session.user.role)}
                className={`text-sm ${getTextColorClass()}`}
              >
                Dashboard
              </Link>
              <Link
                href="/sales/daily"
                className={`text-sm ${getTextColorClass()}`}
              >
                Daily Sales
              </Link>
              <Link
                href="/sales/history"
                className={`text-sm ${getTextColorClass()}`}
              >
                Sales History
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {session.user.name} ({session.user.employeeId})
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}