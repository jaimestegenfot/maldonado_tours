'use client';

import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/viajes', label: 'Viajes/Naturaleza', icon: (
    <svg className="w-5 h-5 mr-1 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71" /></svg>
  ) },
  { href: '/restaurantes', label: 'Restaurantes', icon: (
    <svg className="w-5 h-5 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M10 14h4v7a2 2 0 01-2 2 2 2 0 01-2-2v-7z" /></svg>
  ) },
  { href: '/hospedajes', label: 'Hospedajes', icon: (
    <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
  ) },
  { href: '/fichos', label: 'Fichos/Paradores', icon: (
    <svg className="w-5 h-5 mr-1 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1H9a1 1 0 00-1 1v9m12 4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ) },
  { href: '/zones', label: 'Todos los Destinos', icon: (
    <svg className="w-5 h-5 mr-1 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
  ) },
];

export default function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Determinar a dónde debe llevar el botón Panel
  const panelHref = user?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold text-lg">MT</span>
            </div>
            <span className="text-xl font-extrabold text-green-800 tracking-tight">Maldonado Tours</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50">
              <svg className="w-5 h-5 mr-1 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
              Inicio
            </Link>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50">
                {link.icon}
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                href={panelHref}
                className="flex items-center bg-green-50 text-green-800 font-bold px-4 py-2 rounded-lg shadow hover:bg-green-100 border border-green-200 transition-colors"
                style={{ fontSize: '1.1rem' }}
              >
                <svg className="w-5 h-5 mr-2 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Panel
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50"
              >
                <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-green-700 hover:text-green-900 focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white rounded-b-xl shadow-xl">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50" onClick={handleLinkClick}>
                <svg className="w-5 h-5 mr-1 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
                Inicio
              </Link>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50" onClick={handleLinkClick}>
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              {user ? (
                <Link
                  href={panelHref}
                  className="flex items-center bg-green-50 text-green-800 font-bold px-4 py-2 rounded-lg shadow hover:bg-green-100 border border-green-200 transition-colors"
                  style={{ fontSize: '1.1rem' }}
                  onClick={handleLinkClick}
                >
                  <svg className="w-5 h-5 mr-2 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Panel
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50"
                  onClick={handleLinkClick}
                >
                  <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 