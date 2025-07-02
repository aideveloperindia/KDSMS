'use client';

import { useState } from 'react';
import Link from 'next/link';
import RemarksView from '@/components/sales/RemarksView';
import { formatCurrency, formatPerformance } from '@/lib/utils';

interface ZoneManager {
  id: number;
  zoneNumber: number;
  name: string;
  executives: number;
  agents: number;
  totalSales: number;
  performance: number;
}

interface Executive {
  id: number;
  areaNumber: number;
  name: string;
  zoneNumber: number;
  agents: number;
  totalSales: number;
  performance: number;
}

export default function AGMPage() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  // Generate zone managers data
  const zoneManagers: ZoneManager[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    zoneNumber: i + 1,
    name: `ZM ${i + 1}`,
    executives: 4,
    agents: 80,
    totalSales: 350000 + (i * 10000),
    performance: 90 - i
  }));

  // Generate executives data
  const executives: Executive[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    areaNumber: i + 1,
    name: `Executive ${i + 1}`,
    zoneNumber: Math.floor(i / 4) + 1,
    agents: 20,
    totalSales: 100000 - (i * 1000),
    performance: 95 - (i % 5)
  }));

  const totalSales = zoneManagers.reduce((sum, zm) => sum + zm.totalSales, 0);
  const averagePerformance = Math.floor(
    zoneManagers.reduce((sum, zm) => sum + zm.performance, 0) / zoneManagers.length
  );

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms agm.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">AGM Dashboard</h1>
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
            <h3 className="text-sm font-medium text-gray-500">Total Zones</h3>
            <p className="text-2xl font-bold text-blue-600">6</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Executives</h3>
            <p className="text-2xl font-bold text-green-600">24</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Agents</h3>
            <p className="text-2xl font-bold text-purple-600">480</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalSales)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Performance</h3>
            <p className="text-2xl font-bold text-indigo-600">{formatPerformance(averagePerformance)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Today</h3>
            <p className="text-2xl font-bold text-red-600">452</p>
          </div>
        </div>

        {/* Zone Managers Table */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Zone Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Manager</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executives</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {zoneManagers.map((zm) => (
                  <tr key={zm.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Zone {zm.zoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zm.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zm.executives}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zm.agents}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(zm.totalSales)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPerformance(zm.performance)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => setSelectedZone(zm.zoneNumber)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Executives
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Executives Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedZone 
                ? `Executives in Zone ${selectedZone}`
                : 'All Executives'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executive Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {executives
                  .filter(exec => !selectedZone || exec.zoneNumber === selectedZone)
                  .map((exec) => (
                    <tr key={exec.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Area {exec.areaNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exec.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Zone {exec.zoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exec.agents}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(exec.totalSales)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPerformance(exec.performance)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link 
                          href={`/executives/${exec.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Link 
            href="/sales/remarks"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-medium text-gray-800">Sales & Remarks</h3>
            <p className="text-sm text-gray-500">View and filter sales data with remarks</p>
          </Link>
          <Link 
            href="/reports/sales"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800">Sales Reports</h3>
            <p className="text-sm text-gray-500">View detailed sales reports and analytics</p>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales and Remarks</h2>
            <RemarksView 
              role="agm"
              viewMode="area"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 