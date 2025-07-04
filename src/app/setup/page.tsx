'use client';

import { useState } from 'react';

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSetup = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/auth/setup-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Setup failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
            KDSMS Database Setup
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              Click the button below to set up the database with all 512 users from NEW LOGINS.txt
            </p>
            <p className="text-sm text-gray-500">
              This will create: 1 Management, 1 AGM, 6 Zone Managers, 24 Executives, and 480 Agents
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleSetup}
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Setting up...' : 'Setup Database'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Success!</h3>
              <p className="text-green-700 mb-4">{result.message}</p>
              
              <div className="max-h-96 overflow-y-auto">
                <h4 className="font-semibold text-green-800 mb-2">Created Users:</h4>
                <div className="space-y-2">
                  {result.users?.slice(0, 20).map((user: any, index: number) => (
                    <div key={index} className="text-sm text-green-700 bg-green-100 p-2 rounded">
                      <strong>{user.username}</strong> - {user.name} ({user.role})
                      {user.zone > 0 && ` - Zone ${user.zone}`}
                      {user.area > 0 && ` - Area ${user.area}`}
                      {user.subArea > 0 && ` - SubArea ${user.subArea}`}
                    </div>
                  ))}
                  {result.users?.length > 20 && (
                    <div className="text-sm text-green-600 italic">
                      ... and {result.users.length - 20} more users
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-green-700 font-semibold">
                  Database setup complete! You can now go to the{' '}
                  <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                    login page
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 