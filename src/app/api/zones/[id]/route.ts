import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { authMiddleware } from '@/lib/middleware';

// GET - Obtener zona específica (público)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase();

    const zone = await db.get(`
      SELECT z.*, c.name as category_name, u.name as operator_name, u.company
      FROM zones z
      LEFT JOIN categories c ON z.category_id = c.id
      LEFT JOIN users u ON z.user_id = u.id
      WHERE z.id = ?
    `, [params.id]);

    if (!zone) {
      return NextResponse.json(
        { error: 'Zona turística no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ zone });

  } catch (error) {
    console.error('Error al obtener zona:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar zona (requiere autenticación y ser propietario)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const authResult = await authMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { name, description, location, category_id, price, images } = await request.json();
    const user = (request as any).user;

    const db = await getDatabase();

    // Verificar que la zona existe y pertenece al usuario
    const existingZone = await db.get(
      'SELECT user_id FROM zones WHERE id = ?',
      [params.id]
    );

    if (!existingZone) {
      return NextResponse.json(
        { error: 'Zona turística no encontrada' },
        { status: 404 }
      );
    }

    if (existingZone.user_id !== user.id && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No tienes permisos para editar esta zona' },
        { status: 403 }
      );
    }

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

    // Actualizar la zona
    await db.run(
      `UPDATE zones 
       SET name = ?, description = ?, location = ?, category_id = ?, price = ?, images = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, description, location, category_id || null, price || null, images || null, params.id]
    );

    // Obtener la zona actualizada
    const updatedZone = await db.get(`
      SELECT z.*, c.name as category_name, u.name as operator_name, u.company
      FROM zones z
      LEFT JOIN categories c ON z.category_id = c.id
      LEFT JOIN users u ON z.user_id = u.id
      WHERE z.id = ?
    `, [params.id]);

    return NextResponse.json({
      message: 'Zona turística actualizada exitosamente',
      zone: updatedZone
    });

  } catch (error) {
    console.error('Error al actualizar zona:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar zona (requiere autenticación y ser propietario)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const authResult = await authMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const user = (request as any).user;
    const db = await getDatabase();

    // Verificar que la zona existe y pertenece al usuario
    const existingZone = await db.get(
      'SELECT user_id FROM zones WHERE id = ?',
      [params.id]
    );

    if (!existingZone) {
      return NextResponse.json(
        { error: 'Zona turística no encontrada' },
        { status: 404 }
      );
    }

    if (existingZone.user_id !== user.id && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No tienes permisos para eliminar esta zona' },
        { status: 403 }
      );
    }

    // Eliminar la zona
    await db.run('DELETE FROM zones WHERE id = ?', [params.id]);

    return NextResponse.json({
      message: 'Zona turística eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar zona:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 