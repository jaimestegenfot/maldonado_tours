'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaUser, FaBuilding, FaStar, FaPhone, FaEnvelope, FaCalendar, FaClock, FaUsers, FaMoneyBillWave, FaArrowLeft, FaShare, FaHeart } from 'react-icons/fa';

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
  // Campos adicionales que podrían estar disponibles
  duration?: string;
  max_people?: number;
  contact_phone?: string;
  contact_email?: string;
  amenities?: string[];
  schedule?: string;
}

export default function ZoneDetailPage() {
  const params = useParams();
  const [zone, setZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Array local de descripciones adicionales para la demo funcional
  const extraDescriptions = [
    {
      title: 'Historia',
      text: 'Este destino tiene una historia fascinante que se remonta a tiempos ancestrales. Los visitantes pueden explorar ruinas antiguas y aprender sobre las culturas originarias.'
    },
    {
      title: 'Tips de Viaje',
      text: 'Se recomienda llevar ropa ligera, protector solar y repelente. No olvides tu cámara para capturar los paisajes únicos.'
    },
    {
      title: 'Recomendaciones',
      text: 'Prueba la gastronomía local y participa en las excursiones guiadas para una experiencia completa.'
    }
  ];

  useEffect(() => {
    if (params.id) {
      fetchZoneDetails(params.id as string);
    }
  }, [params.id]);

  const fetchZoneDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/zones/${id}`);
      
      if (!response.ok) {
        throw new Error('No se pudo cargar los detalles del destino');
      }
      
      const data = await response.json();
      setZone(data.zone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const parseImages = (images: string | string[]): string[] => {
    if (Array.isArray(images)) {
      return images;
    } else if (typeof images === 'string') {
      try {
        return JSON.parse(images);
      } catch {
        return [images];
      }
    }
    return ['/placeholder-image.jpg'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando detalles del destino...</p>
        </div>
      </div>
    );
  }

  if (error || !zone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'No se encontró el destino'}</p>
          <Link 
            href="/zones"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver a Destinos
          </Link>
        </div>
      </div>
    );
  }

  const images = parseImages(zone.images || '');
  const amenities = zone.amenities || ['WiFi', 'Estacionamiento', 'Guía turístico', 'Seguro de viaje'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/zones"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Volver a Destinos
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaShare className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <FaHeart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Información principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Galería de imágenes */}
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={images[selectedImage] || '/placeholder-image.jpg'}
              alt={zone.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay con información */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-4 mb-2">
                  {zone.category_name && (
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {zone.category_name}
                    </span>
                  )}
                  {zone.price && (
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ${zone.price}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{zone.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-5 h-5 text-green-400" />
                    <span className="font-medium">{zone.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navegación de imágenes */}
            {images.length > 1 && (
              <div className="absolute bottom-6 right-6 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === selectedImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Miniaturas de imágenes */}
          {images.length > 1 && (
            <div className="p-6 border-b">
              <div className="flex space-x-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      index === selectedImage ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${zone.name} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Descripción</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {zone.description}
              </p>
              {/* Descripciones adicionales */}
              <div className="space-y-6">
                {extraDescriptions.map((desc, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-bold text-green-700 mb-2">{desc.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{desc.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Información del operador */}
            {zone.operator_name && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Operador Turístico</h2>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaUser className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{zone.operator_name}</h3>
                    {zone.company && (
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaBuilding className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{zone.company}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {zone.contact_phone && (
                        <div className="flex items-center text-gray-600">
                          <FaPhone className="w-4 h-4 mr-2 text-green-500" />
                          <span>{zone.contact_phone}</span>
                        </div>
                      )}
                      {zone.contact_email && (
                        <div className="flex items-center text-gray-600">
                          <FaEnvelope className="w-4 h-4 mr-2 text-green-500" />
                          <span>{zone.contact_email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Servicios incluidos */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios Incluidos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar con información adicional */}
          <div className="space-y-6">
            {/* Información rápida */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información Rápida</h3>
              <div className="space-y-4">
                {zone.duration && (
                  <div className="flex items-center space-x-3">
                    <FaClock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-gray-600 text-sm">Duración</p>
                      <p className="font-semibold">{zone.duration}</p>
                    </div>
                  </div>
                )}
                {zone.max_people && (
                  <div className="flex items-center space-x-3">
                    <FaUsers className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-gray-600 text-sm">Máximo de personas</p>
                      <p className="font-semibold">{zone.max_people} personas</p>
                    </div>
                  </div>
                )}
                {zone.schedule && (
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-gray-600 text-sm">Horarios</p>
                      <p className="font-semibold">{zone.schedule}</p>
                    </div>
                  </div>
                )}
                {zone.price && (
                  <div className="flex items-center space-x-3">
                    <FaMoneyBillWave className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-gray-600 text-sm">Precio</p>
                      <p className="font-semibold text-green-600">${zone.price}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botón de reserva */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">¿Te interesa este destino?</h3>
              <p className="text-green-100 mb-4">Contacta con el operador para más información</p>
              <button className="w-full bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors">
                Contactar Operador
              </button>
            </div>

            {/* Información de seguridad */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Información de Seguridad</h3>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Reservas seguras y confiables</li>
                <li>• Operadores verificados</li>
                <li>• Soporte 24/7 disponible</li>
                <li>• Política de cancelación flexible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 