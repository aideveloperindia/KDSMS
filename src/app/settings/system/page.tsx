'use client';

import { useState } from 'react';
import Link from 'next/link';

type UserRole = 'management' | 'agm' | 'zm' | 'executive';

// This would come from your auth context
const mockUserRole: UserRole = 'management'; // Replace with actual user role
const mockZoneNumber = 1; // Replace with actual zone number
const mockAreaNumber = 1; // Replace with actual area number

interface SettingCategory {
  title: string;
  description: string;
  settings: Setting[];
}

interface Setting {
  name: string;
  description: string;
  type: 'toggle' | 'select' | 'input';
  value: string | boolean;
  options?: string[];
}

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<SettingCategory[]>(() => {
    // Define settings based on user role
    switch(mockUserRole) {
      case 'management':
        return [
          {
            title: 'General Settings',
            description: 'Configure system-wide settings',
            settings: [
              {
                name: 'System Maintenance Mode',
                description: 'Enable maintenance mode for system updates',
                type: 'toggle',
                value: false
              },
              {
                name: 'Default Currency',
                description: 'Set the default currency for the system',
                type: 'select',
                value: 'INR',
                options: ['INR', 'USD', 'EUR']
              }
            ]
          },
          {
            title: 'Security Settings',
            description: 'Configure security and access controls',
            settings: [
              {
                name: 'Two-Factor Authentication',
                description: 'Require 2FA for all users',
                type: 'toggle',
                value: true
              },
              {
                name: 'Session Timeout',
                description: 'Set session timeout duration (minutes)',
                type: 'input',
                value: '30'
              }
            ]
          }
        ];
      
      case 'agm':
        return [
          {
            title: 'Operational Settings',
            description: 'Configure operational parameters',
            settings: [
              {
                name: 'Daily Report Time',
                description: 'Set default time for daily reports',
                type: 'input',
                value: '18:00'
              },
              {
                name: 'Auto-Approve Orders',
                description: 'Automatically approve orders below threshold',
                type: 'toggle',
                value: false
              }
            ]
          }
        ];
      
      case 'zm':
        return [
          {
            title: 'Zone Settings',
            description: `Configure settings for Zone ${mockZoneNumber}`,
            settings: [
              {
                name: 'Zone Report Format',
                description: 'Set default report format',
                type: 'select',
                value: 'Detailed',
                options: ['Summary', 'Detailed', 'Custom']
              },
              {
                name: 'Alert Notifications',
                description: 'Enable real-time alerts',
                type: 'toggle',
                value: true
              }
            ]
          }
        ];
      
      case 'executive':
        return [
          {
            title: 'Area Settings',
            description: `Configure settings for Area ${mockAreaNumber}`,
            settings: [
              {
                name: 'Default View',
                description: 'Set default dashboard view',
                type: 'select',
                value: 'Daily',
                options: ['Daily', 'Weekly', 'Monthly']
              }
            ]
          }
        ];
      
      default:
        return [];
    }
  });

  const handleSettingChange = (categoryIndex: number, settingIndex: number, value: string | boolean) => {
    const newSettings = [...settings];
    newSettings[categoryIndex].settings[settingIndex].value = value;
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
          <Link 
            href={`/${mockUserRole === 'management' ? 'management' : mockUserRole}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          {settings.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{category.title}</h2>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="p-6 space-y-6">
                {category.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{setting.name}</h3>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div>
                      {setting.type === 'toggle' && (
                        <button
                          onClick={() => handleSettingChange(categoryIndex, settingIndex, !setting.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            setting.value ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              setting.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                      {setting.type === 'select' && (
                        <select
                          value={setting.value as string}
                          onChange={(e) => handleSettingChange(categoryIndex, settingIndex, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        >
                          {setting.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {setting.type === 'input' && (
                        <input
                          type="text"
                          value={setting.value as string}
                          onChange={(e) => handleSettingChange(categoryIndex, settingIndex, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 