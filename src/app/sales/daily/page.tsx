'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DailySalesEntry() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'agent' | 'executive' | null>(null);
  const [formData, setFormData] = useState({
    milkType: 'full_cream',
    quantityReceived: '',
    quantitySold: '',
    quantityExpired: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Detect user role from referrer or localStorage
  useEffect(() => {
    const referrer = document.referrer;
    const currentPath = window.location.pathname;
    
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
            // Default to agent since daily sales is primarily used by agents
            setUserRole('agent');
          }
        } else {
          // Default to agent if no clear referrer (daily sales is primarily for agents)
          setUserRole('agent');
        }
      }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantityReceived: parseFloat(formData.quantityReceived),
          quantitySold: parseFloat(formData.quantitySold),
          quantityExpired: parseFloat(formData.quantityExpired),
          agentRemarks: formData.remarks,
          date: new Date().toISOString(),
          employeeId: userRole === 'executive' ? 'EXE-Z1A1-001' : 'AGT-Z1A1-001' // Demo IDs
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit sales data');
      }

      setSuccess('Sales data submitted successfully! (Demo Mode)');
      setFormData({
        milkType: 'full_cream',
        quantityReceived: '',
        quantitySold: '',
        quantityExpired: '',
        remarks: ''
      });

      // Redirect after 2 seconds to appropriate dashboard
      setTimeout(() => {
        const redirectPath = userRole === 'executive' ? '/executives' : '/agents';
        router.push(redirectPath);
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Determine back button destination
  const getBackButtonDestination = () => {
    return userRole === 'executive' ? '/executives' : '/agents';
  };

  const getBackButtonLabel = () => {
    return userRole === 'executive' ? '← Back to Executive Dashboard' : '← Back to Agent Dashboard';
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
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Daily Sales Entry</h1>
              <p className="text-gray-600">Record your daily milk sales data</p>
            </div>
            <Link 
              href={getBackButtonDestination()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {getBackButtonLabel()}
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="milkType" className="block text-sm font-medium text-gray-700 mb-1">
                Milk Type
              </label>
              <select
                id="milkType"
                name="milkType"
                value={formData.milkType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="full_cream">Full Cream</option>
                <option value="standardized">Standardized</option>
                <option value="toned">Toned</option>
                <option value="double_toned">Double Toned</option>
                <option value="skimmed">Skimmed</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantityReceived" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Received (Liters)
              </label>
              <input
                type="number"
                id="quantityReceived"
                name="quantityReceived"
                value={formData.quantityReceived}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="quantitySold" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Sold (Liters)
              </label>
              <input
                type="number"
                id="quantitySold"
                name="quantitySold"
                value={formData.quantitySold}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="quantityExpired" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Expired (Liters)
              </label>
              <input
                type="number"
                id="quantityExpired"
                name="quantityExpired"
                value={formData.quantityExpired}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional notes about today's sales..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Sales Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 