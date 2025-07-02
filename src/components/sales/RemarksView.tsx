import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Sale {
  id: string;
  date: string;
  agentName: string;
  subArea: string;
  area: string;
  zone: string;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  unsoldQuantity: number;
  agentRemarks?: string;
  executiveRemarks?: string;
  executiveId?: {
    name: string;
  };
  executiveRemarkTime?: string;
}

interface RemarksViewProps {
  role: 'zm' | 'agm' | 'management';
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
  viewMode?: 'subArea' | 'area' | 'zone';
}

export default function RemarksView({ 
  role, 
  zoneId, 
  areaId, 
  subAreaId,
  viewMode = 'subArea' 
}: RemarksViewProps) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    date: new Date().toISOString().split('T')[0],
    zone: zoneId || '',
    area: areaId || '',
    subArea: subAreaId || ''
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const queryParams = new URLSearchParams({
          date: filter.date,
          ...(filter.zone && { zone: filter.zone }),
          ...(filter.area && { area: filter.area }),
          ...(filter.subArea && { subArea: filter.subArea }),
          viewMode
        });

        const response = await fetch(`/api/sales/with-remarks?${queryParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }

        const data = await response.json();
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.error('Received non-array data:', data);
          setSales([]);
          setError('Invalid data format received');
          return;
        }

        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        setSales([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [filter, viewMode]);

  const renderSaleCard = (sale: Sale) => (
    <div key={sale.id} className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-800">{sale.agentName}</h3>
          <p className="text-sm text-gray-500">
            {viewMode === 'zone' && `Area ${sale.area}, `}
            Sub Area {sale.subArea}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(sale.date).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sales Summary</h4>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>Milk Type: {sale.milkType}</li>
            <li>Received: {sale.quantityReceived}L</li>
            <li>Sold: {sale.quantitySold}L</li>
            <li>Expired: {sale.quantityExpired}L</li>
            <li>Unsold: {sale.unsoldQuantity}L</li>
          </ul>
        </div>

        <div className="space-y-4">
          {sale.agentRemarks && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Agent's Remarks</h4>
              <p className="text-sm text-gray-600">{sale.agentRemarks}</p>
            </div>
          )}

          {sale.executiveRemarks && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Executive's Remarks
                {sale.executiveId && (
                  <span className="text-gray-500 ml-1">
                    by {sale.executiveId.name}
                  </span>
                )}
              </h4>
              <p className="text-sm text-gray-600">{sale.executiveRemarks}</p>
              {sale.executiveRemarkTime && (
                <p className="text-xs text-gray-500 mt-1">
                  Added at: {new Date(sale.executiveRemarkTime).toLocaleTimeString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div className="flex gap-4 mb-6">
      <input
        type="date"
        value={filter.date}
        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        className="input-field"
      />
      
      {role === 'management' && (
        <select
          value={filter.zone}
          onChange={(e) => setFilter({ ...filter, zone: e.target.value, area: '', subArea: '' })}
          className="input-field"
        >
          <option value="">All Zones</option>
          {/* Add zone options */}
        </select>
      )}

      {(role === 'management' || role === 'agm') && filter.zone && (
        <select
          value={filter.area}
          onChange={(e) => setFilter({ ...filter, area: e.target.value, subArea: '' })}
          className="input-field"
        >
          <option value="">All Areas</option>
          {/* Add area options */}
        </select>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderFilters()}

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading sales data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && sales.length === 0 && (
        <p className="text-center text-gray-500">No sales data found for the selected filters.</p>
      )}

      {!loading && !error && sales.length > 0 && (
        <div className="space-y-6">
          {sales.map((sale) => renderSaleCard(sale))}
        </div>
      )}
    </div>
  );
} 