import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { authMiddleware } from '@/lib/middleware';

// GET - Listar zonas turísticas (público)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');

    const db = await getDatabase();

    let query = `
      SELECT z.*, c.name as category_name, u.name as operator_name, u.company
      FROM zones z
      LEFT JOIN categories c ON z.category_id = c.id
      LEFT JOIN users u ON z.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      query += ' AND c.name = ?';
      params.push(category);
    }

    if (location) {
      query += ' AND z.location LIKE ?';
      params.push(`%${location}%`);
    }

    if (search) {
      query += ' AND (z.name LIKE ? OR z.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY z.created_at DESC';

    const zones = await db.all(query, params);

    return NextResponse.json({ zones });

  } catch (error) {
    console.error('Error al obtener zonas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva zona turística (requiere autenticación)
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authResult = await authMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { name, description, location, category_id, price, images } = await request.json();
    const user = (request as any).user;

    // Validaciones
    if (!name || !description || !location) {
      return NextResponse.json(
        { error: 'Nombre, descripción y ubicación son requeridos' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Verificar que la categoría existe
    if (category_id) {
      const category = await db.get('SELECT id FROM categories WHERE id = ?', [category_id]);
      if (!category) {
        return NextResponse.json(
          { error: 'Categoría no válida' },
          { status: 400 }
        );
      }
    }

    // Insertar la zona
    const result = await db.run(
      `INSERT INTO zones (name, description, location, category_id, price, images, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, location, category_id || null, price || null, images || null, user.id]
    );

    // Obtener la zona creada con información adicional
    const newZone = await db.get(`
      SELECT z.*, c.name as category_name, u.name as operator_name, u.company
      FROM zones z
      LEFT JOIN categories c ON z.category_id = c.id
      LEFT JOIN users u ON z.user_id = u.id
      WHERE z.id = ?
    `, [result.lastID]);

    return NextResponse.json({
      message: 'Zona turística creada exitosamente',
      zone: newZone
    }, { status: 201 });

  } catch (error) {
    console.error('Error al crear zona:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 