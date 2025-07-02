'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

// Public paths that don't require authentication
const publicPaths = [
  '/auth/login',
  '/auth/signup',
  '/',
  '/_next',
  '/api/auth',
  '/favicon.ico',
  '/logo.png',
  '/landing-bg.gif',
  '/kdsms'
];

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = publicPaths.some(path => pathname?.startsWith(path));

  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
} 