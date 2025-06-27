'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardSidebar from '@/components/DashboardSidebar';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaBuilding, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { mockUser } from '@/lib/mockData';

export default function PerfilPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    company: mockUser.company,
    website: mockUser.website,
    location: mockUser.location,
    bio: mockUser.bio
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simular guardado
    setTimeout(() => {
      console.log('Perfil actualizado:', formData);
      setIsEditing(false);
      setLoading(false);
    }, 1500);
  };

  const handleCancel = () => {
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      company: mockUser.company,
      website: mockUser.website,
      location: mockUser.location,
      bio: mockUser.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
              <p className="text-gray-600 mt-1">Gestiona tu información personal y profesional</p>
            </div>
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <FaEdit className="w-4 h-4" />
                  <span>Editar Perfil</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <FaSave className="w-4 h-4" />
                    <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              )}
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
            {/* Información del perfil */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {/* Avatar y información básica */}
                <div className="w-full sm:w-1/3">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-4xl">
                          {mockUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-2 right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                          <FaCamera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{formData.name}</h2>
                    <p className="text-gray-600 mb-4">{formData.company}</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span>{formData.location}</span>
                    </div>
                  </div>
                </div>

                {/* Información detallada */}
                <div className="w-full sm:w-2/3">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{formData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{formData.company}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{formData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{formData.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
                        {isEditing ? (
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{formData.website}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{formData.location}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <p className="text-gray-800">{formData.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas del perfil */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Destinos Publicados</p>
                    <p className="text-3xl font-bold text-gray-800">{mockUser.totalDestinations}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaUser className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Vistas</p>
                    <p className="text-3xl font-bold text-gray-800">{mockUser.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaGlobe className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Favoritos</p>
                    <p className="text-3xl font-bold text-gray-800">{mockUser.totalFavorites}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaUser className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de la Cuenta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Fecha de Registro</h3>
                  <p className="text-gray-600">{new Date(mockUser.joinDate).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Estado de la Cuenta</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Activa
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Tipo de Cuenta</h3>
                  <p className="text-gray-600">Operador Turístico</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Verificación</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Verificada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 