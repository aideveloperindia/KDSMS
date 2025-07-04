'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SalesEntry {
  date: string;
  quantity: number;
  amount: string;
  status: string;
}

export default function AgentPage() {
  // Demo user data - no login required
  const userData = {
    name: 'Ramesh Reddy',
    employeeId: 'AGT-Z1A1-001',
    role: 'agent',
    zone: 1,
    area: 1,
    subArea: 1,
    subAreaName: 'Karimnagar Central'
  };

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const recentSales: SalesEntry[] = [
    { date: '2024-02-20', quantity: 52, amount: '₹5,200', status: 'completed' },
    { date: '2024-02-19', quantity: 48, amount: '₹4,800', status: 'completed' },
    { date: '2024-02-18', quantity: 55, amount: '₹5,500', status: 'completed' },
    { date: '2024-02-17', quantity: 50, amount: '₹5,000', status: 'completed' },
    { date: '2024-02-16', quantity: 51, amount: '₹5,100', status: 'completed' }
  ];

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat bg-fixed relative pt-16 sm:pt-20"
      style={{ 
        backgroundImage: 'url("/kdsms agent.png")',
        minHeight: '100vh'
      }}
    >
      {/* Blur overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url("/kdsms agent.png")',
          filter: 'blur(1px)',
          zIndex: -1
      }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Agent Dashboard
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Zone {userData.zone} • Area {userData.area} • Sub Area {userData.subArea}
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

        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{userData.name}</h2>
              <p className="text-sm sm:text-base text-gray-600">Employee ID: {userData.employeeId}</p>
              <p className="text-sm sm:text-base text-gray-600">Sub Area: {userData.subAreaName}</p>
            </div>
                </div>
                </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2">Today's Sales</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{formatNumber(5200)}</p>
            <p className="text-xs sm:text-sm text-gray-600">52 Liters</p>
                </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2">This Week</h3>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">₹{formatNumber(25600)}</p>
            <p className="text-xs sm:text-sm text-gray-600">256 Liters</p>
                </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2">This Month</h3>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">₹{formatNumber(102400)}</p>
            <p className="text-xs sm:text-sm text-gray-600">1,024 Liters</p>
                </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2">Avg Daily</h3>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">₹{formatNumber(5120)}</p>
            <p className="text-xs sm:text-sm text-gray-600">51.2 Liters</p>
              </div>
            </div>

        {/* Recent Sales */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{sale.date}</td>
                    <td className="py-2">{sale.quantity} L</td>
                    <td className="py-2">{sale.amount}</td>
                    <td className="py-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Link 
            href="/sales/daily"
            className="bg-green-500 hover:bg-green-600 text-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 block text-center"
            onClick={() => {
              // Set session storage to indicate agent is navigating to sales page
              sessionStorage.setItem('salesPageSource', 'agent');
            }}
          >
            <div className="text-3xl sm:text-4xl mb-3">📊</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Enter Daily Sales</h3>
            <p className="opacity-90 text-sm sm:text-base">Record your daily sales data and remarks</p>
          </Link>
          <Link 
            href="/sales/history"
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 block text-center"
            onClick={() => {
              // Set session storage to indicate agent is navigating to sales page
              sessionStorage.setItem('salesPageSource', 'agent');
            }}
          >
            <div className="text-3xl sm:text-4xl mb-3">📈</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">View Sales History</h3>
            <p className="opacity-90 text-sm sm:text-base">View your previous sales entries and trends</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 