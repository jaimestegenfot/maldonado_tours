import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

const links = [
  { href: '/admin', label: 'Inicio', icon: (
    <svg className="w-5 h-5 mr-2 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
  ) },
  { href: '/admin/zonas', label: 'Zonas/Destinos', icon: (
    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
  ) },
  { href: '/admin/usuarios', label: 'Usuarios', icon: (
    <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ) },
  { href: '/admin/categorias', label: 'Categorías', icon: (
    <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg>
  ) },
];

export default function AdminSidebar({ onLogout, mobileClose }: { onLogout: () => void, mobileClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-0 md:mr-8 flex-shrink-0">
      <nav className="flex flex-col space-y-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${pathname === link.href ? 'bg-green-100 text-green-900 font-bold' : 'text-gray-700 hover:bg-green-50'}`}
            onClick={mobileClose}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => { onLogout(); if (mobileClose) mobileClose(); }}
          className="flex items-center px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors mt-4 md:mt-8 whitespace-nowrap"
        >
          <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
} 