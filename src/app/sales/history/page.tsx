'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Sale {
  _id: string;
  agentId: string;
  date: string;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  agentRemarks: string;
  zone: number;
  area: number;
  subArea: number;
}

export default function SalesHistory() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<'agent' | 'executive' | null>(null);
  const [filter, setFilter] = useState({
    date: '',
    zone: ''
  });

  // Demo user data - no login required
  const userData = {
    role: userRole || 'agent' // This determines what filters are available
  };

  // Detect user role from referrer or localStorage
  useEffect(() => {
    const referrer = document.referrer;
    
    if (referrer.includes('/executives')) {
      setUserRole('executive');
    } else if (referrer.includes('/agents')) {
      setUserRole('agent');
          } else {
        // Check localStorage for demo user data
        const demoUser = localStorage.getItem('demoUser');
        if (demoUser) {
          const userData = JSON.parse(demoUser);
          if (userData.role === 'Executive') {
            setUserRole('executive');
          } else if (userData.role === 'Agent') {
            setUserRole('agent');
          } else {
            // Default to agent since sales history is also primarily used by agents
            setUserRole('agent');
          }
        } else {
          // Default to agent if no clear referrer (sales history is primarily for agents)
          setUserRole('agent');
        }
      }
  }, []);

  const canViewZoneFilters = ['agm', 'management'].includes(userData.role);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.date) params.append('date', filter.date);
      if (filter.zone) params.append('zone', filter.zone);

      const res = await fetch(`/api/sales?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch sales data');
      }

      setSales(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
    // Set up polling for real-time updates
    const interval = setInterval(fetchSales, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotals = () => {
    return sales.reduce((acc, sale) => ({
      received: acc.received + sale.quantityReceived,
      sold: acc.sold + sale.quantitySold,
      expired: acc.expired + sale.quantityExpired,
      unsold: acc.unsold + (sale.quantityReceived - sale.quantitySold - sale.quantityExpired)
    }), { received: 0, sold: 0, expired: 0, unsold: 0 });
  };

  const totals = calculateTotals();

  const getAgentName = (agentId: string) => {
    // Extract agent info from ID for demo purposes
    const parts = agentId.split('-');
    if (parts.length >= 3) {
      return `Agent ${parts[2]}`;
    }
    return agentId;
  };

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed relative pt-20"
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
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sales History</h1>
              <p className="text-gray-600">View and analyze sales records</p>
            </div>
            <Link 
              href={userRole === 'executive' ? '/executives' : '/agents'}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {userRole === 'executive' ? '← Back to Executive Dashboard' : '← Back to Agent Dashboard'}
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
          <div className={`grid gap-4 ${canViewZoneFilters ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'}`}>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={filter.date}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {canViewZoneFilters && (
              <div>
                <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
                  Zone
                </label>
                <select
                  id="zone"
                  name="zone"
                  value={filter.zone}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Zones</option>
                  <option value="1">Zone 1</option>
                  <option value="2">Zone 2</option>
                  <option value="3">Zone 3</option>
                  <option value="4">Zone 4</option>
                  <option value="5">Zone 5</option>
                  <option value="6">Zone 6</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Received</h3>
            <p className="text-2xl font-bold text-blue-600">{totals.received.toFixed(2)} L</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sold</h3>
            <p className="text-2xl font-bold text-green-600">{totals.sold.toFixed(2)} L</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Expired</h3>
            <p className="text-2xl font-bold text-red-600">{totals.expired.toFixed(2)} L</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Unsold</h3>
            <p className="text-2xl font-bold text-yellow-600">{totals.unsold.toFixed(2)} L</p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Records</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading sales data...</p>
              </div>
            ) : sales.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No sales records found.</p>
                <p className="text-sm mt-2">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Agent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Zone/Area</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Milk Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Received</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Sold</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Expired</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Unsold</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {formatDate(sale.date)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {getAgentName(sale.agentId)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          Z{sale.zone}-A{sale.area}-S{sale.subArea}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          <span className={`px-2 py-1 rounded text-xs ${
                            sale.milkType === 'buffalo' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {sale.milkType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                          {sale.quantityReceived.toFixed(2)} L
                        </td>
                        <td className="py-3 px-4 text-sm text-green-600 font-medium">
                          {sale.quantitySold.toFixed(2)} L
                        </td>
                        <td className="py-3 px-4 text-sm text-red-600 font-medium">
                          {sale.quantityExpired.toFixed(2)} L
                        </td>
                        <td className="py-3 px-4 text-sm text-yellow-600 font-medium">
                          {(sale.quantityReceived - sale.quantitySold - sale.quantityExpired).toFixed(2)} L
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                          {sale.agentRemarks || 'No remarks'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 