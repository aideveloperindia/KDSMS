'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AGMPage() {
  // Demo user data - no login required
  const userData = {
    name: 'Suresh Reddy',
    employeeId: 'AGM-001',
    role: 'agm',
    companyName: 'Karimnagar Dairy'
  };

  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Demo zones data with areas
  const zones = [
    {
      zoneNumber: 1,
      zmName: 'A Rajesh',
      zmId: 'ZM-Z1-001',
      totalSales: 392000,
      areas: [
        { areaNumber: 1, executiveName: 'B Anil', sales: 98000, agents: 20 },
        { areaNumber: 2, executiveName: 'C Sunil', sales: 95000, agents: 20 },
        { areaNumber: 3, executiveName: 'D Ravi', sales: 105000, agents: 20 },
        { areaNumber: 4, executiveName: 'E Kiran', sales: 94000, agents: 20 }
      ]
    },
    {
      zoneNumber: 2,
      zmName: 'F Vikram',
      zmId: 'ZM-Z2-001',
      totalSales: 385000,
      areas: [
        { areaNumber: 1, executiveName: 'G Mahesh', sales: 96000, agents: 20 },
        { areaNumber: 2, executiveName: 'H Naresh', sales: 92000, agents: 20 },
        { areaNumber: 3, executiveName: 'I Venkat', sales: 99000, agents: 20 },
        { areaNumber: 4, executiveName: 'J Ramesh', sales: 98000, agents: 20 }
      ]
    },
    {
      zoneNumber: 3,
      zmName: 'K Ashok',
      zmId: 'ZM-Z3-001',
      totalSales: 378000,
      areas: [
        { areaNumber: 1, executiveName: 'L Praveen', sales: 94000, agents: 20 },
        { areaNumber: 2, executiveName: 'M Dinesh', sales: 91000, agents: 20 },
        { areaNumber: 3, executiveName: 'N Rajesh', sales: 97000, agents: 20 },
        { areaNumber: 4, executiveName: 'O Suresh', sales: 96000, agents: 20 }
      ]
    },
    {
      zoneNumber: 4,
      zmName: 'P Mahesh',
      zmId: 'ZM-Z4-001',
      totalSales: 395000,
      areas: [
        { areaNumber: 1, executiveName: 'Q Ganesh', sales: 99000, agents: 20 },
        { areaNumber: 2, executiveName: 'R Lokesh', sales: 98000, agents: 20 },
        { areaNumber: 3, executiveName: 'S Ramesh', sales: 100000, agents: 20 },
        { areaNumber: 4, executiveName: 'T Umesh', sales: 98000, agents: 20 }
      ]
    },
    {
      zoneNumber: 5,
      zmName: 'U Naresh',
      zmId: 'ZM-Z5-001',
      totalSales: 388000,
      areas: [
        { areaNumber: 1, executiveName: 'V Santosh', sales: 97000, agents: 20 },
        { areaNumber: 2, executiveName: 'W Harish', sales: 96000, agents: 20 },
        { areaNumber: 3, executiveName: 'X Girish', sales: 98000, agents: 20 },
        { areaNumber: 4, executiveName: 'Y Nitesh', sales: 97000, agents: 20 }
      ]
    },
    {
      zoneNumber: 6,
      zmName: 'Z Venkatesh',
      zmId: 'ZM-Z6-001',
      totalSales: 382000,
      areas: [
        { areaNumber: 1, executiveName: 'AA Kishore', sales: 95000, agents: 20 },
        { areaNumber: 2, executiveName: 'BB Mukesh', sales: 94000, agents: 20 },
        { areaNumber: 3, executiveName: 'CC Rakesh', sales: 97000, agents: 20 },
        { areaNumber: 4, executiveName: 'DD Yogesh', sales: 96000, agents: 20 }
      ]
    }
  ];

  const totalCompanySales = zones.reduce((sum, zone) => sum + zone.totalSales, 0);
  const totalAreas = zones.reduce((sum, zone) => sum + zone.areas.length, 0);
  const totalAgents = zones.reduce((sum, zone) => sum + zone.areas.reduce((areaSum, area) => areaSum + area.agents, 0), 0);

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed relative pt-20"
      style={{ 
        backgroundImage: 'url("/kdsms agm.png")',
        minHeight: '100vh'
      }}
    >
      {/* Blur overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url("/kdsms agm.png")',
          filter: 'blur(1px)',
          zIndex: -1
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">AGM Dashboard</h1>
              <p className="text-gray-600 text-base sm:text-lg">
                {userData.companyName} • Managing 6 Zones • {totalAreas} Areas • {totalAgents} Agents
              </p>
            </div>
          <Link 
              href="/direct-access"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center sm:text-left whitespace-nowrap"
          >
              ← Back to Dashboard Menu
          </Link>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Company Sales</h3>
            <p className="text-3xl font-bold text-green-600">₹{formatNumber(totalCompanySales)}</p>
            <p className="text-sm text-gray-600">Today's collection</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Zones</h3>
            <p className="text-3xl font-bold text-blue-600">{zones.length}</p>
            <p className="text-sm text-gray-600">All operational</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Areas</h3>
            <p className="text-3xl font-bold text-purple-600">{totalAreas}</p>
            <p className="text-sm text-gray-600">Across all zones</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Agents</h3>
            <p className="text-3xl font-bold text-orange-600">{totalAgents}</p>
            <p className="text-sm text-gray-600">All active</p>
          </div>
        </div>

        {/* Zones Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {zones.map((zone) => (
            <div key={zone.zoneNumber} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Zone {zone.zoneNumber}</h2>
                  <p className="text-gray-600">ZM: {zone.zmName}</p>
                  <p className="text-sm text-gray-500">{zone.zmId}</p>
                </div>
                <button
                  onClick={() => setSelectedZone(selectedZone === zone.zoneNumber ? null : zone.zoneNumber)}
                  className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                >
                  {selectedZone === zone.zoneNumber ? 'Hide' : 'View'} Areas
                </button>
          </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Zone Sales</p>
                  <p className="text-2xl font-bold text-green-600">₹{formatNumber(zone.totalSales)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Areas</p>
                  <p className="text-2xl font-bold text-blue-600">{zone.areas.length}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Performance</span>
                  <span>{Math.round((zone.totalSales / (totalCompanySales / zones.length)) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${Math.round((zone.totalSales / (totalCompanySales / zones.length)) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {selectedZone === zone.zoneNumber && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Areas Performance</h4>
                  <div className="space-y-2">
                    {zone.areas.map((area) => (
                      <div key={area.areaNumber} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">Area {area.areaNumber}</p>
                          <p className="text-xs text-gray-600">{area.executiveName}</p>
          </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600 text-sm">₹{formatNumber(area.sales)}</p>
                          <p className="text-xs text-gray-600">{area.agents} agents</p>
          </div>
        </div>
                    ))}
          </div>
        </div>
              )}
          </div>
          ))}
        </div>

        {/* Zone Performance Chart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Zone Performance Comparison</h3>
          <div className="space-y-4">
            {zones.map((zone) => (
              <div key={zone.zoneNumber} className="flex items-center">
                <div className="w-20 text-sm font-medium">Zone {zone.zoneNumber}</div>
                <div className="flex-1 mx-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{zone.zmName}</span>
                    <span>₹{formatNumber(zone.totalSales)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" 
                      style={{ width: `${(zone.totalSales / Math.max(...zones.map(z => z.totalSales))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right text-sm font-medium">
                  {Math.round((zone.totalSales / totalCompanySales) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 