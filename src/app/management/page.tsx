'use client';

import Link from 'next/link';
import RemarksView from '@/components/sales/RemarksView';

export default function ManagementPage() {
  const overallStats = {
    totalRevenue: '₹2,250,000',
    monthlyGrowth: '+12%',
    totalZones: 6,
    totalExecutives: 24,
    totalAgents: 480,
    overallPerformance: '91%'
  };

  const topPerformers = {
    zones: [
      { name: 'Zone 1', performance: '95%', sales: '₹680,000' },
      { name: 'Zone 2', performance: '92%', sales: '₹750,000' },
      { name: 'Zone 3', performance: '88%', sales: '₹820,000' }
    ],
    executives: [
      { name: 'Executive 1', zone: 'Zone 1', performance: '94%', sales: '₹280,000' },
      { name: 'Executive 2', zone: 'Zone 2', performance: '92%', sales: '₹260,000' },
      { name: 'Executive 3', zone: 'Zone 3', performance: '90%', sales: '₹240,000' }
    ],
    agents: [
      { name: 'Agent 1', zone: 'Zone 1', performance: '96%', sales: '₹95,000' },
      { name: 'Agent 2', zone: 'Zone 2', performance: '95%', sales: '₹92,000' },
      { name: 'Agent 3', zone: 'Zone 3', performance: '94%', sales: '₹90,000' }
    ]
  };

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms management.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Management Dashboard</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-blue-600">{overallStats.totalRevenue}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Monthly Growth</h3>
            <p className="text-2xl font-bold text-green-600">{overallStats.monthlyGrowth}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Zones</h3>
            <p className="text-2xl font-bold text-purple-600">{overallStats.totalZones}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Executives</h3>
            <p className="text-2xl font-bold text-yellow-600">{overallStats.totalExecutives}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Agents</h3>
            <p className="text-2xl font-bold text-red-600">{overallStats.totalAgents}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Performance</h3>
            <p className="text-2xl font-bold text-indigo-600">{overallStats.overallPerformance}</p>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Top Zones */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Zones</h2>
            <div className="space-y-4">
              {topPerformers.zones.map((zone, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{zone.name}</p>
                    <p className="text-sm text-gray-500">Sales: {zone.sales}</p>
                  </div>
                  <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                    {zone.performance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Executives */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Executives</h2>
            <div className="space-y-4">
              {topPerformers.executives.map((exec, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{exec.name}</p>
                    <p className="text-sm text-gray-500">{exec.zone} - Sales: {exec.sales}</p>
                  </div>
                  <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                    {exec.performance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Agents */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Agents</h2>
            <div className="space-y-4">
              {topPerformers.agents.map((agent, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.zone} - Sales: {agent.sales}</p>
                  </div>
                  <span className="px-2 py-1 rounded text-sm bg-purple-100 text-purple-800">
                    {agent.performance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/sales/remarks"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-medium text-gray-800">Sales & Remarks</h3>
            <p className="text-sm text-gray-500">View and filter all sales data with remarks</p>
          </Link>
          <Link 
            href="/reports/sales"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales Reports</h3>
            <p className="text-gray-600">View detailed sales analytics</p>
          </Link>
          <Link 
            href="/reports/performance"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Reports</h3>
            <p className="text-gray-600">Track all team metrics</p>
          </Link>
          <Link 
            href="/reports/analytics"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-600">Advanced business insights</p>
          </Link>
          <Link 
            href="/settings/system"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Configure system settings</p>
          </Link>
        </div>

        {/* Sales and Remarks View */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales and Remarks Overview</h2>
            <p className="text-sm text-gray-600 mb-4">View and filter sales data and remarks across all zones and areas.</p>
            <RemarksView 
              role="management"
              viewMode="zone"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 