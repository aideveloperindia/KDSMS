'use client';

import { useState, useEffect } from 'react';
import ReportsLayout from '@/components/reports/ReportsLayout';

type UserRole = 'management' | 'agm' | 'zm' | 'executive';

// This would come from your auth context
const mockUserRole: UserRole = 'management'; // Replace with actual user role
const mockZoneNumber = 1; // Replace with actual zone number
const mockAreaNumber = 1; // Replace with actual area number

interface AnalyticsData {
  category: string;
  currentValue: string;
  previousValue: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [reportData, setReportData] = useState({
    totalSales: '₹2,250,000',
    averagePerformance: '92%',
    totalVolume: '225,000L',
    growthRate: '+15%'
  });

  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = () => {
      const getMetrics = () => {
        switch(mockUserRole) {
          case 'management':
          case 'agm':
            return [
              { name: 'Total Revenue', current: '₹2,250,000', previous: '₹1,950,000' },
              { name: 'Average Order Value', current: '₹450', previous: '₹420' },
              { name: 'Customer Satisfaction', current: '92%', previous: '88%' },
              { name: 'Market Share', current: '35%', previous: '32%' },
              { name: 'Operational Costs', current: '₹450,000', previous: '₹480,000' }
            ];
          case 'zm':
            return [
              { name: 'Zone Revenue', current: `₹${375000 + Math.random() * 50000}`, previous: `₹${325000 + Math.random() * 50000}` },
              { name: 'Average Order Value', current: `₹${440 + Math.random() * 20}`, previous: `₹${410 + Math.random() * 20}` },
              { name: 'Customer Satisfaction', current: `${90 + Math.random() * 5}%`, previous: `${85 + Math.random() * 5}%` },
              { name: 'Zone Performance', current: `${90 + Math.random() * 5}%`, previous: `${85 + Math.random() * 5}%` },
              { name: 'Operational Efficiency', current: `${92 + Math.random() * 5}%`, previous: `${88 + Math.random() * 5}%` }
            ];
          case 'executive':
            return [
              { name: 'Area Revenue', current: `₹${90000 + Math.random() * 20000}`, previous: `₹${80000 + Math.random() * 20000}` },
              { name: 'Average Order Value', current: `₹${430 + Math.random() * 20}`, previous: `₹${400 + Math.random() * 20}` },
              { name: 'Customer Retention', current: `${88 + Math.random() * 5}%`, previous: `${84 + Math.random() * 5}%` },
              { name: 'Area Performance', current: `${89 + Math.random() * 5}%`, previous: `${85 + Math.random() * 5}%` },
              { name: 'Team Efficiency', current: `${91 + Math.random() * 5}%`, previous: `${87 + Math.random() * 5}%` }
            ];
          default:
            return [];
        }
      };

      const metrics = getMetrics();
      const mockData: AnalyticsData[] = metrics.map(metric => {
        const currentNum = parseFloat(metric.current.replace(/[₹%]/g, ''));
        const previousNum = parseFloat(metric.previous.replace(/[₹%]/g, ''));
        const changePercent = ((currentNum - previousNum) / previousNum * 100).toFixed(1);
        
        return {
          category: metric.name,
          currentValue: metric.current,
          previousValue: metric.previous,
          change: `${changePercent}%`,
          trend: currentNum > previousNum ? 'up' : currentNum < previousNum ? 'down' : 'neutral'
        };
      });

      setAnalyticsData(mockData);
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
        <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
        <div className="grid grid-cols-1 gap-6">
          {analyticsData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.category}</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{item.currentValue}</p>
                  <p className="text-sm text-gray-500 mt-1">Previous: {item.previousValue}</p>
                </div>
                <div className={`flex items-center ${
                  item.trend === 'up' ? 'text-green-600' :
                  item.trend === 'down' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                  <span className="ml-1">{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReportsLayout>
  );
} 