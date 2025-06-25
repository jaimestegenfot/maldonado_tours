'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStar, FaArrowLeft, FaShare, FaHeart, FaCalendar, FaClock, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

// Array local de destinos (copiado de la página principal)
const destinosNaturaleza = [
  {
    id: 1,
    name: 'Reserva Nacional Tambopata',
    description: 'Selva virgen, biodiversidad y paisajes únicos.',
    location: 'Tambopata',
    images: JSON.stringify(['https://www.lorenzoexpeditions.com/wp-content/uploads/2022/12/RESERVA-TAMBOPATA-1-2-scaled.jpg']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Historia', text: 'La Reserva Nacional Tambopata es uno de los lugares más biodiversos del planeta.' },
      { title: 'Tips', text: 'Lleva binoculares y protector solar.' },
      { title: 'Recomendación', text: 'No te pierdas el avistamiento de aves al amanecer.' }
    ]
  },
  {
    id: 2,
    name: 'Lago Sandoval',
    description: 'Hermoso lago rodeado de selva y fauna.',
    location: 'Tambopata',
    images: JSON.stringify(['https://www.peru.travel/Contenido/Uploads/lago-sandoval-interior-3_637661807837691460.jpg']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Historia', text: 'El Lago Sandoval es famoso por su belleza y su fauna única.' },
      { title: 'Tips', text: 'Ideal para paseos en canoa y fotografía.' }
    ]
  },
  {
    id: 3,
    name: 'Collpa de Guacamayos',
    description: 'Espectáculo de aves en la Amazonía.',
    location: 'Tambopata',
    images: JSON.stringify(['https://rainforestexpeditions.com/es/wp-content/uploads/2021/10/Collpa-de-Guacamayos-Chuncho-en-la-Reserva-Nacional-Tambopata.jpg']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Recomendación', text: 'Llega temprano para ver la mayor cantidad de aves.' }
    ]
  },
  {
    id: 4,
    name: 'Isla de los Monos',
    description: 'Santuario de fauna amazónica en el río Madre de Dios.',
    location: 'Río Madre de Dios',
    images: JSON.stringify(['https://www.heliconialodge.com.pe/objetos/servicio/MTQ=/img_10122018102302.jpg']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tips', text: 'Lleva frutas para interactuar con los monos.' }
    ]
  },
  {
    id: 5,
    name: 'Centro de Rescate Taricaya',
    description: 'Rescate y conservación de fauna silvestre.',
    location: 'Río Madre de Dios',
    images: JSON.stringify(['https://gotambopata.com/wp-content/uploads/slider/cache/8e8ce3c9e013b7034bc4ce3abae16be1/Atardecer-en-la-Reserva-Ecologica-Taricaya.jpg']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Historia', text: 'Centro dedicado a la rehabilitación de animales silvestres.' }
    ]
  },
  {
    id: 7,
    name: 'Parque Nacional Bahuaja Sonene',
    description: 'Área protegida con paisajes únicos y biodiversidad.',
    location: 'Bahuaja Sonene',
    images: JSON.stringify(['https://lugarturistico.pe/wp-content/uploads/2023/05/parque_nacional_bahuaja.jpg']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tips', text: 'Ideal para los amantes de la naturaleza y la aventura.' }
    ]
  },
];

interface Viaje {
  id: number;
  name: string;
  description: string;
  location: string;
  images?: string;
  created_at: string;
  descriptions: { title: string; text: string }[];
}

export default function ViajeDetailPage() {
  const params = useParams();
  const [viaje, setViaje] = useState<Viaje | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      // Buscar el viaje en el array local
      const viajeEncontrado = destinosNaturaleza.find(v => v.id === parseInt(params.id as string));
      if (viajeEncontrado) {
        setViaje(viajeEncontrado);
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
          <p className="text-gray-600 text-lg">Cargando detalles del viaje...</p>
        </div>
      </div>
    );
  }

  if (!viaje) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Viaje no encontrado</h2>
          <p className="text-gray-600 mb-6">El viaje que buscas no existe</p>
          <Link 
            href="/viajes"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver a Viajes
          </Link>
        </div>
      </div>
    );
  }

  const images = parseImages(viaje.images || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/viajes"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Volver a Viajes
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
              alt={viaje.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay con información */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Viaje y Naturaleza
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{viaje.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-5 h-5 text-green-400" />
                    <span className="font-medium">{viaje.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 font-medium">4.9</span>
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
                      alt={`${viaje.name} - Imagen ${index + 1}`}
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
                {viaje.description}
              </p>
              
              {/* Descripciones adicionales */}
              {viaje.descriptions && viaje.descriptions.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Información Adicional</h3>
                  {viaje.descriptions.map((desc, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-bold text-green-700 mb-2">{desc.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{desc.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información del viaje */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalles del Viaje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Ubicación</p>
                    <p className="font-semibold">{viaje.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <FaCalendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Duración</p>
                    <p className="font-semibold">1 día completo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <FaUsers className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Grupo máximo</p>
                    <p className="font-semibold">12 personas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <FaClock className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Horario</p>
                    <p className="font-semibold">6:00 AM - 6:00 PM</p>
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
                  <FaClock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Duración</p>
                    <p className="font-semibold">1 día completo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUsers className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Máximo de personas</p>
                    <p className="font-semibold">12 personas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCalendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Horarios</p>
                    <p className="font-semibold">6:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMoneyBillWave className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Precio</p>
                    <p className="font-semibold text-green-600">Desde $150</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de reserva */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">¿Te interesa este viaje?</h3>
              <p className="text-green-100 mb-4">Reserva tu aventura en la naturaleza</p>
              <button className="w-full bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors">
                Reservar Ahora
              </button>
            </div>

            {/* Información de seguridad */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Información de Seguridad</h3>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Guías certificados</li>
                <li>• Equipo de seguridad incluido</li>
                <li>• Seguro de viaje</li>
                <li>• Protocolos COVID-19</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 