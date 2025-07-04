'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to main page that has working demo login
  useEffect(() => {
    router.push('/');
  }, [router]);

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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Redirecting to Login...</h1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Taking you to the working login page...</p>
        </div>
      </div>
    </div>
  );
} 