'use client';

import { useAuth } from '@/components/AuthProvider';
import DashboardSidebar from '@/components/DashboardSidebar';
import { FaEye, FaHeart, FaMapMarkerAlt, FaArrowUp, FaArrowDown, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';
import { mockStats, mockZones } from '@/lib/mockData';

export default function EstadisticasPage() {
  const { user } = useAuth();

  // Calcular estadísticas adicionales
  const totalViews = mockStats.totalViews;
  const totalFavorites = mockStats.totalFavorites;
  const totalDestinations = mockStats.totalDestinations;
  const monthlyGrowth = mockStats.monthlyGrowth;
  
  // Destino más popular
  const topDestination = mockZones.reduce((prev, current) => 
    (prev.views > current.views) ? prev : current
  );

  // Promedio de calificaciones
  const averageRating = mockZones.reduce((sum, zone) => sum + (zone.rating || 0), 0) / mockZones.length;

  // Categorías más populares
  const categoryStats = mockZones.reduce((acc, zone) => {
    const category = zone.category_name;
    if (!acc[category]) {
      acc[category] = { count: 0, views: 0, favorites: 0 };
    }
    acc[category].count++;
    acc[category].views += zone.views || 0;
    acc[category].favorites += zone.favorites || 0;
    return acc;
  }, {} as Record<string, { count: number; views: number; favorites: number }>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Estadísticas</h1>
              <p className="text-gray-600 mt-1">Analiza el rendimiento de tus destinos turísticos</p>
            </div>
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
            {/* Métricas principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Vistas</p>
                    <p className="text-3xl font-bold text-gray-800">{totalViews.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <FaArrowUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+{monthlyGrowth}%</span>
                      <span className="text-gray-500 text-sm ml-1">este mes</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaEye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Favoritos</p>
                    <p className="text-3xl font-bold text-gray-800">{totalFavorites.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <FaArrowUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+8.2%</span>
                      <span className="text-gray-500 text-sm ml-1">este mes</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaHeart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Destinos Activos</p>
                    <p className="text-3xl font-bold text-gray-800">{totalDestinations}</p>
                    <div className="flex items-center mt-2">
                      <FaArrowUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+1</span>
                      <span className="text-gray-500 text-sm ml-1">este mes</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Calificación Promedio</p>
                    <p className="text-3xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
                    <div className="flex items-center mt-2">
                      <FaStar className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-600 text-sm font-medium">Excelente</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FaStar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de actividad reciente */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Actividad Reciente</h2>
              <div className="space-y-4">
                {mockStats.recentActivity.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaChartLine className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(day.date).toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {day.views} vistas • {day.favorites} favoritos
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">{day.views}</p>
                      <p className="text-sm text-gray-600">vistas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destino más popular */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Destino Más Popular</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{topDestination.name}</h3>
                  <p className="text-gray-600 mb-4">{topDestination.description}</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <FaEye className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{topDestination.views?.toLocaleString()} vistas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaHeart className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">{topDestination.favorites} favoritos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaStar className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700">{topDestination.rating} estrellas</span>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mt-4 sm:mt-0 sm:ml-4">
                  <FaMapMarkerAlt className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Estadísticas por categoría */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Rendimiento por Categoría</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <div key={category} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Destinos:</span>
                        <span className="font-semibold text-gray-800">{stats.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vistas:</span>
                        <span className="font-semibold text-gray-800">{stats.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Favoritos:</span>
                        <span className="font-semibold text-gray-800">{stats.favorites}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tendencias */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Tendencias</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaArrowUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Crecimiento Constante</h3>
                  <p className="text-gray-600 text-sm">
                    Tus destinos han experimentado un crecimiento del {monthlyGrowth}% este mes
                  </p>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Engagement Alto</h3>
                  <p className="text-gray-600 text-sm">
                    Tasa de conversión de vistas a favoritos del {(totalFavorites / totalViews * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaStar className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Excelente Calificación</h3>
                  <p className="text-gray-600 text-sm">
                    Promedio de {averageRating.toFixed(1)} estrellas en todos tus destinos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 