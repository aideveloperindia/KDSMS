'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SalesEntry {
  date: string;
  quantity: number;
  amount: string;
  status: 'completed' | 'pending';
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export default function AgentPage() {
  // Example data for an agent (will be replaced with real data)
  const agentData = {
    subAreaNumber: 1, // This will come from user context
    name: 'Agent 1',
    areaNumber: 1,
    zoneNumber: 1,
    executiveName: 'Executive 1',
    todaySales: '₹5,200',
    monthSales: '₹98,000',
    performance: '94%',
    target: '₹100,000',
    progress: 98
  };

  const recentSales: SalesEntry[] = [
    { date: '2024-02-20', quantity: 52, amount: '₹5,200', status: 'completed' },
    { date: '2024-02-19', quantity: 48, amount: '₹4,800', status: 'completed' },
    { date: '2024-02-18', quantity: 55, amount: '₹5,500', status: 'completed' },
    { date: '2024-02-17', quantity: 50, amount: '₹5,000', status: 'completed' },
    { date: '2024-02-16', quantity: 51, amount: '₹5,100', status: 'completed' }
  ];

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete daily sales entry',
      dueDate: '2024-02-20',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Submit weekly report',
      dueDate: '2024-02-21',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Update customer feedback',
      dueDate: '2024-02-22',
      status: 'pending',
      priority: 'low'
    }
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
            <div>
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Today's Sales:</span>
                  <span className="ml-2 font-medium text-green-600">{agentData.todaySales}</span>
                </div>
                <div>
                  <span className="text-gray-500">Month Sales:</span>
                  <span className="ml-2 font-medium text-blue-600">{agentData.monthSales}</span>
                </div>
                <div>
                  <span className="text-gray-500">Performance:</span>
                  <span className="ml-2 font-medium text-purple-600">{agentData.performance}</span>
                </div>
                <div>
                  <span className="text-gray-500">Monthly Target:</span>
                  <span className="ml-2 font-medium">{agentData.target}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${agentData.progress}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{agentData.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks and Recent Sales Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Today's Tasks</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSales.map((sale, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          sale.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link 
            href="/sales/daily"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Daily Sales</h3>
            <p className="text-gray-600">Record your daily sales data</p>
          </Link>
          <Link 
            href="/sales/history"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales History</h3>
            <p className="text-gray-600">View your sales history</p>
          </Link>
          <Link 
            href="/reports/performance"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Report</h3>
            <p className="text-gray-600">Check your performance metrics</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 