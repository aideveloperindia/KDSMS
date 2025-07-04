'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SalesEntry {
  date: string;
  quantity: number;
  amount: string;
  status: 'completed' | 'pending';
}

export default function AgentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user data in localStorage first
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      const user = JSON.parse(demoUser);
      setUserData(user);
      setLoading(false);
    } else if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user) {
      // Use session data as fallback
      setUserData({
        name: session.user.name || 'Unknown User',
        employeeId: session.user.employeeId || 'Unknown ID',
        subArea: session.user.subArea || 'Unknown',
        area: session.user.area || 'Unknown',
        zone: session.user.zone || 'Unknown',
        role: session.user.role || 'agent'
      });
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  const recentSales: SalesEntry[] = [
    { date: '2024-02-20', quantity: 52, amount: '₹5,200', status: 'completed' },
    { date: '2024-02-19', quantity: 48, amount: '₹4,800', status: 'completed' },
    { date: '2024-02-18', quantity: 55, amount: '₹5,500', status: 'completed' },
    { date: '2024-02-17', quantity: 50, amount: '₹5,000', status: 'completed' },
    { date: '2024-02-16', quantity: 51, amount: '₹5,100', status: 'completed' }
  ];

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url("/kdsms agent.png")',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mt-16 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {userData.role === 'agent' ? 'Agent Dashboard' : 'Executive Dashboard'}
          </h1>
          <p className="text-gray-600">
            {userData.role === 'agent' ? `Sub Area ${userData.subArea}` : `Area ${userData.area}`}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <span className="ml-2 font-medium">{userData.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">Employee ID:</span>
                  <span className="ml-2 font-medium">{userData.employeeId}</span>
                </div>
                {userData.role === 'agent' && (
                  <div>
                    <span className="text-gray-500">Sub Area:</span>
                    <span className="ml-2 font-medium">{userData.subArea}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Area:</span>
                  <span className="ml-2 font-medium">{userData.area}</span>
                </div>
                <div>
                  <span className="text-gray-500">Zone:</span>
                  <span className="ml-2 font-medium">{userData.zone}</span>
                </div>
                <div>
                  <span className="text-gray-500">Role:</span>
                  <span className="ml-2 font-medium capitalize">{userData.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Link 
            href="/sales/daily"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Daily Sales</h3>
            <p className="text-gray-600">Record your daily sales data and remarks</p>
          </Link>
          <Link 
            href="/sales/history"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">View Sales History</h3>
            <p className="text-gray-600">View your previous sales entries</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 