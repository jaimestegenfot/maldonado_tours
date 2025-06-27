// Datos ficticios para el dashboard

export const mockCategories = [
  { id: 1, name: 'Zonas' },
  { id: 2, name: 'Viajes' },
  { id: 3, name: 'Restaurantes' },
  { id: 4, name: 'Hospedajes' }
];

export const mockZones = [
  {
    id: 1,
    name: 'Reserva Nacional Tambopata',
    description: 'Una de las reservas más biodiversas del mundo, hogar de miles de especies de flora y fauna amazónica.',
    category_id: 1,
    category_name: 'Zonas',
    location: 'Puerto Maldonado, Madre de Dios',
    price: 'Desde $50 USD',
    duration: '1 día',
    status: 'active',
    views: 1250,
    favorites: 89,
    rating: 4.8,
    images: ['https://www.lorenzoexpeditions.com/wp-content/uploads/2022/12/RESERVA-TAMBOPATA-1-2-scaled.jpg'],
    services: ['Guía especializado', 'Transporte', 'Almuerzo', 'Equipos de observación'],
    highlights: ['Observación de aves', 'Caminata por la selva', 'Visita al lago'],
    requirements: 'Ropa cómoda, repelente, agua',
    included: 'Transporte, guía, almuerzo, equipos',
    not_included: 'Bebidas adicionales, propinas',
    additional_info: 'Recomendamos llevar cámara fotográfica',
    contact_phone: '+51 999 123 456',
    contact_email: 'info@tambopata.com',
    website: 'https://tambopata.com',
    created_at: '2024-01-15'
  },
  {
    id: 2,
    name: 'Lago Sandoval',
    description: 'Hermoso lago rodeado de selva virgen, perfecto para observar fauna silvestre y disfrutar de la naturaleza.',
    category_id: 1,
    category_name: 'Zonas',
    location: 'Puerto Maldonado, Madre de Dios',
    price: 'Desde $35 USD',
    duration: 'Medio día',
    status: 'active',
    views: 890,
    favorites: 67,
    rating: 4.6,
    images: ['https://www.peru.travel/Contenido/Uploads/lago-sandoval-interior-3_637661807837691460.jpg'],
    services: ['Paseo en bote', 'Guía local', 'Refrigerio'],
    highlights: ['Observación de caimanes', 'Paseo en bote', 'Fotografía'],
    requirements: 'Ropa ligera, protector solar',
    included: 'Bote, guía, refrigerio',
    not_included: 'Transporte desde hotel',
    additional_info: 'Mejor horario: tarde para ver caimanes',
    contact_phone: '+51 999 234 567',
    contact_email: 'info@sandoval.com',
    website: 'https://sandoval.com',
    created_at: '2024-01-20'
  },
  {
    id: 3,
    name: 'El Caimán Lodge',
    description: 'Lodge ecológico en medio de la selva, ofreciendo experiencias únicas de ecoturismo.',
    category_id: 4,
    category_name: 'Hospedajes',
    location: 'Río Madre de Dios',
    price: 'Desde $80 USD/noche',
    duration: '2 días / 1 noche',
    status: 'pending',
    views: 456,
    favorites: 34,
    rating: 4.9,
    images: ['/api/placeholder/400/300'],
    services: ['Habitación privada', 'Alimentación completa', 'Actividades guiadas'],
    highlights: ['Cabañas en la selva', 'Comida local', 'Actividades nocturnas'],
    requirements: 'Reserva previa, documentos de identidad',
    included: 'Habitación, 3 comidas, actividades',
    not_included: 'Bebidas alcohólicas, propinas',
    additional_info: 'WiFi disponible en áreas comunes',
    contact_phone: '+51 999 345 678',
    contact_email: 'reservas@caimanlodge.com',
    website: 'https://caimanlodge.com',
    created_at: '2024-02-01'
  },
  {
    id: 4,
    name: 'Restaurante La Selva',
    description: 'Restaurante especializado en gastronomía amazónica con ingredientes frescos de la región.',
    category_id: 3,
    category_name: 'Restaurantes',
    location: 'Centro de Puerto Maldonado',
    price: 'Desde $15 USD',
    duration: '1-2 horas',
    status: 'active',
    views: 678,
    favorites: 45,
    rating: 4.7,
    images: ['/api/placeholder/400/300'],
    services: ['Comida local', 'Bebidas regionales', 'Atención personalizada'],
    highlights: ['Pescado de río', 'Frutas exóticas', 'Ambiente selvático'],
    requirements: 'Reserva recomendada en temporada alta',
    included: 'Plato principal, bebida',
    not_included: 'Postres, bebidas adicionales',
    additional_info: 'Abierto de 12:00 a 22:00',
    contact_phone: '+51 999 456 789',
    contact_email: 'info@laselva.com',
    website: 'https://laselva.com',
    created_at: '2024-01-10'
  },
  {
    id: 5,
    name: 'Aventura Amazónica',
    description: 'Tour completo de aventura por la selva amazónica con actividades emocionantes.',
    category_id: 2,
    category_name: 'Viajes',
    location: 'Madre de Dios',
    price: 'Desde $120 USD',
    duration: '3 días / 2 noches',
    status: 'draft',
    views: 234,
    favorites: 12,
    rating: 0,
    images: ['/api/placeholder/400/300'],
    services: ['Transporte completo', 'Alojamiento', 'Alimentación', 'Guía especializado'],
    highlights: ['Canopy', 'Rafting', 'Caminatas nocturnas'],
    requirements: 'Condición física buena, ropa deportiva',
    included: 'Todo incluido excepto bebidas alcohólicas',
    not_included: 'Bebidas alcohólicas, propinas',
    additional_info: 'Grupo mínimo 4 personas',
    contact_phone: '+51 999 567 890',
    contact_email: 'info@aventuraamazonica.com',
    website: 'https://aventuraamazonica.com',
    created_at: '2024-02-05'
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: 'view',
    title: 'Nuevas vistas en "Reserva Nacional Tambopata"',
    message: 'Tu destino ha recibido 25 nuevas vistas en las últimas 24 horas',
    time: 'Hace 2 horas',
    read: false,
    icon: 'FaEye',
    color: 'green'
  },
  {
    id: 2,
    type: 'favorite',
    title: 'Nuevo favorito agregado',
    message: 'Alguien agregó "Lago Sandoval" a sus favoritos',
    time: 'Hace 4 horas',
    read: false,
    icon: 'FaHeart',
    color: 'red'
  },
  {
    id: 3,
    type: 'rating',
    title: 'Nueva calificación recibida',
    message: 'Tu destino "El Caimán" recibió una calificación de 5 estrellas',
    time: 'Hace 6 horas',
    read: true,
    icon: 'FaStar',
    color: 'yellow'
  },
  {
    id: 4,
    type: 'system',
    title: 'Actualización del sistema',
    message: 'Hemos actualizado nuestras políticas de publicación. Revisa los cambios.',
    time: 'Hace 1 día',
    read: true,
    icon: 'FaBell',
    color: 'blue'
  },
  {
    id: 5,
    type: 'approval',
    title: 'Destino aprobado',
    message: 'Tu destino "Isla de los Monos" ha sido aprobado y está ahora visible públicamente',
    time: 'Hace 2 días',
    read: true,
    icon: 'FaCheck',
    color: 'green'
  }
];

