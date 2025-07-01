'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import DailySalesForm from '@/components/sales/DailySalesForm';

export default function DailySalesPage() {
  return (
    <DashboardLayout userRole="agent" userName="John Doe">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Daily Sales Entry</h1>
          <p className="text-gray-600 mt-1">
            Record your daily milk sales data. All quantities should be in liters.
          </p>
        </div>

        <DailySalesForm />
      </div>
    </DashboardLayout>
  );
} 