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

// Paths that should not have the layout header/footer (like landing page)
const noLayoutPaths = [
  '/'
];

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = publicPaths.some(path => pathname?.startsWith(path));
  const shouldHaveLayout = !noLayoutPaths.includes(pathname || '');

  return (
    <SessionProvider>
      {shouldHaveLayout ? (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      ) : (
        children
      )}
    </SessionProvider>
  );
} 