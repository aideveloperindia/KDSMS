'use client';

import { useState } from 'react';

export default function SetupPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const setupUsers = async () => {
    setLoading(true);
    setResult('Setting up users... This may take a few minutes.');
    
    try {
      const response = await fetch('/api/auth/direct-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          setupKey: 'kdsms-setup-2024'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ Success! Created ${data.count} users successfully!

You can now login with credentials like:
• AGT-Z5A1-008 / password123
• EXE-Z4A3-001 / password123  
• ZM-Z5-001 / password123
• AGM-001 / password123
• MGMT-001 / password123`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setResult(`❌ Network Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          KDSMS Production Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create all 512 users in the production database
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <button
            onClick={setupUsers}
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Setting up...' : 'Setup All Users'}
          </button>
          
          {result && (
            <div className={`mt-4 p-4 rounded-md ${
              result.includes('✅') 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : result.includes('❌')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
            }`}>
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
          
          <div className="mt-6">
            <a 
              href="/auth/login" 
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 