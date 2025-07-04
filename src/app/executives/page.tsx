'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExecutivePage() {
  // Demo user data - no login required
  const userData = {
    name: 'B Anil',
    employeeId: 'EXE-Z1A1-001',
    role: 'executive',
    zone: 1,
    area: 1,
    areaName: 'Karimnagar Central Area'
  };

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Demo agents data
  const agents = [
    { id: 'AGT-Z1A1-001', name: 'Ramesh Reddy', subArea: 1, todaysSales: 5200, status: 'active' },
    { id: 'AGT-Z1A1-002', name: 'Suresh Kumar', subArea: 2, todaysSales: 4800, status: 'active' },
    { id: 'AGT-Z1A1-003', name: 'Mahesh Babu', subArea: 3, todaysSales: 5500, status: 'active' },
    { id: 'AGT-Z1A1-004', name: 'Rajesh Reddy', subArea: 4, todaysSales: 4900, status: 'active' },
    { id: 'AGT-Z1A1-005', name: 'Venkatesh Rao', subArea: 5, todaysSales: 5100, status: 'active' },
    { id: 'AGT-Z1A1-006', name: 'Naresh Goud', subArea: 6, todaysSales: 4700, status: 'active' },
    { id: 'AGT-Z1A1-007', name: 'Ravi Teja', subArea: 7, todaysSales: 5300, status: 'active' },
    { id: 'AGT-Z1A1-008', name: 'Srinivas Reddy', subArea: 8, todaysSales: 4600, status: 'active' },
    { id: 'AGT-Z1A1-009', name: 'Kiran Kumar', subArea: 9, todaysSales: 5400, status: 'active' },
    { id: 'AGT-Z1A1-010', name: 'Praveen Reddy', subArea: 10, todaysSales: 4950, status: 'active' },
    { id: 'AGT-Z1A1-011', name: 'Anil Kumar', subArea: 11, todaysSales: 5050, status: 'active' },
    { id: 'AGT-Z1A1-012', name: 'Vijay Reddy', subArea: 12, todaysSales: 4850, status: 'active' },
    { id: 'AGT-Z1A1-013', name: 'Mohan Rao', subArea: 13, todaysSales: 5150, status: 'active' },
    { id: 'AGT-Z1A1-014', name: 'Ganesh Reddy', subArea: 14, todaysSales: 4750, status: 'active' },
    { id: 'AGT-Z1A1-015', name: 'Harish Kumar', subArea: 15, todaysSales: 5250, status: 'active' },
    { id: 'AGT-Z1A1-016', name: 'Santosh Reddy', subArea: 16, todaysSales: 4900, status: 'active' },
    { id: 'AGT-Z1A1-017', name: 'Prakash Rao', subArea: 17, todaysSales: 5000, status: 'active' },
    { id: 'AGT-Z1A1-018', name: 'Ramesh Kumar', subArea: 18, todaysSales: 4800, status: 'active' },
    { id: 'AGT-Z1A1-019', name: 'Sunil Reddy', subArea: 19, todaysSales: 5100, status: 'active' },
    { id: 'AGT-Z1A1-020', name: 'Vinod Kumar', subArea: 20, todaysSales: 4950, status: 'active' }
  ];

  const totalSales = agents.reduce((sum, agent) => sum + agent.todaysSales, 0);
  const avgSales = totalSales / agents.length;

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed relative pt-20"
      style={{ 
        backgroundImage: 'url("/kdsms executive.png")',
        minHeight: '100vh'
      }}
    >
      {/* Blur overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url("/kdsms executive.png")',
          filter: 'blur(1px)',
          zIndex: -1
      }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold text-gray-800">Executive Dashboard</h1>
              <p className="text-gray-600 text-lg">
                {userData.areaName} • Zone {userData.zone} • Area {userData.area}
              </p>
              <p className="text-gray-600">Managing 20 Agents</p>
          </div>
          <Link 
              href="/direct-access"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
              ← Back to Dashboard Menu
          </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Total</h3>
            <p className="text-3xl font-bold text-green-600">₹{formatNumber(totalSales)}</p>
            <p className="text-sm text-gray-600">{Math.round(totalSales/100)} Liters</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Agents</h3>
            <p className="text-3xl font-bold text-blue-600">{agents.length}</p>
            <p className="text-sm text-gray-600">All reporting</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Sales</h3>
            <p className="text-3xl font-bold text-purple-600">₹{formatNumber(Math.round(avgSales))}</p>
            <p className="text-sm text-gray-600">Per agent</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance</h3>
            <p className="text-3xl font-bold text-orange-600">98%</p>
            <p className="text-sm text-gray-600">Target achieved</p>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">My Agents - Daily Performance</h2>
          </div>
          <div className="p-6">
          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">Agent ID</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Sub Area</th>
                    <th className="text-left py-3 px-4">Today's Sales</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
                <tbody>
                {agents.map((agent) => (
                    <tr key={agent.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-xs">{agent.id}</td>
                      <td className="py-3 px-4 font-medium">{agent.name}</td>
                      <td className="py-3 px-4">{agent.subArea}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-green-600">
                          ₹{formatNumber(agent.todaysSales)}
                      </span>
                    </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {agent.status}
                        </span>
                    </td>
                      <td className="py-3 px-4">
                      <button
                          onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                          {selectedAgent === agent.id ? 'Hide' : 'View'} Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Link 
            href="/sales/daily"
            className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 block text-center"
            onClick={() => {
              // Set session storage to indicate executive is navigating to sales page
              sessionStorage.setItem('salesPageSource', 'executive');
            }}
          >
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-xl font-bold mb-2">Daily Sales Entry</h3>
            <p className="opacity-90">Record today's milk sales data</p>
          </Link>
          
          <Link 
            href="/sales/history"
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 block text-center"
            onClick={() => {
              // Set session storage to indicate executive is navigating to sales page
              sessionStorage.setItem('salesPageSource', 'executive');
            }}
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Area Sales Report</h3>
            <p className="opacity-90">View detailed sales analytics for your area</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 