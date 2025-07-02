'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RemarksView from '@/components/sales/RemarksView';

export default function SalesRemarksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState<'zm' | 'agm' | 'management'>('management');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session?.user?.role) {
      setUserRole(session.user.role as 'zm' | 'agm' | 'management');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your data.</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sales and Remarks Overview</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Filter Sales Data and Remarks</h2>
            <p className="text-gray-600">
              {userRole === 'management' && 'View and filter sales data and remarks across all zones and areas.'}
              {userRole === 'agm' && 'View and filter sales data and remarks for your assigned zones.'}
              {userRole === 'zm' && 'View and filter sales data and remarks for your zone.'}
            </p>
          </div>

          <RemarksView 
            role={userRole}
            viewMode={userRole === 'management' ? 'zone' : userRole === 'agm' ? 'area' : 'subArea'}
          />
        </div>
      </div>
    </div>
  );
} 