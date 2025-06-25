'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaMapMarkerAlt, FaUser, FaBuilding, FaStar, FaEye } from 'react-icons/fa';

interface Zone {
  id: number;
  name: string;
  description: string;
  location: string;
  category_name?: string;
  price?: number;
  images?: string;
  operator_name?: string;
  company?: string;
  created_at: string;
  descriptions?: { title: string; text: string }[];
}

interface ZoneCardProps {
  zone: Zone;
}

export default function ZoneCard({ zone }: ZoneCardProps) {
  const pathname = usePathname();
  const isFromViajes = pathname === '/viajes';
  
  let images: string[] = [];
  if (Array.isArray(zone.images)) {
    images = zone.images;
  } else if (typeof zone.images === 'string') {
    try {
      images = JSON.parse(zone.images);
    } catch {
      images = [];
    }
  }
  const mainImage = images[0] || '/placeholder-image.jpg';

  // Determinar la ruta de detalles basada en la página actual
  const detailRoute = isFromViajes ? `/viajes/${zone.id}` : `/zones/${zone.id}`;

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      {/* Imagen con overlay */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={mainImage}
          alt={zone.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {zone.category_name && (
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
              {zone.category_name}
            </span>
          )}
          {isFromViajes && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
              Viaje y Naturaleza
            </span>
          )}
        </div>
        
        {zone.price && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ${zone.price}
            </span>
          </div>
        )}
        
        {/* Rating stars */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="text-white text-sm font-medium ml-2">4.8</span>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
          {zone.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {zone.description}
        </p>
        
        {/* Ubicación */}
        <div className="flex items-center text-gray-500 text-sm mb-4 p-3 bg-gray-50 rounded-lg">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
          <span className="font-medium">{zone.location}</span>
        </div>
        
        {/* Operador */}
        {zone.operator_name && (
          <div className="flex items-center text-sm text-gray-600 mb-6 p-3 bg-blue-50 rounded-lg">
            <FaUser className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <div>
              <span className="font-medium">{zone.operator_name}</span>
              {zone.company && (
                <div className="flex items-center mt-1">
                  <FaBuilding className="w-3 h-3 mr-1 text-blue-400" />
                  <span className="text-gray-500">{zone.company}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Botón mejorado */}
        <Link
          href={detailRoute}
          className="group/btn inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <FaEye className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
          Ver Detalles
        </Link>
      </div>
    </div>
  );
} 