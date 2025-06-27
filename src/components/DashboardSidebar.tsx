import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPlus, FaMapMarkerAlt, FaChartBar, FaCog, FaSignOutAlt, FaUser, FaBell } from 'react-icons/fa';
import { useAuth } from './AuthProvider';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: FaHome },
  { href: '/dashboard/destinos', label: 'Mis Destinos', icon: FaMapMarkerAlt },
  { href: '/dashboard/new', label: 'Crear Destino', icon: FaPlus },
  { href: '/dashboard/estadisticas', label: 'Estadísticas', icon: FaChartBar },
  { href: '/dashboard/perfil', label: 'Mi Perfil', icon: FaUser },
  { href: '/dashboard/notificaciones', label: 'Notificaciones', icon: FaBell },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: FaCog },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Perfil del usuario */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user?.name || 'Usuario'}</p>
            <p className="text-sm text-gray-600">{user?.email || 'usuario@email.com'}</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="space-y-2">
        {links.map(link => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Separador */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Cerrar sesión */}
      <button
        onClick={logout}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
      >
        <FaSignOutAlt className="w-5 h-5" />
        <span>Cerrar Sesión</span>
      </button>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-600 text-center">
          Maldonado Tours v1.0
        </p>
      </div>
    </aside>
  );
} 