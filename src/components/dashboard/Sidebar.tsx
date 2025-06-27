'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: '📊' },
    { href: '/dashboard/bids', label: 'My Bids', icon: '🛒' },
    { href: '/dashboard/wins', label: 'Won Auctions', icon: '🏆' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r">
      <div className="p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}