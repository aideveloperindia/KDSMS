import React from 'react';
import Link from 'next/link';

interface ReportData {
  totalSales: string;
  averagePerformance: string;
  totalVolume: string;
  growthRate: string;
}

interface ReportsLayoutProps {
  role: 'management' | 'agm' | 'zm' | 'executive';
  zoneNumber?: number;
  areaNumber?: number;
  reportData: ReportData;
  children?: React.ReactNode;
}

export default function ReportsLayout({
  role,
  zoneNumber,
  areaNumber,
  reportData,
  children
}: ReportsLayoutProps) {
  const getRoleTitle = () => {
    switch (role) {
      case 'management':
        return 'Management Reports';
      case 'agm':
        return 'AGM Reports';
      case 'zm':
        return `Zone ${zoneNumber} Reports`;
      case 'executive':
        return `Area ${areaNumber} Reports`;
      default:
        return 'Reports';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{getRoleTitle()}</h1>
          <Link 
            href={`/${role === 'management' ? 'management' : role}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-blue-600">{reportData.totalSales}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Performance</h3>
            <p className="text-2xl font-bold text-green-600">{reportData.averagePerformance}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Volume</h3>
            <p className="text-2xl font-bold text-purple-600">{reportData.totalVolume}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
            <p className="text-2xl font-bold text-yellow-600">{reportData.growthRate}</p>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 