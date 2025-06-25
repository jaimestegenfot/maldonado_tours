import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Mis Destinos' },
  { href: '/dashboard/new', label: 'Crear Nuevo Destino' },
  // Puedes agregar más opciones aquí
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow p-6 mb-8 md:mb-0 md:mr-8">
      <nav className="flex flex-col space-y-4">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname === link.href ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 