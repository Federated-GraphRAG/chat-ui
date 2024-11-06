'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/logs', name: 'Logs' },
  { path: '/about', name: 'About' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col h-full">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">Chat UI</h1>
        <ul>
          {routes.map((route) => (
            <li key={route.path} className="mb-2">
              <Link 
                href={route.path}
                className={`block p-2 rounded ${pathname === route.path ? 'bg-gray-700' : 'hover:bg-gray-600'}`}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <Link href="/acknowledgements" className="text-sm text-gray-400 hover:text-white">
          Acknowledgements
        </Link>
      </div>
    </nav>
  );
}