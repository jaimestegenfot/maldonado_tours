'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardSidebar from '@/components/DashboardSidebar';
import ZoneCard from '@/components/ZoneCard';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaEye, FaHeart, FaStar, FaMapMarkerAlt, FaFilter, FaSearch, FaSort } from 'react-icons/fa';
import { mockZones, mockCategories } from '@/lib/mockData';

export default function DestinosPage() {
  const { user } = useAuth();
  const [zones, setZones] = useState(mockZones);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filtrar y ordenar destinos
  const filteredZones = zones
    .filter((zone: any) => {
      const matchesSearch = zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           zone.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || zone.category_name === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'favorites':
          return (b.favorites || 0) - (a.favorites || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const handleDelete = async (zoneId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este destino?')) {
      setZones(zones.filter((z: any) => z.id !== zoneId));
    }
  };

  const stats = {
    total: zones.length,
    active: zones.filter((z: any) => z.status === 'active').length,
    pending: zones.filter((z: any) => z.status === 'pending').length,
    draft: zones.filter((z: any) => z.status === 'draft').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mis Destinos</h1>
              <p className="text-gray-600 mt-1">Gestiona todos tus destinos turísticos</p>
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
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Destinos</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Activos</p>
                    <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaEye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Pendientes</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FaStar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Borradores</p>
                    <p className="text-3xl font-bold text-gray-600">{stats.draft}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FaEdit className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros y búsqueda */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Búsqueda */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar destinos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filtro por categoría */}
                <div className="lg:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Ordenar por */}
                <div className="lg:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="name">Ordenar por nombre</option>
                    <option value="views">Ordenar por vistas</option>
                    <option value="favorites">Ordenar por favoritos</option>
                    <option value="rating">Ordenar por calificación</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de destinos */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                  Destinos ({filteredZones.length})
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaFilter className="w-4 h-4" />
                  <span className="text-sm">Filtros aplicados</span>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Cargando tus destinos...</p>
                </div>
              ) : filteredZones.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron destinos</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Intenta ajustar los filtros de búsqueda' 
                      : 'Comienza agregando tu primer destino turístico'
                    }
                  </p>
                  {!searchTerm && selectedCategory === 'all' && (
                    <Link 
                      href="/dashboard/new" 
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <FaPlus className="w-4 h-4" />
                      <span>Agregar Primer Destino</span>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredZones.map((zone: any) => (
                    <div key={zone.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-lg mb-2">{zone.name}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{zone.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaEye className="w-4 h-4 mr-1" />
                              {zone.views || 0}
                            </span>
                            <span className="flex items-center">
                              <FaHeart className="w-4 h-4 mr-1" />
                              {zone.favorites || 0}
                            </span>
                            <span className="flex items-center">
                              <FaStar className="w-4 h-4 mr-1" />
                              {zone.rating || 0}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/dashboard/edit/${zone.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(zone.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          zone.status === 'active' ? 'bg-green-100 text-green-800' :
                          zone.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {zone.status === 'active' ? 'Activo' :
                           zone.status === 'pending' ? 'Pendiente' : 'Borrador'}
                        </span>
                        <Link
                          href={`/${zone.category_name?.toLowerCase()}/${zone.id}`}
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          Ver público →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 