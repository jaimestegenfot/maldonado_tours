'use client';
import Link from 'next/link';

const amazoniaImages = [
  'https://picchutravel.com/wp-content/uploads/lugares-para-visitar-en-madre-de-dios.jpg',
  'https://assets.howlanders.com/es/tours-peru/puerto-maldonado/tour-puerto-maldonado/timeline/rio-madre-de-dios.jpg',
  'https://andinoperu.b-cdn.net/wp-content/uploads/2023/06/lago-sandoval-1.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/48/ca/7b/20190708-155418-largejpg.jpg?w=800&h=400&s=1',
  'https://www.ollantaytambo.org/img/tambopata-explorer-043-01.jpg',
  'https://portal.andina.pe/EDPFotografia3/thumbnail/2023/09/06/000991871M.jpg',
  'https://live.staticflickr.com/65535/51739284311_13f0e356af_b.jpg',
  'https://www.admin.caminossur.com/vistas/img/products/covers/rio-amazonas-isla-de-los-monos.jpg',
];

const categorias = [
  {
    nombre: 'Zonas Naturales',
    imagen: 'https://blog.redbus.pe/wp-content/uploads/2018/01/madure.jpg',
    descripcion: 'Selvas, ríos y paisajes únicos.',
    href: '/zones?category=Naturaleza',
  },
  {
    nombre: 'Restaurantes',
    imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a5/ec/bd/restaurante-la-selva.jpg?w=900&h=500&s=1',
    descripcion: 'Gastronomía amazónica y sabores locales.',
    href: '/zones?category=Restaurante',
  },
  {
    nombre: 'Hospedajes',
    imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/2a/9c/ed/hotel-centenario.jpg?w=1000&h=600&s=1',
    descripcion: 'Lodges, hoteles y experiencias únicas.',
    href: '/zones?category=Hospedaje',
  },
];

export default function Home() {
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg">
        <img
          src="https://content.emarket.pe/common/collections/standard/0b/d4/0bd4935a-e79c-425f-927c-606d7ce53eb4.jpg"
          alt="Amazonía"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-green-700/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Explora la <span className="text-green-300">Amazonía</span> y sus maravillas
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-green-100 drop-shadow">
            Descubre destinos, cultura, naturaleza y experiencias únicas en el pulmón del mundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zones"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-colors"
            >
              Explorar Destinos
            </Link>
            <Link
              href="/auth/register"
              className="bg-white/80 text-green-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-100 shadow-lg transition-colors"
            >
              Soy Operador Turístico
            </Link>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-900">Imágenes de la Amazonía</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amazoniaImages.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg group relative">
              <img src={img} alt="Amazonía" className="object-cover w-full h-40 md:h-56 group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS DESTACADAS */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-900">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categorias.map((cat, i) => (
            <Link href={cat.href} key={i} className="block rounded-2xl overflow-hidden shadow-lg group relative">
              <img src={cat.imagen} alt={cat.nombre} className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">{cat.nombre}</h3>
                <p className="text-green-100 text-lg drop-shadow">{cat.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA OPERADORES */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-400 rounded-2xl p-12 text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow">¿Eres operador turístico?</h2>
        <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Únete a la plataforma y comparte tus destinos, experiencias y servicios con viajeros de todo el mundo. ¡Haz crecer tu negocio en la Amazonía!
        </p>
        <Link
          href="/auth/register"
          className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-100 shadow-lg transition-colors"
        >
          Registrarse Gratis
        </Link>
      </section>
    </div>
  );
}
