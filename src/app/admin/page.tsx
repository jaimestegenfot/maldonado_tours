'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import AdminSidebar from '@/components/AdminSidebar';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirección segura
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setRedirecting(true);
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (user && user.role === 'admin') fetchStats();
    // eslint-disable-next-line
  }, [user]);

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) throw new Error('No autorizado o error en el servidor');
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin' || redirecting) {
    return <div className="text-center py-12 text-gray-500">Cargando...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Botón hamburguesa solo en móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay y Drawer sidebar en móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay atractivo */}
          <div
            className="fixed inset-0 bg-gradient-to-br from-green-400/70 via-white/60 to-green-700/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          />
          {/* Drawer */}
          <div className="relative w-64 max-w-[80vw] bg-white shadow-2xl h-full p-0 animate-slideInLeft">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="pt-12 pb-4 px-2">
              <AdminSidebar onLogout={logout} mobileClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Layout principal */}
      <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-8 max-w-5xl mx-auto pt-8 md:pt-12 px-2 md:px-0">
        {/* Sidebar fijo solo en escritorio */}
        <div className="hidden md:block">
          <AdminSidebar onLogout={logout} />
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-full shadow">
              <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Panel de Administración</h1>
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">Cargando estadísticas...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
                  Estadísticas Generales
                </h2>
                <ul className="space-y-2">
                  <li>Total de operadores: <span className="font-bold">{stats.stats.totalUsers}</span></li>
                  <li>Total de zonas: <span className="font-bold">{stats.stats.totalZones}</span></li>
                  <li>Total de categorías: <span className="font-bold">{stats.stats.totalCategories}</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
                  Zonas por Categoría
                </h2>
                <ul className="space-y-2">
                  {stats.zonesByCategory.map((cat: any) => (
                    <li key={cat.name}>{cat.name}: <span className="font-bold">{cat.count}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Usuarios más activos
                </h2>
                <ul className="space-y-2">
                  {stats.topUsers.map((u: any, i: number) => (
                    <li key={i}>{u.name} ({u.company || 'Sin empresa'}): <span className="font-bold">{u.zones_count}</span> zonas</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg>
                  Zonas recientes
                </h2>
                <ul className="space-y-2">
                  {stats.recentZones.map((z: any, i: number) => (
                    <li key={i}>{z.name} - {z.operator_name} ({new Date(z.created_at).toLocaleDateString()})</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 