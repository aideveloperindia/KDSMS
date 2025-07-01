'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface User {
  name: string;
  role: string;
  zone?: string;
}

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const roleDisplay = user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="KDSMS Logo" width={40} height={40} className="mr-2" />
            <span className="text-xl font-bold text-blue-600">KDSMS</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome,</p>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{roleDisplay}</p>
              {user.zone && <p className="text-sm text-gray-500">Zone: {user.zone}</p>}
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 