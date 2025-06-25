import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { adminMiddleware } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    // Verificar permisos de administrador
    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const db = await getDatabase();

    // Obtener estadísticas
    const totalUsers = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "operator"');
    const totalZones = await db.get('SELECT COUNT(*) as count FROM zones');
    const totalCategories = await db.get('SELECT COUNT(*) as count FROM categories');

    // Zonas por categoría
    const zonesByCategory = await db.all(`
      SELECT c.name, COUNT(z.id) as count
      FROM categories c
      LEFT JOIN zones z ON c.id = z.category_id
      GROUP BY c.id, c.name
      ORDER BY count DESC
    `);

    // Usuarios más activos
    const topUsers = await db.all(`
      SELECT u.name, u.company, COUNT(z.id) as zones_count
      FROM users u
      LEFT JOIN zones z ON u.id = z.user_id
      WHERE u.role = 'operator'
      GROUP BY u.id, u.name, u.company
      ORDER BY zones_count DESC
      LIMIT 5
    `);

    // Zonas recientes
    const recentZones = await db.all(`
      SELECT z.name, z.created_at, u.name as operator_name
      FROM zones z
      LEFT JOIN users u ON z.user_id = u.id
      ORDER BY z.created_at DESC
      LIMIT 5
    `);

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers.count,
        totalZones: totalZones.count,
        totalCategories: totalCategories.count
      },
      zonesByCategory,
      topUsers,
      recentZones
    });

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 