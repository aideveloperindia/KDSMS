'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Agent {
  id: number;
  subAreaNumber: number;
  name: string;
  visitStatus: 'pending' | 'visited';
  remarks: string;
}

export default function ExecutivePage() {
  const executiveArea = 1; // This will come from user context
  const zoneNumber = Math.ceil(executiveArea / 4);

  const [agents, setAgents] = useState<Agent[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      subAreaNumber: (executiveArea - 1) * 20 + (i + 1),
      name: `Agent ${(executiveArea - 1) * 20 + (i + 1)}`,
      visitStatus: 'pending',
      remarks: ''
    }))
  );

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [remarks, setRemarks] = useState('');

  const handleVisit = async (agent: Agent) => {
    setSelectedAgent(agent);
    setRemarks('');
  };

  const handleSaveRemarks = async () => {
    if (!selectedAgent || !remarks.trim()) return;

    // Update the agent's visit status and remarks
    setAgents(agents.map(agent => 
      agent.id === selectedAgent.id 
        ? { ...agent, visitStatus: 'visited' as const, remarks: remarks.trim() }
        : agent
    ));

    // Here you would also save to the backend
    // await saveAgentVisit(selectedAgent.id, remarks);

    setSelectedAgent(null);
    setRemarks('');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: 'url("/kdsms executive.png")',
        minHeight: '100vh',
        paddingTop: '5rem'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Executive Dashboard - Area {executiveArea}</h1>
            <p className="text-gray-600">Zone {zoneNumber}</p>
          </div>
          <Link 
            href="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Daily Agent Visits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visit Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sub Area {agent.subAreaNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        agent.visitStatus === 'visited' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {agent.visitStatus === 'visited' ? 'Visited' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {agent.remarks || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleVisit(agent)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {agent.visitStatus === 'visited' ? 'Update Visit' : 'Record Visit'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Remarks Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4">
                Record Visit - {selectedAgent.name} (Sub Area {selectedAgent.subAreaNumber})
              </h3>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter your remarks about the visit..."
                className="w-full h-32 p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRemarks}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Remarks
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 