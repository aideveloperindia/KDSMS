'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ManagementPage() {
  // Demo user data - no login required
  const userData = {
    name: 'Rajesh Kumar',
    employeeId: 'MGMT-001',
    role: 'management',
    companyName: 'Karimnagar Dairy'
  };

  const [activeView, setActiveView] = useState<'overview' | 'zones' | 'performance'>('overview');

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Demo company data
  const companyStats = {
    totalSales: 2320000,
    totalZones: 6,
    totalAreas: 24,
    totalAgents: 480,
    avgSalesPerAgent: 4833
  };

  const zoneData = [
    { zone: 1, manager: 'Reddy Rajesh', sales: 392000, performance: 101 },
    { zone: 2, manager: 'Sharma Vikram', sales: 385000, performance: 99 },
    { zone: 3, manager: 'Kumar Ashok', sales: 378000, performance: 97 },
    { zone: 4, manager: 'Reddy Mahesh', sales: 395000, performance: 102 },
    { zone: 5, manager: 'Goud Naresh', sales: 388000, performance: 100 },
    { zone: 6, manager: 'Rao Venkatesh', sales: 382000, performance: 98 }
  ];

  const recentActivity = [
    { time: '10:30 AM', activity: 'Zone 4 exceeded daily target by 5%', type: 'success' },
    { time: '09:45 AM', activity: 'Executive B Anil submitted Area 1 report', type: 'info' },
    { time: '09:15 AM', activity: 'Zone 3 reported network connectivity issue', type: 'warning' },
    { time: '08:30 AM', activity: 'Daily sales targets distributed to all zones', type: 'info' },
    { time: '08:00 AM', activity: 'System backup completed successfully', type: 'success' }
  ];

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed relative pt-20"
      style={{ 
        backgroundImage: 'url("/kdsms management.png")',
        minHeight: '100vh'
      }}
    >
      {/* Blur overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url("/kdsms management.png")',
          filter: 'blur(1px)',
          zIndex: -1
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Management Dashboard</h1>
              <p className="text-gray-600 text-base sm:text-lg">
                {userData.companyName} • Complete Company Overview
              </p>
            </div>
          <Link 
              href="/direct-access"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center sm:text-left whitespace-nowrap"
          >
              ← Back to Dashboard Menu
          </Link>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded ${activeView === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Company Overview
            </button>
            <button
              onClick={() => setActiveView('zones')}
              className={`px-4 py-2 rounded ${activeView === 'zones' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Zone Analysis
            </button>
            <button
              onClick={() => setActiveView('performance')}
              className={`px-4 py-2 rounded ${activeView === 'performance' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Performance Metrics
            </button>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-green-600">₹{formatNumber(companyStats.totalSales)}</p>
            <p className="text-sm text-gray-600">Today's collection</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Zones</h3>
            <p className="text-3xl font-bold text-blue-600">{companyStats.totalZones}</p>
            <p className="text-sm text-gray-600">All operational</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Areas</h3>
            <p className="text-3xl font-bold text-purple-600">{companyStats.totalAreas}</p>
            <p className="text-sm text-gray-600">4 per zone</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Agents</h3>
            <p className="text-3xl font-bold text-orange-600">{companyStats.totalAgents}</p>
            <p className="text-sm text-gray-600">All active</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg/Agent</h3>
            <p className="text-3xl font-bold text-red-600">₹{formatNumber(companyStats.avgSalesPerAgent)}</p>
            <p className="text-sm text-gray-600">Daily average</p>
          </div>
        </div>

        {/* Dynamic Content Based on Active View */}
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone Performance Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Zone Performance</h3>
              <div className="space-y-4">
                {zoneData.map((zone) => (
                  <div key={zone.zone} className="flex items-center">
                    <div className="w-16 text-sm font-medium">Zone {zone.zone}</div>
                    <div className="flex-1 mx-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{zone.manager}</span>
                        <span>₹{formatNumber(zone.sales)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" 
                          style={{ width: `${(zone.sales / Math.max(...zoneData.map(z => z.sales))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">
                      {zone.performance}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{item.activity}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      item.type === 'success' ? 'bg-green-100 text-green-800' :
                      item.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'zones' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Zone Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Zone</th>
                    <th className="text-left py-3 px-4">Manager</th>
                    <th className="text-left py-3 px-4">Sales</th>
                    <th className="text-left py-3 px-4">Performance</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneData.map((zone) => (
                    <tr key={zone.zone} className="border-b">
                      <td className="py-3 px-4 font-medium">Zone {zone.zone}</td>
                      <td className="py-3 px-4">{zone.manager}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">₹{formatNumber(zone.sales)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          zone.performance >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {zone.performance}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Zones</h3>
              <div className="space-y-3">
                {zoneData
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 3)
                  .map((zone, index) => (
                    <div key={zone.zone} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">Zone {zone.zone}</p>
                          <p className="text-sm text-gray-600">{zone.manager}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹{formatNumber(zone.sales)}</p>
                        <p className="text-sm text-gray-600">{zone.performance}%</p>
                      </div>
                </div>
              ))}
            </div>
          </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-semibold text-green-600">₹{formatNumber(companyStats.totalSales)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue per Zone</span>
                  <span className="font-semibold">₹{formatNumber(Math.round(companyStats.totalSales / companyStats.totalZones))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue per Area</span>
                  <span className="font-semibold">₹{formatNumber(Math.round(companyStats.totalSales / companyStats.totalAreas))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue per Agent</span>
                  <span className="font-semibold">₹{formatNumber(companyStats.avgSalesPerAgent)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 