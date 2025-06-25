"use client";
import ZoneCard from '../../components/ZoneCard';

const restaurantes = [
  {
    id: 1,
    name: 'Restaurante Amazónico El Jaguar',
    description: 'Gastronomía local con insumos amazónicos.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1504674900247-0877df9cc836']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Especialidad', text: 'Platos con pescado de río y frutos amazónicos.' },
      { title: 'Ambiente', text: 'Restaurante rústico con vista al río Madre de Dios.' },
      { title: 'Recomendación', text: 'Prueba el juane de gallina y el tacacho con cecina.' }
    ]
  },
  {
    id: 2,
    name: 'Restaurante La Selva',
    description: 'Comida típica y ambiente amazónico.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a5/ec/bd/restaurante-la-selva.jpg?w=900&h=500&s=1']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Especialidad', text: 'Ceviche amazónico y platos con yuca.' },
      { title: 'Horarios', text: 'Abierto de 7:00 AM a 10:00 PM todos los días.' },
      { title: 'Tips', text: 'Reserva con anticipación en temporada alta.' }
    ]
  },
  {
    id: 3,
    name: 'Restaurante Río Madre',
    description: 'Pescados y mariscos amazónicos.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/375487651.jpg?k=cece5be3462267b680d5ed842cd7782cb3bd5b2afb493488f921b8928999b2ad&o=']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Especialidad', text: 'Pescado a la parrilla y sopas amazónicas.' },
      { title: 'Ubicación', text: 'Ubicado frente al río con terraza al aire libre.' }
    ]
  },
  {
    id: 4,
    name: 'El Caimán',
    description: 'Especialidad en carnes y pescados amazónicos.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1504674900247-0877df9cc836']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Especialidad', text: 'Carnes de caza y pescados de río.' },
      { title: 'Ambiente', text: 'Restaurante familiar con decoración amazónica.' },
      { title: 'Recomendación', text: 'No te pierdas el chicharrón de pescado.' }
    ]
  },
  {
    id: 5,
    name: 'La Patarashca',
    description: 'Platos típicos de la selva y ambiente familiar.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1519864600265-abb23847ef2c']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Especialidad', text: 'Patarashca de pescado y platos tradicionales.' },
      { title: 'Historia', text: 'Restaurante familiar con más de 20 años de tradición.' },
      { title: 'Tips', text: 'Ideal para grupos grandes y familias.' }
    ]
  },
  {
    id: 6,
    name: 'El Tambo',
    description: 'Comida regional y atención cálida.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1519864600265-abb23847ef2c']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Especialidad', text: 'Comida casera y platos regionales.' },
      { title: 'Ambiente', text: 'Restaurante acogedor con atención personalizada.' },
      { title: 'Recomendación', text: 'Prueba el arroz chaufa amazónico.' }
    ]
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