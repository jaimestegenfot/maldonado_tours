'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStar, FaArrowLeft, FaShare, FaHeart, FaBed, FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaPhone, FaEnvelope } from 'react-icons/fa';
import { mockHospedajes } from '../../../lib/mockData';

interface Hospedaje {
  id: number;
  name: string;
  description: string;
  location: string;
  images?: string;
  created_at: string;
  descriptions: { title: string; text: string }[];
}

export default function HospedajeDetailPage() {
  const params = useParams();
  const [hospedaje, setHospedaje] = useState<Hospedaje | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      // Buscar el hospedaje en los datos mock
      const hospedajeEncontrado = mockHospedajes.find(h => h.id === parseInt(params.id as string));
      if (hospedajeEncontrado) {
        setHospedaje(hospedajeEncontrado);
      }
      setLoading(false);
    }
  }, [params.id]);

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
          <p className="text-gray-600 text-lg">Cargando detalles del hospedaje...</p>
        </div>
      </div>
    );
  }

  if (!hospedaje) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hospedaje no encontrado</h2>
          <p className="text-gray-600 mb-6">El hospedaje que buscas no existe</p>
          <Link 
            href="/hospedajes"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver a Hospedajes
          </Link>
        </div>
      </div>
    );
  }

  const images = parseImages(hospedaje.images || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/hospedajes"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Volver a Hospedajes
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
              alt={hospedaje.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay con información */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Hospedaje
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">{hospedaje.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
                    <span className="font-medium drop-shadow-lg">{hospedaje.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 font-medium drop-shadow-lg">4.8</span>
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
                      index === selectedImage ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${hospedaje.name} - Imagen ${index + 1}`}
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
            {/* Descripción principal */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Descripción</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {hospedaje.description}
              </p>
              
              {/* Descripciones adicionales */}
              {hospedaje.descriptions && hospedaje.descriptions.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Información Adicional</h3>
                  {hospedaje.descriptions.map((desc, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-bold text-blue-700 mb-2">{desc.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{desc.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información del hospedaje */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalles del Hospedaje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Ubicación</p>
                    <p className="font-semibold">{hospedaje.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <FaBed className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Tipo de Habitación</p>
                    <p className="font-semibold">Doble / Individual</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <FaWifi className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-gray-600 text-sm">WiFi</p>
                    <p className="font-semibold">Gratuito</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <FaUtensils className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Restaurante</p>
                    <p className="font-semibold">Incluido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar con información adicional */}
          <div className="space-y-6">
            {/* Información rápida */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información Rápida</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaBed className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Habitaciones</p>
                    <p className="font-semibold">Doble / Individual</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaWifi className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">WiFi</p>
                    <p className="font-semibold">Gratuito</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUtensils className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Restaurante</p>
                    <p className="font-semibold">Incluido</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaStar className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Calificación</p>
                    <p className="font-semibold text-yellow-600">4.8/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de reserva */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">¿Te interesa este hospedaje?</h3>
              <p className="text-blue-100 mb-4">Reserva tu estadía en la selva amazónica</p>
              <button className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors">
                Reservar Ahora
              </button>
            </div>

            {/* Información de contacto */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Información de Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700">+51 999 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700">info@hospedaje.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700">{hospedaje.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 