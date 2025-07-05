'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
        {/* Navigation Header */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-2 sm:gap-0">
              <div className="flex items-center justify-between sm:justify-start">
                <div className="flex items-center">
                  <Image
                    src="/icon.png"
                    alt="KDSMS Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <span className="ml-2 text-xl font-bold text-white">KDSMS</span>
                </div>
                
                <nav className="flex sm:hidden flex-row space-x-3 text-xs">
                  <Link href="#features" className="text-white/80 hover:text-white transition-colors">Features</Link>
                  <Link href="#about" className="text-white/80 hover:text-white transition-colors">About</Link>
                  <Link href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
                </nav>
              </div>
              
              <nav className="hidden sm:flex flex-row space-x-8 text-base">
                <Link href="#features" className="text-white/80 hover:text-white transition-colors">Features</Link>
                <Link href="#about" className="text-white/80 hover:text-white transition-colors">About</Link>
                <Link href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Hero Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Karimnagar Dairy
                <br />
                <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
                  Sales Management
                </span>
              </h1>
              
              {/* Hero Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed px-4 sm:px-0">
                Revolutionary sales tracking and management system powering
                <br className="hidden sm:block" />
                <span className="font-semibold text-yellow-200">dairy sales operations</span> across multiple regions
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-200 mb-2">6 Zones</div>
                  <div className="text-white/80">Business Coverage</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="text-3xl font-bold text-blue-200 mb-2">24 Areas</div>
                  <div className="text-white/80">Regional Operations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="text-3xl font-bold text-green-200 mb-2">480 Sub Areas</div>
                  <div className="text-white/80">Market Presence</div>
                </div>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
                <Link
                  href="/demo-login"
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-500 hover:border-blue-400 w-full sm:w-auto text-center"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Started - Demo
                  </div>
                </Link>
              </div>
              
              {/* Features Preview */}
              <div className="mt-16 text-white/60 text-xs sm:text-sm px-4 sm:px-0">
                <p className="text-center leading-relaxed">✨ Real-time sales tracking • 📊 Advanced analytics • 🎯 Performance monitoring • 🚀 Instant reporting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 bg-black/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powerful Features for Dairy Management
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Streamline your dairy operations with our comprehensive suite of tools designed specifically for the dairy industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
                <p className="text-white/70">
                  Track sales performance, inventory levels, and market trends with live data visualization and comprehensive reporting.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Team Management</h3>
                <p className="text-white/70">
                  Manage agents, executives, and zone managers with role-based access control and performance tracking.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sales Tracking</h3>
                <p className="text-white/70">
                  Monitor daily sales entries, track targets, and analyze performance across all levels of your organization.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Control</h3>
                <p className="text-white/70">
                  Ensure product quality with automated tracking of expiry dates, batch numbers, and quality parameters.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Financial Management</h3>
                <p className="text-white/70">
                  Track revenues, expenses, and profit margins with detailed financial reporting and budget management.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Mobile Ready</h3>
                <p className="text-white/70">
                  Access your dashboard from anywhere with our mobile-optimized interface for on-the-go management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                About KDSMS
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Karimnagar Dairy Sales Management System is designed to revolutionize dairy operations with cutting-edge technology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Empowering Dairy Businesses
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-white/80">
                        Comprehensive hierarchy management from Management to Individual Agents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-white/80">
                        Real-time data synchronization across all levels of operation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-white/80">
                        Secure user authentication and role-based access control
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-white mb-4">Our Mission</h4>
                <p className="text-white/80 leading-relaxed">
                  Streamline operations, increase efficiency, and drive growth through intelligent data management and real-time insights.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-300">24/7</div>
                    <div className="text-white/60 text-sm">System Availability</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-300">99.9%</div>
                    <div className="text-white/60 text-sm">Data Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
