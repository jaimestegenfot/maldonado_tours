"use client";
import ZoneCard from '../../components/ZoneCard';
import { mockHospedajes, heroImages } from '../../lib/mockData';

export default function HospedajesPage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-8">
        <img
          src={heroImages.hospedajes}
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
          {mockHospedajes.map((zone, i) => (
            <ZoneCard key={i} zone={zone} />
          ))}
        </div>
      </section>
    </div>
  );
} 