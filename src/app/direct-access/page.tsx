'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DirectAccessPage() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  useEffect(() => {
    setIsLoaded(true);
    
    // Typewriter animation
    const text = "Executive Command Center";
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, []);

  const firstRowDashboards = [
    {
      role: 'Management',
      path: '/management',
      description: 'Strategic command center for maximizing business growth and profitability',
      access: 'Complete Business Control: Monitor ₹2.5Cr+ monthly revenue across all operations',
      color: 'from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900',
      textColor: 'text-red-100',
      hierarchy: 'C-Suite',
      icon: (
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      role: 'AGM',
      path: '/agm',
      description: 'Executive leadership driving operational excellence and market expansion',
      access: 'Regional Authority: Oversee ₹42L+ monthly operations across 6 business zones',
      color: 'from-orange-600 via-orange-700 to-orange-800 hover:from-orange-700 hover:via-orange-800 hover:to-orange-900',
      textColor: 'text-orange-100',
      hierarchy: 'Leader',
      icon: (
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      role: 'Zone Manager',
      path: '/zm',
      description: 'Regional profit center leadership maximizing market penetration',
      access: 'Territory Command: Drive ₹7L+ monthly revenue with 80 sales professionals',
      color: 'from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900',
      textColor: 'text-blue-100',
      hierarchy: 'Regional',
      icon: (
        <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const secondRowDashboards = [
    {
      role: 'Executive',
      path: '/executives',
      description: 'Front-line leadership delivering customer satisfaction and revenue growth',
      access: 'Market Authority: Lead ₹1.75L+ monthly sales with 20 dedicated agents',
      color: 'from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900',
      textColor: 'text-green-100',
      hierarchy: 'Field Leader',
      features: [
        { name: 'Daily Sales Reports', value: '20 Agents' },
        { name: 'Performance Analytics', value: 'Real-time' },
        { name: 'Team Management', value: 'Full Control' }
      ],
      stats: { primary: '₹1.75L', secondary: 'Monthly Target' },
      icon: (
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      role: 'Agent',
      path: '/agents',
      description: 'Customer-facing sales excellence driving daily business results',
      access: 'Revenue Generator: Achieve ₹87,500+ monthly sales with direct market impact',
      color: 'from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900',
      textColor: 'text-purple-100',
      hierarchy: 'Sales Pro',
      features: [
        { name: 'Daily Entry System', value: 'Quick Input' },
        { name: 'Sales Tracking', value: 'Live Updates' },
        { name: 'Performance Metrics', value: 'Dashboard' }
      ],
      stats: { primary: '₹87,500', secondary: 'Monthly Target' },
      icon: (
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden"
      style={{ 
        backgroundImage: 'url("/landing-bg.gif")',
        minHeight: '100vh'
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-yellow-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"></div>
      </div>

      {/* Overlay for better text readability */}
      <div className="min-h-screen bg-black/40">
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" style={{ paddingTop: '140px' }}>
          {/* Main Page Title */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent animate-pulse">
              Business Leadership Hierarchy
            </h2>
            <p className="text-xl text-white/80 animate-fade-in mb-6">
              Each role engineered for maximum business impact and strategic control
            </p>
            
            {/* Animated Divider */}
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Hierarchical Dashboard Selection */}
          <div className="mb-12">
            {/* First Row: Management, AGM, Zone Manager */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {firstRowDashboards.map((dashboard, index) => (
                <Link
                  key={dashboard.role}
                  href={dashboard.path}
                  className={`group relative bg-gradient-to-br ${dashboard.color} text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 block overflow-hidden border border-white/20 hover:border-white/40 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                  
                  {/* Hierarchy Badge with Glow */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg group-hover:bg-white/30 transition-all duration-300 animate-pulse">
                    <span className="text-xs font-semibold">{dashboard.hierarchy}</span>
                  </div>

                  <div className="p-8 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        {dashboard.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">{dashboard.role}</h3>
                        <p className={`text-sm ${dashboard.textColor} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
                          {dashboard.hierarchy}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-white/90 text-base leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                      {dashboard.description}
                    </p>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                      <p className="text-sm font-medium text-white/80 mb-1 group-hover:text-white transition-colors duration-300">Business Authority:</p>
                      <p className="text-sm text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {dashboard.access}
                      </p>
                    </div>
                  </div>

                  {/* Animated Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20 group-hover:via-white/80 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Floating Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
                </Link>
              ))}
            </div>

            {/* Second Row: Executive (aligned under Management), Agent (aligned under Zone Manager) */}
            <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Executive - positioned in first column (under Management) */}
              <Link
                href={secondRowDashboards[0].path}
                className={`group relative bg-gradient-to-br ${secondRowDashboards[0].color} text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 block overflow-hidden border border-white/20 hover:border-white/40 animate-fade-in-up`}
                style={{ animationDelay: '600ms' }}
              >
                {/* Animated Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                
                {/* Hierarchy Badge with Glow */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg group-hover:bg-white/30 transition-all duration-300 animate-pulse">
                  <span className="text-xs font-semibold">{secondRowDashboards[0].hierarchy}</span>
                </div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      {secondRowDashboards[0].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">{secondRowDashboards[0].role}</h3>
                      <p className={`text-sm ${secondRowDashboards[0].textColor} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
                        {secondRowDashboards[0].hierarchy}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-base leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                    {secondRowDashboards[0].description}
                  </p>
                  
                  {/* Executive Features */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300 mb-4">
                    <div className="space-y-3">
                      {secondRowDashboards[0].features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="text-sm">
                              <span className="font-medium text-white/90">{feature.name}</span>
                            </div>
                          </div>
                          <span className="text-xs text-white/70">{feature.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Executive Stats */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                    <p className="text-sm font-medium text-white/80 mb-2 group-hover:text-white transition-colors duration-300">Performance Target:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-white/90 font-medium animate-pulse">{secondRowDashboards[0].stats.primary}</div>
                        <div className="text-white/70">{secondRowDashboards[0].stats.secondary}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/90 font-medium animate-pulse">20 Agents</div>
                        <div className="text-white/70">Team Size</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20 group-hover:via-white/80 transition-all duration-500 animate-pulse"></div>
                
                {/* Floating Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
              </Link>

              {/* Compact System Demo - positioned in middle column (under AGM) */}
              <div className="group relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40 animate-fade-in-up"
                style={{ animationDelay: '700ms' }}
              >
                {/* Animated Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                
                {/* Demo Badge with Glow */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg group-hover:bg-white/30 transition-all duration-300 animate-pulse">
                  <span className="text-xs font-semibold">Live Demo</span>
                </div>

                <div className="p-6 relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white/20 rounded-lg mr-3 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-300">
                        System Flow
                      </h3>
                      <p className="text-sm text-indigo-100 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        Live Data Processing
                      </p>
                    </div>
                  </div>
                  
                  {/* Extended Auto-Scrolling Data Flow */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300 overflow-hidden mb-3">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0">
                        <div className="space-y-2 animate-scroll-escalator">
                          {/* First Set of Items */}
                          {/* Sales Entry Animation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-green-200">Sales Entry</span>
                            </div>
                            <span className="text-sm font-bold text-green-200 animate-pulse">₹2,917</span>
                          </div>
                          
                          {/* Validation Animation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg border border-cyan-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-cyan-200">Validation</span>
                            </div>
                            <span className="text-sm font-bold text-cyan-200 animate-pulse">✓ Valid</span>
                          </div>
                          
                          {/* Processing Animation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-blue-200">Processing</span>
                            </div>
                            <span className="text-sm font-bold text-blue-200 animate-pulse">₹58,340</span>
                          </div>
                          
                          {/* Team Aggregation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-lg border border-indigo-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-indigo-200">Team Total</span>
                            </div>
                            <span className="text-sm font-bold text-indigo-200 animate-pulse">₹1.16L</span>
                          </div>
                          
                          {/* Zone Aggregation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-purple-200">Zone Total</span>
                            </div>
                            <span className="text-sm font-bold text-purple-200 animate-pulse">₹7.5L</span>
                          </div>
                          
                          {/* Regional Analytics */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-orange-200">Regional</span>
                            </div>
                            <span className="text-sm font-bold text-orange-200 animate-pulse">₹45L</span>
                          </div>
                          
                          {/* Final Consolidation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg border border-red-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-red-200">Total Revenue</span>
                            </div>
                            <span className="text-sm font-bold text-red-200 animate-pulse">₹2.7Cr</span>
                          </div>
                          
                          {/* System Sync */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg border border-pink-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-pink-200">System Sync</span>
                            </div>
                            <span className="text-sm font-bold text-pink-200 animate-pulse">✓ Complete</span>
                          </div>
                          
                          {/* Agent Review */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg border border-emerald-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-emerald-200">Agent Review</span>
                            </div>
                            <span className="text-sm font-bold text-emerald-200 animate-pulse">✓ Approved</span>
                          </div>
                          
                          {/* Quality Check */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-lg border border-teal-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-teal-200">Quality Check</span>
                            </div>
                            <span className="text-sm font-bold text-teal-200 animate-pulse">95% Grade</span>
                          </div>
                          
                          {/* Second Set of Items (Duplicate for continuous scrolling) */}
                          {/* Sales Entry Animation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-green-200">Sales Entry</span>
                            </div>
                            <span className="text-sm font-bold text-green-200 animate-pulse">₹3,142</span>
                          </div>
                          
                          {/* Validation Animation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg border border-cyan-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-cyan-200">Validation</span>
                            </div>
                            <span className="text-sm font-bold text-cyan-200 animate-pulse">✓ Valid</span>
                          </div>
                          
                          {/* Processing Animation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-blue-200">Processing</span>
                            </div>
                            <span className="text-sm font-bold text-blue-200 animate-pulse">₹62,840</span>
                          </div>
                          
                          {/* Team Aggregation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-lg border border-indigo-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-indigo-200">Team Total</span>
                            </div>
                            <span className="text-sm font-bold text-indigo-200 animate-pulse">₹1.25L</span>
                          </div>
                          
                          {/* Zone Aggregation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-purple-200">Zone Total</span>
                            </div>
                            <span className="text-sm font-bold text-purple-200 animate-pulse">₹8.1L</span>
                          </div>
                          
                          {/* Regional Analytics */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-orange-200">Regional</span>
                            </div>
                            <span className="text-sm font-bold text-orange-200 animate-pulse">₹48.5L</span>
                          </div>
                          
                          {/* Final Consolidation */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg border border-red-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-red-200">Total Revenue</span>
                            </div>
                            <span className="text-sm font-bold text-red-200 animate-pulse">₹2.9Cr</span>
                          </div>
                          
                          {/* System Sync */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg border border-pink-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-pink-200">System Sync</span>
                            </div>
                            <span className="text-sm font-bold text-pink-200 animate-pulse">✓ Complete</span>
                          </div>
                          
                          {/* Agent Review */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg border border-emerald-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-emerald-200">Agent Review</span>
                            </div>
                            <span className="text-sm font-bold text-emerald-200 animate-pulse">✓ Approved</span>
                          </div>
                          
                          {/* Quality Check */}
                          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-lg border border-teal-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-teal-200">Quality Check</span>
                            </div>
                            <span className="text-sm font-bold text-teal-200 animate-pulse">98% Grade</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Performance Grid */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-green-300 font-bold animate-pulse">10L+</div>
                        <div className="text-white/70">Milk Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-300 font-bold animate-pulse">500 KG</div>
                        <div className="text-white/70">Curd Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-300 font-bold animate-pulse">1.5 T</div>
                        <div className="text-white/70">Sweets Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-300 font-bold animate-pulse">25%</div>
                        <div className="text-white/70">Growth</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-400 via-blue-500 via-purple-500 via-orange-500 to-red-500 h-1.5 rounded-full animate-pulse" 
                           style={{ 
                             width: '100%',
                             animation: 'shimmer 2s ease-in-out infinite'
                           }}>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 via-purple-500 via-orange-500 to-red-500 group-hover:via-white/80 transition-all duration-500 animate-pulse"></div>
                
                {/* Floating Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
              </div>

              {/* Agent - positioned in third column (under Zone Manager) */}
              <Link
                href={secondRowDashboards[1].path}
                className={`group relative bg-gradient-to-br ${secondRowDashboards[1].color} text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 block overflow-hidden border border-white/20 hover:border-white/40 animate-fade-in-up`}
                style={{ animationDelay: '800ms' }}
              >
                {/* Animated Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                
                {/* Hierarchy Badge with Glow */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg group-hover:bg-white/30 transition-all duration-300 animate-pulse">
                  <span className="text-xs font-semibold">{secondRowDashboards[1].hierarchy}</span>
                </div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      {secondRowDashboards[1].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">{secondRowDashboards[1].role}</h3>
                      <p className={`text-sm ${secondRowDashboards[1].textColor} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
                        {secondRowDashboards[1].hierarchy}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-base leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                    {secondRowDashboards[1].description}
                  </p>
                  
                  {/* Agent Features */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300 mb-4">
                    <div className="space-y-3">
                      {secondRowDashboards[1].features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <div className="text-sm">
                              <span className="font-medium text-white/90">{feature.name}</span>
                            </div>
                          </div>
                          <span className="text-xs text-white/70">{feature.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Agent Stats */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                    <p className="text-sm font-medium text-white/80 mb-2 group-hover:text-white transition-colors duration-300">Performance Target:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-white/90 font-medium animate-pulse">{secondRowDashboards[1].stats.primary}</div>
                        <div className="text-white/70">{secondRowDashboards[1].stats.secondary}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/90 font-medium animate-pulse">Daily Entry</div>
                        <div className="text-white/70">Sales Input</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20 group-hover:via-white/80 transition-all duration-500 animate-pulse"></div>
                
                {/* Floating Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        @keyframes animate-scroll-escalator {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-440px);
          }
        }
        
        .animate-scroll-escalator {
          animation: animate-scroll-escalator 20s linear infinite;
        }
        
        @keyframes hierarchyScroll {
          0% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(-60px);
          }
          40% {
            transform: translateY(-120px);
          }
          60% {
            transform: translateY(-180px);
          }
          80% {
            transform: translateY(-240px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
} 