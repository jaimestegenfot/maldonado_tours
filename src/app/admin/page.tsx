'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function AdminPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-12 text-gray-500">Acceso denegado.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Panel de Administración</h1>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando estadísticas...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Estadísticas Generales</h2>
            <ul className="space-y-2">
              <li>Total de operadores: <span className="font-bold">{stats.stats.totalUsers}</span></li>
              <li>Total de zonas: <span className="font-bold">{stats.stats.totalZones}</span></li>
              <li>Total de categorías: <span className="font-bold">{stats.stats.totalCategories}</span></li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Zonas por Categoría</h2>
            <ul className="space-y-2">
              {stats.zonesByCategory.map((cat: any) => (
                <li key={cat.name}>{cat.name}: <span className="font-bold">{cat.count}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Usuarios más activos</h2>
            <ul className="space-y-2">
              {stats.topUsers.map((u: any, i: number) => (
                <li key={i}>{u.name} ({u.company || 'Sin empresa'}): <span className="font-bold">{u.zones_count}</span> zonas</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Zonas recientes</h2>
            <ul className="space-y-2">
              {stats.recentZones.map((z: any, i: number) => (
                <li key={i}>{z.name} - {z.operator_name} ({new Date(z.created_at).toLocaleDateString()})</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 