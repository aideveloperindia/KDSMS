'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const getDashboardUrl = (role?: string) => {
  switch (role) {
    case 'management':
      return '/management';
    case 'agm':
      return '/agm';
    case 'zm':
      return '/zm';
    case 'executive':
      return '/agents';
    case 'agent':
      return '/agents';
    default:
      return '/agents';
  }
};

const getDashboardLabel = (role?: string) => {
  switch (role) {
    case 'management':
      return 'Management Dashboard';
    case 'agm':
      return 'AGM Dashboard';
    case 'zm':
      return 'ZM Dashboard';
    case 'executive':
      return 'Executive Dashboard';
    case 'agent':
      return 'Agent Dashboard';
    default:
      return 'Dashboard';
  }
};

const getTextColorClass = (isLandingPage: boolean) => {
  return isLandingPage ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-900';
};

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isDirectAccessPage = pathname === '/direct-access';

  // Don't show anything while loading
  if (status === 'loading') {
    return null;
  }

  return (
    <header className={`${isLandingPage || isDirectAccessPage ? 'bg-transparent absolute w-full z-50' : 'bg-white shadow-sm'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/icon.png"
                alt="KDSMS Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className={`ml-2 text-xl font-bold ${isLandingPage || isDirectAccessPage ? 'text-white' : 'text-gray-900'}`}>KDSMS</span>
            </Link>
          </div>

          {session?.user && (
            <div className="flex items-center space-x-4">
              <Link
                href={getDashboardUrl(session.user.role)}
                className={`text-sm ${getTextColorClass(isLandingPage || isDirectAccessPage)}`}
              >
                {getDashboardLabel(session.user.role)}
              </Link>
              {/* Only show sales links for agents and executives */}
              {(session.user.role === 'agent' || session.user.role === 'executive') && (
                <>
                  <Link
                    href="/sales/daily"
                    className={`text-sm ${getTextColorClass(isLandingPage || isDirectAccessPage)}`}
                  >
                    Daily Sales
                  </Link>
                  <Link
                    href="/sales/history"
                    className={`text-sm ${getTextColorClass(isLandingPage || isDirectAccessPage)}`}
                  >
                    Sales History
                  </Link>
                </>
              )}
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${isLandingPage || isDirectAccessPage ? 'text-white' : 'text-gray-600'}`}>
                  {session.user.name} ({session.user.employeeId})
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}