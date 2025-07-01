'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentPlusIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface User {
  name: string;
  role: string;
  zone?: string;
}

interface DashboardStats {
  totalSales: number;
  todaySales: number;
  activeAgents: number;
  performance: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    todaySales: 0,
    activeAgents: 0,
    performance: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));

    // TODO: Fetch actual stats from API
    setStats({
      totalSales: 150000,
      todaySales: 5000,
      activeAgents: 25,
      performance: 92,
    });
  }, [router]);

  if (!user) return null;

  const renderRoleBasedContent = () => {
    switch (user.role) {
      case 'agent':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Today's Sales</h3>
              <p className="text-3xl font-bold text-blue-600">₹{stats.todaySales}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              <p className="text-3xl font-bold text-green-600">{stats.performance}%</p>
            </div>
          </div>
        );

      case 'executive':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Total Sales</h3>
              <p className="text-3xl font-bold text-blue-600">₹{stats.totalSales}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Active Agents</h3>
              <p className="text-3xl font-bold text-green-600">{stats.activeAgents}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.performance}%</p>
            </div>
          </div>
        );

      case 'zonal_manager':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Zone Sales</h3>
                <p className="text-3xl font-bold text-blue-600">₹{stats.totalSales}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Active Executives</h3>
                <p className="text-3xl font-bold text-green-600">{stats.activeAgents}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Zone Performance</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.performance}%</p>
              </div>
            </div>
            {/* Add zone-specific charts and analytics here */}
          </div>
        );

      case 'agm':
      case 'management':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Total Revenue</h3>
                <p className="text-3xl font-bold text-blue-600">₹{stats.totalSales}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Active Zones</h3>
                <p className="text-3xl font-bold text-green-600">5</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Total Agents</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.activeAgents}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.performance}%</p>
              </div>
            </div>
            {/* Add company-wide analytics and charts here */}
          </div>
        );

      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <DashboardLayout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex space-x-4">
          <a
            href="/sales/daily"
            className="flex-1 card hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center space-x-2 py-4"
          >
            <DocumentPlusIcon className="w-6 h-6 text-primary-600" />
            <span className="font-medium">New Sales Entry</span>
          </a>
          <a
            href="/sales/history"
            className="flex-1 card hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center space-x-2 py-4"
          >
            <ChartBarIcon className="w-6 h-6 text-primary-600" />
            <span className="font-medium">View Sales History</span>
          </a>
        </div>

        {/* Performance Metrics */}
        {renderRoleBasedContent()}

        {/* Recent Entries */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Entries</h3>
            <a
              href="/sales/history"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Milk Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Mock data - replace with actual API data */}
                {/* {performanceData.recentEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.milkType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.quantitySold}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{entry.revenue}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 