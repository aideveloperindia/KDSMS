'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Zone {
  zoneNumber: number;
  zmName: string;
  areas: Area[];
}

interface Area {
  areaNumber: number;
  executiveName: string;
  totalAgents: number;
  todaySales: number;
  remarks: string;
}

interface Sale {
  id: string;
  date: string;
  zone: number;
  area: number;
  subArea: number;
  agentName: string;
  executiveName: string;
  zmName: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  remarks: string;
}

export default function AGMPage() {
  const { data: session } = useSession();
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agmRemarks, setAgmRemarks] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sales/with-remarks');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSales(data);
      } catch (err) {
        setError('Failed to fetch sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  // Process sales data into zones
  const zones: Zone[] = Array.from({ length: 6 }, (_, i) => {
    const zoneNumber = i + 1;
    const zoneSales = sales.filter(sale => sale.zone === zoneNumber);
    
    const areas: Area[] = Array.from({ length: 4 }, (_, j) => {
      const areaNumber = (zoneNumber - 1) * 4 + (j + 1);
      const areaSales = zoneSales.filter(sale => sale.area === areaNumber);
      
      return {
        areaNumber,
        executiveName: areaSales[0]?.executiveName || `Executive ${areaNumber}`,
        totalAgents: 20,
        todaySales: areaSales.reduce((sum, sale) => sum + sale.quantitySold, 0),
        remarks: areaSales[0]?.remarks || ''
      };
    });

    return {
      zoneNumber,
      zmName: zoneSales[0]?.zmName || `ZM ${zoneNumber}`,
      areas
    };
  });

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms agm.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">AGM Dashboard</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Zones Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {zones.map((zone) => (
            <div key={zone.zoneNumber} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Zone {zone.zoneNumber}</h2>
                <button
                  onClick={() => setSelectedZone(selectedZone === zone.zoneNumber ? null : zone.zoneNumber)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {selectedZone === zone.zoneNumber ? 'Hide Details' : 'View Details'}
                </button>
          </div>
              <div className="text-sm text-gray-600 mb-2">Zone Manager: {zone.zmName}</div>
              <div className="text-sm text-gray-600">Total Areas: {zone.areas.length}</div>
              
              {selectedZone === zone.zoneNumber && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Areas Overview</h3>
                  <div className="space-y-4">
                    {zone.areas.map((area) => (
                      <div key={area.areaNumber} className="border-t pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Area {area.areaNumber}</span>
                          <span>{area.executiveName}</span>
          </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <div>Total Agents: {area.totalAgents}</div>
                          <div>Today's Sales: {area.todaySales}</div>
                          {area.remarks && (
                            <div className="mt-1">
                              <span className="font-medium">Remarks:</span>
                              <p className="text-gray-600">{area.remarks}</p>
          </div>
                          )}
          </div>
        </div>
                    ))}
          </div>
        </div>
              )}
          </div>
          ))}
        </div>

        {/* AGM Remarks Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">AGM Remarks</h2>
          <textarea
            value={agmRemarks}
            onChange={(e) => setAgmRemarks(e.target.value)}
            placeholder="Enter your remarks about overall performance..."
            className="w-full h-32 p-2 border rounded"
          />
          <button
            onClick={async () => {
              // Save AGM remarks logic here
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Remarks
          </button>
        </div>
      </div>
    </div>
  );
} 