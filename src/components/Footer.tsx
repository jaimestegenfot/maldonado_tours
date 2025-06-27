'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const quickLinks = [
    { href: '/viajes', label: 'Viajes/Naturaleza' },
    { href: '/restaurantes', label: 'Restaurantes' },
    { href: '/hospedajes', label: 'Hospedajes' },
    { href: '/fichos', label: 'Fichos/Paradores' },
    { href: '/zones', label: 'Todos los Destinos' },
  ];

  const socialLinks = [
    { href: '#', icon: FaFacebook, label: 'Facebook' },
    { href: '#', icon: FaInstagram, label: 'Instagram' },
    { href: '#', icon: FaTwitter, label: 'Twitter' },
    { href: '#', icon: FaWhatsapp, label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white">
      {/* Contenido principal del footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-green-800 font-bold text-xl">MT</span>
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">PEM Tours</span>
            </div>
            <p className="text-green-100 mb-6 leading-relaxed">
              Descubre los destinos más hermosos de Madre de Dios. Te conectamos con la naturaleza, 
              la gastronomía local y los mejores lugares para hospedarte.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-green-300 flex-shrink-0" />
                <div>
                  <p className="text-green-100 font-medium">Teléfono</p>
                  <p className="text-green-200">+598 42 123 456</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-green-300 flex-shrink-0" />
                <div>
                  <p className="text-green-100 font-medium">Email</p>
                  <p className="text-green-200">info@pemtours.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-green-100 font-medium">Dirección</p>
                  <p className="text-green-200">Madre de Dios, Perú</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Newsletter</h3>
            <p className="text-green-100 mb-4">
              Suscríbete para recibir las mejores ofertas y novedades de PEM Tours.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-white text-green-800 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-green-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-green-200 text-sm">
              © {currentYear} PEM Tours. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-green-200 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-green-200 hover:text-white transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/cookies" className="text-green-200 hover:text-white transition-colors">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 