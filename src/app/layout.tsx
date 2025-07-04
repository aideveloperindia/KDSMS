import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutProvider from '@/components/layout/LayoutProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KDSMS - Karimnagar Dairy Sales Management System',
  description: 'Manage and track dairy sales efficiently',
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/icon.png' }
    ],
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
} 