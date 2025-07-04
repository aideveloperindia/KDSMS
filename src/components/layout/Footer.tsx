import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center text-xl font-bold mb-4">
              <img 
                src="/icon.png" 
                alt="KDSMS Logo" 
                className="w-6 h-6 mr-2"
              />
              KDSMS
            </div>
            <p className="text-gray-400">
              Karimnagar Dairy Sales Management System
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/agents" className="hover:text-white">Agent Dashboard</Link></li>
              <li><Link href="/executives" className="hover:text-white">Executive Dashboard</Link></li>
              <li><Link href="/sales/daily" className="hover:text-white">Daily Sales</Link></li>
              <li><Link href="/sales/history" className="hover:text-white">Sales History</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">System Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Version 1.0.0</li>
              <li>Last Updated: February 2024</li>
              <li>Status: Online</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Karimnagar Dairy Sales Management System. All rights reserved.</p>
          <p className="mt-1">Developed by Beyondx Informatics Analytics Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
} 