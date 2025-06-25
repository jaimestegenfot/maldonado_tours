"use client";
import ZoneCard from '@/components/ZoneCard';

const destinosNaturaleza = [
  {
    id: 1,
    name: 'Reserva Nacional Tambopata',
    description: 'Selva virgen, biodiversidad y paisajes únicos.',
    location: 'Tambopata',
    images: JSON.stringify(['https://www.lorenzoexpeditions.com/wp-content/uploads/2022/12/RESERVA-TAMBOPATA-1-2-scaled.jpg']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Lago Sandoval',
    description: 'Hermoso lago rodeado de selva y fauna.',
    location: 'Tambopata',
    images: JSON.stringify(['https://www.peru.travel/Contenido/Uploads/lago-sandoval-interior-3_637661807837691460.jpg']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Collpa de Guacamayos',
    description: 'Espectáculo de aves en la Amazonía.',
    location: 'Tambopata',
    images: JSON.stringify(['https://rainforestexpeditions.com/es/wp-content/uploads/2021/10/Collpa-de-Guacamayos-Chuncho-en-la-Reserva-Nacional-Tambopata.jpg']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Isla de los Monos',
    description: 'Santuario de fauna amazónica en el río Madre de Dios.',
    location: 'Río Madre de Dios',
    images: JSON.stringify(['https://www.heliconialodge.com.pe/objetos/servicio/MTQ=/img_10122018102302.jpg']),
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Centro de Rescate Taricaya',
    description: 'Rescate y conservación de fauna silvestre.',
    location: 'Río Madre de Dios',
    images: JSON.stringify(['https://gotambopata.com/wp-content/uploads/slider/cache/8e8ce3c9e013b7034bc4ce3abae16be1/Atardecer-en-la-Reserva-Ecologica-Taricaya.jpg']),
    created_at: '2024-01-01T00:00:00Z'
  },
  
  {
    id: 7,
    name: 'Parque Nacional Bahuaja Sonene',
    description: 'Área protegida con paisajes únicos y biodiversidad.',
    location: 'Bahuaja Sonene',
    images: JSON.stringify(['https://lugarturistico.pe/wp-content/uploads/2023/05/parque_nacional_bahuaja.jpg']),
    created_at: '2024-01-01T00:00:00Z'
  },
];

const HERO_IMG = "https://lugarturistico.pe/wp-content/uploads/2023/05/parque_nacional_bahuaja.jpg";

export default function ViajesPage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-8">
        <img
          src={HERO_IMG}
          alt="Viajes y Naturaleza"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-green-700/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Viajes y Naturaleza en la Amazonía
          </h1>
          <p className="text-lg md:text-xl text-green-100 drop-shadow">
            Explora paisajes, selvas, ríos y la biodiversidad única de Madre de Dios.
          </p>
        </div>
      </section>

      {/* LISTADO */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-green-900">Destinos Naturales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinosNaturaleza.map((zone, i) => (
            <ZoneCard key={i} zone={zone} />
          ))}
        </div>
      </section>
    </div>
  );
} 