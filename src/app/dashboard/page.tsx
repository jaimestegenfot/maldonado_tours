'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import ZoneCard from '@/components/ZoneCard';
import Link from 'next/link';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardPage() {
  const { user } = useAuth();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (user) {
      fetchZones();
      fetchCategories();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchZones = async () => {
    setLoading(true);
    const res = await fetch(`/api/zones?user_id=${user?.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await res.json();
    setZones(data.zones || []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.categories || []);
  };

  // Agrupar zonas por categoría
  const grouped = categories.map((cat: any) => ({
    ...cat,
    zones: zones.filter((z: any) => z.category_name === cat.name)
  }));

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-8">
      <DashboardSidebar />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Mi Panel de Operador</h1>
        <div className="mb-8 flex justify-end">
          <Link href="/dashboard/new" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Nueva Zona Turística
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Cargando tus destinos...</div>
        ) : grouped.every(g => g.zones.length === 0) ? (
          <div className="text-center py-12 text-gray-500">No tienes destinos publicados.</div>
        ) : (
          <div className="space-y-12">
            {grouped.map((group: any) => group.zones.length > 0 && (
              <div key={group.id}>
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">{group.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.zones.map((zone: any) => (
                    <ZoneCard key={zone.id} zone={zone} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 