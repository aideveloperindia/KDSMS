import { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ArrowDownTrayIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface SalesRecord {
  id: string;
  date: string;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  unsoldQuantity: number;
  remarks?: string;
}

export default function SalesHistory() {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [selectedMilkType, setSelectedMilkType] = useState('all');
  const [sortBy, setSortBy] = useState<{
    field: keyof SalesRecord;
    direction: 'asc' | 'desc';
  }>({ field: 'date', direction: 'desc' });

  // Mock data - replace with actual API call
  const salesData: SalesRecord[] = [
    {
      id: '1',
      date: '2024-01-07',
      milkType: 'Full Cream Milk',
      quantityReceived: 100,
      quantitySold: 85,
      quantityExpired: 5,
      unsoldQuantity: 10,
      remarks: 'Regular day',
    },
    // Add more mock data as needed
  ];

  const handleSort = (field: keyof SalesRecord) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const exportToExcel = () => {
    // Implement Excel export functionality
    console.log('Exporting to Excel...');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Milk Type
            </label>
            <select
              value={selectedMilkType}
              onChange={(e) => setSelectedMilkType(e.target.value)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="full_cream">Full Cream Milk</option>
              <option value="standardized">Standardized Milk</option>
              <option value="toned">Toned Milk</option>
              <option value="double_toned">Double Toned Milk</option>
              <option value="skimmed">Skimmed Milk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Sales History</h2>
        <div className="flex space-x-4">
          <button
            onClick={exportToExcel}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Export to Excel</span>
          </button>
          <button
            onClick={printReport}
            className="btn-secondary"
          >
            Print
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'date', label: 'Date' },
                { key: 'milkType', label: 'Milk Type' },
                { key: 'quantityReceived', label: 'Received (L)' },
                { key: 'quantitySold', label: 'Sold (L)' },
                { key: 'quantityExpired', label: 'Expired (L)' },
                { key: 'unsoldQuantity', label: 'Unsold (L)' },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key as keyof SalesRecord)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortBy.field === column.key && (
                      <span>
                        {sortBy.direction === 'asc' ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.milkType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.quantityReceived}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.quantitySold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.quantityExpired}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.unsoldQuantity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {record.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <button className="btn-secondary">Previous</button>
            <button className="btn-secondary">Next</button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="btn-secondary rounded-l-md">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className="btn-secondary rounded-r-md">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 