'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Sale {
  id: string;
  date: string;
  agentName: string;
  subArea: string;
  area: string;
  executiveName: string;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  unsoldQuantity: number;
  agentRemarks?: string;
  executiveRemarks?: string;
}

interface Area {
  areaNumber: number;
  executiveName: string;
  subAreas: SubArea[];
}

interface SubArea {
  number: number;
  agentName: string;
  todaySales: Sale[];
  remarks: string;
}

export default function ZMDashboard() {
  const { data: session, status } = useSession();
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zmRemarks, setZmRemarks] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/sales/with-remarks?zone=${session?.user?.zone}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const salesData = await response.json();
        setSales(salesData);
      } catch (err) {
        setError('Failed to fetch sales data');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.zone) {
      fetchSales();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !session?.user?.zone) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error || 'No zone assigned'}</div>;
  }

  // Process sales data into areas and sub-areas
  const areas: Area[] = Array.from({ length: 4 }, (_, i) => {
    const areaNumber = i + 1;
    const areaSales = sales.filter(sale => sale.area === `Area ${areaNumber}`);
    
    const subAreas: SubArea[] = Array.from({ length: 20 }, (_, j) => {
      const subAreaNumber = (areaNumber - 1) * 20 + (j + 1);
      const subAreaSales = areaSales.filter(sale => sale.subArea === `Sub Area ${subAreaNumber}`);

    return {
        number: subAreaNumber,
        agentName: `Agent ${subAreaNumber}`,
        todaySales: subAreaSales,
        remarks: subAreaSales[0]?.agentRemarks || ''
    };
  });

    return {
      areaNumber,
      executiveName: `Executive ${areaNumber}`,
      subAreas
    };
  });

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms zm.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Zone {session.user.zone} Dashboard</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Areas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {areas.map((area) => (
            <div key={area.areaNumber} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Area {area.areaNumber}</h2>
                <button
                  onClick={() => setSelectedArea(selectedArea === area.areaNumber ? null : area.areaNumber)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {selectedArea === area.areaNumber ? 'Hide Details' : 'View Details'}
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-2">Executive: {area.executiveName}</div>
              <div className="text-sm text-gray-600">Sub Areas: {area.subAreas.length}</div>
              
              {selectedArea === area.areaNumber && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Today's Sales & Remarks</h3>
                  <div className="space-y-4">
                    {area.subAreas.map((subArea) => (
                      <div key={subArea.number} className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Sub Area {subArea.number}</span>
                          <span>{subArea.agentName}</span>
                        </div>
                        {subArea.todaySales.map((sale) => (
                          <div key={sale.id} className="mt-2 text-sm">
                            <div>Quantity Received: {sale.quantityReceived}</div>
                            <div>Quantity Sold: {sale.quantitySold}</div>
                            <div>Expired: {sale.quantityExpired}</div>
                            {sale.agentRemarks && (
                              <div className="mt-1">
                                <span className="font-medium">Agent Remarks:</span>
                                <p className="text-gray-600">{sale.agentRemarks}</p>
                              </div>
                            )}
                            {sale.executiveRemarks && (
                              <div className="mt-1">
                                <span className="font-medium">Executive Remarks:</span>
                                <p className="text-gray-600">{sale.executiveRemarks}</p>
          </div>
                            )}
          </div>
                        ))}
          </div>
                    ))}
          </div>
        </div>
              )}
            </div>
          ))}
        </div>

        {/* ZM Remarks Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Zone Manager Remarks</h2>
          <textarea
            value={zmRemarks}
            onChange={(e) => setZmRemarks(e.target.value)}
            placeholder="Enter your remarks about today's zone performance..."
            className="w-full h-32 p-2 border rounded"
          />
                      <button
            onClick={async () => {
              // Save ZM remarks logic here
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