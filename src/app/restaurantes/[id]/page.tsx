'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStar, FaArrowLeft, FaShare, FaHeart, FaClock, FaPhone, FaEnvelope, FaUtensils, FaUsers } from 'react-icons/fa';

// Array local de restaurantes (copiado de la página principal)
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

interface Restaurante {
  id: number;
  name: string;
  description: string;
  location: string;
  images?: string;
  created_at: string;
  descriptions: { title: string; text: string }[];
}

export default function RestauranteDetailPage() {
  const params = useParams();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      // Buscar el restaurante en el array local
      const restauranteEncontrado = restaurantes.find(r => r.id === parseInt(params.id as string));
      if (restauranteEncontrado) {
        setRestaurante(restauranteEncontrado);
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
          <p className="text-gray-600 text-lg">Cargando detalles del restaurante...</p>
        </div>
      </div>
    );
  }

  if (!restaurante) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Restaurante no encontrado</h2>
          <p className="text-gray-600 mb-6">El restaurante que buscas no existe</p>
          <Link 
            href="/restaurantes"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver a Restaurantes
          </Link>
        </div>
      </div>
    );
  }

  const images = parseImages(restaurante.images || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/restaurantes"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Volver a Restaurantes
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
              alt={restaurante.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay con información */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Restaurante
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{restaurante.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-5 h-5 text-green-400" />
                    <span className="font-medium">{restaurante.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 font-medium">4.7</span>
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
                      alt={`${restaurante.name} - Imagen ${index + 1}`}
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
                {restaurante.description}
              </p>
              
              {/* Descripciones adicionales */}
              {restaurante.descriptions && restaurante.descriptions.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Información Adicional</h3>
                  {restaurante.descriptions.map((desc, idx) => (
                    <div key={idx} className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="text-lg font-bold text-orange-700 mb-2">{desc.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{desc.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información del restaurante */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Información del Restaurante</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                  <FaMapMarkerAlt className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Ubicación</p>
                    <p className="font-semibold">{restaurante.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <FaClock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Horarios</p>
                    <p className="font-semibold">7:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FaPhone className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Teléfono</p>
                    <p className="font-semibold">+51 982 123 456</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <FaUsers className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Capacidad</p>
                    <p className="font-semibold">50 personas</p>
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
                  <FaClock className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Horarios</p>
                    <p className="font-semibold">7:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUsers className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Capacidad</p>
                    <p className="font-semibold">50 personas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUtensils className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Tipo de Cocina</p>
                    <p className="font-semibold">Amazónica</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaStar className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-gray-600 text-sm">Calificación</p>
                    <p className="font-semibold text-yellow-600">4.7/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de reserva */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">¿Te interesa este restaurante?</h3>
              <p className="text-orange-100 mb-4">Reserva tu mesa y disfruta de la gastronomía local</p>
              <button className="w-full bg-white text-orange-600 font-bold py-3 px-6 rounded-xl hover:bg-orange-50 transition-colors">
                Reservar Mesa
              </button>
            </div>

            {/* Información de contacto */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Información de Contacto</h3>
              <div className="space-y-3 text-blue-700 text-sm">
                <div className="flex items-center space-x-2">
                  <FaPhone className="w-4 h-4" />
                  <span>+51 982 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="w-4 h-4" />
                  <span>info@restaurante.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <span>{restaurante.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 