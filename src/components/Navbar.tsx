'use client';

import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/viajes', label: 'Viajes/Naturaleza' },
  { href: '/restaurantes', label: 'Restaurantes' },
  { href: '/hospedajes', label: 'Hospedajes' },
];

export default function Navbar() {
  const { user, loading } = useAuth();
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
          <div className="hidden lg:flex items-center space-x-8 mr-10">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50">
              Inicio
            </Link>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50">
                {link.label}
              </Link>
            ))}
            {!loading && user ? (
              <Link
                href={panelHref}
                className="bg-green-50 text-green-800 font-bold px-4 py-2 rounded-lg shadow hover:bg-green-100 border border-green-200 transition-colors"
                style={{ fontSize: '1.1rem' }}
              >
                Panel
              </Link>
            ) : !loading && (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white rounded-b-xl shadow-xl">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50" onClick={handleLinkClick}>
                Inicio
              </Link>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50" onClick={handleLinkClick}>
                  {link.label}
                </Link>
              ))}
              {!loading && user ? (
                <Link
                  href={panelHref}
                  className="bg-green-50 text-green-800 font-bold px-4 py-2 rounded-lg shadow hover:bg-green-100 border border-green-200 transition-colors"
                  style={{ fontSize: '1.1rem' }}
                  onClick={handleLinkClick}
                >
                  Panel
                </Link>
              ) : !loading && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-green-50"
                  onClick={handleLinkClick}
                >
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