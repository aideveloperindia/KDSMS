'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DailySalesEntry() {
  const router = useRouter();
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
          date: new Date().toISOString()
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit sales data');
      }

      setSuccess('Sales data submitted successfully!');
      setFormData({
        milkType: 'full_cream',
        quantityReceived: '',
        quantitySold: '',
        quantityExpired: '',
        remarks: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daily Sales Entry</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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