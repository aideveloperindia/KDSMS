'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Sale {
  id: string;
  date: string;
  agentName: string;
  subArea: string;
  area: string;
  zone: string;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  unsoldQuantity: number;
  agentRemarks?: string;
}

interface Executive {
  id: string;
  name: string;
  area: string;
  agents: number;
  totalSales: number;
  performance: number;
}

interface Agent {
  id: string;
  name: string;
  subArea: string;
  sales: number;
  performance: number;
}

export default function ZMDashboard() {
  const { data: session, status } = useSession();
  const [selectedExecutive, setSelectedExecutive] = useState<string | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only fetch sales for the ZM's assigned zone
        const response = await fetch(`/api/sales/with-remarks?zone=${session?.user?.zone}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch sales data');
        }

        const salesData = await response.json();
        // Filter sales to only include those from the ZM's zone
        const zoneSales = salesData.filter((sale: Sale) => sale.zone === session?.user?.zone);
        setSales(zoneSales);
      } catch (err) {
        console.error('Error fetching sales:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch sales data');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.zone) {
      fetchSales();
    } else if (session?.user && !session.user.zone) {
      setError('No zone assigned to your account. Please contact support.');
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error: {error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!session?.user?.zone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">No zone assigned to your account</h2>
          <p className="mt-2 text-gray-600">Please contact support to get a zone assigned to your account.</p>
        </div>
      </div>
    );
  }

  // Process sales data to get executives and agents
  const executives = Array.from(
    new Set(sales.map(sale => sale.area))
  ).map(area => {
    const areaSales = sales.filter(sale => sale.area === area);
    const totalSales = areaSales.reduce((sum, sale) => sum + (sale.quantitySold || 0), 0);
    const performance = areaSales.length > 0 
      ? (areaSales.reduce((sum, sale) => sum + ((sale.quantitySold / sale.quantityReceived) || 0), 0) / areaSales.length) * 100
      : 0;

    return {
      id: area,
      name: `Executive ${area}`,
      area,
      agents: new Set(areaSales.map(sale => sale.agentName)).size,
      totalSales,
      performance: Math.round(performance)
    };
  });

  const agents = Array.from(
    new Set(sales.map(sale => sale.agentName))
  ).map(agentName => {
    const agentSales = sales.filter(sale => sale.agentName === agentName);
    const totalSales = agentSales.reduce((sum, sale) => sum + (sale.quantitySold || 0), 0);
    const performance = agentSales.length > 0
      ? (agentSales.reduce((sum, sale) => sum + ((sale.quantitySold / sale.quantityReceived) || 0), 0) / agentSales.length) * 100
      : 0;

    return {
      id: agentName,
      name: agentName,
      subArea: agentSales[0]?.subArea || '',
      sales: totalSales,
      performance: Math.round(performance)
    };
  });

  const zoneTotalSales = executives.reduce((sum, exec) => sum + exec.totalSales, 0);
  const zonePerformance = executives.length > 0
    ? Math.round(executives.reduce((sum, exec) => sum + exec.performance, 0) / executives.length)
    : 0;

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms zm.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Zone {session?.user?.zone} Dashboard</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Zone Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Executives</h3>
            <p className="text-2xl font-bold text-blue-600">{executives.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Agents</h3>
            <p className="text-2xl font-bold text-green-600">{agents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-purple-600">₹{zoneTotalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Zone Performance</h3>
            <p className="text-2xl font-bold text-yellow-600">{zonePerformance}%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Link 
            href="/sales/remarks"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-medium text-gray-800">Sales & Remarks</h3>
            <p className="text-sm text-gray-500">View and filter zone sales data with remarks</p>
          </Link>
          <Link 
            href="/reports/sales"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales Reports</h3>
            <p className="text-gray-600">View zone sales analytics</p>
          </Link>
          <Link 
            href="/reports/performance"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Reports</h3>
            <p className="text-gray-600">Track zone team metrics</p>
          </Link>
          <Link 
            href="/reports/analytics"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-600">Zone business insights</p>
          </Link>
        </div>

        {/* Executives Table */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Executive Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executive Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {executives.map((executive) => (
                  <tr key={executive.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{executive.area}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{executive.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{executive.agents}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{executive.totalSales.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{executive.performance}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => setSelectedExecutive(executive.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Agents
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedExecutive 
                ? `Agents in Area ${selectedExecutive}`
                : 'All Agents in Zone'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents
                  .filter(agent => !selectedExecutive || agent.subArea.startsWith(selectedExecutive))
                  .map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.subArea}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{agent.sales.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.performance}%</td>
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