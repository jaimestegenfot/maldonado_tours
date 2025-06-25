import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, company } = await request.json();

    // Validaciones básicas
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Verificar si el usuario ya existe
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Insertar el nuevo usuario
    const result = await db.run(
      'INSERT INTO users (email, password, name, company) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, company || null]
    );

    // Generar token
    const token = generateToken({
      id: result.lastID,
      email,
      name,
      role: 'operator'
    });

    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: result.lastID,
        email,
        name,
        company,
        role: 'operator'
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 