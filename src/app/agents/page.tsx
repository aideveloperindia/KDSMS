'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SalesEntry {
  date: string;
  quantity: number;
  amount: string;
  status: 'completed' | 'pending';
}

export default function AgentPage() {
  const agentData = {
    subAreaNumber: 1,
    name: 'Agent 1',
    areaNumber: 1,
    zoneNumber: 1,
    executiveName: 'Executive 1'
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
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url("/kdsms agent.png")',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="mt-16">
            <h1 className="text-2xl font-bold text-gray-800">Agent Dashboard</h1>
            <p className="text-gray-600">Sub Area {agentData.subAreaNumber}</p>
          </div>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-16"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <span className="ml-2 font-medium">{agentData.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">Sub Area:</span>
                  <span className="ml-2 font-medium">{agentData.subAreaNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Area:</span>
                  <span className="ml-2 font-medium">{agentData.areaNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Zone:</span>
                  <span className="ml-2 font-medium">{agentData.zoneNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Executive:</span>
                  <span className="ml-2 font-medium">{agentData.executiveName}</span>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Sales Entry</h3>
            <p className="text-gray-600">View and edit today's sales entry</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 