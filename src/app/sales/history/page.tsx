'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import SalesHistory from '@/components/sales/SalesHistory';

export default function SalesHistoryPage() {
  return (
    <DashboardLayout userRole="agent" userName="John Doe">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sales History</h1>
          <p className="text-gray-600 mt-1">
            View and analyze your historical sales data. Filter by date range and export reports.
          </p>
        </div>

        <SalesHistory />
      </div>
    </DashboardLayout>
  );
} 