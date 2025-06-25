'use client';
import { useEffect, useState } from 'react';
import ZoneCard from '../../components/ZoneCard';

export default function ZonesPage() {
  const [zones, setZones] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchZones();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.categories || []);
  };

  const fetchZones = async (params = {}) => {
    setLoading(true);
    const query = new URLSearchParams({ ...filters, ...params });
    const res = await fetch(`/api/zones?${query.toString()}`);
    const data = await res.json();
    setZones(data.zones || []);
    setLoading(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchZones({ [name]: value });
  };

  // Agrupar zonas por categoría
  const grouped = categories.map((cat: any) => ({
    ...cat,
    zones: zones.filter((z: any) => z.category_name === cat.name)
  }));

  return (
    <div className='text-black'>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Destinos Turísticos</h1>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Buscar por ubicación"
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Buscar por nombre o descripción"
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando destinos...</div>
      ) : grouped.every(g => g.zones.length === 0) ? (
        <div className="text-center py-12 text-gray-500">No se encontraron destinos turísticos.</div>
      ) : (
        <div className="space-y-12">
          {grouped.map((group: any) => group.zones.length > 0 && (
            <div key={group.id}>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">{group.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.zones.map((zone: any) => (
                  <ZoneCard key={zone.id} zone={zone} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 