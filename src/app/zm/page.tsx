'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ZMDashboard() {
  // Demo user data - no login required
  const userData = {
    name: 'Rajesh Kumar',
    employeeId: 'ZM-Z1-001',
    role: 'zm',
    zoneName: 'Zone 1',
    companyName: 'Karimnagar Dairy'
  };

  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Demo areas data for Zone 1
  const areas = [
    {
      areaNumber: 1,
      executiveName: 'B Anil',
      executiveId: 'EXE-Z1A1-001',
      totalSales: 100000,
      activeAgents: 20,
      subAreas: Array.from({ length: 20 }, (_, i) => ({
        subAreaNumber: i + 1,
        agentName: `Agent ${i + 1}`,
        agentId: `AGT-Z1A1-${String(i + 1).padStart(3, '0')}`,
        todaysSales: 4500 + Math.floor(Math.random() * 1000)
      }))
    },
    {
      areaNumber: 2,
      executiveName: 'C Sunil',
      executiveId: 'EXE-Z1A2-001',
      totalSales: 95000,
      activeAgents: 20,
      subAreas: Array.from({ length: 20 }, (_, i) => ({
        subAreaNumber: i + 1,
        agentName: `Agent ${i + 21}`,
        agentId: `AGT-Z1A2-${String(i + 1).padStart(3, '0')}`,
        todaysSales: 4200 + Math.floor(Math.random() * 1000)
      }))
    },
    {
      areaNumber: 3,
      executiveName: 'D Ravi',
      executiveId: 'EXE-Z1A3-001',
      totalSales: 105000,
      activeAgents: 20,
      subAreas: Array.from({ length: 20 }, (_, i) => ({
        subAreaNumber: i + 1,
        agentName: `Agent ${i + 41}`,
        agentId: `AGT-Z1A3-${String(i + 1).padStart(3, '0')}`,
        todaysSales: 4800 + Math.floor(Math.random() * 1000)
      }))
    },
    {
      areaNumber: 4,
      executiveName: 'E Kiran',
      executiveId: 'EXE-Z1A4-001',
      totalSales: 92000,
      activeAgents: 20,
      subAreas: Array.from({ length: 20 }, (_, i) => ({
        subAreaNumber: i + 1,
        agentName: `Agent ${i + 61}`,
        agentId: `AGT-Z1A4-${String(i + 1).padStart(3, '0')}`,
        todaysSales: 4100 + Math.floor(Math.random() * 1000)
      }))
    }
  ];

  const totalZoneSales = areas.reduce((sum, area) => sum + area.totalSales, 0);
  const totalAgents = areas.reduce((sum, area) => sum + area.activeAgents, 0);

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed relative pt-20"
      style={{ 
        backgroundImage: 'url("/kdsms zm.png")',
        minHeight: '100vh'
      }}
    >
      {/* Blur overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url("/kdsms zm.png")',
          filter: 'blur(1px)',
          zIndex: -1
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Zone Manager Dashboard</h1>
              <p className="text-gray-600 text-lg">
                {userData.zoneName} • Managing 4 Areas • {totalAgents} Agents
              </p>
            </div>
            <Link 
              href="/direct-access"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              ← Back to Dashboard Menu
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Zone Total Sales</h3>
            <p className="text-3xl font-bold text-green-600">₹{formatNumber(totalZoneSales)}</p>
            <p className="text-sm text-gray-600">Today's collection</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Areas</h3>
            <p className="text-3xl font-bold text-blue-600">{areas.length}</p>
            <p className="text-sm text-gray-600">All operational</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Agents</h3>
            <p className="text-3xl font-bold text-purple-600">{totalAgents}</p>
            <p className="text-sm text-gray-600">All active</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Average per Area</h3>
            <p className="text-3xl font-bold text-orange-600">₹{formatNumber(Math.round(totalZoneSales / areas.length))}</p>
            <p className="text-sm text-gray-600">Performance</p>
          </div>
        </div>

        {/* Areas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area) => (
            <div key={area.areaNumber} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Area {area.areaNumber}</h2>
                  <p className="text-gray-600">Executive: {area.executiveName}</p>
                  <p className="text-sm text-gray-500">{area.executiveId}</p>
                </div>
                <button
                  onClick={() => setSelectedArea(selectedArea === area.areaNumber ? null : area.areaNumber)}
                  className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                >
                  {selectedArea === area.areaNumber ? 'Hide Details' : 'View Details'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Today's Sales</p>
                  <p className="text-2xl font-bold text-green-600">₹{formatNumber(area.totalSales)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-blue-600">{area.activeAgents}</p>
                </div>
              </div>

              {selectedArea === area.areaNumber && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Sub Areas & Agents</h4>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-1">Sub Area</th>
                          <th className="text-left py-1">Agent</th>
                          <th className="text-left py-1">Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {area.subAreas.map((subArea) => (
                          <tr key={subArea.subAreaNumber} className="border-b">
                            <td className="py-1">{subArea.subAreaNumber}</td>
                            <td className="py-1">{subArea.agentName}</td>
                            <td className="py-1 text-green-600 font-medium">₹{formatNumber(subArea.todaysSales)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 