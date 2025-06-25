'use client';
import { useEffect, useState } from 'react';
import ZoneCard from '@/components/ZoneCard';

const HERO_IMG = 'https://images.unsplash.com/photo-1509228468518-180dd4864904';

export default function FichosPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    setLoading(true);
    const res = await fetch('/api/zones?category=Ficho');
    const data = await res.json();
    setZones(data.zones || []);
    setLoading(false);
  };

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-8">
        <img
          src={HERO_IMG}
          alt="Fichos y Paradores en la Amazonía"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-green-700/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Fichos y Paradores
          </h1>
          <p className="text-lg md:text-xl text-green-100 drop-shadow">
            Descubre paradores, snacks y servicios únicos en la selva de Madre de Dios.
          </p>
        </div>
      </section>

      {/* LISTADO */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-green-900">Fichos y Paradores Destacados</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Cargando fichos...</div>
        ) : zones.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No se encontraron fichos o paradores.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zones.map((zone: any) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 