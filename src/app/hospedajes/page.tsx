"use client";
import ZoneCard from '../../components/ZoneCard';

const hospedajes = [
  {
    id: 1,
    name: 'EcoAmazonia Lodge',
    description: 'Hospedaje ecológico en plena selva.',
    location: 'Río Madre de Dios',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Hostal Tambopata',
    description: 'Hospedaje cómodo y económico.',
    location: 'Tambopata',
    images: JSON.stringify(['https://images.unsplash.com/photo-1506744038136-46273834b3fb']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Inkaterra Reserva Amazónica',
    description: 'Lodge de lujo en la selva con experiencias únicas.',
    location: 'Reserva Nacional Tambopata',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Wasai Lodge',
    description: 'Hospedaje con tours y actividades en la selva.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Lodge Amazon Garden',
    description: 'Hospedaje con tours incluidos.',
    location: 'Tambopata',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Hostal Río Madre',
    description: 'Hospedaje familiar y acogedor.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z'
  },
];

const HERO_IMG = hospedajes[0].images[0];

export default function HospedajesPage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-8">
        <img
          src={HERO_IMG}
          alt="Hospedajes en la Amazonía"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-green-700/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Hospedajes en la Selva
          </h1>
          <p className="text-lg md:text-xl text-green-100 drop-shadow">
            Descansa en lodges, hoteles y alojamientos únicos en Madre de Dios.
          </p>
        </div>
      </section>

      {/* LISTADO */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-green-900">Hospedajes Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospedajes.map((zone, i) => (
            <ZoneCard key={i} zone={zone} />
          ))}
        </div>
      </section>
    </div>
  );
} 