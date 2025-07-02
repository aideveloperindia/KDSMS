'use client';

import Link from 'next/link';
import DailySalesForm from '@/components/sales/DailySalesForm';

interface Agent {
  id: number;
  subAreaNumber: number;
  name: string;
  sales: string;
  performance: string;
  lastActivity: string;
}

export default function ExecutivePage() {
  // Example data for an executive (will be replaced with real data)
  const executiveArea = 1; // This will come from user context
  const zoneNumber = Math.ceil(executiveArea / 4); // Calculate zone number based on area

  const agents: Agent[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    subAreaNumber: (executiveArea - 1) * 20 + (i + 1), // Sub Areas 1-20 for Area 1, 21-40 for Area 2, etc.
    name: `Agent ${(executiveArea - 1) * 20 + (i + 1)}`,
    sales: `₹${Math.floor(5000 + Math.random() * 3000)}`,
    performance: `${Math.floor(85 + Math.random() * 10)}%`,
    lastActivity: '2 hours ago'
  }));

  const totalSales = agents.reduce((sum, agent) => 
    sum + parseInt(agent.sales.replace('₹', '').replace(',', '')), 0
  );

  const averagePerformance = Math.floor(
    agents.reduce((sum, agent) => 
      sum + parseInt(agent.performance.replace('%', '')), 0
    ) / agents.length
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms executive.png")',
        minHeight: '100vh',
        paddingTop: '5rem' // Add padding to account for the header
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Executive Dashboard - Area {executiveArea}</h1>
            <p className="text-gray-600">Zone {zoneNumber}</p>
          </div>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Executive Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Agents</h3>
            <p className="text-2xl font-bold text-blue-600">20</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Performance</h3>
            <p className="text-2xl font-bold text-purple-600">{averagePerformance}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Agents Today</h3>
            <p className="text-2xl font-bold text-yellow-600">18</p>
          </div>
        </div>

        {/* Daily Sales Entry Section */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Daily Sales Entry</h2>
          </div>
          <div className="p-6">
            <DailySalesForm />
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Agent Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Area Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sub Area {agent.subAreaNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.performance}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.lastActivity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Link 
                        href={`/agents/${agent.id}`}
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
      </div>
    </div>
  );
} 