'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      router.push('/direct-access');
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
      style={{ 
        backgroundImage: 'url("/landing-bg.gif")',
        minHeight: '100vh'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="min-h-screen w-full bg-black/40 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <img 
                src="/icon.png" 
                alt="KDSMS Logo" 
                className="w-8 h-8 mr-2"
              />
              <h1 className="text-xl font-bold text-gray-900">KDSMS</h1>
            </div>
            <p className="text-sm text-gray-600">Karimnagar Dairy Sales Management System</p>
            <p className="text-xs text-gray-500 mt-1">Enter your credentials to access the system</p>
          </div>

          {/* Fake Login Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm">
                MGMT-001
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm">
                ••••••••
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 text-sm">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link 
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 