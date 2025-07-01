'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginForm {
  phone: string;
  otp?: string;
}

export default function Home() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      if (!isOtpSent) {
        // Send OTP
        const response = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: data.phone }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to send OTP');
        }

        setIsOtpSent(true);
      } else {
        // Verify OTP
        const response = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: data.phone, otp: data.otp }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to verify OTP');
        }

        // Redirect to dashboard on successful login
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="KDSMS Logo" width={50} height={50} className="mr-2" />
            <span className="text-xl font-bold text-blue-600">KDSMS</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background GIF */}
      <main className="flex-grow relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing-bg.gif"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 flex">
          {/* Left side content */}
          <div className="w-1/2 text-white">
            <h1 className="text-5xl font-bold mb-6">
              Karimnagar Dairy Sales Management System
            </h1>
            <p className="text-xl mb-8">
              Streamline your dairy sales operations with our comprehensive management system.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span>Real-time sales tracking</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span>Inventory management</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span>Performance analytics</span>
              </div>
            </div>
          </div>

          {/* Right side login form */}
          <div className="w-1/2 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {isOtpSent && (
                  <div>
                    <label className="block text-gray-700 mb-2">OTP</label>
                    <input
                      type="text"
                      {...register('otp', { 
                        required: 'OTP is required',
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: 'Please enter a valid 6-digit OTP'
                        }
                      })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter OTP"
                    />
                    {errors.otp && (
                      <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  {isOtpSent ? 'Login' : 'Send OTP'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About KDSMS</h3>
              <p className="text-gray-300">
                Karimnagar Dairy Sales Management System - Empowering dairy sales operations with modern technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: info@kdsms.com</li>
                <li>Phone: +91 123 456 7890</li>
                <li>Address: Karimnagar, Telangana</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} KDSMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
