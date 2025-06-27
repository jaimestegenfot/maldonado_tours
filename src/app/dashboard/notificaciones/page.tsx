'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardSidebar from '@/components/DashboardSidebar';
import { FaBell, FaEye, FaHeart, FaStar, FaMapMarkerAlt, FaCheck, FaTimes, FaTrash, FaEnvelope } from 'react-icons/fa';
import { mockNotifications } from '@/lib/mockData';

export default function NotificacionesPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaEye': return FaEye;
      case 'FaHeart': return FaHeart;
      case 'FaStar': return FaStar;
      case 'FaBell': return FaBell;
      case 'FaCheck': return FaCheck;
      default: return FaBell;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notificaciones</h1>
              <p className="text-gray-600 mt-1">Mantente al día con las actividades de tus destinos</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {unreadCount} sin leer
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Marcar todas como leídas
                </button>
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
            {/* Filtros */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'unread' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sin leer ({unreadCount})
                </button>
                <button
                  onClick={() => setFilter('view')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'view' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Vistas
                </button>
                <button
                  onClick={() => setFilter('favorite')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'favorite' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Favoritos
                </button>
                <button
                  onClick={() => setFilter('rating')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'rating' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Calificaciones
                </button>
                <button
                  onClick={() => setFilter('system')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'system' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sistema
                </button>
              </div>
            </div>

            {/* Lista de notificaciones */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Notificaciones ({filteredNotifications.length})
              </h2>

              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBell className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay notificaciones</h3>
                  <p className="text-gray-600">
                    {filter === 'all' 
                      ? 'No tienes notificaciones aún' 
                      : 'No hay notificaciones con este filtro'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => {
                    const Icon = getIconComponent(notification.icon);
                    return (
                      <div
                        key={notification.id}
                        className={`p-6 rounded-xl border transition-all duration-200 ${
                          notification.read 
                            ? 'bg-gray-50 border-gray-200' 
                            : 'bg-white border-green-200 shadow-md'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            notification.color === 'green' ? 'bg-green-100' :
                            notification.color === 'red' ? 'bg-red-100' :
                            notification.color === 'yellow' ? 'bg-yellow-100' :
                            'bg-blue-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              notification.color === 'green' ? 'text-green-600' :
                              notification.color === 'red' ? 'text-red-600' :
                              notification.color === 'yellow' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className={`font-semibold text-lg ${
                                  notification.read ? 'text-gray-700' : 'text-gray-800'
                                }`}>
                                  {notification.title}
                                </h3>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Marcar como leída"
                                  >
                                    <FaCheck className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Eliminar notificación"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Configuración de notificaciones */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuración de Notificaciones</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Notificaciones por email</h3>
                    <p className="text-sm text-gray-600">Recibe notificaciones importantes por correo electrónico</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Notificaciones de vistas</h3>
                    <p className="text-sm text-gray-600">Recibe alertas cuando alguien ve tus destinos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Notificaciones de favoritos</h3>
                    <p className="text-sm text-gray-600">Recibe alertas cuando alguien agrega tus destinos a favoritos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Notificaciones de calificaciones</h3>
                    <p className="text-sm text-gray-600">Recibe alertas cuando alguien califica tus destinos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 