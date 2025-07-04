'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // CLIENT-SIDE DEMO MODE - No API calls needed
      const demoUsers = {
        'MGMT-001': { name: 'Tarun', role: 'Management', zone: 0, area: 0, subArea: 0 },
        'AGM-001': { name: 'Varun', role: 'AGM', zone: 0, area: 0, subArea: 0 },
        'ZM-Z1-001': { name: 'Reddy Rajesh', role: 'Zone Manager', zone: 1, area: 0, subArea: 0 },
        'EXE-Z1A1-001': { name: 'B Anil', role: 'Executive', zone: 1, area: 1, subArea: 0 },
        'AGT-Z1A1-001': { name: 'Ramesh Reddy', role: 'Agent', zone: 1, area: 1, subArea: 1 },
        'AGT-Z5A1-008': { name: 'Shetty Tejaswi', role: 'Agent', zone: 5, area: 17, subArea: 328 }
      };

      // Check if it's a demo user or follows the pattern
      let user = demoUsers[employeeId as keyof typeof demoUsers];
      
      if (!user) {
        // Auto-generate user based on ID pattern for demo
        if (employeeId.startsWith('AGT-')) {
          const match = employeeId.match(/AGT-Z(\d+)A(\d+)-(\d+)/);
          if (match) {
            const zone = parseInt(match[1]);
            const area = parseInt(match[2]);
            const agentNum = parseInt(match[3]);
            const globalArea = (zone - 1) * 4 + area;
            const subArea = (globalArea - 1) * 20 + agentNum;
            
            user = {
              name: `Agent ${zone}-${area}-${agentNum}`,
              role: 'Agent',
              zone: zone,
              area: globalArea,
              subArea: subArea
            };
          }
        } else if (employeeId.startsWith('EXE-')) {
          const match = employeeId.match(/EXE-Z(\d+)A(\d+)-(\d+)/);
          if (match) {
            const zone = parseInt(match[1]);
            const area = parseInt(match[2]);
            const globalArea = (zone - 1) * 4 + area;
            
            user = {
              name: `Executive ${zone}-${area}`,
              role: 'Executive',
              zone: zone,
              area: globalArea,
              subArea: 0
            };
          }
        } else if (employeeId.startsWith('ZM-')) {
          const match = employeeId.match(/ZM-Z(\d+)-(\d+)/);
          if (match) {
            const zone = parseInt(match[1]);
            
            user = {
              name: `Zone Manager ${zone}`,
              role: 'Zone Manager',
              zone: zone,
              area: 0,
              subArea: 0
            };
          }
        }
      }

      if (!user) {
        setError('Invalid employee ID format - Use patterns like AGT-Z1A1-001, EXE-Z1A1-001, etc.');
        return;
      }

      // Store user data in localStorage for demo
      const userData = {
        employeeId: employeeId,
        name: user.name,
        role: user.role,
        zone: user.zone,
        area: user.area,
        subArea: user.subArea
      };
      
      localStorage.setItem('demoUser', JSON.stringify(userData));
      
      // Redirect based on role
      switch (user.role) {
        case 'Management':
          router.push('/management');
          break;
        case 'AGM':
          router.push('/agm');
          break;
        case 'Zone Manager':
          router.push('/zm');
          break;
        case 'Executive':
          router.push('/executives');
          break;
        case 'Agent':
          router.push('/agents');
          break;
        default:
          router.push('/dashboard');
      }

    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/kdsms signin.png")' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login to KDSMS</h1>
        
        {/* Demo Mode Banner */}
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>DEMO MODE:</strong> Use any employee ID pattern
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Employee ID
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., AGT-Z1A1-001"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Any password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-xs text-gray-600">
          <p><strong>Sample IDs:</strong> MGMT-001, AGM-001, ZM-Z1-001, EXE-Z1A1-001, AGT-Z1A1-001</p>
        </div>
      </div>
    </div>
  );
} 