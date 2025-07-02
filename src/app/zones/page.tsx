'use client';

import Link from 'next/link';

export default function ZonesPage() {
  const zones = [
    { 
      id: 1, 
      name: 'Zone A', 
      manager: 'ZM 1',
      phone: '9876543211',
      executives: 3,
      agents: 25,
      totalSales: '₹750,000',
      performance: '92%'
    },
    { 
      id: 2, 
      name: 'Zone B', 
      manager: 'ZM 2',
      phone: '9876543212',
      executives: 4,
      agents: 32,
      totalSales: '₹820,000',
      performance: '88%'
    },
    { 
      id: 3, 
      name: 'Zone C', 
      manager: 'ZM 3',
      phone: '9876543213',
      executives: 3,
      agents: 28,
      totalSales: '₹680,000',
      performance: '95%'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Zone Management</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{zone.name}</h2>
                <span className={`px-2 py-1 rounded text-sm ${
                  parseFloat(zone.performance) >= 90 ? 'bg-green-100 text-green-800' : 
                  parseFloat(zone.performance) >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {zone.performance}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Manager: {zone.manager}</p>
                <p className="text-gray-600">Phone: {zone.phone}</p>
                <p className="text-gray-600">Executives: {zone.executives}</p>
                <p className="text-gray-600">Agents: {zone.agents}</p>
                <p className="text-gray-600">Total Sales: {zone.totalSales}</p>
              </div>
              <div className="mt-4">
                <Link 
                  href={`/zones/${zone.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Zone Performance Overview</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Size</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {zones.map((zone) => (
                  <tr key={zone.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.totalSales}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.performance}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {zone.executives} Executives, {zone.agents} Agents
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