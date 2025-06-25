'use client';

import Link from 'next/link';
import Image from 'next/image';

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
}

interface ZoneCardProps {
  zone: Zone;
}

export default function ZoneCard({ zone }: ZoneCardProps) {
  const images = zone.images ? JSON.parse(zone.images) : [];
  const mainImage = images[0] || '/placeholder-image.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={mainImage}
          alt={zone.name}
          fill
          className="object-cover"
        />
        {zone.category_name && (
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {zone.category_name}
            </span>
          </div>
        )}
        {zone.price && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ${zone.price}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {zone.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {zone.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {zone.location}
        </div>
        
        {zone.operator_name && (
          <div className="text-sm text-gray-500 mb-4">
            Operador: {zone.operator_name}
            {zone.company && ` - ${zone.company}`}
          </div>
        )}
        
        <Link
          href={`/zones/${zone.id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
} 