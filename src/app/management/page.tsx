'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  employeeId: string;
  role: 'agm' | 'zm' | 'executive' | 'agent';
  zone?: number;
  area?: number;
  subArea?: number;
}

export default function ManagementPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([
    // Example data - replace with API call
    { id: '1', name: 'AGM', employeeId: 'AGM001', role: 'agm' },
    { id: '2', name: 'ZM 1', employeeId: 'ZM001', role: 'zm', zone: 1 },
    { id: '3', name: 'Executive 1', employeeId: 'EX001', role: 'executive', zone: 1, area: 1 },
    { id: '4', name: 'Agent 1', employeeId: 'AG001', role: 'agent', zone: 1, area: 1, subArea: 1 }
  ]);

  const handleResetPassword = async () => {
    if (!selectedUser) return;
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Call API to reset password
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: selectedUser.id,
      //     newPassword
      //   })
      // });
      
      // if (!response.ok) throw new Error('Failed to reset password');
      
      setSuccess('Password reset successfully');
      setNewPassword('');
      setConfirmPassword('');
      setSelectedUser(null);
      setError('');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms management.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Management Dashboard</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Organization Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Zones</h3>
            <p className="text-2xl font-bold text-blue-600">6</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Executives</h3>
            <p className="text-2xl font-bold text-green-600">24</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Agents</h3>
            <p className="text-2xl font-bold text-purple-600">480</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-yellow-600">{users.length}</p>
          </div>
        </div>

        {/* Password Reset Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Password Reset</h2>
          
          {/* Search Users */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Users List */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Select User</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 border rounded cursor-pointer ${
                    selectedUser?.id === user.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">ID: {user.employeeId}</p>
                  <p className="text-sm text-gray-600">Role: {user.role.toUpperCase()}</p>
                  {user.zone && <p className="text-sm text-gray-600">Zone: {user.zone}</p>}
                  {user.area && <p className="text-sm text-gray-600">Area: {user.area}</p>}
                  {user.subArea && <p className="text-sm text-gray-600">Sub Area: {user.subArea}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Reset Password Form */}
          {selectedUser && (
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-700 mb-4">
                Reset Password for {selectedUser.name} ({selectedUser.employeeId})
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full p-2 border rounded"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full p-2 border rounded"
                    placeholder="Confirm new password"
                  />
                </div>
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                {success && (
                  <p className="text-green-600 text-sm">{success}</p>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setNewPassword('');
                      setConfirmPassword('');
                      setError('');
                      setSuccess('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetPassword}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/sales/remarks"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-medium text-gray-800">Sales & Remarks</h3>
            <p className="text-sm text-gray-500">View and filter all sales data with remarks</p>
          </Link>
          <Link 
            href="/settings/system"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Configure system settings</p>
          </Link>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600">Contact system administrator for support</p>
          </div>
        </div>
      </div>
    </div>
  );
} 