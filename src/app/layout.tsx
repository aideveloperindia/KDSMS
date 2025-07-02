import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutProvider from '@/components/layout/LayoutProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KDSMS - Karimnagar Dairy Sales Management System',
  description: 'Manage and track dairy sales efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
} 