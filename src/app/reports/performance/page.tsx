'use client';

import { useState, useEffect } from 'react';
import ReportsLayout from '@/components/reports/ReportsLayout';

type UserRole = 'management' | 'agm' | 'zm' | 'executive';

// This would come from your auth context
const mockUserRole: UserRole = 'management'; // Replace with actual user role
const mockZoneNumber = 1; // Replace with actual zone number
const mockAreaNumber = 1; // Replace with actual area number

interface PerformanceData {
  name: string;
  role: string;
  salesTarget: string;
  actualSales: string;
  performance: string;
}

export default function PerformanceReportPage() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [reportData, setReportData] = useState({
    totalSales: '₹2,250,000',
    averagePerformance: '92%',
    totalVolume: '225,000L',
    growthRate: '+15%'
  });

  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = () => {
      let mockData: PerformanceData[] = [];
      
      switch(mockUserRole) {
        case 'management':
        case 'agm':
          // Show all zones performance
          mockData = Array.from({ length: 6 }, (_, i) => ({
            name: `Zone ${i + 1}`,
            role: 'Zone Manager',
            salesTarget: `₹${Math.floor(400000 + Math.random() * 100000)}`,
            actualSales: `₹${Math.floor(350000 + Math.random() * 100000)}`,
            performance: `${Math.floor(85 + Math.random() * 15)}%`
          }));
          break;
        
        case 'zm':
          // Show executives in the zone
          mockData = Array.from({ length: 4 }, (_, i) => ({
            name: `Area ${mockZoneNumber * 4 - 3 + i}`,
            role: 'Executive',
            salesTarget: `₹${Math.floor(100000 + Math.random() * 50000)}`,
            actualSales: `₹${Math.floor(80000 + Math.random() * 50000)}`,
            performance: `${Math.floor(85 + Math.random() * 15)}%`
          }));
          break;
        
        case 'executive':
          // Show agents in the area
          mockData = Array.from({ length: 20 }, (_, i) => ({
            name: `Sub Area ${mockAreaNumber * 20 - 19 + i}`,
            role: 'Agent',
            salesTarget: `₹${Math.floor(5000 + Math.random() * 3000)}`,
            actualSales: `₹${Math.floor(4000 + Math.random() * 3000)}`,
            performance: `${Math.floor(85 + Math.random() * 15)}%`
          }));
          break;
      }

      setPerformanceData(mockData);
    };

    fetchData();
  }, []);

  return (
    <ReportsLayout
      role={mockUserRole}
      zoneNumber={mockZoneNumber}
      areaNumber={mockAreaNumber}
      reportData={reportData}
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.salesTarget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.actualSales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.performance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ReportsLayout>
  );
} 