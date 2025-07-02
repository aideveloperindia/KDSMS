'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background GIF */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing-bg.gif"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block text-white drop-shadow-lg">
              Welcome to
            </span>
            <span className="block text-blue-400 mt-2 drop-shadow-lg">
              Karimnagar Dairy Sales Management System
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-base sm:text-lg md:mt-8 md:text-xl md:max-w-3xl text-white drop-shadow-lg">
            Streamline your dairy sales operations with our comprehensive management system.
            Track sales, manage inventory, and boost productivity.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
            <div className="rounded-md shadow">
              <Link
                href="/auth/login"
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-blue-600/90 hover:bg-blue-700 transition-all backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Real-time Sales Tracking */}
            <div className="bg-black/40 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl border border-white/10">
              <div className="text-xl font-bold mb-4 text-white drop-shadow-lg">
                Real-time Sales Tracking
              </div>
              <p className="text-lg text-white drop-shadow">
                Monitor your sales performance in real-time with detailed analytics and reporting.
              </p>
            </div>

            {/* Inventory Management */}
            <div className="bg-black/40 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl border border-white/10">
              <div className="text-xl font-bold mb-4 text-white drop-shadow-lg">
                Inventory Management
              </div>
              <p className="text-lg text-white drop-shadow">
                Keep track of your dairy products inventory with our efficient management system.
              </p>
            </div>

            {/* Performance Analytics */}
            <div className="bg-black/40 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl border border-white/10">
              <div className="text-xl font-bold mb-4 text-white drop-shadow-lg">
                Performance Analytics
              </div>
              <p className="text-lg text-white drop-shadow">
                Get detailed insights into your sales performance with comprehensive analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
