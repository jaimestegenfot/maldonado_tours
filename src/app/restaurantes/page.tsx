"use client";
import ZoneCard from '@/components/ZoneCard';

const restaurantes = [
  {
    id: 1,
    name: 'Restaurante Amazónico El Jaguar',
    description: 'Gastronomía local con insumos amazónicos.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1504674900247-0877df9cc836']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Restaurante La Selva',
    description: 'Comida típica y ambiente amazónico.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a5/ec/bd/restaurante-la-selva.jpg?w=900&h=500&s=1']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Restaurante Río Madre',
    description: 'Pescados y mariscos amazónicos.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/375487651.jpg?k=cece5be3462267b680d5ed842cd7782cb3bd5b2afb493488f921b8928999b2ad&o=']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'El Caimán',
    description: 'Especialidad en carnes y pescados amazónicos.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1504674900247-0877df9cc836']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'La Patarashca',
    description: 'Platos típicos de la selva y ambiente familiar.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1519864600265-abb23847ef2c']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'El Tambo',
    description: 'Comida regional y atención cálida.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1519864600265-abb23847ef2c']),
    created_at: '2024-01-01T00:00:00Z'
  },
];

const HERO_IMG = "https://cosasbucket.s3.amazonaws.com/wp-content/uploads/2024/07/25173200/destination-peru-madre-de-dios-puerto-maldonado-750x450.png";

export default function RestaurantesPage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-8">
        <img
          src={HERO_IMG}
          alt="Restaurantes en la Amazonía"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-green-700/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Restaurantes Amazónicos
          </h1>
          <p className="text-lg md:text-xl text-green-100 drop-shadow">
            Descubre la mejor gastronomía local y sabores únicos de Madre de Dios.
          </p>
        </div>
      </section>

      {/* LISTADO */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-green-900">Restaurantes Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurantes.map((zone, i) => (
            <ZoneCard key={i} zone={zone} />
          ))}
        </div>
      </section>
    </div>
  );
} 