'use client';

import { useState, useEffect } from 'react';
import ReportsLayout from '@/components/reports/ReportsLayout';

// This would come from your auth context
const mockUserRole = 'management'; // Replace with actual user role
const mockZoneNumber = 1; // Replace with actual zone number
const mockAreaNumber = 1; // Replace with actual area number

interface SalesData {
  date: string;
  amount: string;
  volume: string;
  location: string;
}

export default function SalesReportPage() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [reportData, setReportData] = useState({
    totalSales: '₹0',
    averagePerformance: '0%',
    totalVolume: '0L',
    growthRate: '0%'
  });

  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = () => {
      // Mock data based on role
      const mockSalesData: SalesData[] = Array.from({ length: 10 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        amount: `₹${Math.floor(10000 + Math.random() * 50000)}`,
        volume: `${Math.floor(1000 + Math.random() * 5000)}L`,
        location: mockUserRole === 'management' ? `Zone ${i + 1}` :
                 mockUserRole === 'agm' ? `Zone ${i + 1}` :
                 mockUserRole === 'zm' ? `Area ${mockZoneNumber * 4 - 3 + (i % 4)}` :
                 `Sub Area ${mockAreaNumber * 20 - 19 + (i % 20)}`
      }));

      setSalesData(mockSalesData);
      setReportData({
        totalSales: '₹2,250,000',
        averagePerformance: '92%',
        totalVolume: '225,000L',
        growthRate: '+15%'
      });
    };

    fetchData();
  }, []);

  return (
    <ReportsLayout
      role={mockUserRole as any}
      zoneNumber={mockZoneNumber}
      areaNumber={mockAreaNumber}
      reportData={reportData}
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Sales History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((sale, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.volume}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ReportsLayout>
  );
} 