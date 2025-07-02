'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">KDSMS Dashboard</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sales Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Sales Management</h2>
            <div className="space-y-3">
              <Link 
                href="/sales/daily" 
                className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
              >
                Daily Sales Entry
              </Link>
              <Link 
                href="/sales/history" 
                className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
              >
                Sales History
              </Link>
            </div>
          </div>

          {/* Agent Management */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Agent Management</h2>
            <div className="space-y-3">
              <Link 
                href="/agents" 
                className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center"
              >
                View Agents
              </Link>
              <Link 
                href="/agents/performance" 
                className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center"
              >
                Agent Performance
              </Link>
            </div>
          </div>

          {/* Executive Management */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Executive Management</h2>
            <div className="space-y-3">
              <Link 
                href="/executives" 
                className="block w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 text-center"
              >
                View Executives
              </Link>
              <Link 
                href="/executives/performance" 
                className="block w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 text-center"
              >
                Executive Performance
              </Link>
            </div>
          </div>

          {/* Zone Management */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Zone Management</h2>
            <div className="space-y-3">
              <Link 
                href="/zones" 
                className="block w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 text-center"
              >
                View Zones
              </Link>
              <Link 
                href="/zones/performance" 
                className="block w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 text-center"
              >
                Zone Performance
              </Link>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Reports</h2>
            <div className="space-y-3">
              <Link 
                href="/reports/sales" 
                className="block w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-center"
              >
                Sales Reports
              </Link>
              <Link 
                href="/reports/performance" 
                className="block w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-center"
              >
                Performance Reports
              </Link>
              <Link 
                href="/reports/analytics" 
                className="block w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-center"
              >
                Analytics
              </Link>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="space-y-3">
              <Link 
                href="/settings/profile" 
                className="block w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-center"
              >
                Profile Settings
              </Link>
              <Link 
                href="/settings/system" 
                className="block w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-center"
              >
                System Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-blue-600">₹150,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Active Agents</h3>
            <p className="text-3xl font-bold text-green-600">25</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Active Zones</h3>
            <p className="text-3xl font-bold text-yellow-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Performance</h3>
            <p className="text-3xl font-bold text-purple-600">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
} 