export const mockStats = {
  totalViews: 3456,
  totalFavorites: 234,
  totalDestinations: 5,
  monthlyGrowth: 12.5,
  topDestination: 'Reserva Nacional Tambopata',
  recentActivity: [
    { date: '2024-02-15', views: 45, favorites: 3 },
    { date: '2024-02-14', views: 38, favorites: 2 },
    { date: '2024-02-13', views: 52, favorites: 5 },
    { date: '2024-02-12', views: 41, favorites: 1 },
    { date: '2024-02-11', views: 67, favorites: 4 }
  ]
};

export const mockUser = {
  id: 1,
  name: 'Carlos Maldonado',
  email: 'carlos@example.com',
  phone: '+51 999 123 456',
  company: 'PEM Tours',
  website: 'https://pemtours.com',
  location: 'Puerto Maldonado, Madre de Dios',
  bio: 'Operador turístico especializado en ecoturismo y aventura en la Amazonía peruana.',
  avatar: '/api/placeholder/150/150',
  joinDate: '2023-06-15',
  totalDestinations: 5,
  totalViews: 3456,
  totalFavorites: 234
};

// Datos de Viajes y Naturaleza
export const mockViajes = [
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

// Datos de Restaurantes
export const mockRestaurantes = [
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

// Datos de Hospedajes
export const mockHospedajes = [
  {
    id: 1,
    name: 'EcoAmazonia Lodge',
    description: 'Hospedaje ecológico en plena selva.',
    location: 'Río Madre de Dios',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tipo de Alojamiento', text: 'Lodge ecológico con cabañas en la selva.' },
      { title: 'Servicios', text: 'Tours incluidos, restaurante y guías nativos.' },
      { title: 'Recomendación', text: 'Ideal para amantes de la naturaleza y aventura.' }
    ]
  },
  {
    id: 2,
    name: 'Hostal Tambopata',
    description: 'Hospedaje cómodo y económico.',
    location: 'Tambopata',
    images: JSON.stringify(['https://images.unsplash.com/photo-1506744038136-46273834b3fb']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tipo de Alojamiento', text: 'Hostal familiar con habitaciones privadas.' },
      { title: 'Servicios', text: 'WiFi gratuito, desayuno incluido y recepción 24h.' },
      { title: 'Ubicación', text: 'Céntrico, cerca de restaurantes y tiendas.' }
    ]
  },
  {
    id: 3,
    name: 'Inkaterra Reserva Amazónica',
    description: 'Lodge de lujo en la selva con experiencias únicas.',
    location: 'Reserva Nacional Tambopata',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tipo de Alojamiento', text: 'Lodge de lujo con suites premium.' },
      { title: 'Servicios', text: 'Spa, piscina, restaurante gourmet y tours exclusivos.' },
      { title: 'Experiencia', text: 'Una de las mejores experiencias en la Amazonía.' }
    ]
  },
  {
    id: 4,
    name: 'Wasai Lodge',
    description: 'Hospedaje con tours y actividades en la selva.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tipo de Alojamiento', text: 'Lodge con cabañas y habitaciones estándar.' },
      { title: 'Actividades', text: 'Tours a la selva, pesca y observación de aves.' },
      { title: 'Tips', text: 'Reserva con anticipación en temporada alta.' }
    ]
  },
  {
    id: 5,
    name: 'Lodge Amazon Garden',
    description: 'Hospedaje con tours incluidos.',
    location: 'Tambopata',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tipo de Alojamiento', text: 'Lodge con jardines y vista al río.' },
      { title: 'Tours Incluidos', text: 'Visita a collpas, caminatas nocturnas y canotaje.' },
      { title: 'Ambiente', text: 'Relajante y perfecto para desconectar.' }
    ]
  },
  {
    id: 6,
    name: 'Hostal Río Madre',
    description: 'Hospedaje familiar y acogedor.',
    location: 'Puerto Maldonado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca']),
    created_at: '2024-01-01T00:00:00Z',
    descriptions: [
      { title: 'Tipo de Alojamiento', text: 'Hostal familiar con atención personalizada.' },
      { title: 'Servicios', text: 'Desayuno casero, WiFi y información turística.' },
      { title: 'Recomendación', text: 'Ideal para viajeros con presupuesto limitado.' }
    ]
  },
];

// Imágenes de hero para cada sección
export const heroImages = {
  viajes: "https://lugarturistico.pe/wp-content/uploads/2023/05/parque_nacional_bahuaja.jpg",
  restaurantes: "https://cosasbucket.s3.amazonaws.com/wp-content/uploads/2024/07/25173200/destination-peru-madre-de-dios-puerto-maldonado-750x450.png",
  hospedajes: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/ad/ad/12/caption.jpg?w=1400&h=800&s=1"
}; 