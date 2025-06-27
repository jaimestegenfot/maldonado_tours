'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import ZoneCard from '@/components/ZoneCard';
import Link from 'next/link';
import DashboardSidebar from '@/components/DashboardSidebar';
import { FaPlus, FaEye, FaHeart, FaStar, FaMapMarkerAlt, FaChartLine } from 'react-icons/fa';
import { mockZones, mockCategories } from '@/lib/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const [zones, setZones] = useState(mockZones);
  const [categories, setCategories] = useState(mockCategories);

  // Agrupar zonas por categoría
  const grouped = categories.map((cat: any) => ({
    ...cat,
    zones: zones.filter((z: any) => z.category_name === cat.name)
  }));

  // Estadísticas simuladas
  const stats = {
    totalDestinos: zones.length,
    totalVistas: 1247,
    totalFavoritos: 89,
    calificacionPromedio: 4.6
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del Dashboard */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Bienvenido de vuelta, {user?.name}</p>
            </div>
            <Link 
              href="/dashboard/new" 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <FaPlus className="w-4 h-4" />
              <span>Nuevo Destino</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 mb-4 lg:mb-0">
            <DashboardSidebar />
          </div>

          {/* Contenido principal */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Destinos</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalDestinos}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Vistas</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalVistas}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaEye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Favoritos</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalFavoritos}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaHeart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Calificación</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.calificacionPromedio}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FaStar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Destinos */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Mis Destinos</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaChartLine className="w-4 h-4" />
                  <span className="text-sm">Gestiona tus destinos turísticos</span>
                </div>
              </div>

              {grouped.every(g => g.zones.length === 0) ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No tienes destinos publicados</h3>
                  <p className="text-gray-600 mb-6">Comienza agregando tu primer destino turístico</p>
                  <Link 
                    href="/dashboard/new" 
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Agregar Primer Destino</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {grouped.map((group: any) => group.zones.length > 0 && (
                    <div key={group.id}>
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {group.zones.length} destinos
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.zones.map((zone: any) => (
                          <ZoneCard key={zone.id} zone={zone} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mt-4 sm:mt-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Actividad Reciente</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaEye className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Nuevas vistas en "Reserva Nacional Tambopata"</p>
                    <p className="text-sm text-gray-600">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <FaHeart className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">"Lago Sandoval" agregado a favoritos</p>
                    <p className="text-sm text-gray-600">Hace 4 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaStar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Nueva calificación en "El Caimán"</p>
                    <p className="text-sm text-gray-600">Hace 6 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 