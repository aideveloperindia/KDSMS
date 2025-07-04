'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!employeeId.trim()) {
      alert('Please enter an Employee ID');
      return;
    }

    // Store user data based on employee ID pattern
    let userData;
    let redirectPath;

    if (employeeId.includes('MGMT')) {
      userData = {
        employeeId: employeeId,
        name: 'Tarun (Management)',
        role: 'Management',
        zone: 0,
        area: 0,
        subArea: 0
      };
      redirectPath = '/management';
    } else if (employeeId.includes('AGM')) {
      userData = {
        employeeId: employeeId,
        name: 'Varun (AGM)',
        role: 'AGM',
        zone: 0,
        area: 0,
        subArea: 0
      };
      redirectPath = '/agm';
    } else if (employeeId.includes('ZM')) {
      const zoneMatch = employeeId.match(/Z(\d+)/);
      const zone = zoneMatch ? parseInt(zoneMatch[1]) : 1;
      userData = {
        employeeId: employeeId,
        name: `Zone Manager ${zone}`,
        role: 'Zone Manager',
        zone: zone,
        area: 0,
        subArea: 0
      };
      redirectPath = '/zm';
    } else if (employeeId.includes('EXE')) {
      const match = employeeId.match(/Z(\d+)A(\d+)/);
      const zone = match ? parseInt(match[1]) : 1;
      const area = match ? parseInt(match[2]) : 1;
      const globalArea = (zone - 1) * 4 + area;
      userData = {
        employeeId: employeeId,
        name: `Executive ${zone}-${area}`,
        role: 'Executive',
        zone: zone,
        area: globalArea,
        subArea: 0
      };
      redirectPath = '/executives';
    } else if (employeeId.includes('AGT')) {
      const match = employeeId.match(/Z(\d+)A(\d+)-(\d+)/);
      const zone = match ? parseInt(match[1]) : 1;
      const area = match ? parseInt(match[2]) : 1;
      const agentNum = match ? parseInt(match[3]) : 1;
      const globalArea = (zone - 1) * 4 + area;
      const subArea = (globalArea - 1) * 20 + agentNum;
      userData = {
        employeeId: employeeId,
        name: `Agent ${zone}-${area}-${agentNum}`,
        role: 'Agent',
        zone: zone,
        area: globalArea,
        subArea: subArea
      };
      redirectPath = '/agents';
    } else {
      alert('Invalid Employee ID format. Use: MGMT-001, AGM-001, ZM-Z1-001, EXE-Z1A1-001, AGT-Z1A1-001');
      return;
    }

    // Store user data for the session
    localStorage.setItem('demoUser', JSON.stringify(userData));
    
    // Redirect to appropriate dashboard
    router.push(redirectPath);
  };

  const quickLogin = (id: string) => {
    setEmployeeId(id);
    setTimeout(() => {
      const event = { target: { value: id } };
      setEmployeeId(id);
      setTimeout(handleLogin, 100);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            KDSMS Demo Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Karimnagar Dairy Sales Management System
          </p>
          
          {/* Demo Mode Banner */}
          <div className="mt-4 bg-green-100 border border-green-400 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <strong>DEMO MODE:</strong> Enter any Employee ID and click Login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <div className="mt-1">
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., AGT-Z5A1-008"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login to Dashboard
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Login</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                onClick={() => quickLogin('MGMT-001')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Management (MGMT-001)
              </button>
              <button
                onClick={() => quickLogin('AGM-001')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                AGM (AGM-001)
              </button>
              <button
                onClick={() => quickLogin('ZM-Z1-001')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Zone Manager (ZM-Z1-001)
              </button>
              <button
                onClick={() => quickLogin('EXE-Z1A1-001')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Executive (EXE-Z1A1-001)
              </button>
              <button
                onClick={() => quickLogin('AGT-Z1A1-001')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Agent (AGT-Z1A1-001)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
